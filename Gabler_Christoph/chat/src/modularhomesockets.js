class ModularHomeSocket {
	constructor(){
		//init the config
		InitConfig();
		//initialize the session manager
		this.sessionManager = new SessionManager();
		//initialize the package coordinator
		this.coordinator = new PackageCoordinator(this);
		//initialize and open the websocket connection
		this.socket = undefined;
		//this function is executed after the connection has been established
		this.onReady = [];
		//this function is executed when a request from the server arrived
		this.onRequest = [];
		//this function is executed when a post from the server arrived
		this.onPost = [];
		//this function is executed when the connection was established
		this.onConnected = [];
		//this function is executed when the connection was closed
		this.onClosed = [];
	}

	getSessionManager(){
		return this.sessionManager;
	}

	getCoordinator(){
		return this.coordinator;
	}

	getSocket(){
		return this.socket;
	}

	//connect and automatically resume the connection
	connect(){
		this.socket = new CustomSocket(this);
	}

	login(username, pwd, fktSuccess, fktError, timeout){
		this.sessionManager.login(username, pwd, fktSuccess, fktError, timeout, this);
	}

	logout(fktSuccess, fktError, timeout){
		this.sessionManager.logout(fktSuccess, fktError, timeout, this);
	}

	requestData(data, fktSuccess, fktError, timeout){
		this.coordinator.sendAsync(data, PackageType.DATA, fktSuccess, fktError, timeout);
	}
	requestCommand(command, args, fktSuccess, fktError, timeout){
		//create the command to be transmitted
		let cmd = new Command(command, args);
		this.coordinator.sendAsync(cmd, PackageType.DATA, fktSuccess, fktError, timeout);
	}
	postData(data){
		this.coordinator.post(data, PackageType.DATA);
	}

	setOnConnectedHandler(handler){
		this.onConnected = handler;
	}
	setOnClosedHandler(handler){
		this.onClosed = handler;
	}
	setReady(){
		if(typeof this.onReady === "function"){
			this.onReady();
		}else if(this.onReady !== undefined && Array.isArray(this.onReady)){
			//execute every callback function
			for(let i = 0; i < this.onReady.length; i++){
				this.onReady[i]();
			}
		}
	}

	isConnected(){
		return (sessionStorage.getItem("ready") === "true");
	}
}

class SessionManager{
	constructor() {
		sessionStorage.setItem("ready", "false");
	}

	login(username, pwd, fktSuccess, fktError, timeout, mhs){
		mhs.getCoordinator().sendAsync(["login", username, pwd], PackageType.LOGIN, function (data){
			//check if the answer is an array
			if(Array.isArray(data)){
				//check if the login was successful
				if(data[0] === "success" && data.length >= 2){
					//get the new session id
					sessionStorage.setItem("token", data[1]);
					sessionStorage.setItem("ready", "true");
					mhs.setReady();
				}
			}
			fktSuccess(data);
		}, fktError, timeout);
	}

	resumeSession(mhs){
		//check if the session needs to be resumed
		let id = sessionStorage.getItem("token");
		if(id !== undefined && id !== null){
			//send resume login request
			mhs.getCoordinator().sendAsync(["resume", id], PackageType.LOGIN, function (data){
				if(data === true){
					sessionStorage.setItem("ready", "true");
					mhs.setReady();
				}else{
					//session id is invalid
					sessionStorage.setItem("ready", "false");
					console.log("The session id was invalid.");
					//server should exit automatically here -> no connection lost navigation required
				}
			});
		}else{
			//execute the callback
			sessionStorage.setItem("ready", "false");
		}
	}

	logout(fktSuccess, fktError, timeout, mhs){
		mhs.getCoordinator().sendAsync(null, PackageType.LOGOUT, function (data){
			sessionStorage.setItem("ready", "false");
			sessionStorage.removeItem("token");
			fktSuccess(data);
		}, fktError, timeout);
	}
}

class ContentTranslator{

	encodeContent(content){
		let output = [];
		this.encodeStep(content, output, 0);
		return output;
	}

	decodeContent(content){
		return this.decodeStep(content);
	}

