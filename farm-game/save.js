function save(){
  localStorage.setItem("farm_v2",JSON.stringify({
    game,planted,npcs
  }));
}

function load(){
  let d=JSON.parse(localStorage.getItem("farm_v2"));
  if(d){
    game=d.game;
    planted=d.planted;
    npcs=d.npcs;
  }
}

setInterval(save,3000);
load();
