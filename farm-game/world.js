const WORLD_SIZE = 40;

let world = [];

for(let y=0;y<WORLD_SIZE;y++){
  let row=[];
  for(let x=0;x<WORLD_SIZE;x++){
    row.push({
      type: "grass"
    });
  }
  world.push(row);
}
