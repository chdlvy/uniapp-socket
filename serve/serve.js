var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{cors:true});



io.on('connection',function(socket) {
  //接收数据
  // console.log(socket);
  socket.on('chat',msg => {
	  console.log(msg)
		socket.emit('chat msg','aaa')
		socket.emit('wel','wel')
  })
  
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});