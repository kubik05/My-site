function openMarket(){

  let txt="🏪 MARKET\n\n";

  npcs.forEach((n,i)=>{
    txt += `${n.name} хочет ${n.wants} — $${n.price}\n`;
  });

  show(txt);
}

function sellTo(i){

  let n=npcs[i];

  if(game.inventory[n.wants]>0){
    game.inventory[n.wants]--;
    game.money += n.price;
    soundSell();
  }

}
