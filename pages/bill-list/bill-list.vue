<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">账单</block>
		</cu-custom>
		
		
		<view>
			<s-pull-scroll :header-height='CustomBar' ref="pullScroll" :pullDown="pullDown" :pullUp="loadData">
				<view  class="bill-list" v-for=" (val, key) in list" :key="key">
						
					<view class="bill-date" style="height: 40px;">
						<picker mode="date" fields="month" :value="key" >
							<button class="cu-btn sm round line-gray" >
								<view class="picker" >
									{{ key }}
								</view>
							<text class="cuIcon-unfold"></text>
							</button>
						</picker>
					</view>
					
					<view class="cu-list menu sm-border" >
						<view  class="bill-list" v-for=" (v, k) in val" :key="k">
							
							<van-cell-group :border="true" >
								<template slot="title">									
									<view class="bill-date-time">
										<view class="title">
											{{ k }}
										</view>
										<view class="right">
											支出:
										</view>
									</view>
								</template>
								<van-swipe-cell class="" v-for=" (item, index) in v" :key="item.id">
									<van-cell :title="item.type" :value="item.money" >
										<template slot = "icon">
											<view class="k-bill-iconfont list_icon" :class="item.icon"></view>
										</template>
									</van-cell>
									
									<template slot = "right">
										<van-button square type="primary" text="编辑" />
										<van-button square type="danger" @tap="del(item.id, index, key)" text="删除" />
									</template>
								</van-swipe-cell>
							</van-cell-group>
						</view>
					</view>
					
				</view>
			</s-pull-scroll>
		</view>
	</view>
</template>

<script>
	import sticky from '@/components/sticky/sticky.vue'
	import moment from 'moment'
	import sPullScroll from '@/components/s-pull-scroll/index.vue';
	import { getBillType, getBill, delB } from '@/api/bill.js'
	
	export default {
		components:{
			sticky,
			sPullScroll
		},
		data() {
			return {
				listCount: 0,
				list:{
					
				},
				
				billType:undefined,
				listTouchStart : 0,
				listTouchDirection: null,
				modalName: null,
			}
		},
		onLoad () {
			this.refresh();
			this.billType = getBillType().then((data) => {
				this.billType = data
			})
		},
		methods: {
			refresh () {
			  this.$nextTick(() => {
				this.$refs.pullScroll.refresh();
			  });
			},
			pullDown (pullScroll) {
			  setTimeout(() => {
				this.loadData(pullScroll);
			  }, 200);
			},
			loadData (pullScroll) {
			  setTimeout(() => {
				if (pullScroll.page == 1) {
				  this.list = {};
				  this.listCount = 0
				}
				getBill({pageNum:pullScroll.page}).then((data) => {
					
					if(data.length === 0){
						pullScroll.finish();
					}else{
						data.forEach((v, i) => {
							this.listCount ++
							this.push(v)
						})
						pullScroll.success();
					}
					this.$forceUpdate();
				})
			  }, 500);
				
			},
			del(id, index, key){
				delB(id).then(() => {
					this.list[key].splice(index, 1)
					this.$forceUpdate();
				})
			},
			push(data){
				const key = moment(data.time, "YYYY-MM-DD").format('YYYY-MM');
				const time_key = moment(data.time, "YYYY-MM-DD").format('MM月DD日 dddd');
				
				if(this.list[key] === undefined){
					this.list[key] = {}
				}
				if(this.list[key][time_key] === undefined){
					this.list[key][time_key] = []
				}
				this.list[key][time_key].push(data)
				
			},
		
		}
	}
</script>

<style lang="scss">
.bill-date{
	position: sticky;
	top: 0px;
	z-index: 80;
	background-color: #dfdfdf;
	padding-top: 8px;
	.bill-picker {
		margin-left: 30px;
		width: 70px;
		height: 20px;
		background-color: #FFF;
		border-radius: 10px;
		border: 1px solid #c7c7c7;
		text-align: center;
		line-height: 30px;
	}
	.cu-btn{
		background-color: #FFF;
		margin-left: 30px;
	}
}
.bill-date-time{
	font-size: 20rpx;
	.title{
		display: inline-block;
	}
	.right{
		display: inline-block;
		float: right;
	}
}
 .list_icon{
	 font-size: 50rpx;
	 margin-right: 20rpx;
 }
</style>
