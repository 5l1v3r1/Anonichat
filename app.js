var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
	server.listen(process.env.PORT);
// routing
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
// view engine ejs
     app.set('view engine', 'ejs');
     app.engine('html', require('ejs').renderFile);
app.get('/chat', function (req, res) {
	var name = req.query.name;
  	var chatID = req.query.chatID.toLowerCase();
  	res.render('chat.html', {name : name, chatID : chatID});
  	//res.sendFile(__dirname + '/chat.html');
});

// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {
	

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username, room){
		// store the username in the socket session for this client
		socket.username = username;
		if(usernames[username] == room)
		{
			socket.emit('checkexist', username);
			return;
		}
		// store the room name in the socket session for this client
		socket.room = room;
		// add the client's username to the global list
		usernames[username] = room;
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to ' + room);
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
		// send client to room 1
		socket.join(room);
		console.log(socket.username + " joined the room");
		io.sockets.in(socket.room).emit('updatechatlist', usernames);
	});
	
	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		if(data.trim() == "")
		{
			return;
		}
		else
		{
			// we tell the client to execute 'updatechat' with 2 parameters
			io.sockets.in(socket.room).emit('updatechat', socket.username, data);
		}
	});
	

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		console.log(socket.username + " has left " + socket.room);
		delete usernames[socket.username];
		io.sockets.in(socket.room).emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
		io.sockets.in(socket.room).emit('updatechatlist', usernames);
		console.log(socket.username + " has finished leaving " + socket.room);
	});
});
