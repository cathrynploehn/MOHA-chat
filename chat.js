class Chat {
	constructor(options, socket){
		console.log("chat")
		this.log = options.log ? options.log : [];
		this.socket = socket;
		this.navigation = options.navigation;

		this.reconstructChat();


		if(this.navigation){this.navigation.addNotification("chat");}

		this.socket.on("chatReceived", (data)=> { 
			if(this.navigation) { this.navigation.addNotification("chat"); }
			this.addMessage(data) 
		});

		$("#chatSend").on('click', (e) => {
			e.preventDefault();
			let message = $("#chatInput").val().trim();
			if(message.trim().length > 0){
				$("#chatInput").val('');
				let username = $("#nameInput").val();
				username = username.length > 0 ? username : "anonymous";
				this.socket.emit('chatSent', {message: message, username: username})
			}
		})
	}

	reconstructChat(){
		for(let msg in this.log){ this.addMessage(this.log[msg]) }
	}
	addMessage(data){
		$("#chatLog").append("<p class='message'><span class='username'>" + data.username + "</span>: <span class='text'>" + data.message +"</span></p>")
		let scrollTo = document.getElementById("chatLog").scrollHeight;
		$("#chatLog").scrollTop(scrollTo);
	}
}