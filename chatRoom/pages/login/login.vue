<template>
	<el-container class="container">
		<el-header class="header" height="2rem">{{activeName==='first'? '登录' : '注册'}}</el-header>
		<el-main>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="登录" name="first">
					<el-form ref="form" :rules="rules" :model="login_in" label-width="80px" label-position="right">
						<el-form-item label="账号" prop="account">
							<el-input v-model.number="login_in.account" placeholder="请输入账号"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input placeholder="请输入密码" v-model="login_in.password" show-password></el-input>
						</el-form-item>
					</el-form>
					<el-button class="btn" type="primary" @click="login">登录</el-button>
				</el-tab-pane>
				<el-tab-pane label="注册" name="second">
					<el-form ref="form"  :rules="rules" :model="login_up" label-width="80px" label-position="right">
						<el-form-item label="昵称" prop="nick_name">
							<el-input v-model="login_up.nick_name"  placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="账号" prop="account" >
							<el-input v-model.number="login_up.account"  placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="密码"  prop="password">
							<el-input placeholder="请输入密码" v-model="login_up.password" show-password></el-input>
						</el-form-item>
						<el-form-item label="确认密码"  prop="repeat_psw">
							<el-input placeholder="请输入密码" v-model="login_up.repeat_psw" show-password>
							</el-input>
						</el-form-item>
					</el-form>

					<el-button class="btn" type="primary" :disabled="isRegister" @click="register">注册</el-button>
				</el-tab-pane>
			</el-tabs>


		</el-main>
	</el-container>
</template>

<script>
	import {
		UserAccount,
		User
	} from '../user.js'
	export default {
		data() {
			// 判断密码是否相等
			var validatePass2 = (rule, value, callback) => {
			        if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== this.login_up.password) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
			      };
			return {
				rules: {
					nick_name: [{ required: true, message: '昵称不能为空'}],
					account: [
						{ required: true, message: '账号不能为空'},
						 { type: 'number', message: '账号必须为数字'}
					],
					password:[
						{ required: true, message: '密码不能为空'}
						
					],
					repeat_psw: [
						{ required: true, message: '确认密码不能为空'},
						{validator: validatePass2},
						]
				},
				login_in: {
					account: '',
					password: '',
				},
				login_up: {
					nick_name:'',
					account: '',
					password: '',
					repeat_psw: ''
				},
				activeName: 'first',
				isRepeat: false
			}
		},
		computed: {
			// 密码和重复密码不相等,密码为空的时候不能点击注册按钮
			isRegister() {
				return this.login_up.password!==this.login_up.repeat_psw || this.login_up.password ==''
			}

		},
		methods: {
			login() {
				let {account,password,nick_name} = this.login_in
				let userAccount = new UserAccount(account,password,nick_name)
				// 收到token表示登录成功
				userAccount.login().then(res=> {
					console.log(uni);
					localStorage.setItem('token',res)
					this.__proto__.prototype.User = new User(account,nick_name,'img')
					console.log(this.__proto__);
					uni.navigateTo({
						url: '../chatList/chatList'
					});
				}).catch(rej=> {
					console.log('登录失败，请注册');
				})
				
			},
			
			register() {
				let {account,password,nick_name} = this.login_up
				let userAccount = new UserAccount(account,password,nick_name)
				userAccount
				.register()
				.then(res=> {
						userAccount.login().then(res=> {
							// 保存token
							localStorage.setItem('token',res)
							this.User = new User(account,nick_name,'img')
							// 跳转
							uni.navigateTo({
								url: 'pages/chatList'
							});
						})
					}
				).catch(rej=> {
					console.log(rej);
				})
				;
			},
			handleClick(tab, event) {
				// console.log(tab, event);
			},
		},
		onLoad() {
			// console.log(new UserAccount());
		}
	}
</script>

<style scoped>
	.container {
		margin: auto;
		margin-top: 1rem;
		width: 80%;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}

	.header {
		text-align: center;
		background-color: #409EFF;
		color: #fff;
		line-height: 2rem;

	}

	.btn {
		display: block;
		margin: 0 auto;
	}
</style>
