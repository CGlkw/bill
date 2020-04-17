<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">记账</block>
		</cu-custom>
		
		<van-grid class="bill-type-grid"  :column-num="4">
		  <van-grid-item v-for="(item, index) in typeData" :key="item.id" :class="selectIndex === index? 'bill-type-grid-click': ''" @click="chooseType(item.id, index)" >
			  <template slot="icon">
				  <view class="k-bill-iconfont bill-type-icon" :class="item.icon"></view>
			  </template>
			  <template slot="text">
			  		<view class="bill-type-text">
						{{item.typeName}}
					</view>
			  </template>
		  </van-grid-item>
		</van-grid>
		<van-popup 
			:lock-scroll="false" 
			:close-on-click-overlay="false" 
			:overlay="false" 
			position="bottom" 
			v-model="billInputShow"
		
			>
			<bill-input />
		</van-popup>
		
		
	</view>
</template>

<script>
	import moment from 'moment'
	import { getBillType, getBill } from '@/api/bill.js'
	import { insertBillTable, selectAllBillTable } from '@/db/bill_table.js'
	import BillInput from './components/BillInput.vue'
	
	
	export default {
		components:{
			BillInput
		},
		data() {
			return {
				billInputShow:false,
				index: -1,
				type:'',
				typeId: undefined,
				typeArray: [],
				typeData:[],
				date: moment(new Date()).format('YYYY-MM-DD'),
				objectMultiArray: [],
				textareaAValue: '',
				money: undefined,
				modal:false,
				modalContext:'',
				logs:[],
				selectIndex: undefined
			};
		},
		created() {
			this.initTypePiker()
		},
		methods: {
			chooseType(id, index){
				this.selectIndex = index
				this.billInputShow = true
			},
			initTypePiker(){
				getBillType().then(data => {
					this.typeData = data
					this.modal = true
					this.logs.push('billType查询成功：' + JSON.stringify(data))
					data.forEach((v, i) => {
						this.typeArray.push(v.typeName)
					})
					this.type = data[0].typeName
					this.typeId = data[0].id
				})
			},
			formSubmit: function(e) {
				console.log({type:this.typeId, remark:this.textareaAValue, time:this.date, money:this.money})
				
				insertBillTable({type:this.typeId, remark:this.textareaAValue, time:this.date, money:this.money}).then(() =>{
					selectAllBillTable().then(data => {
						this.modal = true
						this.logs.push('bill添加成功：' + JSON.stringify(data))
					})
				})
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			MultiChange(e) {
				this.type = this.typeData[e.detail.value].typeName
				this.typeId = this.typeData[e.detail.value].id
			},
			
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			show(e){
				this.date = e.detail.value
				
				console.log(this.date)
			},
			ehangeMoney(e){
				this.money = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(2em + 15px);
	}
	.bill-type-grid{
		color: $uni-text-color;
		.bill-type-icon{
			font-size: 60rpx;
			
		}
		.bill-type-text{
			font-size: 10rpx;
			
		}
		
	}
	.bill-type-grid-click{
		color: #007AFF;
	}
	
</style>
