export class User {
	constructor(userId,name,avatar) {
		this.userId = userId;
		this.name = name;
		this.avatar = avatar;
		new Friend()
	}
}
export class UserAccount {
	constructor() {
		this.account;
		this.password;
		this.xhr = new XMLHttpRequest()
	}
	login(account,password) {
			
		this.xhr.open('post','http://localhost:3000/login',false)
		this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this.xhr.send(`account=${account}&password=${password}`);
		this.xhr.onreadystatechange = function() {
			if(this.xhr.readyState== 4 && this.xhr.status==200) {
				console.log(this.xhr.responseText);
			}
		}
	}
	// 注册
	register(account,password,nickName) {
		this.xhr.open('post','http://localhost:3000/register',false)
		this.xhr.send(`account=${account}&password=${password}&nickName=${nickName}`);
		this.xhr.onreadystatechange = function() {
			if(this.xhr.readyState== 4 && this.xhr.status==200) {
				console.log(this.xhr.responseText);
			}
		}
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
		for(let i =0;i<this.friendList.length;i++) {
			if(User===this.friendList[i]) {
				this.friendList.splice(i,1);
			}
		}
	}
}