	decodeStep(input){
		//make sure that the input is not null
		if(input != null){
			//create the data type string
			let data_type = String();
			//create the current step
			let curr_step = 0;
			//check the data type line
			let data_type_line = input.shift();
			//check that the data type contains the segment head
			if(data_type_line.includes(SEGMENT_HEAD)){
				//get the parts of the data type line
				let parts = data_type_line.split(SEGMENT_SEPARATOR);
				//check if there are enough parts
				if(parts.length >= 3){
					//get the new step
					let new_step = parseInt(parts[1], 10);
					//check if the new step is valid
					if(new_step >= 0 && new_step <= 7){
						//if the new step is alright set the current step to it
						curr_step = new_step;
						//set the data type
						data_type = parts[2];
					}else{
						throw "The smart home protocol is only capable of receiving up to 7 layers of arrays.";
					}
				}else{
					throw "A data type line in the content of package is too short.";
				}
			}else{
				throw "The data type in the content of a package could not be determined.";
			}
			//now that the step and the data type is known lets decode the data
			if(data_type === DataType.COMMAND){
				//decode the string first
				let first = this.decodeStep(input);
				//check if it is a string
				if(typeof(first) == "string"){
					//create the argument list
					let argument_array = null;
					//check if there actually are arguments
					if(input.length > 0){
						//if so finish the initialisation of the array
						argument_array = [];
						//and continue to add the arguments
						while(input.length > 0){
							//check if the end of the array has been discovered
							if(input[0].includes(SEGMENT_HEAD + (curr_step + 1))){
                                argument_array.push(this.decodeStep(input));
                            }else{
                                break;
                            }
						}
					}
					return new Command(first, argument_array);
				}else{
					throw "A content line does not contain a valid command string!";
				}
			}else if(data_type === DataType.ARRAY){
				let output_list = [];
				//go on with reading and converting as long as there is something left to convert
				while(input.length > 0){
					//check if the end of the argument array has been discovered
					if(input[0].includes(SEGMENT_HEAD + (curr_step + 1))){
                        output_list.push(this.decodeStep(input));
                    }else{
                        break;
                    }
				}
				return output_list;
			}else if(data_type === DataType.STRING){
				let result = String();
				//proceed with translation as long as the end of the input array has not been reached
				while(input.length > 0){
					//read the next line
					let curr_line = input[0];
					//check if the current line contains a segment head
					if(curr_line.includes(SEGMENT_HEAD)){
                        break;
					}else{
						curr_line = input.shift();
					}
					//check if this is the first line
                    if(result.length === 0){
                        result = curr_line;
                    }else{
                        result += "/n" + curr_line;
                    }
				}
				return result;
			}else if(data_type === DataType.INTEGER){
				this.confirmNextLine(input);
				return parseInt(input.shift(), 10);
			}else if(data_type === DataType.DOUBLE){
				this.confirmNextLine(input);
				return parseFloat(input.shift());
			}else if(data_type === DataType.LONG){
				this.confirmNextLine(input);
				return parseInt(input.shift(), 10);
			}else if(data_type === DataType.TIMESTAMP){
				this.confirmNextLine(input);
				let timestamp = parseInt(input.shift(), 10);
				return new Date(timestamp);
			}else if(data_type === DataType.BOOLEAN){
				this.confirmNextLine(input);
				return (input.shift() === "true");
			}else if(data_type === DataType.NULL){
				return null;
			}else if(data_type === DataType.ERROR){
				this.confirmNextLine(input);
				let error_code = parseInt(input.shift(), 10);
				return new Error(error_code);
			}else{
				throw "The modular home protocol does not support the data type '" + data_type + "'!";
			}
		}else{
			throw "The data to be received cannot be null!";
		}
	}

	confirmNextLine(input){
		if(input.length === 0){
			throw "The content of the package to be red has an unexpected end!";
		}
	}

