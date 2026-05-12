const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ======================
   CAMERA
====================== */

let camera = {
  x: 0,
  y: 0
};

/* ======================
   ISO
====================== */

const tileW = 64;
const tileH = 32;

function iso(x,y){
  return {
    x:(x - y) * tileW/2 + canvas.width/2 + camera.x,
    y:(x + y) * tileH/2 + camera.y
  };
}

/* ======================
   DRAW WORLD
====================== */

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let y=0;y<world.length;y++){
    for(let x=0;x<world[y].length;x++){

      let pos = iso(x,y);

      ctx.fillStyle = "#2f6b3f";

      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x + tileW/2, pos.y + tileH/2);
      ctx.lineTo(pos.x, pos.y + tileH);
      ctx.lineTo(pos.x - tileW/2, pos.y + tileH/2);
      ctx.closePath();
      ctx.fill();

      /* ======================
         GRID LINE (optional)
      ====================== */

      ctx.strokeStyle="rgba(0,0,0,0.1)";
      ctx.stroke();

    }
  }

  drawPlayer();
}

/* ======================
   PLAYER DRAW
====================== */

function drawPlayer(){

  let pos = iso(player.x, player.y);

  ctx.font="24px Arial";
  ctx.textAlign="center";

  ctx.fillText(player.emoji, pos.x, pos.y);
}

/* ======================
   MOVE PLAYER
====================== */

function movePlayer(x,y){

  let nx = player.x + x;
  let ny = player.y + y;

  if(nx<0||ny<0||nx>=40||ny>=40) return;

  player.x = nx;
  player.y = ny;
}

/* ======================
   CONTROLS (KEYBOARD)
====================== */

document.addEventListener("keydown",(e)=>{

  if(e.key==="w") movePlayer(0,-1);
  if(e.key==="s") movePlayer(0,1);
  if(e.key==="a") movePlayer(-1,0);
  if(e.key==="d") movePlayer(1,0);

});

/* ======================
   TOUCH MOVE (tap tile)
====================== */

canvas.addEventListener("click",(e)=>{

  let rect = canvas.getBoundingClientRect();

  let mx = e.clientX - rect.left;
  let my = e.clientY - rect.top;

  // простое приближение к сетке
  let tx = Math.floor((mx - canvas.width/2)/32 + (my/32));
  let ty = Math.floor((my/32) - (mx - canvas.width/2)/32);

  if(tx>=0 && ty>=0 && tx<40 && ty<40){
    player.x = tx;
    player.y = ty;
  }

});

/* ======================
   LOOP
====================== */

function loop(){
  draw();
  requestAnimationFrame(loop);
}

loop();

/* ======================
   RESIZE
====================== */

window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
