const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let selected = "wheat";
let game = {
  money:500,
  level:1,
  xp:0,
  xpNeed:100
};
let camera = {
  x:0,
  y:150
};
const worldSize = 20;
let planted = [];
const crops = {
  wheat:{emoji:"🌾",time:300},
  carrot:{emoji:"🥕",time:500},
  berry:{emoji:"🍓",time:700}
};
function selectCrop(name){
  selected = name;
}
function iso(x,y){
  return {
    x:(x-y)*32 + canvas.width/2 + camera.x,
    y:(x+y)*16 + camera.y
  };
}
function drawTile(x,y){
  const p = iso(x,y);
  ctx.beginPath();
  ctx.moveTo(p.x,p.y-16);
  ctx.lineTo(p.x+32,p.y);
  ctx.lineTo(p.x,p.y+16);
  ctx.lineTo(p.x-32,p.y);
  ctx.closePath();
  ctx.fillStyle = "#6b8e23";
  ctx.fill();
  ctx.strokeStyle = "#4f6d1a";
  ctx.stroke();
}
function drawWorld(){
  for(let y=0;y<worldSize;y++){
    for(let x=0;x<worldSize;x++){
      drawTile(x,y);
    }
  }
}
function drawCrops(){
  planted.forEach(p=>{
    const pos = iso(p.x,p.y);
    let progress = 1 - (p.time / crops[p.type].time);
    let emoji = "🌱";
    if(progress > 0.3) emoji = "🌿";
    if(progress > 0.7) emoji = crops[p.type].emoji;
    ctx.font = "28px Arial";
    ctx.fillText(emoji,pos.x-12,pos.y);
    if(!p.done){
      p.time--;
      if(p.time <= 0){
        p.done = true;
      }
    }
  });
}
function drawPlayer(){
  const p = iso(2,2);
  ctx.font = "32px Arial";
  ctx.fillText("🧑‍🌾",p.x-16,p.y);
}
function updateUI(){
  document.getElementById("money").innerText = game.money;
  document.getElementById("level").innerText = game.level;
  let percent = (game.xp / game.xpNeed) * 100;
  document.getElementById("xpBar").style.width = percent + "%";
}
canvas.addEventListener("click",e=>{
  const mx = e.clientX - canvas.width/2 - camera.x;
  const my = e.clientY - camera.y;
  const tx = Math.floor((my/16 + mx/32)/2);
  const ty = Math.floor((my/16 - mx/32)/2);
  if(tx < 0 || ty < 0) return;
  if(tx >= worldSize || ty >= worldSize) return;
  const crop = planted.find(p=>p.x===tx && p.y===ty);
  if(crop && crop.done){
    planted = planted.filter(p=>!(p.x===tx && p.y===ty));
    game.money += 20;
    game.xp += 10;
    if(game.xp >= game.xpNeed){
      game.level++;
      game.xp = 0;
      game.xpNeed += 50;
    }
    return;
  }
  if(!crop){
    planted.push({
      x:tx,
      y:ty,
      type:selected,
      time:crops[selected].time,
      done:false
    });
  }
});
let dragging = false;
let lastX = 0;
let lastY = 0;
canvas.addEventListener("touchstart",e=>{
  dragging = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});
canvas.addEventListener("touchmove",e=>{
  if(!dragging) return;
  let x = e.touches[0].clientX;
  let y = e.touches[0].clientY;
  camera.x += x - lastX;
  camera.y += y - lastY;
  lastX = x;
  lastY = y;
});
canvas.addEventListener("touchend",()=>{
  dragging = false;
});
function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawWorld();
  drawCrops();
  drawPlayer();
  updateUI();
  requestAnimationFrame(loop);
}
loop();
