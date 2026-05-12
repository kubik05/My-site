const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ======================
   CAMERA
====================== */

let camera = {
  x: 0,
  y: 0,
  zoom: 1
};

/* ======================
   ISO SETTINGS
====================== */

const tileW = 64;
const tileH = 32;

/* ======================
   DRAW TILE
====================== */

function iso(x,y){

  let screenX = (x - y) * tileW/2;
  let screenY = (x + y) * tileH/2;

  return {
    x: screenX + canvas.width/2 + camera.x,
    y: screenY + camera.y
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

    }
  }

}

/* ======================
   LOOP
====================== */

function loop(){
  draw();
  requestAnimationFrame(loop);
}

loop();

/* ======================
   CONTROL (DRAG CAMERA)
====================== */

let drag=false;
let lastX,lastY;

canvas.addEventListener("mousedown",(e)=>{
  drag=true;
  lastX=e.clientX;
  lastY=e.clientY;
});

canvas.addEventListener("mouseup",()=>drag=false);

canvas.addEventListener("mousemove",(e)=>{

  if(!drag) return;

  camera.x += e.clientX - lastX;
  camera.y += e.clientY - lastY;

  lastX=e.clientX;
  lastY=e.clientY;

});

/* ======================
   MOBILE TOUCH
====================== */

canvas.addEventListener("touchmove",(e)=>{

  let t=e.touches[0];

  camera.x += t.clientX - (lastX||t.clientX);
  camera.y += t.clientY - (lastY||t.clientY);

  lastX=t.clientX;
  lastY=t.clientY;

});
