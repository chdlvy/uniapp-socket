<template>
	<view>
		<button @click="newUser">添加好友</button>
	</view>
</template>

<script>
	export default {
		name:"newUser",
		data() {
			return {
				
			};
		},
		methods: {
			newUser() {
				this.$socket.emit('newUser',{
						id:this.$socket.id,
						userName:'小明'
					})
			}
		}
	}
</script>

<style>

</style>