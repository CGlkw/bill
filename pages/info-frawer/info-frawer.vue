<template>
	<view>
		<uni-drawer :visible="vis" @close="callBack">
			<view style="padding:30rpx;">
				<avatar :size='100'/>
			</view>
			<uni-list>
				<uni-list-item title="首页" :show-arrow="true" @click="vis=false"></uni-list-item>
				<uni-list-item title="记账" :show-arrow="true" @click="to('/pages/bill-add/bill-add')"></uni-list-item>
				<uni-list-item title="账单" :show-arrow="true" @click="to('/pages/bill-list/bill-list')"></uni-list-item>
				
			</uni-list>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from '@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue'
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
			uniDrawer,
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
			to(url){
				this.vis = false
				uni.navigateTo({
					url:url,
					animationType: 'slide-in-right',
					animationDuration: 1000
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
