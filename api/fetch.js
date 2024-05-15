const request = {
	fetch: (url, params, method) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: params,
				method: method,
				success(res) {
					let { data, statusCode } = res
					if(statusCode == 200) {
						resolve(data)
						
						// if([0, 200].includes(data.code)) {
						// 	resolve(data.data)
						// }else {
						// 	uni.showToast({ title: data.msg, icon: 'none' })
						// 	reject(data.msg)
						// }
					}else {
						reject()
						uni.showToast({ title:'请求失败，请稍后重试!', icon: 'none' })
					}
				},
				fail(err) {
					reject()
					uni.showToast({ title:'请求失败，请稍后重试!', icon: 'none' })
				}
			})
		})
	},
	post(url, params) {
		return this.fetch(url, params, 'POST')
	},
	get(url, params) {
		return this.fetch(url, params, 'GET')
	}
}

export default request