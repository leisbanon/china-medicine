/**
 * 跳转到某一个页面
 * @param { Object } url 跳转页面的 URL
 */
export function toHref(url, isBackActio = false) {
	return new Promise((reslove, reject) => {
		if(url == 'back' || url === -1) {
			return uni.navigateBack()
		}
		
		uni.navigateTo({
			url: url,
			success: reslove,
			fail: reject
		})
	})
	
}

/**
 * 显示消息提示框
 */
export function toast(title, duration = 1500, icon = 'none') {
	uni.showToast({
		title,
		duration,
		icon,
	})
}

/**
 * 显示 Loading 提示框
 * @param { String } title 提示的文字内容
 * @param { Boolean } mask 是否防止触摸穿透
 */
export function showLoading(title, mask = false) {
	uni.showLoading({
		title,
		mask
	})
}

// 关闭 Loading
export function hideLoading() {
	uni.hideLoading()
}

// 拨打电话
export function callPhone(phone) {
	if(!phone) return toast('手机号码未配置') 
	
	uni.makePhoneCall({
		phoneNumber: phone
	})
}
