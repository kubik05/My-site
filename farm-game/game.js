const c=document.getElementById("game");
const ctx=c.getContext("2d");

c.width=innerWidth;
c.height=innerHeight;

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

  soundSell?.();

  show("⬆️ LEVEL UP! " + game.level);
}

function unlockContent(){

  if(game.level === 2){
    game.unlockedCrops.push("carrot");
    show("🥕 Морковь открыта!");
  }

  if(game.level === 3){
    game.unlockedCrops.push("berry");
    show("🍓 Ягоды открыты!");
  }

}

/* ======================
   CROPS DRAW (HAY STYLE)
====================== */

function drawCrops(){

  planted.forEach(p=>{

    let pos=iso(p.x,p.y);

    let progress = 1 - (p.t / crops[p.type].time);
    if(progress<0) progress=0;
    if(progress>1) progress=1;

    let e="🌱";

    if(progress>0.4)e="🌿";
    if(progress>0.8)e="🌾";
    if(progress>=1)e=crops[p.type].emoji;

    ctx.font=(16+progress*6)+"px Arial";
    ctx.fillText(e,pos.x,pos.y);

    p.t -= 0.01;

    if(p.t<=0){
      addItem(p.type);
      addXP(10);
      soundHarvest?.();
      p.t=-999;
    }

  });

}

/* ======================
   PLAYER
====================== */

function drawPlayer(){
  let p=iso(player.x,player.y);
  ctx.fillText("🧑‍🌾",p.x,p.y);
}

/* ======================
   UI UPDATE + XP BAR
====================== */

function updateUI(){

  money.innerText=game.money;
  level.innerText=game.level;

  let percent = (game.xp / game.xpNeed) * 100;

  let bar=document.getElementById("xpBar");
  if(bar) bar.style.width = percent + "%";

}

/* ======================
   CLICK
====================== */

c.onclick=e=>{

  let x=Math.floor((e.clientX-c.width/2)/32);
  let y=Math.floor((e.clientY)/32);

  if(!canPlant(selected)) return;

  planted.push({x,y,type:selected,t:crops[selected].time});

}

function canPlant(type){
  return game.unlockedCrops.includes(type);
}

/* ======================
   LOOP
====================== */

function loop(){
  ctx.clearRect(0,0,c.width,c.height);

  drawCrops();
  drawPlayer();
  updateUI();

  requestAnimationFrame(loop);
}

loop();

function show(t){
  alert(t);
}
