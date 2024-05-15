export default {
	data() {
		return {
			data__1: null,
			data__2: null,
			data__3: null,
			data__4: null,
		}
	},
	methods: {
		// 设置收藏中药库
		setFormulaStore(formulaList) {
			return new Promise(async (resolve, reject) => {
				let store = await this.DBQueryALL(this.TABLE_STAR_DATA_NAME)
				let list = store[0]?.data || []
				let n_store = [...list, ...formulaList].filter(name => name != '')
				let n_store_from = Array.from(new Set(n_store))
				if(n_store_from.length == 0) return this.$com.toast('数据为空')
				
				this.DBPut(this.TABLE_STAR_DATA_NAME, { 
					name: '我的收藏',
					data: n_store_from,
				})
				resolve()
			})
		},
		// 取消收藏的中药库指定名称
		async setFormulaStore__cancel(name) {
			let store = await this.DBQueryALL(this.TABLE_STAR_DATA_NAME)
			let list = store[0]?.data || []
			let index = list.indexOf(name)
			if(index != -1) {
				list.splice(index, 1)
				this.DBPut(this.TABLE_STAR_DATA_NAME, {
					name: '我的收藏',
					data: list,
				})
			}
		},
		// 获取所有中药名
		async getAllMedicineNames() {
			const v = await this.$fetch.medicineStore()
			console.log('v => ', v)
			this.data__1 = v['中华本草']
			this.data__2 = v['中国医药']
			this.data__3 = v['中药大辞典']
			this.data__4 = v['全国中草药汇编']
			
			const v1 = await this.interator_all_dictionary(this.data__1)
			const v2 = await this.interator_all_dictionary(this.data__2)
			const v3 = await this.interator_all_dictionary(this.data__3)
			const v4 = await this.interator_all_dictionary(this.data__4)
			
			const v_concat = [
				...v1,
				...v2,
				...v3,
				...v4
			]
			const n_v_concat = Array.from(new Set(v_concat))
			return n_v_concat
		},
		async interator_all_dictionary(data) {
			let list = []
			Object.keys(data).forEach(key => {
				list = [
					...list,
					...data[key]
				]
			})
			return list
		}
	}
}