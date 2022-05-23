<template>
	<div>
		<h1>{{msg}}</h1>
		<chat-view></chat-view>
		<button @click="getmsg">click</button>
	</div>
</template>

<script>
	import chatView from '../../components/chatView.vue'
	export default {
		components: {
			chatView
		},
		data() {
			return {
				msg: ''
			}
		},
		// 全局监听
		sockets: {
			wel(data) {
				console.log(data)
			}
		},
		methods: {
			getmsg() {
				console.log(this)
				this.$socket.emit('chat','chat')
				// 组件内监听，这里是sockets 不是$socket
				this.sockets.subscribe('chat msg',msg=> {
					this.msg = msg
				})
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		}
	}
</script>

<style>
</style>


