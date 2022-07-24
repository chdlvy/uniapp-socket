<template>
	<view class="chat-list">
		<!-- 搜索框 -->
		
		<input type="text" v-model="friendId">
		<button @click="addFriend">addFriend</button>
		<!-- 列表 -->
		<scroll-view class="list">
			<view class="list-item" @click="toChatRoom">
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {Friends} from '../user.js'
	export default {
		onLoad() {
			// 进来先判断有没有token
			let xhr = new XMLHttpRequest()
			xhr.open('get', 'http://localhost:3000/verify', false)
						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								if (xhr.status >= 200 && xhr.status < 300) {	
									let hasToken = JSON.parse(xhr.responseText).err
									// 返回err:1则说明没有token，重新登录
									if(hasToken===1) {
										uni.navigateTo({
											url: '../login/login'
										});
									}
								}else {
									console.log('fail')
								}
			
							}
						}
			xhr.setRequestHeader('token',localStorage.getItem('token'))
			xhr.send()
				
			
			
			
			// 拿到用户信息
			let user_info = localStorage.getItem('user_info')
			console.log(user_info);
			//获取好友列表
			this.Friend= new Friends(JSON.parse(user_info))
			
			this.Friend.getFriend().then(res=> {
				console.log(res);
			})
			
		},
		data() {
			return {
				Friend: null,
				friendId:null
			}
		},
		methods: {
			toChatRoom() {
				
			},
			addFriend() {
				console.log(this.friendId);
				this.Friend.addFriend(this.friendId)
			}
		},
	}
</script>

<style scoped>
</style>