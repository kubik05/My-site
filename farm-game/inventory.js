function addItem(item){
  game.inventory[item]=(game.inventory[item]||0)+1;
}

function openInventory(){
  show(JSON.stringify(game.inventory,null,2));
}
