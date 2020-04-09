<template>
	<view>
		
		<info-frawer :drawerVisible="drawerVisible" :callBack="onInfoDrawerClose"></info-frawer>
		<view>
			<view class="cu-bar bg-gradual-blue search" :style="[{height:CustomBar + 'px',paddingTop:StatusBar + 'px'}]">
				<view >
					<view @tap="drawerVisible = true">
						<uni-icons class="info-list" type="list" size="30" color="#d3d3d3"></uni-icons>
						<view class="cu-avatar round info-avatar" :style="{backgroundImage : 'url('+ avatarImg +')'}" >
							
						</view>
					</view>
					
					<view class="content" :style="{top:StatusBar + 'px'}">
						账单
					</view>
				</view>
			</view>
		</view>
		
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
</template>

<script>
	import infoFrawer from '../info-frawer/info-frawer.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import avatar from '@/components/avatar/avatar.vue'
	import mainView from '../main/main.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"

	export default {
		components:{
			infoFrawer,
			uniNavBar,
			avatar,
			mainView,
			uniFab,
			uniIcons
		},
		data() {
			return {
				drawerVisible: false,
				pattern: {
					color:'#3c3e49',
					selectedColor:'#007AFF',
					backgroundColor: '#ffffff',
					buttonColor: '#007AFF'
				},
				avatarImg: '/static/default_avatar.png'
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
	.info-list{
		position: absolute;
		left: -18px;
	}
	.info-avatar{
		margin-left: 20px;
	}
</style>
