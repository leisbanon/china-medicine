<template>
	<view class="search-page flex_start column">
		<view class="search flex__center">
			<input
				class="search__input flex_1"
				id="search__input"
				type="text"
				placeholder="请输入中药名"
				v-model="name"
				@input="onNameInput"
			/>
			
			<!-- <image src="@/static/img/arrow_right_red.png" style="width: 30px;height: 30px;margin-right: 12px;"></image> -->
			<view class="search__add flex_j_center pointer" :tabindex="medicineListPaging.length == 0 ? '0' : false" @click="onCustomAdd">添加</view>
		</view>
		
		<view class="content">
			<view class="item fz16 family_blod flex_between_center" v-for="(name, index) of medicineListPaging" :key="index">
				<view @click="$com.toHref(`/pages/maxDictionary/webview?name=${ name }`)">{{ name }}</view>
				
				<view v-if="formulaList.indexOf(name) == -1" tabindex="0" class="pointer item__add flex__center" style="color: #F82626;" @click.prevent="addFormula(name)">
					<image src="@/static/img/add.png" style="width: 15px;height: 15px;margin-right: 3px;"></image>
					<text style="color: #4e6ef2;">添加</text>
				</view>
				
				<view v-if="formulaList.indexOf(name) != -1" tabindex="0" class="pointer item__add flex__center" style="color: #F82626;" @click.prevent="cancelFormula(name)">
					<image src="@/static/img/cancel.png" style="width: 15px;height: 15px;margin-right: 3px;"></image>
					<text>取消</text>
				</view>
			</view>
		</view>
		
		<view class="footer-pages flex_end" v-if="medicineListPaging.length > 0">
			<view class="button flex_j_center pointer" @click="upPage" v-if="showUpPage">上一页</view>
			<view class="paging flex_j_center family_blod fz16">第{{ form.page + 1}}页</view>
			<view class="button flex_j_center pointer" @click="nextPage" v-if="showNextPage">下一页</view>
		</view>
		
		<view class="formula-list flex_between_center" v-if="formulaList.length > 0">
			<view class="formula flex_1">
				<view style="margin: 8px;">{{ formulaList.join('，') }}</view>
			</view>
			
			<view class="flex_between_center column">
				<view class="insert flex_j_center column fz13 family_blod pointer m-bottom-16" @click="insertAllStar">
					<text>加入</text>
					<text>收藏</text>
				</view>
				
				<view class="insert red flex_j_center column fz13 family_blod pointer" @click="insertAllGroup">
					<text>加入</text>
					<text>验方</text>
				</view>
			</view>
			
		</view>
		
		<confirm-component ref="_confirmComponent" />
		
		<prompt-component ref="_promptComponent" />
	</view>
</template>

<script>
	import databaseUtilMixin from './mixins/database-util.mixin.js'
	import { debounce } from '@/common/libs/util.js'
	
	export default {
		mixins: [databaseUtilMixin],
		data() {
			return {
				name: '',
				
				form: {
					page: 0,
					limit: 5,
				},
				
				medicineList: [], // 中药名称合集
				
				medicineSearchs: [], // 检索列表
				
				formulaList: [], // 加入的配方
			}
		},
		computed: {
			medicineListPaging() {
				let { page, limit } = JSON.parse(JSON.stringify(this.form))
				let s_start = page * limit
				let s_end = limit * (page + 1)
				
				let page_list = this.medicineSearchs.slice(s_start, s_end)
				return page_list
			},
			// 是否显示上一页
			showUpPage() {
				return this.form.page > 0
			},
			// 是否显示下一页
			showNextPage() {
				return this.medicineListPaging.length >= this.form.limit
			}
		},
		mounted() {
			this.$com.showLoading('加载中...')
			this.getAllMedicineNames().then(data => {
				this.medicineList = data
			}).finally(() => {
				this.$com.hideLoading()
			})
			
			this.keyEvent()
			
			this.onNameInput()
		},
		methods: {
			reset() {
				this.formulaList = []
			},
			keyEvent() {
				document.body.addEventListener('keydown', (e) => {
					if(e.keyCode == 13) {
						let __target = e.target
						if(__target.classList.contains('pointer')) {
							__target.click()
							
							this.$com.timer(500).then(() => {
								let __input = document.getElementById("search__input").querySelector('input')
								__input.focus()
								__input.select()
							})
						}
					}
				})	
			},
			onNameInput:debounce(function() {
				const f_data = this.medicineList.filter(name => {
					return this.name && name.indexOf(this.name) != -1
				})
				
				for(let name of f_data) {
					if(name === this.name) {
						let index = f_data.indexOf(this.name)
						f_data.splice(index, 1)
						f_data.unshift(this.name)
						break
					}
				}
				
				this.medicineSearchs = f_data
				this.form.page = 0
			}, 100, false),
			// 上一页
			upPage() {
				this.form.page -= 1
			},
			// 下一页
			nextPage() {
				this.form.page += 1
			},
			// 自定义添加配方
			onCustomAdd() {
				if(!this.name) return
				
				this.formulaList.push(this.name)
			},
			// 添加配方
			addFormula(name) {
				if(!name) return
				
				this.formulaList.push(name)
			},
			// 取消配方
			cancelFormula(name) {
				let index = this.formulaList.indexOf(name)
				this.formulaList.splice(index, 1)
			},
			// 加入收藏
			insertAllStar() {
				let win = this.$refs._confirmComponent.open({
					title: '确认加入收藏'
				})
				
				win.then(async () => {
					let formulaList = this.formulaList
					await this.setFormulaStore(formulaList)
					
					this.$com.toast('收藏成功')
					this.reset()
				})
			},
			// 加入验方
			async insertAllGroup() {
				let win = this.$refs._promptComponent.open({
					title: '请输入验方名称'
				})
				
				win.then((name, close) => {
					let formulaList = this.formulaList
					let n_store = formulaList.filter(name => name != '')
					if(n_store.length == 0) return this.$com.toast('数据为空')
					
					this.DBPut(this.TABLE_GROUP_DATA_NAME, {
						name: name,
						data: n_store
					})
					
					this.$com.toast('加入成功')
					this.reset()
					close()
				})
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
	.pointer {
		cursor: pointer;
	}
	
	.commButton {
		background-color: #4e6ef2;
		width: 80px;
		height: 38px;
		border-radius: 8px;
		color: white;
		font-size: 16px;
		&:active {
			opacity: 0.9;
		}
	}
	
	.search-page {
		padding: 0 18px;
		height: 100%;
		.content {
			overflow: auto;
			margin-bottom: 50px;
			.item {
				height: 55px;
				border-bottom: 1px #DDD solid;
				padding: 0 12px;
			}
		}
		
		.formula-list {
			margin-bottom: 50px;
			height: 150px;
			.formula {
				border: 1px #DDD dashed;
				overflow: auto;
				font-size: 15px;
				min-height: 50px;
				line-height: 25px;
				margin-right: 15px;
				height: 100%;
			}
			.insert {
				border: 2px #4e6ef2 solid;
				width: 52px;
				height: 52px;
				border-radius: 8px;
				white-space: nowrap;
				color: #4e6ef2;
				&.red {
					border-color: rgb(248, 38, 38);
					color: rgb(248, 38, 38);
				}
				&:active {
					opacity: 0.8;
				}
			}
		}
		
		.footer-pages {
			margin-bottom: 50px;
			.button {
				@extend .commButton;
				font-size: 15px;
			}
			.paging {
				padding: 0 24px;
				text-decoration: underline;
			}
		}
		
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
	}
</style>