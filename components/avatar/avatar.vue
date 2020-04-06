<template>
	<view class="avatar" >
		<image :src="src" :style="{width:size + 'px',height:size + 'px'}"></image>
	</view>
</template>

<script>
	export default {
		props:{
			size:{
				type:Number,
				default:30
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
