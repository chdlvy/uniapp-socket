export class User {
	constructor(userId, name, avatar) {
		this.userId = userId;
		this.name = name;
		this.avatar = avatar;
		new Friend()
	}
}
export class UserAccount {
	constructor(account, password, nickName) {
		this.account = account;
		this.password = password;
		this.nickName = nickName;
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
	register() {
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

			this.xhr.send(`account=${this.account}&password=${this.password}&nickName=${this.nickName}`);

		})
		return Pro
	}
	destory() {

	}
}
export class Friend {
	constructor() {
		this.friendList = []
	}

	addFriend(User) {
		// 对方加到自己好友表
		this.friendList.push(User)
	}
	delFriend(User) {
		for (let i = 0; i < this.friendList.length; i++) {
			if (User === this.friendList[i]) {
				this.friendList.splice(i, 1);
			}
		}
	}
}
