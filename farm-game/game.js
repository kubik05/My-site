const c=document.getElementById("game");
const ctx=c.getContext("2d");

c.width=innerWidth;
c.height=innerHeight;

function iso(x,y){
  return {
    x:((x-y)*32)*camera.zoom + c.width/2 + camera.x,
    y:((x+y)*16)*camera.zoom + camera.y
  };
}

function draw(){

  ctx.clearRect(0,0,c.width,c.height);

  for(let y=0;y<SIZE;y++){
    for(let x=0;x<SIZE;x++){

      let p=iso(x,y);

      ctx.fillStyle="#2f6b3f";

      ctx.beginPath();
      ctx.moveTo(p.x,p.y);
      ctx.lineTo(p.x+32,p.y+16);
      ctx.lineTo(p.x,p.y+32);
      ctx.lineTo(p.x-32,p.y+16);
      ctx.closePath();
      ctx.fill();

    }
  }

  drawCrops();
  drawPlayer();
  updateUI();
}

function drawPlayer(){
  let p=iso(player.x,player.y);
  ctx.fillText("🧑‍🌾",p.x,p.y);
}

function drawCrops(){

  planted.forEach(p=>{

    let pos=iso(p.x,p.y);

    let prog = 1 - (p.t/crops[p.type].time);

    let e="🌱";
    if(prog>0.4)e="🌿";
    if(prog>0.8)e=crops[p.type].emoji;

    ctx.fillText(e,pos.x,pos.y);

    p.t -= 0.01;

    if(p.t<=0){
      addItem(p.type);
      soundHarvest();
      p.t=-999;
    }

  });

}

function updateUI(){
  money.innerText=game.money;
  level.innerText=game.level;
  inv.innerText=Object.keys(game.inventory).length;
}

c.onclick=e=>{
  let x=Math.floor((e.clientX-c.width/2)/32);
  let y=Math.floor((e.clientY)/32);

  planted.push({x,y,type:selected,t:crops[selected].time});
};

function loop(){
  draw();
  requestAnimationFrame(loop);
}

loop();

function show(t){
  alert(t);
}