	encodeStep(input, output, curr_step){
		if(curr_step >= 0 && curr_step <= 7){
			if(input === null || input === undefined){
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.NULL);
			}else
			if(input instanceof Command){
				//add the segment head
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.COMMAND);
				//add the command to the output
				this.encodeStep(input.getCommand(), output, curr_step + 1);
				//get the argument array
				let args = input.getArguments();
				//check if the command has arguments
				if(args != null){
					//add the arguments of the command to the output
					for(let i = 0; i < args.length; i++){
						this.encodeStep(args[i], output, curr_step + 1);
					}
				}
			}else
			if(input instanceof Array){
				//add the segment head
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.ARRAY);
				//add the lines of the input array to the output with recursion
				for(let i = 0; i < input.length; i++){
					this.encodeStep(input[i], output, curr_step + 1);
				}
			}else
			if(typeof(input) == "string"){
				//check if the string contains any unwanted characters
				if(input.includes("</content></package>")){
					throw "The input for encoding is not allowed to contain '</content></package>'!";
				}
				if(input.includes(SEGMENT_HEAD)){
					throw "The input for encoding is not allowed to contain '<seg='!";
				}
				//add the segment head
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.STRING);
				//add the input in lines now
				var lines = input.split(/\r\n|\n|\r/gm);
				for(var i = 0; i < lines.length; i++){
					output.push(lines[i]);
				}
			}else
				// 10 = Decimal System
			if(input === parseInt(input, 10)){
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.INTEGER);
				output.push(input);
			}else
			if(input % 1 !== 0){
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.DOUBLE);
				output.push(input);
			}else
			if(input instanceof Date){
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.TIMESTAMP);
				output.push(input.getTime());
			}else
			if(typeof(input) == "boolean"){
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.BOOLEAN);
				output.push(input);
			}else
			if(input instanceof Error){
				output.push(SEGMENT_HEAD + curr_step + SEGMENT_SEPARATOR + DataType.ERROR);
				output.push(input.getCode());
			}else{
				throw "The smart home protocol does not support this data type! The type was: " + input;
			}
		}else{
			throw "The smart home protocol is only capable of transmitting up to 7 interlaced arrays.";
		}
	}
}

class Subscription{
	constructor(id, fktSuccess, fktError, timeout){
		this.id = id;
		this.fktSuccess = fktSuccess;
		this.fktError = fktError;
		this.end = Date.now() + timeout;
	}
	getID(){
		return this.id;
	}
	execFktSuccess(data){
		if(this.fktSuccess !== undefined){
			this.fktSuccess(data);
		}
	}
	execFktError(code){
		if(this.fktError !== undefined){
			this.fktError(code);
		}
	}
	isTimedOut(){
		return this.end < Date.now();
	}
}

class PackageCoordinator{
	constructor(controller) {
		this.controller = controller;
		this.nextPackageID = 0
		this.subs = [];
	}

	getNextPackageID() {
		if(this.nextPackageID >= 65535){
			this.nextPackageID = 0;
		}
		let id = this.nextPackageID;
		this.nextPackageID += 1;
		return id;
	}

	handlePackage(pack){
		switch (pack.getRoute()) {
			case PackageRoute.REQUEST:
				//console.log("A request was received!");
				this.handleRequest(pack);
				break;
			case PackageRoute.ANSWER:
				//console.log("An answer was received!");
				this.handleAnswer(pack);
				break;
			case PackageRoute.POST:
				//console.log("A post was received!");
				this.handlePost(pack);
				break;
			default:
				throw "Unsupported package route: '" + pack.getRoute() + "'";
		}
	}

	handleRequest(pack){
		switch (pack.getType()){
			case PackageType.DATA:
				//get the necessary package data
				let id = pack.getID();
				let rawData = pack.getContent();
				let data = new ContentTranslator().decodeContent(rawData);
				//check if the request callback is defined
				if(typeof this.controller.onRequest === "function"){
					//process the data
					let result = this.controller.onRequest(data);
					let content = new ContentTranslator().encodeContent(result);
					let answer = new Package(PackageType.DATA, PackageRoute.ANSWER, id, content);
					//send the answer back
					this.controller.getSocket().sendPackage(answer);
				}else if(this.controller.onRequest !== undefined && Array.isArray(this.controller.onRequest)){
					//execute every callback function
					for(let i = 0; i < this.controller.onRequest.length; i++){
						this.controller.onRequest[i](data);
					}
				}else {
					console.log("The request callback is not a function.");
					//reply with an error
					let content = new ContentTranslator().encodeContent(new Error(2));
					let answer = new Package(PackageType.DATA, PackageRoute.ANSWER, id, content);
					this.controller.getSocket().sendPackage(answer);
				}
				break;
			default:
				throw "Unsupported package type: '" + pack.getType() + "'";
		}
	}

