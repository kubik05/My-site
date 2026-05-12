let camera = {
  x:0,y:0,zoom:1,drag:false,lx:0,ly:0
};

addEventListener("mousedown",e=>{
  camera.drag=true;
  camera.lx=e.clientX;
  camera.ly=e.clientY;
});

addEventListener("mouseup",()=>camera.drag=false);

addEventListener("mousemove",e=>{
  if(camera.drag){
    camera.x += e.clientX-camera.lx;
    camera.y += e.clientY-camera.ly;
    camera.lx=e.clientX;
    camera.ly=e.clientY;
  }
});

addEventListener("wheel",e=>{
  camera.zoom -= e.deltaY*0.001;
  camera.zoom=Math.min(2,Math.max(0.5,camera.zoom));
});
