export class User {
	constructor(userId, name, avatar) {
		this.userId = userId;
		this.name = name;
		this.avatar = avatar;
		new Friend()
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

	}
}
export class Friend {
	constructor(User) {
		this.friendList = []
		this.userId = User.userId
		this.xhr = new XMLHttpRequest()
	}

	getFriend() {
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
		
		this.xhr.send(this.UserId);
	}
	
	// 用朋友的id会不会更好?-------------
	addFriend(friend_info) {
		
		this.xhr.open('post', 'http://localhost:3000/addFriend', false)
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
		
		
	}
	delFriend(User) {
		for (let i = 0; i < this.friendList.length; i++) {
			if (User === this.friendList[i]) {
				this.friendList.splice(i, 1);
			}
		}
	}
}
