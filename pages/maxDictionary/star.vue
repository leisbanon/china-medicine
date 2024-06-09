<template>
	<view class="star-page">
		<view class="title family_blod">【我的中药收藏记录】</view>
		
		<view class="content">
			<text class="name" v-for="(name, index) of starStore" :key="index" @click="toDetail(name)">{{ name }}</text>
		</view>
	</view>
</template>

<script>
	import databaseUtilMixin from './mixins/database-util.mixin.js'
	export default {
		mixins: [databaseUtilMixin],
		data() {
			return {
				starStore: []
			}
		},
		onShow() {
			this.$nextTick(() => {
				document.querySelector('[property="og:description"]').setAttribute('content', '中药收藏记录')
			})
			
			this.init()
		},
		methods: {
			async init() {
				const store = await this.DBQueryALL(this.TABLE_STAR_DATA_NAME)
				this.starStore = store[0]?.data || []
			},
			async toDetail(name) {
				let data = await this.$fetch.medicineTreatment()
				let f_data = data.filter(item => {
					return item.name.indexOf(name) != -1
				})
				
				if(f_data.length > 0) {
					this.$com.toHref(`/pages/maxDictionary/result?name=${ name }`)
				}else {
					window.open(`https://baike.baidu.com/item/${ name }`, `__${ name }`)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.star-page {
		padding: 12px;
		.title {
			font-size: 18px;
		}
		
		.content {
			margin-top: 25px;
			.name {
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
	}
</style>