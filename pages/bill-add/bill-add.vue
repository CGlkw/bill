<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">记账</block>
		</cu-custom>
		<scroll-view :style="{height:clientHeight +'px'}" :scroll-y="true">
			<van-grid class="bill-type-grid"  :column-num="4">
			  <van-grid-item v-for="(item, index) in typeData" :key="item.id" :class="selectIndex === index? 'bill-type-grid-click': ''" @click="chooseType(item.id, index)" >
				  <view slot="icon">
					  <view class="k-bill-iconfont bill-type-icon" :class="item.icon"></view>
				  </view>
				  <view slot="text">
						<view class="bill-type-text" :class="selectIndex === index? 'bill-type-grid-click': ''">
							{{item.typeName}}
						</view>
				  </view>
			  </van-grid-item>
			</van-grid>
		</scroll-view>
		<view class="cu-modal bottom-modal unLockScroll" :class="[billInputShow?'show':'']">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="formSubmit">保存</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view :style="{height: popupHeight +'px'}">
					<bill-input ref="billInput" :keyboardChangeF="keyboardChange" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import { getBillType, getBill } from '@/api/bill.js'
	import { insertBillTable, selectAllBillTable } from '@/db/bill_table.js'
	import BillInput from './components/BillInput.vue'
	import KPopup from '@/components/KPopup/KPopup.vue'
	
	export default {
		components:{
			BillInput,
			KPopup
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
				selectIndex: undefined,
				height:132,
				keyboardHeight:undefined
			};
		},
		computed:{
			popupHeight:{
				get(){
					return this.height + this.keyboardHeight
				},
				set(val){
					console.log(val)
					//this.height = val
				}
			}
		},
		mounted() {
			uni.onKeyboardHeightChange(res => {
				console.log("键盘高度："+res.height)
			  this.keyboardHeight = res.height
			})
		},
		created() {
			this.initTypePiker()
		},
		methods: {
			chooseType(id, index){
				this.selectIndex = index
				this.typeId = id
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
				const result = this.$refs.billInput.getValue()
				result.type = this.typeId
				console.log(JSON.stringify(result))
				
				insertBillTable(result).then(() =>{
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
			
			hideModal(){
				this.billInputShow = false
			},
			keyboardChange(h){
				this.popupHeight = 'height:' + h + 'px'
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
			font-size: 20rpx;
			
		}
		
	}
	.bill-type-grid-click{
		color: #007AFF;
	}
	.unLockScroll{
		top: auto;
	}
</style>
