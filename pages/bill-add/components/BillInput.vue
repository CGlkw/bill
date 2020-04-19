<template>
	<view ref="bilInput">
		<van-cell center>
		  <template slot = "icon">
		    <van-icon name="arrow-left" @click="subDate" style="padding-left: 60px;padding-right: 20px;" />
		  </template>
		  <template slot = "title"  >
		    
			<view @click="show = true" style="text-align: center;">
				<!-- {{date}} -->
				<picker mode="date" fields="day" :value="date" @change="dateChange" >
					
					<view class="picker" >
						{{ date }}
					</view>
					
				</picker>
			</view>
		  </template>
		  <template slot = "right-icon">
		    <van-icon name="arrow"  @click="addDate" style="padding-right: 60px;padding-left: 20px;" />
		  </template>
		</van-cell>
		
		<van-field :value="money" placeholder="金额" type="number" label="金额" :hold-keyboard="true" :adjust-position="false" @input="moneyChange" />
		<van-field :value="remark" placeholder="备注" label="备注" :adjust-position="false" :hold-keyboard="true"  @input="remarkChange" />
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		props:{
			keyboardChangeF:{
				type:Function,
				default:undefined
			}
		},
		data(){
			return {
				money:null,
				remark:'',
				show:false,
				currentDate:moment(new Date()).format('YYYY-MM-DD').valueOf(),
				date: moment(new Date()).format('YYYY-MM-DD'),
				minDate:moment('1970-01-01', 'YYYY-MM-DD').toDate().valueOf(),
				maxDate:new Date().valueOf(),
			}
		},
		computed:{
			defaultDate:function(){
				let date = moment(this.date).toDate().valueOf()
				return date					
			}
		},
		mounted() {
			let hei = this.$refs.bilInput
			console.log(hei)
		},
		
		methods:{
			subDate(){
				this.date = moment(this.date, 'YYYY-MM-DD').subtract(1, 'days').format("YYYY-MM-DD")
			},
			addDate(){
				this.date = moment(this.date, 'YYYY-MM-DD').subtract(-1, 'days').format("YYYY-MM-DD")
			},
			onSelect(date) {
			  this.show = false;
			  this.date = moment(date).format('YYYY-MM-DD')
			},
			dateChange(e){
				this.date = e.detail.value
			},
			moneyChange(e){
				this.money = e.detail
			},
			remarkChange(e){
				this.remark = e.detail
			},
			keyboardheightchange(e){
				console.log(JSON.stringify(e.detail))
				this.keyboardChangeF(e.detail.height + 132)
			},
			closeKeyboard(){
				this.keyboardChangeF(132)
			},
			getValue(){
				return{money: this.money, remark: this.remark, time: this.date}
			}
		}
		
	}
</script>

<style lang="scss">
	.date-hide{
		position: absolute;
		left: 50px;
		transform: all 1s;
	}
</style>
