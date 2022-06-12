export class User {
	constructor(userId, name, avatar) {
		this.userId = userId;
		this.name = name;
		this.avatar = avatar;
		new Friend({userId,name,avatar})
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
		const Pro = new Promise((res, rej) => {
			let _this = this;
			this.xhr.open('post', 'http://localhost:3000/login', false)
			this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			this.xhr.onreadystatechange = function() {
				if (_this.xhr.readyState == 4) {
					if (_this.xhr.status >= 200 && _this.xhr.status < 300) {
						res(_this.xhr.responseText)
					}else {
						rej('fail')
					}

				}
			}

			this.xhr.send(`account=${this.account}&password=${this.password}`);
		})
		return Pro
	}
	// 注册
	register(nickName) {
		const Pro = new Promise((res, rej) => {

			let _this = this;
			this.xhr.open('post', 'http://localhost:3000/register', false)
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
			this.xhr.onreadystatechange = function() {
				if (_this.xhr.readyState == 4) {
					if (_this.xhr.status >= 200 && _this.xhr.status < 300) {
						res(_this.xhr.responseText) // 获取响应数据(以文本形式)
					} else {
						rej('fail') // 注册失败

					}
				}
			}

			this.xhr.send(`account=${this.account}&password=${this.password}&nickName=${nickName}`);

		})
		return Pro
	}
	destory() {
		
		// 测试封装的函数
		requestUrl('get','test','id=1').then(res=> {
			console.log(res);
		})
	}
}
export class Friend {
	constructor(User) {
		this.friendList = []
		this.userId = User.userId
		this.User = User
		this.xhr = new XMLHttpRequest()
	}

	getFriend() {
		const Pro = new Promise((res, rej) => {
		let _this = this;
		this.xhr.open('get', 'http://localhost:3000/getFriend', false)
		this.xhr.onreadystatechange = function() {
			if (_this.xhr.readyState == 4) {
				if (_this.xhr.status >= 200 && _this.xhr.status < 300) {
					_this.xhr.responseText // 获取响应数据(以文本形式)
				} else {
					console.log('fail'); // 注册失败
		
				}
			}
		}
		
		this.xhr.send(this.userId);
		})
		return Pro
	}
	
	
	addFriend(friendId) {
		
		const Pro = new Promise((res, rej) => {
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
		if(method==='get' || 'GET') {
			let _url = baseUrl+url+'?'+data
			xhr.open(method,_url,true)
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
			xhr.open(method,_url,true)
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