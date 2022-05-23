<template>
	<view>
		<scroll-view class="chat-view" scroll-y="true">
			<view class="line" v-for="(item,index) in chat_record" :key="index">
				<view class="left" v-if="item.isMe===false">
					<image class="left-avatar" src="../static/logo.png" />
					<view class="left-msg">{{item.msg}}</view>
				</view>
				<view class="right" v-else>
					<image class="right-avatar" src="../static/logo.png" />
					<view class="right-msg">{{item.msg}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "chatView",
		data() {
			return {
				obj:[],
				chat_record:[{
					isMe: true,
					msg: '阿萨大大撒旦撒旦阿萨大大撒旦撒旦阿萨大大撒旦撒旦阿萨大大撒旦撒旦'
				},
				{
					isMe: false,
					msg: '你好a阿斯顿撒大大实打实大大是啊实打实大苏打实打实的 '
				},
				{
					isMe: true,
					msg: '你好'
				},
				{
					isMe: false,
					msg: '挺好'
				}]
			}
		}

	}
</script>

<style scoped>
	page {
		padding: 0;
		margin: 0;
		background: linear-gradient(-45deg, #183850 0, #183850 25%, #192c46 50%, #22254c 75%, #22254c 100%);
		background-repeat: no-repeat;
		background-attachment: fixed;
		height: 100%;
	}

	.chat-view {
		padding-top: 10px;
	}

	/* 聊天框 */
	.left-msg,
	.right-msg {
		position: relative;
		clear: both;
		padding: 8px 20px 8px 10px;
		margin-bottom: 20px;
		font: 14px 'Noto Sans', sans-serif;
		border-radius: 8px;
		background-color: rgba(25, 147, 147, 0.2);
		/* 文字换行 */
		max-width: 60%;
		word-wrap: break-word;
		word-break: normal;
		color: #0EC879;
	}

	.right,
	.left {
		position: relative;
		overflow: hidden;
	}
	
	.right {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
		
	}
	.right-avatar,
	.left-avatar {
		/* position: absolute; */
		border-radius: 50%;
		width: 35px;
		height: 35px;
	}


	.right-avatar {
		right: 2%;
	}

	.right-msg {
		animation: show-chat-even 0.15s 1 ease-in;
	/* 	float: right;
		margin-right: 15%; */
		position: relative;
	}

	.right-msg::after {
		content: '';
		width: 0px;
		height: 0px;
		border: 10px solid transparent;
		border-left: 10px solid red;
		position: absolute;
		top: 20%;
		/* right: -20px; */
	}

	.left-avatar {
		left: 2%;
	}

	.left-msg {
		animation: show-chat-even 0.15s 1 ease-in;
		float: left;
		margin-left: 15%;
	}

	.left-msg::before {
		content: '';
		width: 0px;
		height: 0px;
		border: 10px solid transparent;
		border-right: 10px solid rgba(25, 147, 147, 0.2);
		position: absolute;
		top: 20%;
		left: -31%;
	}
</style>
