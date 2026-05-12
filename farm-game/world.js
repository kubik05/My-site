// ======================
// CAMERA
// ======================

let camera = {
  x:0,
  y:120,
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
// GAME
// ======================

let game = {

  money:500,

  level:1,

  xp:0,

  xpNeed:100,

  unlockedCrops:["wheat","carrot","berry"]

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
// WORLD
// ======================

const worldSize = 15;

let planted = [];

let selected = "wheat";

// ======================
// DRAW WORLD
// ======================

function drawWorld(){

  for(let y=0;y<worldSize;y++){

    for(let x=0;x<worldSize;x++){

      let pos = iso(x,y);

      ctx.save();

      ctx.translate(pos.x,pos.y);
      ctx.scale(camera.zoom,camera.zoom);

      ctx.beginPath();
      ctx.moveTo(0,-16);
      ctx.lineTo(32,0);
      ctx.lineTo(0,16);
      ctx.lineTo(-32,0);
      ctx.closePath();

      ctx.fillStyle="#6b8e23";
      ctx.fill();

      ctx.strokeStyle="#4f6d1a";
      ctx.stroke();

      ctx.restore();

    }

  }

}
