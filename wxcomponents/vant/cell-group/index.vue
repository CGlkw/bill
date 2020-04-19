<template>
<uni-shadow-root class="vant-cell-group-index"><view class="van-cell-group__title">
	<block v-if="title">{{ title }}</block>
    <slot v-else name="title"></slot>
</view>
<view :class="'custom-class van-cell-group '+(border ? 'van-hairline--top-bottom' : '')">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant/cell-group/index'
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        title: String,
        border: {
            type: Boolean,
            value: true
        }
    }
});
export default global['__wxComponents']['vant/cell-group/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-cell-group__title{padding:16px 16px 8px;padding:var(--cell-group-title-padding,16px 16px 8px);font-size:14px;font-size:var(--cell-group-title-font-size,14px);line-height:16px;line-height:var(--cell-group-title-line-height,16px);color:#969799;color:var(--cell-group-title-color,#969799)}
</style>