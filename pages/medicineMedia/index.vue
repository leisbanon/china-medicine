<template>
	<view class="result-page flex_start column">
		<view class="search flex__center">
			<input
				class="search__input flex_1"
				id="search__input"
				type="text"
				placeholder="请输入中药名"
				v-model="name"
				@input="onSearch"
			/>
			
			<view class="search__add flex_j_center pointer">搜索</view>
		</view>
		
		<view class="item flex_1">
			<view class="item__box" v-for="(item, index) of datalist" :key="index">
				<view class="flex_between_center">
					<text class="name family_blod m-right-12" @click="toDetail(item)">{{ index + 1 }}. {{ item.name }}</text>
					<image src="@/static/img/player.png" @click="toPlayer(item)" style="width: 28px;height: 28px;margin-right: 20px;"></image>
				</view>
				
				<view class="describe fz16 m-top-12 family_medium">
					<view class="type">性味：{{ item.taste }}</view>
					<view class="type flex_start flex_wrap">
						<text class="flex_shrink">主治：</text>
						<text class="flex_1">{{ item.effect }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<confirm-component ref="_confirmComponent" />
	</view>
</template>

<script>	
	export default {
		data() {
			return {
				isFinish: false,
				
				datalist: [],
			}
		},
		onLoad(e) {
			this.name = e.name
			this.load()
		},
		onShow() {
			this.$nextTick(() => {
				document.querySelector('[property="og:description"]').setAttribute('content', '中药解说')
			})
		},
		methods: {
			async load() {
				await this.init()
				this.isFinish = true
			},
			async init() {
				try{
					this.$com.showLoading('加载中...')
					const data = await this.$fetch.medicineMedias()
					this.datalist = data
				} finally {
					this.$com.hideLoading()
				}
			},
			toDetail(item) {
				window.open(item.baike, item.baike)
			},
			toPlayer(item) {
				window.open(`https://${ item.video }`, item.video)
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
</style>

<style lang="scss" scoped>
	.pointer {cursor: pointer;}
	.commButton {background-color: #4e6ef2;width: 80px;height: 38px;border-radius: 8px;color: white;font-size: 16px;&:active {opacity: 0.9;}}
	
	.result-page {
		padding: 0px 16px;
		height: 100%;
		.search {
			margin: 12px 0px;
			&__input {
				height: 38px;
				background-color: #F5F5F5;
				padding: 0 12px;
				border-radius: 8px;
				margin-right: 58rpx;
			}
			&__add {
				@extend .commButton;
			}
		}
		
		.item {
			// border: 1px #0F0 solid;
			overflow: auto;
			&__box {
				border-bottom: 1px #DDD solid;
				padding: 12px 0;
				.name {
					font-size: 18px;
					text-decoration: underline;
				}
				.describe {
					line-height: 25px;
					color: #000000;
					.type {
						margin-left: 20px;
						line-height: 20px;
						&:not(:last-child) {
							margin-bottom: 8px;
						}
					}
				}
			}
		}
	}
</style>