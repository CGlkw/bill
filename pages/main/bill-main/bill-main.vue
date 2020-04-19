<template>
	<view>
			<k-echarts :option="option" ></k-echarts>
			<button @click="changeOption">更新数据</button>
	</view>
</template>

<script>
	import kEcharts from '@/components/k-echarts/index.vue'
	import { getBillChartDate } from '@/api/bill.js'
	import moment from 'moment'
	
	export default {
		props:{
			type: {
				type: String,   //  week month  year
				default:'week'
			}
		},
		components: {
			kEcharts
		},
		data() {
			return {
				refreshing:false,
				option:{
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
							label: {
								formatter: '{b} \n{c}',
							},
							name: '访问来源',
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
					],
				}
			}
		},
		created() {
			this.initDays()
			this.init() 
			
		},
		methods: {
			initDays(){
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
			},
			onRefresh(){
				
				setTimeout(()=> {
					this.initDays()
					this.init()
					this.refreshing = false
				},500)
			},
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
