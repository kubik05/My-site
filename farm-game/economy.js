function sellItem(name,price){

  if(!inventory[name]) return;

  inventory[name]--;

  game.money += price;

}
