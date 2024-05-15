<template>
	<view class="webview-baike">
		<web-view class="__webview" :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
			}
		},
		onLoad(e) {
			let name = e.name
			this.src = `https://baike.baidu.com/item/${ name }`
		},
	}
</script>

<style lang="scss" scoped>
	.webview-baike {
		.__webview {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}
</style>