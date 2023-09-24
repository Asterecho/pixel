const convertPixels=(pixels,palette)=>{
  for(let i=0;i<pixels.length;i++){
    if(pixels[i]===0)
      continue;
    let rgb=pixels[i].toString(16);
    let r=parseInt(rgb[6]+rgb[7],16);
    let g=parseInt(rgb[4]+rgb[5],16);
    let b=parseInt(rgb[2]+rgb[3],16);
    let min=99999999,pick;
    for(let p of palette){
      let r1=parseInt(p[2]+p[3],16);
      let g1=parseInt(p[4]+p[5],16);
      let b1=parseInt(p[6]+p[7],16);
      let dis=(r1-r)*(r1-r)+(g1-g)*(g1-g)+(b1-b)*(b1-b);
      if(dis<min){
        min=dis;
        pick=p;
      }
    }
    let res=parseInt(pick[0]+pick[1]+pick[6]+pick[7]+pick[4]+pick[5]+pick[2]+pick[3],16);
    pixels[i]=res;
  }
}

const changePalette=(piskel,palette)=>{
  for(let layer of piskel.layers){
    for(let frame of layer.frames){
      convertPixels(frame.pixels,palette);
    }
  }
  self.postMessage(piskel);
}

self.onmessage = (event) => {
  let piskel=event.data.piskel;
  let palette=event.data.palette.split('\n');
  changePalette(piskel,palette);
};