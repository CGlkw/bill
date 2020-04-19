<template>
	<view>
		<view class="cu-modal bottom-modal" :class="[show?'show':'',lockScroll?'':'lockScroll']">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view :style="{height: popupHeight +'px'}">
					<slot></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
			customStyle:{
				type:String,
				default:undefined
			},
			lockScroll:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				popupShow:this.show,
				height:132,
				keyboardHeight: 0
			};
		},
		computed:{
			popupHeight:function(){
				return this.height + this.keyboardHeight
			}
		},
		mounted() {
			console.log(this.popupShow)
			uni.onKeyboardHeightChange(res => {
			  console.log(res.height)
			  this.keyboardHeight = res.height
			})
		},
		methods:{
			hideModal(){
				this.popupShow = false
			}
		}
	}
</script>

<style lang="scss">
.lockScroll{
	top: auto;
}
</style>
