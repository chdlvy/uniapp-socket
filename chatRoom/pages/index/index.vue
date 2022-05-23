<template>
	<view class="content">
			<div ref="charts" style="width: 1000px; height: 800px"></div>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	import china from '../../static/china.json'
	export default {
		created () {
		    this.$nextTick(() => {
		      this.initCharts();
		    })
		  },
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			initCharts() {
				 const charts = echarts.init(this.$refs["charts"]);
				      const option = {
				        // 背景颜色
				        backgroundColor: "#404a59",
				        // 提示浮窗样式
				        tooltip: {
				          show: true,
				          trigger: "item",
				          alwaysShowContent: false,
				          backgroundColor: "#0C121C",
				          borderColor: "rgba(0, 0, 0, 0.16);",
				          hideDelay: 100,
				          triggerOn: "mousemove",
				          enterable: true,
				          textStyle: {
				            color: "#DADADA",
				            fontSize: "12",
				            width: 20,
				            height: 30,
				            overflow: "break",
				          },
				          showDelay: 100
				        },
				        // 地图配置
				        geo: {
				          map: "china",
				          label: {
				            // 通常状态下的样式
				            normal: {
				              show: false,
				              textStyle: {
				                color: "red",
				              },
				            },
				            // 鼠标放上去的样式
				            emphasis: {
				              textStyle: {
				                color: "red",
				              },
				            },
				          },
				          // 地图区域的样式设置
				          itemStyle: {
				            normal: {
				              borderColor: "red",
				              borderWidth: 1,
				              areaColor: 'white'
				            },
				            // 鼠标放上去高亮的样式
				            emphasis: {
				              areaColor: "#389BB7",
				              borderWidth: 0,
				            },
				          },
				        },
				      };
				      // 地图注册，第一个参数的名字必须和option.geo.map一致
				      echarts.registerMap("china",china)
				
				      charts.setOption(option);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
