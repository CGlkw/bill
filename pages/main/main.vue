<template>
	<view>
		<view class="top-wrap">
			<tab ref="tabs" id="category" :tab-data="categoryMenu" :tab-cur-index="tableIndex" :size="tabSize" :scroll="true" @change="toggleCategory">
			</tab>
		</view>
		
		<swiper :style="{height:clientHeight +'px'}" :current="categoryCur" :duration="duration" @animationfinish="animationFinish" @transition = "transition">
			<swiper-item >
				<scroll-view :style="{height:clientHeight +'px'}" :scroll-y="true">
					<bill-main eid="test2" type="week"></bill-main>
				</scroll-view>				
			</swiper-item>
			<swiper-item>
				<scroll-view :style="{height:clientHeight +'px'}" :scroll-y="true">
					<bill-main eid="test211" type="month"></bill-main>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view :style="{height:clientHeight +'px'}" :scroll-y="true">
					<bill-main eid="test3" type="year"></bill-main>
				</scroll-view>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script >
	import tab from '@/components/tab/index.vue';
	import billMain from './bill-main/index.vue'
	
	export default {
		components:{
			tab,
			billMain
		},
		data() {
			return {
				categoryCur: 0,
				tableIndex: 0,
				duration: 300,
				categoryMenu:['本周','本月','年度总计'],
				changeDx:0,
				clientHeight:500,
				tabSize:80,
			}
		},
		created() {
			const {
				windowHeight,
				windowWidth
			} = uni.getSystemInfoSync();
			let s =Math.floor( ( windowWidth / 750 ) * this.tabSize );
			console.log('tableSize:'+ s)
			this.clientHeight = windowHeight - this.CustomBar - s
		},
		methods: {
			// 顶部tab切换事件
			toggleCategory(e) {
				this.duration = 300
				setTimeout(() => {
					this.categoryCur = parseInt(e.index)
				}, 0);
			},
			// 页面滑动切换事件
			animationFinish(e) {
				this.duration = 300
				setTimeout(() => {
					this.tableIndex = e.detail.current
					
				}, 0);
			},
			transition(e) {
				this.$refs.tabs.scrollByDx(e.detail.dx)
			}
		}
	}
</script>

<style>
.item{
	height: 500px;
}
</style>
