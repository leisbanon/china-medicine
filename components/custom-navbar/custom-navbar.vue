<template>
	<view class="custom-navbar">
		<u-navbar
			v-bind="$attrs"
			v-on="$listeners"
			:title="title"
			:autoBack="autoBack"
			:placeholder="placeholder"
			:fixed="true"
			:titleStyle="titleStyle"
		>
			<view class="__left" slot="left">
				<image v-if="backwhite" src="@/static/img/head_back_white.png" mode="widthFix" style="width: 20px;"></image>
				<image v-else src="@/static/img/headBack.png" mode="widthFix" style="width: 20px;"></image>
			</view>
			
			<view class="__right" slot="right">
				<slot name="right"></slot>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			autoBack: {
				type: Boolean,
				default: true
			},
			placeholder: {
				type: Boolean,
				default: true
			},
			backwhite: {
				type: Boolean,
				default: false,
			},
			titleColor: '',
		},
		data() {
			return {
				titleStyle: {
					fontSize: '15px',
					color: this.titleColor ? this.titleColor : '#333333',
					fontFamily: 'PingFang Bold',
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.custom-navbar {
	}
</style>