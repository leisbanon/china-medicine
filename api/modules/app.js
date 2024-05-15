import request from '../fetch.js'
import Vue from 'vue'
const prototype = Vue.prototype

// 倪海厦视频
export const uNHXMedia = () => request.get('https://leisbanon.cn/倪海厦视频.json')

// 中药大辞典
export const medicineStore = () => request.get('https://leisbanon.cn/中药大辞典.json')

// 中药主治查询
export const medicineTreatment = () => request.get('https://leisbanon.cn/中药主治查询.json')

// 我的验方
export const formulaStore = () => request.get('https://leisbanon.cn/我的验方.json')







