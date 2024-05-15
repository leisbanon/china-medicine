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
				<view class="flex_between_center" v-if="isFinish">
					<text class="name family_blod m-right-12" @click="toDetail(item)">{{ index + 1 }}. {{ item.name }}</text>
					
					<view v-if="formulaIsStart(item)" class="flex__center flex_shrink" @click.prevent="cancelFormula(item)">
						<text class="family_blod" style="font-size: 15px;color: #F82626;">取消收藏</text>
						<image src="@/static/img/cancel.png" style="width: 15px;height: 15px;margin-left: 3px;"></image>
					</view>
					
					<view v-else class="flex__center flex_shrink" @click.prevent="addFormula(item)">
						<text class="family_blod" style="font-size: 15px;color: #4e6ef2;">加入收藏</text>
						<image src="@/static/img/add.png" style="width: 15px;height: 15px;margin-left: 3px;"></image>
					</view>
				</view>
				
				<view class="describe fz16 m-top-12 family_medium">
					<view class="type">性味：{{ item.smell }}</view>
					<view class="type">归经：{{ item.viscera }}</view>
					<view class="type flex_start flex_wrap">
						<text class="flex_shrink">主治：</text>
						<text class="flex_1">{{ item.treatment }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<confirm-component ref="_confirmComponent" />
	</view>
</template>

<script>	
	import databaseUtilMixin from './mixins/database-util.mixin.js'
	export default {
		mixins: [databaseUtilMixin],
		data() {
			return {
				isFinish: false,
				
				medicinals: [],
				
				datalist: [],
				
				formulaStore: [],
				
				name: '',
				
				formulaCollect: [], // 我的收藏列表
			}
		},
		onLoad(e) {
			this.name = e.name
			this.load()
		},
		onShow() {
			this.$nextTick(() => {
				document.querySelector('[property="og:description"]').setAttribute('content', '中药功效主治查询')
			})
		},
		methods: {
			async load() {
				await this.init()
				await this.refreshStore()
				this.isFinish = true
			},
			async init() {
				try{
					this.$com.showLoading('加载中...')
					const data = await this.$fetch.medicineTreatment()
					this.medicinals = data
					
					const data__store = await this.$fetch.formulaStore()
					this.formulaStore = data__store
					
					let __search = await this.onSearch()
					if(__search.length == 0) {
						let wind = this.$refs._confirmComponent.open({
							content: '未记录相关中药材，跳转百科查询？'
						})
						
						wind.then(() => {
							this.$com.toHref(`/pages/maxDictionary/webview?name=${ this.name }`)
						})
					}
				} finally {
					this.$com.hideLoading()
				}
			},
			async refreshStore() {
				let store = await this.DBQueryALL(this.TABLE_STAR_DATA_NAME)
				this.formulaCollect = store[0]?.data || []
			},
			async onSearch() {
				let list = []
				if(this.name) {
					let f_data = this.medicinals.filter(item => {
						return item.name.indexOf(this.name) != -1
					})
					list = f_data
				}else {
					list = JSON.parse(JSON.stringify(this.medicinals))
				}
				
				this.datalist = list
				return list
			},
			// 统计全部验方药方总数量【isRepeat 是否去重】
			count__formula_all(isRepeat) {
				let formulaStore = this.formulaStore
				let list_concat = []
				formulaStore.forEach(item => {
					list_concat = [
						...list_concat,
						...item.value,
					]
				})
				
				if(isRepeat === true) {
					return Array.from(new Set(list_concat))
				}else {
					return list_concat
				}
			},
			// 中药名检索
			nameReCall(param_name) {
				const data = this.count__formula_all(true)
				for(let name of data) {
					if(param_name.indexOf(name) != -1) {
						return name
					}
				}
			},
			toDetail(item) {
				let name = this.nameReCall(item.name)
				this.$com.toHref(`/pages/maxDictionary/webview?name=${ name || item.name }`)
			},
			// 加入收藏
			async addFormula(item) {
				let name = this.nameReCall(item.name)
				if(name) {
					await this.setFormulaStore([name])
					this.refreshStore()
				}
			},
			// 取消收藏
			async cancelFormula(item) {
				let name = this.nameReCall(item.name)
				await this.setFormulaStore__cancel(name)
				this.refreshStore()
			},
			// 检查是否已收藏
			formulaIsStart(item) {
				let name = this.nameReCall(item.name)
				let store = this.formulaCollect
				if(store.indexOf(name) != -1) {
					return true
				}else {
					return false
				}
			},
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