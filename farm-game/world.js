// ======================
// CAMERA
// ======================

let camera = {
  x:0,
  y:100,
  zoom:1
};

// ======================
// PLAYER
// ======================

let player = {
  x:0,
  y:0
};

// ======================
// GAME DATA
// ======================

let game = {

  money:500,

  level:1,

  xp:0,

  xpNeed:100,

  unlockedCrops:["wheat"]

};

// ======================
// CROPS
// ======================

let crops = {

  wheat:{
    emoji:"🌾",
    time:5
  },

  carrot:{
    emoji:"🥕",
    time:8
  },

  berry:{
    emoji:"🍓",
    time:12
  }

};

// ======================
// PLANTED
// ======================

let planted = [];

// ======================
// SELECTED
// ======================

let selected = "wheat";
