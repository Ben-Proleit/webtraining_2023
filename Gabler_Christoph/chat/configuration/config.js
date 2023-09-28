
const Config = {
  // * START OF CONFIGURATION * -----------------------
  //- Communication: ----------------------------------
  // The address and path of the websocket server
  URL: "wss://192.168.241.36:2021/",
  // How long to wait for a message at maximum
  REQUEST_TIMEOUT: 15000
  // * END OF CONFIGURATION * -------------------------
}

function InitConfig(){
  if(Config.URL === undefined){
      Object.assign(Config, {URL: "wss://localhost:2021/"});
  }
  if(Config.MAX_MESSAGE_LENGTH === undefined){
      Object.assign(Config, {MAX_MESSAGE_LENGTH: 32768});
  }
  if(Config.REQUEST_TIMEOUT === undefined){
      Object.assign(Config, {REQUEST_TIMEOUT: 15000});
  }
  if(Config.CONNECTION_LOST_PAGE === undefined){
      Object.assign(Config, {CONNECTION_LOST_PAGE: "offline.php"});
  }
}