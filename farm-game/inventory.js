let inventory = {};

function addItem(name){

  if(!inventory[name]){
    inventory[name]=0;
  }

  inventory[name]++;

}
