<template>
	<view class="avatar" >
		<image :src="src" :style="{width:size + 'rpx',height:size + 'rpx'}"></image>
	</view>
</template>

<script>
	export default {
		props:{
			size:{
				type:Number,
				default:80
			},
			src:{
				type:String,
				default:'/static/default_avatar.png'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.avatar{
	line-height: 0;
}
</style>
