
// 监听getChat时调用该函数
function getChat(data,nameList,id) {
			let to = null
			if (data.p1 == id) {
				to = data.p2
			} else if (data.p2 == id) {
				to = data.p1
			}
			return to
			// var name = nameList[to]
			// this.sockets.unsubscribe('getChat')
			
			
		}
	

	export {
		getChat
	}