	handlePost(pack){
		switch (pack.getType()) {
			case PackageType.DATA:
				//get the necessary package data
				let rawData = pack.getContent();
				let data = new ContentTranslator().decodeContent(rawData);
				//check if the callback is defined
				if(this.controller.onPost !== undefined){
					if(typeof this.controller.onPost === "function"){
						this.controller.onPost(data);
					}else if(Array.isArray(this.controller.onPost)){
						//execute every callback function
						for(let i = 0; i < this.controller.onPost.length; i++){
							this.controller.onPost[i](data);
						}
					}else{
						console.log("The post callback is not a function.");
					}
				}
				break;
			case PackageType.EXIT:
				console.log("The connection was closed by the server.");
				//execute callback, if defined
				if(typeof this.controller.onClosed === "function"){
					this.controller.onClosed();
				}
				break;
			case PackageType.PING:
				break;
			case PackageType.ACK:
				//resume session
				this.controller.getSessionManager().resumeSession(this.controller);
				break;
			default:
				throw "Unsupported package type: '" + pack.getType() + "'";
		}
	}

	handleAnswer(pack){
		//handle the answer
		for(let i = 0; i < this.subs.length; i++){
			let sub = this.subs[i];
			if(sub.getID() === pack.getID()){
				//get the translated content of the package
				let data = new ContentTranslator().decodeContent(pack.getContent());
				//check if everything went good
				if(!(data instanceof Error)){
					this.subs[i].execFktSuccess(data);
				}else{
					this.subs[i].execFktError(data.getCode());
				}
				this.subs.splice(i, 1);
			}else{
				if(sub.isTimedOut()){
					this.subs.splice(i, 1);
					console.log("A request timed out.");
					//notify about the timeout
					sub.execFktError(8);
				}
			}
		}
	}

	sendAsync(data, type, fktSuccess, fktError, timeout){
		//get the next package id
		let id = this.getNextPackageID();
		//encode the content
		let request = new ContentTranslator().encodeContent(data);
		//create a new package and send it
		let pack = new Package(type, PackageRoute.REQUEST, id, request);
		//check if no custom timeout was set
		if(typeof timeout === undefined){
			timeout = Config.REQUEST_TIMEOUT;
		}
		//add a new subscription
		this.subs.push(new Subscription(id, fktSuccess, fktError, timeout));
		//send the package
		this.controller.getSocket().sendPackage(pack);
	}

	post(data, type){
		//get the next package id
		let id = this.getNextPackageID();
		//encode the content
		let post = new ContentTranslator().encodeContent(data);
		//create a new package and send it
		let pack = new Package(type, PackageRoute.POST, id, post);
		//send the package
		this.controller.getSocket().sendPackage(pack);
	}
}

class CustomSocket{
	constructor(controller){
		//initialize the connected bool
		sessionStorage.setItem("connected", "false");
		//initialize and open a websocket connection
		let socket = new WebSocket(Config.URL);
		this.socket = socket;

		//handle messages
		socket.onmessage = async function (event){
			//console.log(event.data);
			//split the message by line breaks to analyze it
			let lines = event.data.split(/\r\n|\n|\r/gm);
			let pack = receivePackage(lines);
			if(pack === null){
				console.log("The server sent a message with the wrong syntax.");
				return;
			}
			controller.getCoordinator().handlePackage(pack);
		}

		//update the connection status after the socket has been opened
		socket.onopen = function (){
			console.log("The socket has been opened.");
			sessionStorage.setItem("connected", "true");
			if(typeof controller.onConnected === "function"){
				controller.onConnected();
			}else if(controller.onConnected !== undefined && Array.isArray(controller.onConnected)){
				//execute every callback function
				for(let i = 0; i < controller.onConnected.length; i++){
					controller.onConnected[i]();
				}
			}
		}

		//update the connection status after the socket has been closed
		socket.onclose = function (){
			console.log("The socket has been closed.");
			sessionStorage.setItem("connected", "false");
			if(typeof controller.onClosed === "function"){
				controller.onClosed();
			}else if(controller.onClosed !== undefined && Array.isArray(controller.onClosed)){
				//execute every callback function
				for(let i = 0; i < controller.onClosed.length; i++){
					controller.onClosed[i]();
				}
			}
		}

		//log errors
		socket.onerror = function (error) {
			console.log("There was an error with the websocket.");
		};
	}

