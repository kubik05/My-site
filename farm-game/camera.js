addEventListener("wheel",e=>{

  if(e.deltaY<0){
    camera.zoom += 0.1;
  }else{
    camera.zoom -= 0.1;
  }

  if(camera.zoom<0.5)camera.zoom=0.5;
  if(camera.zoom>2)camera.zoom=2;

});
