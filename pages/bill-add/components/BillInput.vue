<template>
	<view>
		<van-cell center>
		  <template slot = "icon">
		    <van-icon name="arrow-left" @click="subDate" style="padding-left: 60px;padding-right: 20px;" />
		  </template>
		  <template slot = "title"  >
		    
			<view @click="show = true" style="text-align: center;">
				{{date}}
			</view>
		  </template>
		  <template slot = "right-icon">
		    <van-icon name="arrow"  @click="addDate" style="padding-right: 60px;padding-left: 20px;" />
		  </template>
		</van-cell>
		<van-popup
			position="bottom" 
			v-model="show"
			>
			<van-datetime-picker
			  v-model="defaultDate"
			  type="date"
			  :min-date="minDate"
			  :max-date="maxDate"
			/>
		</van-popup>
		<van-field v-model="number" placeholder="金额" type="number" label="金额" :autofocus="true"/>
		<van-field v-model="text" placeholder="备注" label="备注" />
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		props:{
			
		},
		data(){
			return {
				number:null,
				text:'',
				show:false,
				currentDate:moment(new Date()).format('YYYY-MM-DD'),
				date: moment(new Date()).format('YYYY-MM-DD'),
				minDate:moment('1970-01-01', 'YYYY-MM-DD').toDate(),
				maxDate:new Date()
			}
		},
		computed:{
			defaultDate:function(){
				let date = moment(this.date, 'YYYY-MM-DD').toDate()
				return date					
			}
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
		}
		
	}
</script>

<style>
</style>
