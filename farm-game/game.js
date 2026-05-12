const c = document.getElementById("game");
const ctx = c.getContext("2d");

c.width = innerWidth;
c.height = innerHeight;

/* ======================
   ISO
====================== */

function iso(x,y){

  return {

    x:((x-y)*32)*camera.zoom + c.width/2 + camera.x,

    y:((x+y)*16)*camera.zoom + camera.y

  };

}

/* ======================
   LEVEL SYSTEM
====================== */

function addXP(amount){

  game.xp += amount;

  if(game.xp >= game.xpNeed){
    levelUp();
  }

}

function levelUp(){

  game.level++;

  game.xp = 0;

  game.xpNeed = Math.floor(game.xpNeed * 1.35);

  game.money += 100;

  unlockContent();

  playSound?.("coin");

  show("⬆️ LEVEL UP! " + game.level);

}

function unlockContent(){

  if(game.level === 2){

    if(!game.unlockedCrops.includes("carrot")){
      game.unlockedCrops.push("carrot");
    }

    show("🥕 Морковь открыта!");

  }

  if(game.level === 3){

    if(!game.unlockedCrops.includes("berry")){
      game.unlockedCrops.push("berry");
    }

    show("🍓 Ягоды открыты!");

  }

}

/* ======================
   DRAW WORLD
====================== */

function drawGroundTile(x,y){

  let pos = iso(x,y);

  ctx.save();

  ctx.translate(pos.x,pos.y);

  ctx.beginPath();

  ctx.moveTo(0,-16);
  ctx.lineTo(32,0);
  ctx.lineTo(0,16);
  ctx.lineTo(-32,0);

  ctx.closePath();

  ctx.fillStyle="#6b8e23";

  ctx.fill();

  ctx.strokeStyle="#4f6d1a";

  ctx.stroke();

  ctx.restore();

}

function drawWorld(){

  for(let y=0;y<worldSize;y++){

    for(let x=0;x<worldSize;x++){

      drawGroundTile(x,y);

    }

  }

}

/* ======================
   CROPS DRAW
====================== */

function drawCrops(){

  planted.forEach(p=>{

    let pos = iso(p.x,p.y);

    let progress = 1 - (p.t / crops[p.type].time);

    if(progress < 0) progress = 0;
    if(progress > 1) progress = 1;

    let e = "🌱";

    if(progress > 0.4) e = "🌿";

    if(progress > 0.8) e = "🌾";

    if(progress >= 1){
      e = crops[p.type].emoji;
    }

    ctx.font = (16 + progress * 6) + "px Arial";

    ctx.fillText(e,pos.x-10,pos.y);

    p.t -= 0.01;

    if(p.t <= 0 && !p.done){

      p.done = true;

      addItem(p.type);

      addXP(10);

      playSound?.("harvest");

    }

  });

}

/* ======================
   PLAYER
====================== */

function drawPlayer(){

  let p = iso(player.x,player.y);

  ctx.font = "28px Arial";

  ctx.fillText("🧑‍🌾",p.x-14,p.y);

}

/* ======================
   UI
====================== */

function updateUI(){

  let moneyEl = document.getElementById("money");

  let levelEl = document.getElementById("level");

  if(moneyEl){
    moneyEl.innerText = game.money;
  }

  if(levelEl){
    levelEl.innerText = game.level;
  }

  let percent = (game.xp / game.xpNeed) * 100;

  let bar = document.getElementById("xpBar");

  if(bar){
    bar.style.width = percent + "%";
  }

}

/* ======================
   CLICK
====================== */

c.onclick = e => {

  let mx = e.clientX - c.width/2 - camera.x;

  let my = e.clientY - camera.y;

  let x = Math.floor((my/16 + mx/32)/2);

  let y = Math.floor((my/16 - mx/32)/2);

  if(x < 0 || y < 0) return;

  if(x >= worldSize || y >= worldSize) return;

  if(!canPlant(selected)) return;

  planted.push({

    x,
    y,

    type:selected,

    t:crops[selected].time,

    done:false

  });

  playSound?.("plant");

}

/* ======================
   CHECK
====================== */

function canPlant(type){

  return game.unlockedCrops.includes(type);

}

/* ======================
   LOOP
====================== */

function loop(){

  ctx.clearRect(0,0,c.width,c.height);

  drawWorld();

  drawCrops();

  drawPlayer();

  updateUI();

  requestAnimationFrame(loop);

}

loop();

/* ======================
   SHOW
====================== */

function show(t){

  console.log(t);

     }
