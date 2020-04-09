<template>
	<view >
		<view class="cu-modal drawer-modal justify-start" :class="vis ?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="{paddingTop:StatusBar + 'px'}">
				<view style="padding:30rpx;">
					<avatar :size='120'/>
				</view>
				<view class="cu-list menu sm-border">
					<view class="cu-item arrow" @tap="hideModal">
						<view class="content">
							<text class="text-grey">首页</text>
						</view>
					</view>
					<view class="cu-item arrow" @tap="to('/pages/bill-add/bill-add')">
						<view class="content">
							<text class="text-grey">记账</text>
						</view>
					</view>
					<view class="cu-item arrow" @tap="to('/pages/bill-list/bill-list')">
						<view class="content">
							<text class="text-grey">账单</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import avatar from 'components/avatar/avatar.vue'
	import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue"
	import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue"

	export default {
		props:{
			drawerVisible:{
				type: Boolean,
				default:false
			},
			callBack:{
				type:Function,
				default:undefined
			}
		},
		components:{
			avatar,
			uniList,
			uniListItem
		},
		watch:{
			drawerVisible(){
				this.vis = this.drawerVisible
			}
		},
		data() {
			return {
				vis:false
			};
		},
		methods:{
			hideModal(e) {
				this.vis = false
				this.callBack()
			},
			to(url){
				this.vis = false
				this.callBack()
				uni.navigateTo({
					url:url,
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			}
		}
	}
</script>

<style lang="scss">
.main{
	padding-top:var(--status-bar-height);
}
</style>
