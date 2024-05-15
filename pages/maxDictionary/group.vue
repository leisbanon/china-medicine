<template>
	<view class="list-page flex_start column">
		<view class="formula-count flex_end">
			<view class="pointer commButton flex_j_center family_blod" @click.prevent="count__formula_taste_number">味方统计</view>
		</view>
		
		<view class="item-container flex_1">
			<view class="item flex_shrink fz16 family_blod flex_between_center" v-for="(item, index) of list" :key="`${ item.name }__${ index }`" @click="$refs._formulaInfo.open(item)">
				<text>{{ `${ index + 1 }. 《${ item.name }》` }}</text>
				<image src="@/static/img/arrow_right.png" style="width: 16px;height: 16px;"></image>
			</view>
			
			<formula-info ref="_formulaInfo" @change="init" />
			
			<formula-taste-number ref="_formulaTasteNumber" />
		</view>
	</view>
</template>

<script>
	import formulaInfo from './components/formula-info.vue'
	import formulaTasteNumber from './components/formula_taste_number.vue'
	
	export default {
		components: {
			formulaInfo,
			formulaTasteNumber
		},
		data() {
			return {
				list: []
			}
		},
		onShow() {
			this.$nextTick(() => {
				document.querySelector('[property="og:description"]').setAttribute('content', '验方精选')
			})
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				let list = await this.DBQueryALL(this.TABLE_GROUP_DATA_NAME)
				let n_list = list.map(item => {
					return {
						name: item.name,
						value: item.data
					}
				})
				this.list = n_list
			},
			// 1. 统计味方在全部验方中出现的频次，排序
			async count__formula_taste_number() {
				let v_inrepeat = await this.count__formula_all(true) // 去重
				let v_unrepeat = await this.count__formula_all(false) // 不去重
				
				console.log('v_inrepeat => ', v_inrepeat.length)
				console.log('v_unrepeat => ', v_unrepeat.length)
				
				let listCount = []
				for(let inname of v_inrepeat) {
					let count = v_unrepeat.filter(unname => inname == unname).length
					
					listCount.push({
						name: inname,
						count: count
					})
				}
				
				listCount.sort((v1, v2) => {
					return v2.count - v1.count
				})
				
				this.$refs._formulaTasteNumber.open(listCount)
				console.log(listCount)
				return listCount
			},
			// 统计全部验方药方总数量【isRepeat 是否去重】
			async count__formula_all(isRepeat) {
				let list_concat = []
				this.list.forEach(item => {
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
		border: 2px #4e6ef2 solid;
		color: #4e6ef2;
		height: 38px;
		padding: 0 12px;
		border-radius: 8px;
		font-size: 16px;
		&:active {
			opacity: 0.8;
		}
	}
	
	.list-page {
		height: 100%;
		.item-container {
			padding: 12px;
			overflow: auto;
			.item {
				height: 60px;
				border-bottom: 1px #DDD solid;
				padding: 0 12px;
			}
		}
		
		.formula-count {
			padding: 12px;
			margin: 0 12px;
			border-bottom: 1px #DDD solid;
		}
		
	}
</style>