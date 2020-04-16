<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">记账</block>
		</cu-custom>
		<form @submit="formSubmit" @reset="formReset">
			<view class="cu-form-group">
				<view class="title">日期</view>
				<picker v-model="date" mode="date" :value="date" @change="show">
					<view class="picker" >
						{{date}}
					</view>
				</picker>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">类型</view>
				<picker mode="selector" @change="MultiChange"  :value="0" :range="typeArray">
					<view class="picker">
						{{ type }}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">金额</view>
				<input placeholder="金额" type="number" :value="money" @input="ehangeMoney"></input>
			</view>
			<!-- #endif -->
			
		
			<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
			<view class="cu-form-group">
				<view class="title">备注</view>
				
				<textarea maxlength="-1"  @input="textareaAInput" v-model="textareaAValue" placeholder="多行文本输入框"></textarea>
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" class="cu-btn bg-blue margin-tb-sm lg">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
		
		<view v-show="modal">
			<view> log:</view>
			<view v-for="item in logs" :key="item"> {{ item }}</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import { getBillType, getBill } from '@/api/bill.js'
	import { insertBillTable, selectAllBillTable } from '@/db/bill_table.js'
	
	export default {
		data() {
			return {
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
				logs:[]
			};
		},
		created() {
			this.initTypePiker()
		},
		methods: {
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

<style>
	.cu-form-group .title {
		min-width: calc(2em + 15px);
	}
</style>
