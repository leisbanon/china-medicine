<template>
	<view class="list-page">
		<view class="item fz15 flex_between_center" @click="$com.toHref('/pages/maxDictionary/search')">
			<text>中药大辞典</text>
			<image src="@/static/img/arrow_right.png" style="width: 16px;height: 16px;"></image>
		</view>
		
		<view class="item fz15 flex_between_center" @click="$com.toHref('/pages/maxDictionary/result')">
			<text>中药功效主治查询</text>
			<image src="@/static/img/arrow_right.png" style="width: 16px;height: 16px;"></image>
		</view>
		
		<view class="item fz15 flex_between_center" @click="$com.toHref('/pages/maxDictionary/group')">
			<text>我的验方</text>
			<image src="@/static/img/arrow_right.png" style="width: 16px;height: 16px;"></image>
		</view>
		
		<view class="item fz15 flex_between_center" @click="$com.toHref('/pages/maxDictionary/star')">
			<text>我的收藏</text>
			<image src="@/static/img/arrow_right.png" style="width: 16px;height: 16px;"></image>
		</view>
	</view>
</template>

<script>
	import databaseUtilMixin from './mixins/database-util.mixin.js'
	export default {
		mixins: [databaseUtilMixin],
		data() {
			return {
			}
		},
		onShow() {
			this.$nextTick(() => {
				document.querySelector('[property="og:description"]').setAttribute('content', '中药大辞典')
			})
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.list-page {
		padding: 12px;
		.item {
			height: 60px;
			border-bottom: 1px #DDD solid;
			padding: 0 12px;
		}
	}
</style>