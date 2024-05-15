/**
 * 验证电子邮箱格式
 */
export function email(value) {
	return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 */
export function mobile(value) {
	return /^1[23456789]\d{9}$/.test(value)
}

/**
 * 验证身份证号码
 */
export function idCard(value) {
	return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
		value
	)
}

/**
 * 验证URL格式
 */
export function url(value) {
	return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/
		.test(value)
}

/**
 * 判断是否为空
 */
export function empty(value) {
	switch (typeof value) {
		case 'undefined':
			return true
		case 'string':
			if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
			break
		case 'boolean':
			if (!value) return true
			break
		case 'number':
			if (value === 0 || isNaN(value)) return true
			break
		case 'object':
			if (value === null || value.length === 0) return true
			for (const i in value) {
				return false
			}
			return true
	}
	return false
}

/**
 * 是否数组
 */
export function array(value) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(value)
	}
	return Object.prototype.toString.call(value) === '[object Array]'
}