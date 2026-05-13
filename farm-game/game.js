// ======================
// GAME.JS FULL WORKING
// ======================

const c = document.getElementById("game");
const ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

// ======================
// CAMERA
// ======================

let camera = {
  x:0,
  y:120,
  zoom:1
};

// ======================
// PLAYER
// ======================

let player = {
  x:0,
  y:0
};

// ======================
// GAME DATA
// ======================

let game = {

  money:500,

  level:1,

  xp:0,

  xpNeed:100,

  unlockedCrops:["wheat","carrot","berry"]

};

// ======================
// CROPS
// ======================

let crops = {

  wheat:{
    emoji:"🌾",
    time:300
  },

  carrot:{
    emoji:"🥕",
    time:500
  },

  berry:{
    emoji:"🍓",
    time:800
  }

};

// ======================
// WORLD
// ======================

const worldSize = 20;

let planted = [];

let selected = "wheat";

// ======================
// ISO
// ======================

function iso(x,y){

  return {

    x:((x-y)*32)*camera.zoom + c.width/2 + camera.x,

    y:((x+y)*16)*camera.zoom + camera.y

  };

}

// ======================
// LEVEL SYSTEM
// ======================

function addXP(amount){

  game.xp += amount;

  if(game.xp >= game.xpNeed){

    game.level++;

    game.xp = 0;

    game.xpNeed = Math.floor(game.xpNeed * 1.4);

    game.money += 100;

  }

}

// ======================
// DRAW TILE
// ======================

function drawTile(x,y){

  let pos = iso(x,y);

  ctx.save();

  ctx.translate(pos.x,pos.y);

  ctx.beginPath();

  ctx.moveTo(0,-16);
  ctx.lineTo(32,0);
  ctx.lineTo(0,16);
  ctx.lineTo(-32,0);

  ctx.closePath();

  ctx.fillStyle = "#6b8e23";

  ctx.fill();

  ctx.strokeStyle = "#4d7018";

  ctx.stroke();

  ctx.restore();

}

// ======================
// DRAW WORLD
// ======================

function drawWorld(){

  for(let y=0;y<worldSize;y++){

    for(let x=0;x<worldSize;x++){

      drawTile(x,y);

    }

  }

}

// ======================
// DRAW CROPS
// ======================

function drawCrops(){

  planted.forEach(p=>{

    let pos = iso(p.x,p.y);

    let progress = 1 - (p.t / crops[p.type].time);

    if(progress < 0) progress = 0;
    if(progress > 1) progress = 1;

    let emoji = "🌱";

    if(progress > 0.3) emoji = "🌿";

    if(progress > 0.6) emoji = "🌾";

    if(progress >= 1){
      emoji = crops[p.type].emoji;
    }

    ctx.font = (18 + progress*8) + "px Arial";

    ctx.fillText(emoji,pos.x-10,pos.y);

    if(!p.done){

      p.t--;

      if(p.t <= 0){

        p.done = true;

      }

    }

  });

}

// ======================
// DRAW PLAYER
// ======================

function drawPlayer(){

  let p = iso(player.x,player.y);

  ctx.font = "28px Arial";

  ctx.fillText("🧑‍🌾",p.x-15,p.y);

}

// ======================
// UI
// ======================

function updateUI(){

  let money = document.getElementById("money");
  let level = document.getElementById("level");
  let xpBar = document.getElementById("xpBar");

  if(money){
    money.innerText = game.money;
  }

  if(level){
    level.innerText = game.level;
  }

  if(xpBar){

    let percent = (game.xp / game.xpNeed) * 100;

    xpBar.style.width = percent + "%";

  }

}

// ======================
// SELECT CROP
// ======================

function selectCrop(name){

  selected = name;

}

// ======================
// CLICK SYSTEM
// ======================

c.addEventListener("click",e=>{

  let mx = e.clientX - c.width/2 - camera.x;
  let my = e.clientY - camera.y;

  let tx = Math.floor((my/16 + mx/32)/2);
  let ty = Math.floor((my/16 - mx/32)/2);

  if(tx < 0 || ty < 0) return;

  if(tx >= worldSize || ty >= worldSize) return;

  let exists = planted.find(p=>p.x===tx && p.y===ty);

  // HARVEST
  if(exists && exists.done){

    game.money += 20;

    addXP(15);

    planted = planted.filter(p=>!(p.x===tx && p.y===ty));

    return;

  }

  // PLANT
  if(!exists){

    planted.push({

      x:tx,
      y:ty,

      type:selected,

      t:crops[selected].time,

      done:false

    });

  }

});

// ======================
// MOBILE CAMERA DRAG
// ======================

let dragging = false;

let lastX = 0;
let lastY = 0;

c.addEventListener("touchstart",e=>{

  dragging = true;

  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;

});

c.addEventListener("touchmove",e=>{

  if(!dragging) return;

  let x = e.touches[0].clientX;
  let y = e.touches[0].clientY;

  camera.x += x - lastX;
  camera.y += y - lastY;

  lastX = x;
  lastY = y;

});

c.addEventListener("touchend",()=>{

  dragging = false;

});

// ======================
// LOOP
// ======================

function loop(){

  ctx.clearRect(0,0,c.width,c.height);

  drawWorld();

  drawCrops();

  drawPlayer();

  updateUI();

  requestAnimationFrame(loop);

}

loop();
