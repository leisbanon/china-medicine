<template>
	<view class="list-page">
		<view class="item fz15 flex_between_center" @click="$com.toHref('/pages/main/index')">
			<text>倪海厦</text>
			<image src="@/static/img/arrow_right.png" style="width: 16px;height: 16px;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		mounted() {
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