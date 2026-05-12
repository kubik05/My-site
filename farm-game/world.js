const SIZE = 40;

let world = Array.from({length:SIZE},()=> 
  Array.from({length:SIZE},()=>({type:"grass"}))
);

let player = {x:20,y:20};

let game = {
  money:100,
  level:1,
  xp:0,
  inventory:{}
};

let planted = [];
let selected = "wheat";
let weather = "sun";

let npcs = [
  {name:"Tom", wants:"wheat", price:15},
  {name:"Anna", wants:"carrot", price:25},
  {name:"Bob", wants:"berry", price:40}
];

let crops = {
  wheat:{time:3,price:10,emoji:"🌾"},
  carrot:{time:5,price:15,emoji:"🥕"},
  berry:{time:6,price:25,emoji:"🍓"}
};
