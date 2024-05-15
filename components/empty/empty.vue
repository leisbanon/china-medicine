<template>
	<view class="empty-component flex__center column">
		<image src="@/static/img/empty.png" style="width: 160px;height: 160px;"></image>
		<text class="fz13 color_3_3 family_medium">{{ title || '暂无数据' }}</text>
	</view>
</template>

<script>
	export default {
		props: ['title'],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>