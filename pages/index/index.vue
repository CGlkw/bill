<template>
	<view class="main">
		<info-frawer :drawerVisible="drawerVisible" :callBack="onInfoDrawerClose"></info-frawer>
		<uni-nav-bar @clickLeft="drawerVisible = true">
			<view class="title">BILL</view>
			<view slot="left">
				<avatar></avatar>
			</view>
			<view slot="right">right</view>
		</uni-nav-bar>
		<view>
			sahdhdhdhdhdhdhdhdfkjdsbf
		</view>
	</view>
	
</template>

<script>
	import infoFrawer from '../info-frawer/info-frawer.vue'
	import uniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue'
	import avatar from 'components/avatar/avatar.vue'
	
	export default {
		components:{
			infoFrawer,
			uniNavBar,
			avatar
		},
		data() {
			return {
				drawerVisible: false,
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
			}
		}
	}
</script>

<style lang="scss">
	.main{
		padding-top:var(--status-bar-height);
	}
	.title{
		margin: 0 auto;
	}
</style>
