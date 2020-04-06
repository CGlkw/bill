<template>
	<view>
		<view class="top-wrap">
			<tab id="category" :tab-data="categoryMenu" :tab-cur-index="tableIndex" :size="80" :scroll="true" @change="toggleCategory" :changeDx="changeDx">
			</tab>
		</view>
		
		<swiper :current="categoryCur" :duration="duration" @animationfinish="animationFinish" @transition = "transition">
			<swiper-item>
				111111
			</swiper-item>
			<swiper-item>
				22222
			</swiper-item>
			<swiper-item>
				333333
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
	import tab from '@/components/tab/index.vue';

	
	export default {
		components:{
			tab
		},
		data() {
			return {
				categoryCur: 0,
				tableIndex: 0,
				duration: 300,
				categoryMenu:['本周','本月','年度'],
				changeDx:0
			}
		},
		onReady() {
		        
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
				this.changeDx = e.detail.dx
			}
		}
	}
</script>

<style>

</style>
