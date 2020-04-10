<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" :id="eid" class="echarts"></view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
		<view> {{ option  }}</view>
	</view>
</template>

<script>
	export default {
		props:{
			eid:{
				type:String,
				default:'echarts'
			},
			option: {
				type: Object,
				default: undefined
			}
		},
		data() {
			return {
				kEcharts: undefined,
			}
		},
		watch:{

		},
		methods: {
			onViewClick(options) {
				console.log(options)
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let iecharts
	export default {

		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				iecharts = echarts.init(document.getElementById(this.eid))
				// 观测更新的数据在 view 层可以直接访问到
				iecharts.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				if(iecharts !== undefined){
					iecharts.setOption(newValue)
					
				}
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
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

	.echarts {
		margin-top: 100px;
		width: 100%;
		height: 300px;
	}
</style>
