export class User {
	constructor(userId, name, avatar) {
		this.userId = userId;
		this.name = name;
		this.avatar = avatar;
		new Friends({userId,name,avatar})
	}
}
export class UserAccount {
	constructor(account, password) {
		this.account = account;
		this.password = password;
		this.xhr = new XMLHttpRequest()
	}
	login() {
		// 发送登录请求，登录成功返回token
		const Pro = new Promise((reslove, reject) => {
			
			let data = `account=${this.account}&password=${this.password}`
			requestUrl('post','login',data).then(res=> {
				console.log(res);
				reslove(res)
			}).catch(rej=> {
				reject('fail')
			})
		})
		return Pro
	}
	// 注册
	register(nickName) {
		const Pro = new Promise((reslove, reject) => {
			
			let data = `account=${this.account}&password=${this.password}&nickName=${nickName}`
			requestUrl('post','register',data).then(res=> {
				reslove()
			}).catch(rej=> {
				reject('fail')
			})

		})
		return Pro
	}
	destory() {
		
	}
}



export class Friends {
	constructor(User) {
		this.friendList = []
		this.userId = User.userId
		this.xhr = new XMLHttpRequest()
	}
	
	test() {
		const Pro = new Promise((res, rej) => {
		let _this = this;
		let xhr = new XMLHttpRequest()
		xhr.open('get', 'http://localhost:3000/test?id=1', false)
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 300) {
					console.log();
					res(xhr.responseText) // 获取响应数据(以文本形式)：添加好友之后的好友列表
				} else {
					rej('test fail') // 添加好友失败
		
				}
			}
		}
		
		})
		return Pro
	}

	getFriend() {
		const Pro = new Promise((reslove, reject) => {
		let data = 'userId='+this.userId
		requestUrl('get','getFriend',data).then(res=> {
			reslove(res)
		}).catch(rej=> {
			reject('fail')
		})
		})
		return Pro
	}
	
	
	addFriend(friendId) {
		
		const Pro = new Promise((res, rej) => {
		let _this = this
		this.xhr.open('post', 'http://localhost:3000/addFriend', false)
		this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		this.xhr.onreadystatechange = function() {
			if (_this.xhr.readyState == 4) {
				if (_this.xhr.status >= 200 && _this.xhr.status < 300) {
					res(_this.xhr.responseText) // 获取响应数据(以文本形式)：添加好友之后的好友列表
				} else {
					rej('addFriend fail') // 添加好友失败
		
				}
			}
		}
		this.xhr.send(`friendId=${friendId}&userId=${this.userId}`);
		
		})
		return Pro
		
	}
	delFriend(friendId) {
		let _this = this;
		this.xhr.open('get', 'http://localhost:3000/delFriend', false)
		this.xhr.onreadystatechange = function() {
			if (_this.xhr.readyState == 4) {
				if (_this.xhr.status >= 200 && _this.xhr.status < 300) {
					console.log('del success'); // 获取响应数据(以文本形式)
				} else {
					console.log('del fail'); // 注册失败
		
				}
			}
		}
		
		this.xhr.send(friendId);
	}
}

function requestUrl(method,url,data) {
	let baseUrl = 'http://localhost:3000/'
	return new Promise((reslove,reject)=> {
		let xhr = new XMLHttpRequest()
		if(method==='get' || method === 'GET') {
			let _url = baseUrl+url+'?'+data
			xhr.open(method,_url,false)
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						reslove(xhr.responseText) // 获取响应数据(以文本形式)：添加好友之后的好友列表
					} else {
						reject()
					}
				}
			}
			xhr.send()
		}
		else {
			let _url = baseUrl+url
			xhr.open(method,_url,false)
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						reslove(xhr.responseText) // 获取响应数据(以文本形式)：添加好友之后的好友列表
					} else {
						reject()
					}
				}
			}
			xhr.send(data)
		}
	})
}