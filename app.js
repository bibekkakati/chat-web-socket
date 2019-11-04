const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log("Server is running at http://localhost:" + port));

//Static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', (socket) => {
	console.log("Socket connection  " + socket.id);

	//Handle schat event
	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	});

	//Handle typing
	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	})
});
