function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async function(){
  console.log("Document loaded.");

  //the time until all animations should be started
  let startTime = 1.0;

  let rgbAnimated = document.getElementsByClassName("animate-rgb-foreground");
  let totalRGBElements = rgbAnimated.length + 1;
  for(var i = 0; i < rgbAnimated.length; i++){
    //calculate the individual start delay
    var startDelay = (startTime / totalRGBElements) * (i + 1);
    console.log(startDelay);
    //start the animation delayed
    rgbAnimated[i].style.animationDelay = startDelay + "s";
  }

  /*
  var letters = document.getElementById("letters").children;
  var offset = parseInt((255 * 3) / (letters.length + 1));

  var colors = [];
  var cSpeed = 50;

  //initialize all colors
  for(var i = 0; i < letters.length + 1; i++){
    colors[i] = getStartColor(i * offset);
  }
  //initialize the background color
  colors[letters.length] = [0, 0, 255];

  //console.log(colors);
  //return;

  while(true){
    //calculate the color for every letter
    for(var i = 0; i < letters.length; i++){
      colors[i] = calculateColor(colors[i], cSpeed);
      letters[i].style.color = getColorAsText(colors[i]);
    }
    //calculate the background color
    colors[letters.length] = calculateColor(colors[letters.length], cSpeed);
    document.getElementById("background").style.backgroundColor = getColorAsText(colors[letters.length]);
    
    //console.log(color);
    await delay(10);
  }
  */
});

/*
function addZero(input){
  if(input.length == 1){
    return "0" + input;
  }
  return input;
}

function calculateColor(color, speed){
  if(color.length != 3){
    return;
  }
  var red = color[0];
  var green = color[1];
  var blue = color[2];
  //calculate the next color
  if(red > 0 && blue <= 0){
    red -= speed;
    green += speed;
  }
  if(green > 0 && red <= 0){
      green -= speed;
      blue += speed;
  }
  if(blue > 0 && green <= 0){
      blue -= speed;
      red += speed;
  }
  return [red, green, blue];
}

function getColorAsText(color){
  if(color.length != 3){
    return;
  }
  return "#" + addZero(color[0].toString(16)) + addZero(color[1].toString(16)) + addZero(color[2].toString(16));
}

function getStartColor(offset){
  if(offset <= 0){
    return [255, 0, 0];
  }else if(offset > 0 && offset <= 255){
    return [offset, 255 - offset, 0];
  }else if(offset > 255 && offset <= 510){
    var newoffset = 510 - offset;
    return [0, newoffset, 255 - newoffset];
  }else if(offset > 510){
    var newoffset = 255 * 3 - offset;
    return [255 - newoffset, 0, newoffset];
  }
}

*/