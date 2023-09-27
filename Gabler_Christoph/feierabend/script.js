function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async function(){
  console.log("Document loaded.");

  //start countdown
  startCountdown();
});

function startCountdown(){
  //calculate the remaining seconds
  let end = new Date();
  end.setHours(17, 0, 0);
  let remainingSeconds = parseInt((end - new Date()) / 1000);
  //start the timer
  var intervalID = setInterval(() => {
    //check if the interval has already elapsed
    if(remainingSeconds <= 0){
      updateNixieClock(0);
      clearInterval(intervalID);
    }else{
      updateNixieClock(remainingSeconds);
    }
    //count down
    remainingSeconds--;
  }, 1000);
}

function updateNixieClock(remainingSeconds){
  //calculate the remaining hours, minutes and seconds
  let hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  //update all the digits
  clearNixiDigit("hour");
  setNixiDigit("hour", hours);
  clearNixiDigit("minute");
  setNixiDigit("minute", minutes);
  clearNixiDigit("second");
  setNixiDigit("second", seconds);
}

function setNixiDigit(digit, number){
  //convert the number to a string
  let strNumber = number.toString();
  if(strNumber.length == 1){
    strNumber = "0" + strNumber;
  }
  //split the string into first and second digit
  let firstDigit = parseInt(strNumber[0]);
  let secondDigit = parseInt(strNumber[1]);
  //set the first digit
  document.querySelector("#" + digit + "1 > .nr" + firstDigit).classList.add("nixiActive");
  document.querySelector("#" + digit + "2 > .nr" + secondDigit).classList.add("nixiActive");
}

function clearNixiDigit(digit){
  document.querySelectorAll("#" + digit + "1 > .nixiNumber").forEach((element) => {
    element.classList.remove("nixiActive");
  });
  document.querySelectorAll("#" + digit + "2 > .nixiNumber").forEach((element) => {
    element.classList.remove("nixiActive");
  });
}