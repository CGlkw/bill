<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">账单</block>
		</cu-custom>
		<view>
			<s-pull-scroll :header-height='CustomBar' ref="pullScroll" :pullDown="pullDown" :pullUp="loadData">
				<view class="bill-list" v-for=" (val, key) in list" :key="key">
						
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
					
						<view class="cu-item" :class="modalName=='move-box-'+ index + key?'move-cur':''" v-for=" (item, index) in val" :key="item.id"
						@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index + key">
	
							<view class="k-bill-iconfont list_icon" :class="item.icon"></view>
							<view class="content padding-tb-sm">
								<view> {{ item.type }}</view>
								<view class="text-gray text-sm">
									<text class="margin-right-xs"></text> {{ item.remark }}</view>
								<view class="text-gray text-sm">
									<text class="margin-right-xs"></text> {{ item.time }}</view>
							</view>
							<view class="action">
								{{ item.money }}
							</view>
							<view class="move">
								<view class="bg-grey">编辑</view>
								<view class="bg-red" @tap="del(item.id, index, key)">删除</view>
							</view>
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
				if(this.list[key] === undefined){
					this.list[key] = []
				}
				this.list[key].push(data)
				
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
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
	.bill-picker{
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
 .list_icon{
	 font-size: 60rpx;
	 margin-right: 20rpx;
 }
</style>
