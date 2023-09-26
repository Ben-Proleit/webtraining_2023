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
});