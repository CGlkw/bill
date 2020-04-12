<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts.bind(this)" :id="eid" class="echarts"></view>
		<button @click="changeOption">更新数据</button>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { getBillChartDate } from '@/api/bill.js'
	import moment from 'moment'
	
	export default {
		props:{
			eid:{
				type:String,
				default:'echarts'
			},
			type: {
				type: String,   //  week month  year
				default:'week'
			}
		},
		data() {
			return {
				days: 7,
				ieacharts: undefined,
				option: {
					title: {
						text: '消费',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: []
					},
					series: [
						{
							name: '访问来源',
							label: {
								formatter: '{b} \n{c}',
							},
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [
							
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
			}
		},
		onLoad() {
			this.init()
		},
		created() {
			switch(this.type){
				case 'week':
					this.days = 7
					break;
				case 'month':
					this.days = 30
					break;
				case 'year':
					this.days = 365
					break;
			}
			this.init() 
		},
		methods: {
			changeOption() {
				this.days++ 
				this.init()
			},
			
			init(){
				
				let startTime = moment().subtract(this.days, 'days').format("YYYY-MM-DD")
				let endTime = moment(new Date()).format("YYYY-MM-DD")
				getBillChartDate({startTime:startTime, endTime: endTime}).then(data =>{
					this.optionData(data)
				})
			},
			optionData(data){
				let legendData = []
				let seriesData = {}
				
				data.forEach((v, i) => {
					let type = v.type
					if(legendData.indexOf(type) < 0){
						legendData.push(type)
					}
					if(seriesData[type] === undefined){
						seriesData[type] = parseFloat(v.money)
					}else {
						seriesData[type] = parseFloat((seriesData[type] + parseFloat(v.money)).toFixed(2))
					}
				})
			
				this.option.legend.data = legendData
				this.option.series[0].data = []
			
				
				for(let key in seriesData){
					this.option.series[0].data.push({
						value: seriesData[key], name: key
					})
				}
				
			},
			onViewClick(options) {
				console.log(options)
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let ieacharts ={
		
	}
	
	
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
				ieacharts[this.eid] = echarts.init(document.getElementById(this.eid))
				// 观测更新的数据在 view 层可以直接访问到
				ieacharts[this.eid].setOption(this.option)
		
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				if(ieacharts[this.eid] !== undefined){
					ieacharts[this.eid].setOption(newValue)
					
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
