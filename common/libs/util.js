/**
 * URL 参数解析成对象格式
 * @param { String } url
 */
export function urlQuery(url) {
	let str = url.substr(url.indexOf('?') + 1)
	let json = new Object()
	const arr = str.split('&')
	for(let i = 0; i < arr.length; i++) {
		let item = arr[i].split('=')
		json[item[0]] = item[1]
	}
	
	return json
}

// 对象结构转换 URl 参数； {a:1,b:2} => 字符串 a=1&b=2
export function getParamesByObj(obj) {
  return Object.keys(obj).reduce(
	(bk, ck) => (!bk ? `${ck}=${obj[ck]}` : bk + `&${ck}=${obj[ck]}`),
	''
  )
}

// 延时器
export function timer(time) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), time)
	})
}

// 查询摄像头授权
export function permissionMicrophone() {
	let __resolve, __reject, __permissionTimer, __permissonCount = 0
	
	const cameraPermission = () => {
		let status = plus.navigator.checkPermission('CAMERA')
		console.log(status, 'Permissio camera status...')
		return status
	}
	
	const validate = () => {
		let status = cameraPermission()
		if(status == 'authorized') {
			__resolve()
			return
		}
		
		if(status == 'denied') {
			__reject()
			return
		}
		
		if(status == 'undetermined') {
			console.log('执行摄像头授权...')
			plus.camera.getCamera()
			
			if(__permissionTimer) clearTimeout(__permissionTimer)
			__permissionTimer = setTimeout(() => {
				__permissonCount += 1
				if(__permissonCount >= 10) {
					__reject()
				}else {
					validate()
				}
				
				console.log(`__permissonCount => ${ __permissonCount }`)
			}, 500)
		}
	}
	
	return new Promise((r, j) => {
		__resolve = r
		__reject = j
		
		// #ifdef APP
		validate()
		// #endif
		
		// #ifdef H5
		// navigator.permissions.query({ name: 'camera' }).then(res => {
		// 	if(res.state == 'denied') {
		// 		__reject()
		// 	}else {
		// 		__resolve()
		// 	}
		// })
		// #endif
	})
}

// 查询摄像头授权
export function permissionCamera() {
	let __resolve, __reject, __permissionTimer, __permissonCount = 0
	
	const cameraPermission = () => {
		let status = plus.navigator.checkPermission('CAMERA')
		console.log(status, 'Permissio camera status...')
		return status
	}
	
	const validate = () => {
		let status = cameraPermission()
		if(status == 'authorized') {
			__resolve()
			return
		}
		
		if(status == 'denied') {
			__reject()
			return
		}
		
		if(status == 'undetermined') {
			console.log('执行摄像头授权...')
			plus.camera.getCamera()
			
			if(__permissionTimer) clearTimeout(__permissionTimer)
			__permissionTimer = setTimeout(() => {
				__permissonCount += 1
				if(__permissonCount >= 10) {
					__reject()
				}else {
					validate()
				}
				
				console.log(`__permissonCount => ${ __permissonCount }`)
			}, 500)
		}
	}
	
	return new Promise((r, j) => {
		__resolve = r
		__reject = j
		
		// #ifdef APP
		validate()
		// #endif
		
		// #ifdef H5
		navigator.permissions.query({ name: 'camera' }).then(res => {
			if(res.state == 'denied') {
				__reject()
			}else {
				__resolve()
			}
		})
		// #endif
	})
}

// 全屏切换
export function fullscreentSwitch(status) {
	// #ifdef APP
	let _isFullscreen = plus.navigator.isFullscreen()
	
	if(status === true && !_isFullscreen) {
		plus.navigator.setFullscreen(true)
		plus.navigator.hideSystemNavigation()
	}
	
	if(status === false && _isFullscreen) {
		plus.navigator.setFullscreen(false)
		plus.navigator.showSystemNavigation()
	}
	// #endif
}

/**
 * 函数防抖
 * @param { Function } func function to wrap
 * @param { number } [wait = 100] time to wait in ms (`100`)
 * @param { boolean } [immediate = false] should execute at the beginning (`false`)
 */
export function debounce(func, wait, immediate){
    var timeout, args, context, timestamp, result;
    if (null == wait) wait = 100;

    function later() {
        var last = Date.now() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};