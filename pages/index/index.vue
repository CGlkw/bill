<template>
	<view>
		<view class="status-bar"></view>
		<view>
			<info-frawer :drawerVisible="drawerVisible" :callBack="onInfoDrawerClose"></info-frawer>
			<uni-nav-bar @clickLeft="drawerVisible = true" background-color="#f8f8f8" :shadow = 'false'>
				<view class="title">BILL</view>
				<view slot="left">
					<avatar></avatar>
				</view>
				<view slot="right">right</view>
			</uni-nav-bar>
			<view>
				<mainView></mainView>
			</view>
			<uni-fab
				:pattern="pattern"
				horizontal="right"
				:popMenu = 'false'
				@fabClick="addBill"
			></uni-fab>
		</view>
	</view>
</template>

<script>
	import infoFrawer from '../info-frawer/info-frawer.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import avatar from '@/components/avatar/avatar.vue'
	import mainView from '../main/main.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	
	export default {
		components:{
			infoFrawer,
			uniNavBar,
			avatar,
			mainView,
			uniFab
		},
		data() {
			return {
				drawerVisible: false,
				pattern: {
					color:'#3c3e49',
					selectedColor:'#007AFF',
					backgroundColor: '#ffffff',
					buttonColor: '#007AFF'
				}
			}
		},
		onLoad() {

		},
		methods: {
			openInfoDrawer(){
				this.drawerVisible = true
			},
			onInfoDrawerClose(){
				this.drawerVisible = false
			},
			addBill(){
				uni.navigateTo({
					url:'/pages/bill-add/bill-add',
					animationType: 'slide-in-right',
					animationDuration: 300
				})
			}
		}
	}
</script>

<style lang="scss">
	.status-bar{
		width: 100%;
		height: var(--status-bar-height);
		background-color: $uni-bg-color-grey;
	}
	.title{
		margin: 0 auto;
	}

</style>
