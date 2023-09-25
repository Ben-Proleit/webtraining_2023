function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async function(){
  console.log("Document loaded.");
  var color1 = [255, 0, 0];
  var color2 = [0, 255, 0];
  var cSpeed = 50;

  while(true){
    color1 = calculateColor(color1, cSpeed);
    color2 = calculateColor(color2, cSpeed);

    var color1_text = getColorAsText(color1);
    document.getElementById("cycletext").style.color = color1_text;

    var color2_text = getColorAsText(color2);
    document.getElementById("background").style.backgroundColor = color2_text;
    
    //console.log(color);
    await delay(10);
  }
});

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