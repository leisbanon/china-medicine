export default {
    methods: {
		// 上传图片
        m_uploadImage(loading = true, formData = {}) {
			return new Promise(async (resolve, reject) => {
				try{
					const cRes = await uni.chooseImage({
						count: 1,
						sourceType: ['album'],
					})
					let filePath = cRes.tempFilePaths[0]
					
					loading && uni.showLoading({
						title:'上传中...',
						mask: true
					})
					
					// const option = {
					// 	url: '',
					// 	name: 'file',
					// 	filePath,
					// 	formData
					// }
					// const uRes = await uni.uploadFile(option)
					resolve(filePath)
				} catch(e){
					reject(e)
				} finally {
					loading && uni.hideLoading()
				}
			})
        },
		// 上传视频
		async m_uploadVideo(loading = true, formData = {}) {
			return new Promise(async (resolve, reject) => {
				try{
					const cRes = await uni.chooseVideo({
						sourceType: ['album', 'camera'],
						compressed: false,
					})
					let filePath = cRes.tempFilePath
									
					loading && uni.showLoading({
						title:'上传中...',
						mask: true
					})
					
					// const option = {
					// 	url: '',
					// 	name: 'file',
					// 	filePath,
					// 	formData
					// }
					// await uni.uploadFile(option)
					resolve(filePath)
				} catch(e){
					reject(e)
				} finally {
					loading && uni.hideLoading()
				}
			})
		}
    }
}