
const Config = {
  // * START OF CONFIGURATION * -----------------------
  //- Communication: ----------------------------------
  // The address and path of the websocket server
  URL: "wss://hrzwkscgb02:8777/",
  // How long to wait for a message at maximum
  REQUEST_TIMEOUT: 15000,
  //Enable anybody to create a new user account
  //Note: This has to be enabled in the Modular Home Server as well
  PUBLIC_SERVER: true
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
  if(Config.PUBLIC_SERVER === undefined){
    Object.assign(Config, {PUBLIC_SERVER: false});
  }
}