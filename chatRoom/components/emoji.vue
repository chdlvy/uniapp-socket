<template>
	<view class="bottom">
		<view class="comment-fixed">
			<input class="msg-input" type="text" v-model="sendMessage" :confirm="keySend"  @input="change"
				 :focus="isFocus" />
			<view class="send-message">
				<view class="send-phiz">
					<!-- emoji -->
					<image class="send-icon" src="../static/emoji.png" @click="clickEmoji" />
					<image class="send-img" v-if="!isSend" @click="sendImg" src="../static/logo.png" />
				</view>
				<button  v-if="isSend" @click="sendMsg">发送</button>
			</view>
		</view>
		<!--emoji表情盒子-->
		<view :class="getStyle">
			<scroll-view scroll-y="true" style="height:200px">
				<view class="emoji-cell" v-for="(item,index) in emojis" :key="index" >
					<view >
						<image class="touch-active" @click="emojiChoose" :src="require(`../static/emoji/${item.emoji}.png`)"
							:data-emoji="item.char" :data-oxf="item.emoji"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "emoji",
		props: {
			to: String
		},
		computed: {
			getStyle() {
				return {
					'emoji-box':'emoji-box',
					'emoji-move-in': this.isShow === true,
					'emoji-move-out': this.isShow === false,
					'no-emoji-move':this.isLoad===true
				}
			}
			
		},
		data() {
			return {
				sendMessage: '',
				isFocus: false,
				isSend:false,// 显示发送按钮
				isShow: false, //控制emoji表情是否显示
				isLoad: true, //解决初试加载时emoji动画执行一次
				cfBg: false,
				emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
				//0x1f---
				emoji: [
					"01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
					"11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
					"21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
					"31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
					"41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
					"51", "52", "53", "54", "55",
				],
				emojis: [], //qq、微信原始表情
				alipayEmoji: [], //支付宝表情
			}
		},
		onReady() {
			
		},
		methods: {
			change() {
				 this.isSend = this.sendMessage==='' ? false : true
			},
			// 点击发送消息
			sendMsg() {
				this.send()
			},
			// 键盘回车发送信息
			keySend() {
				this.send()
			},
			// emoji
			//点击表情显示隐藏表情盒子
			clickEmoji() {
				this.isShow = !this.isShow,
					this.isLoad = false,
					this.isFocus = true
					let em = {},
					emChar = this.emojiChar.split("-");
					let emojis = []
					this.emoji.forEach(function(v, i) {
					em = {
							char: emChar[i],
							emoji: v
						};
						// 表情与数字对应的放到对象中，再推到数组里面
						emojis.push(em)
					});
					this.emojis = emojis
			},
			//表情选择
			emojiChoose(e) {
				//当前输入内容和表情合并

				this.sendMessage = this.sendMessage + e.currentTarget.dataset.emoji,
					this.isFocus = true,
					this.isSend = true

			},
			// 发送文字
			send() {
				// 向friend发信息
				this.$socket.emit('message',{msg:this.sendMessage,to:this.to})
			  // 将事件发送给父组件
			  this.$emit('sendMsg', {
				msg: this.sendMessage,
				type: 'msg'
			  })
			  //发送消息后输入框获取焦点
			  this.isFocus= true,
				this.sendMessage= ''
				this.isSend= false
			}
		}
	}
</script>

<style scoped>
	/* bottom */
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.comment-fixed {
		width: 100%;
		height: 49px;
		border-top: 1px solid #cdcdcd;
		background-color: #f7f7f4;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;
	}


	.msg-input {
		flex-basis: 65%;
		height: 28px;
		background-color: #fff;
		border-radius: 10rpx;
		margin-left: 2%;
		padding: 0 3%;
		font-size: 28rpx;
		color: #444;
	}

	.send-message {
		height: 28px;
		padding: 2% 5px;
		width: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.send-message>button {
		display: flex;
		flex: 1 0 auto;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-color: #07be61;
		height: 28px;
		margin: 0 2%;
		padding: 2% 5px;
	}

	/* 图标 */
	.send-phiz {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}

	/* 发送图片按钮 */
	.send-icon,
	.send-img {
		width: 50rpx;
		height: 50rpx;
	}


	/* emoji */
	.emoji-box {
		position: relative;
		height: 200px;
		padding: 5px 0;
		box-sizing: border-box;
		margin-bottom: -200px;
	}

	.emoji-cell {
		width: 9.09%;
		height: 33px;
		display: inline-block;
	}

	.emoji-cell image {
		width: 23px;
		height: 23px;
		padding: 5px;
		border-radius: 3px;
	}

	.emoji-move-in {
		-webkit-animation: emoji-move-in 0.3s forwards;
		animation: emoji-move-in 0.3s forwards;
	}

	.emoji-move-out {
		-webkit-animation: emoji-move-out 0.3s forwards;
		animation: emoji-move-out 0.3s forwards;
	}

	.no-emoji-move {
		-webkit-animation: none;
		animation: none;
	}

	@-webkit-keyframes emoji-move-in {
		0% {
			margin-bottom: -200px;
		}

		100% {
			margin-bottom: 0;
		}
	}

	@keyframes emoji-move-in {
		0% {
			margin-bottom: -200px;
		}

		100% {
			margin-bottom: 0;
		}
	}

	@-webkit-keyframes emoji-move-out {
		0% {
			margin-bottom: 0;
		}

		100% {
			margin-bottom: -200px;
		}
	}

	@keyframes emoji-move-out {
		0% {
			margin-bottom: 0;
		}

		100% {
			margin-bottom: -200px;
		}
	}
</style>
