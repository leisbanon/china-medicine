export default {
	data() {
		return {
			DATABASE_NAME: 'medicine_database', // 数据库名称
			
			TABLE_STAR_DATA_NAME: 'star_medicint_data', // 收藏数据表
			
			TABLE_GROUP_DATA_NAME: 'group_medicint_data', // 验方数据表
		}
	},
	methods: {
		// 判断数据表是否存在指定主键
		async DBIsKey(primaryKey, table) {
			return new Promise(async (resolve, reject) => {
				let store = await this.DBConnectStore(table)
				let operate = store.getKey(primaryKey)
				operate.onsuccess = (e) => {
					resolve(e.target.result)
				}
			})
		},
		// 删除数据表指定主键
		DBDelete(primaryKey, table) {
			return new Promise(async (resolve, reject) => {
				let store = await this.DBConnectStore(table)
				let operate = store.delete(primaryKey)
				operate.onsuccess = () => {
					resolve()
				}
				
				operate.onerror = (e) => {
					reject(e.target.error)
				}
			})
		},
		/**
		 * 更新给定的一条记录，如果记录不存在则插入一条新的记录
		 * @param { String } table 表名称
		 * @param { Array } list 新增数据
		 */
		DBPut(table, data) {
			return new Promise(async (resoleve, reject) => {
				let store = await this.DBConnectStore(table)
				let operate = store.put(data)
				
				operate.onsuccess = (e) => {
					resoleve()
				}
				
				operate.onerror = (e) => {
					console.error(e.target.error)
					reject(e.target.error)
				}
			})
		},
		/**
		 * 数据查询
		 * @param { String } primaryKey 主键
		 * @param { String } table 表名
		 */
		DBQuery(primaryKey, table) {
			return new Promise(async (resolve, reject) => {
				let store = await this.DBConnectStore(table)
				let operate = store.get(primaryKey)
				operate.onsuccess = (e) => {
					let data = e.target.result
					resolve(data)
				}
				
				operate.onerror = (e) => {
					console.error(e.target.error)
					reject(e.target.error)
				}
			})
		},
		// 所有数据查询
		DBQueryALL(table) {
			return new Promise(async (resolve, reject) => {
				let store = await this.DBConnectStore(table)
				let operate = store.getAllKeys()
				let datalist = []
				
				operate.onsuccess = async (e) => {
					let keys = e.target.result
					for(let key of keys) {
						let data = await this.DBQuery(key, table)
						if(Object.prototype.toString.call(data) == '[object Object]') {
							datalist.push(data)
						}
						
						if(Object.prototype.toString.call(data) == '[object Array]') {
							datalist = [
								...datalist,
								...data
							]
						}
					}
					
					resolve(datalist)
				}
				
				operate.onerror = (e) => {
					console.error(e.target.error)
					reject(e.target.error)
				}
			})
		},
		// 连接数据库，如果不存在则创建
		DBConnectStore(table, version) {
			return new Promise(async (resolve, reject) => {
				version = version || await this.getDBVersion()
				let database = window.indexedDB.open(this.DATABASE_NAME, version)
				
				// 数据库连接成功
				database.onsuccess = (e) => {
					let db = event.target.result
					let store = this.getStore(db, table)
					resolve(store)
				}
				
				// 数据库打开失败
				database.onerror = (e) => {
					this.showToast('数据库连接失败!', 2000)
					reject(e.target.error)
				}
				
				// 建立/升级数据库版本
				database.onupgradeneeded = (e) => {
					console.log('建立/升级数据库版本 => ', version)
					let db = e.target.result
					let new_version = db.version
					let old_version = e.oldVersion || 1
					// Delete..
					if(new_version > old_version) {
						db.deleteObjectStore(table)
						console.log(`删除表: ${ table }`)
					}
						
					
					// Create..
					if(!db.objectStoreNames.contains(this.TABLE_STAR_DATA_NAME)) {
						db.createObjectStore(this.TABLE_STAR_DATA_NAME, { keyPath: 'name' })
						console.log(`新建表: ${ this.TABLE_STAR_DATA_NAME }`)
					}
						
					
					if(!db.objectStoreNames.contains(this.TABLE_GROUP_DATA_NAME)) {
						db.createObjectStore(this.TABLE_GROUP_DATA_NAME, { keyPath: 'name' })
						console.log(`新建表: ${ this.TABLE_GROUP_DATA_NAME }`)
					}
				}
			})
		},
		// 获取数据表版本
		async getDBVersion() {
			let dbs = await window.indexedDB.databases()
			let version = 1
			for(let value of dbs) {
				if(value.name == this.DATABASE_NAME) {
					version = value.version
					break
				}
			}
			return version
		},
		/**
		 * 获取对象仓库
		 * @param {Object} db DB对象
		 * @param {Object} table 表名称
		 */
		getStore(db, table) {
			let transaction = db.transaction([table], 'readwrite') // 创建事务
			let store = transaction.objectStore(table) // 访问对象仓库
			
			// 事务触发完成
			transaction.oncomplete = () => {
				db.close instanceof Function && db.close()
			}
			
			return store
		},
	}
}