	sendPackage(pack){
		//create the new package string
		let msg = String();
		//add the package head
		msg += PACKAGE + "\n";
		msg += pack.getType() + "\n";
		msg += pack.getRoute() + "\n";
		msg += pack.getID() + "\n";
		msg += CONTENT + "\n";
		//process and add the content of the package to the message
		let content = pack.getContent();
		for(let i = 0; i < content.length; i++){
			//check if the current line does not contain a break or the termination sequence
			if(/\r|\n/.exec(content[i]) || content[i] === TERMINATION){
				throw "The string to be sent contains a line break or the termination line!";
			}
			msg += content[i] + "\n";
		}
		//add the package end
		msg += TERMINATION + "\n";
		//and finally send the package string
		this.socket.send(msg);
	}
}

function receivePackage(lines){
	//check if the package has at least 6 lines
	//<package>
	//type
	//route
	//id
	//<content>
	//</content></package>
	if(lines.length < 6){
		throw "The package to be received is incomplete!";
	}
	//here the package should be complete and the lines get red
	let type = lines[1];
	let route = lines[2];
	let id = parseInt(lines[3]);
	//check if the content is following now
	if(lines[4] === CONTENT){
		//create the content array
		let content = [];
		//and iterate over the lines to add them to the content
		for(let i = 5; i <= Config.MAX_MESSAGE_LENGTH; i++){
			//get the current content line (starting at index 6)
			let line = lines[i];
			//check if the line also marks the end of the package
			if(line === TERMINATION){
				break;
			}
			content.push(line);
		}
		//check if the maximum amount of lines was exceeded
		if(content.length > Config.MAX_MESSAGE_LENGTH){
			throw "The maximum amount of lines for a package has been reached.";
		}
		//finally return the newly received package
		return new Package(type, route, id, content);
	}else{
		throw "The content of the package could not be identified!";
	}
}

class Error{
	constructor(code){
		this.code = code;
	}

	getCode(){
		return this.code;
	}
}

class Command{
	constructor(command, args){
		this.command = command;
		this.arguments = args;
	}

	getCommand(){
		return this.command;
	}

	getArguments(){
		return this.arguments;
	}
}

class Package{
	constructor(type, route, id, content){
		this.type = type;
		this.route = route;
		this.id = id;
		this.content = content;
	}

	getType(){
		return this.type;
	}

	getRoute(){
		return this.route;
	}

	getID(){
		return this.id;
	}

	getContent(){
		return this.content;
	}
}

const PackageType = {
	LOGIN: "lgi",
	DATA: "dat",
	LOGOUT: "lgo",
	EXIT: "ext",
	PING: "pin",
	ACK: "ack"
}

const PackageRoute = {
	REQUEST: "req",
	ANSWER: "ans",
	POST: "pst"
}

const DataType = {
	STRING: "str",
	BOOLEAN: "bol",
	INTEGER: "int",
	ARRAY: "ary",
	DOUBLE: "dbl",
	TIMESTAMP: "tim",
	NULL: "nul",
	ERROR: "err",
	COMMAND: "cmd",
	LONG: "lng"
}

const SEGMENT_HEAD = "<seg=";
const SEGMENT_SEPARATOR = "=";
const PACKAGE = "<package>";
const CONTENT = "<content>";
const TERMINATION = "</content></package>";