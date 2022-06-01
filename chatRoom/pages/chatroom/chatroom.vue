<template>
	<div>
		<h1>{{msg}}</h1>
		<chat-view :chat_record="chat_record"></chat-view>

		<!-- <view class="send">
			<input class="msg" type="text" value="说点" />
			<button @click="sendMsg">发送</button>
		</view> -->
		<emoji @sendMsg="sendMsg" :to="to"></emoji>

		<newUser></newUser>
	</div>
</template>

<script>
	import chatView from '../../components/chatView.vue'
	import emoji from '../../components/emoji.vue'
	import {
		getChat
	} from '../../utils/socket_util.js'
	import newUser from '../../components/newUser.vue'
	export default {
		components: {
			chatView,
			emoji,
			newUser
		},
		data() {
			return {
				msg: '',
				chat_record: [],
				to: null
			}
		},
		// 全局监听
		sockets: {
			test(msg) {
				console.log(msg);
			}
		},

		methods: {
			sendMsg(data) {
				this.msg = data.msg
			}
		},
		onLoad() {
			// 建立连接,拿到to,to是聊天对象的socket
			this.sockets.subscribe('getChat', (data, nameList) => {
				this.to = getChat(data[0], nameList, this.$socket.id);
				console.log(this.to);
				this.sockets.unsubscribe('getChat')
			})

			// 接收消息
			this.sockets.subscribe('getMsg', data => {
				let record = {
					isMe:false,
					msg:data.msg
				}
				this.chat_record.push(record)
				console.log(data);
				// 不能注销,如果注销后续发消息无法接受
				// this.sockets.unsubscribe('getMsg')
			})
		},
		onShow() {

		}
	}
</script>

<style scoped>
	.send {
		display: flex;
	}

	.msg {
		flex: 1;
		background: red;
		height: auto;
	}
</style>
// 表情转码
function utf16toEntities(str) {
const patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
str = str.replace(patt, (char) => {
let H;
let L;
let code;
let s;

if (char.length === 2) {
H = char.charCodeAt(0); // 取出高位
L = char.charCodeAt(1); // 取出低位
code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
s = `&#${code};`;
} else {
s = char;
}

return s;
});

return str;
}
