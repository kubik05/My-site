// =========================
// AUDIO SYSTEM
// =========================

let sounds = {};

// безопасная загрузка
function loadSound(name, path){

  try{
    sounds[name] = new Audio(path);
  }catch(e){
    console.log("sound load error",name);
  }

}

// воспроизведение
function playSound(name){

  try{

    if(!sounds[name]) return;

    sounds[name].currentTime = 0;
    sounds[name].play();

  }catch(e){
    console.log("play error",name);
  }

}

// громкость
function setVolume(v){

  for(let s in sounds){
    sounds[s].volume = v;
  }

}

// =========================
// DEFAULT SOUNDS
// =========================

// пока без файлов — заглушки
loadSound("plant","");
loadSound("harvest","");
loadSound("coin","");
