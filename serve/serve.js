var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
	cors: true
});


let freeList = []
let chat_record = []
let userSocket = []
let nameList = []
io.on('connection', function(socket) {
	socket.on('newUser', data => {
		let user_id = data.id
		userSocket[user_id] = socket
		nameList[user_id] = data.userName
		freeList.push(user_id)
		console.log(freeList)
		if (freeList.length > 1) {
			var from = user_id;
			// 把自己从表中删除
			Arrayremove(freeList, from)
			if (freeList.length == 1) {
				n = 0
			} else {
				// 随机抽一个人
				n = Math.floor(Math.random() * freeList.length)
			}
			var to = freeList[n]
			Arrayremove(freeList, to)
			
			
			io.emit("getChat", {
				p1: from,
				p2: to
			}, nameList)
		}
	})
	//接收数据
	socket.on('message',function(data){
		console.log('message')
			if(userSocket.hasOwnProperty(data.to)){
				userSocket[data.to].emit('getMsg',{msg:data.msg})
			}else{
				console.log('err')
				socket.emit("err",{msg:"对方已经下线或者断开连接"})
			}
		})
})
http.listen(3000, () => {
	console.log('listening on *:3000');
});

function Arrayremove(array, name) {
	var len = array.length;
	for (var i = 0; i < len; i++) {
		if (array[i] == name) {
			array.splice(i, 1)
			break
		}
	}
}
