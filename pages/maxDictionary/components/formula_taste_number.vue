<template>
	<u-popup
		:show="show"
		:overlayOpacity="0.33"
		round="15px"
		@close="close"
	>
		<view class="popup-container flex_start column">
			<view class="header flex_shrink family_blod fz16 flex_j_center">
				<view class="header__back" @click="close"></view>
				<text class="header__name color_3">味方统计</text>
			</view>
			
			<view class="item">
				<text class="label" v-for="(item, index) of datalist" :key="index" @click="$com.toHref(`/pages/maxDictionary/result?name=${ item.name }`)">
					<text>{{ `${ item.name } (${ item.count }次)` }}</text>
				</text>
			</view>
		</view>
	</u-popup>
	
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				
				datalist: []
			}
		},
		methods: {
			close() {
				this.show = false
			},
			open(data) {
				this.datalist = data || []
				this.show = true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.popup-container {
		height: 70vh;
		.item {
			// border: 1px #F00 solid;
			padding: 12px;
			overflow: auto;
			.label {
				// border: 1px #DDD solid;
				color: #3951b3;
				margin-right: 12px;
				font-size: 18px;
				padding: 0px 12px;
				text-decoration: underline;
				margin-bottom: 12px;
				display: inline-block;
				white-space: nowrap;
				&:active {
					opacity: 0.66;
				}
			}
		}
		
		.header {
			border-bottom: 1px #DDD solid;
			height: 50px;
			position: relative;
			font-size: 16px;
			&__back {
				// border: 1px #F00 solid;
				width: 33px;
				height: 33px;
				background-image: url('@/static/img/arrow_left.png');
				background-size: 18px 18px;
				background-repeat: no-repeat;
				background-position: center center;
				position: absolute;
				left: 16px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
</style>