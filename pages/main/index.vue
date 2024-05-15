<template>
	<view class="main-page">
		<u-album class="__u-album" :urls="images" multipleSize="300" space="24"></u-album>
		
		<view class="describe fz13 family_medium color_3 m-top-24 flex_start column">
			<text class="family_blod m-bottom-12 fz16">中医鬼才倪海厦</text>
			<text>倪海厦（1954年-2012年），生于中国台湾，祖籍瑞安市林川镇岭下村，美国中医师，中医学博士。倪海厦在美国行医逾二十年，曾任美国加州中医药大学博士指导教授、美国汉唐中医学院院长、佛罗里达州政府卫生厅厅长等职务。2012年，倪海厦因病去世，享年59岁。</text>
			<text>1980年，倪海厦随家人移民到美国佛罗里达州。在那里，他开设了汉唐中医诊所，开始了在美国的行医之路。</text>
			<text>倪海厦的一生确实堪称神奇，他不仅在中医领域有着深厚的造诣，还精通易理、擅长占卜等。</text>
			<text>他成功地将中医推向了世界，治愈了许多被西医认为不治之症的患者，让很多西方人重新认识了中医。</text>
			<text>他的临床功力深厚，不仅精通经典中医理论，还擅长采用现代科学技术研究中药方剂。他的治疗方法注重个性化，针对每位患者的个体差异制定治疗方案。</text>
		</view>
		
		<view class="entry flex_between_center" @click="toList">
			<text>观看他的视频</text>
			<image src="@/static/img/arrow_right_red.png" style="width: 30px;height: 30px;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images: [
					require('@/static/img/h_1.png'),
					require('@/static/img/h_2.png'),
				]
			}
		},
		methods: {
			toList() {
				this.$com.toHref('/pages/main/list')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-page {
		padding: 24px;
		/deep/ .__u-album {
			.u-album__row {
				justify-content: space-between;
			}
		}
		
		.describe {
			text {
				margin-bottom: 8px;
				line-height: 18px;
			}
		}
		
		.entry {
			border: 2px #F82626 solid;
			height: 60px;
			margin-top: 12px;
			padding: 0 20px;
			border-radius: 100px;
			font-weight: bold;
			color: #F82626;
			&:active {
				opacity: 0.55;
			}
		}
	}
</style>