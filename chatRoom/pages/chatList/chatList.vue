<template>
	<view class="chat-list">
		<!-- 搜索框 -->
		
		<!-- 列表 -->
		<scroll-view class="list">
			<view class="list-item" @click="toChatRoom">
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// import {} from '../user.js'
	export default {
		onLoad() {
			let obj = localStorage.getItem('user_info')
			console.log(obj);
		},
		methods: {
			toChatRoom() {
				
			}
		},
	}
</script>

<style scoped>
</style>