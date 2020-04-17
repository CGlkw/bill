<template>
	<view>
		<view class="top-wrap">
			<tab ref="tabs" id="category" :tab-data="categoryMenu" :tab-cur-index="tableIndex" :size="tabSize" :scroll="true" @change="toggleCategory">
			</tab>
		</view>
		
		
		<swiper ref="kSwiper" :style="{height:clientHeight +'px'}" :current="categoryCur" :duration="duration" @animationfinish="animationFinish" @transition = "transition">
			<swiper-item >
				<scroll-view :style="{height:clientHeight +'px'}" :scroll-y="true">
					<bill-main type="week"></bill-main>
				</scroll-view>				
			</swiper-item>
			<swiper-item>
				<scroll-view :style="{height:clientHeight +'px'}" :scroll-y="true">
					<bill-main type="month"></bill-main>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view :style="{height:clientHeight +'px'}" :scroll-y="true">
					<bill-main type="year"></bill-main>
				</scroll-view>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script >
	import tab from '@/components/tab/index.vue';
	import billMain from './bill-main/bill-main.vue'
	
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
				swiperOptions: {
					autoplay: 3000,
					speed: 1000,
				  // Some Swiper option/callback...
				}
			}
		},
		watch:{

		},
		created() {
			let s =Math.floor( ( this.windowWidth / 750 ) * this.tabSize );
			this.clientHeight = this.windowHeight - this.CustomBar - s
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
