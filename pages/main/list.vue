<template>
	<view class="list-page">
		<view class="item fz16 family_blod flex_between_center" v-for="(item, index) of list" :key="index" @click="onPlay(item)">
			<text>{{ index + 1 }}. 《{{ item.name }}》</text>
			<image src="@/static/img/arrow_right.png" style="width: 16px;height: 16px;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				const datalist = await this.$fetch.uNHXMedia()
				this.list = datalist
			},
			onPlay(item) {
				let url = encodeURIComponent(item.url)
				let name = encodeURIComponent(item.name)
				let path = `/pages/main/player?url=${ url }&name=${ name }`
				this.$com.toHref(path)
			}
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