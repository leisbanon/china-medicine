<template>
	<u-popup :round="16" :show="show" mode="bottom" @close="close">
		<view class="popup-container">
			<view class="header flex_between_center">
				<view class="fz14 color_3_5 family_blod" @click="close">取消</view>
				<view class="tile color_3 fz16 family_blod">{{ tile }}</view>
				<view class="confirm fz14 family_blod" @click="onConfirm">确定</view>
			</view>
			
			<view class="select-wrapper">
				<view 
					v-for="(item, index) of datalist"
					:key="`__item_${ index }`" 
					:class="['item flex_between_center fz14 family_blod', { active: item.active }]"
					@click="onSelect(index)"
				>
					<text>{{ item.name }}</text>
					<image v-if="item.active" src="@/static/img/takeCheckIcon.png" style="width: 16px;height: 16px;"></image>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				tile: '请选择',
				
				datalist:[],
				
				_then: null,
				_catch: null,
				_finally: null,
			}
		},
		methods: {
			close() {
				this.show = false
			},
			open(res) {
				let { names, selected } = res
				
				this.datalist = names.map((name, index) => {
					return {
						name,
						index,
						active: selected === index
					}
				})
				
				this.$nextTick(() => {
					this.show = true
				})
				
				let call = {
					then: (fun) => {
						this._then = fun
					},
					catch: (fun) => {
						this._catch = fun
					},
					finally: (fun) => {
						this._finally = fun
					}
				}
				return call
			},
			// 选择
			onSelect(index) {
				this.datalist.forEach(item => item.active = false)
				this.datalist[index].active = true
			},
			// 确认
			onConfirm() {
				let __list = this.datalist.filter(item => item.active == true)[0]
				this.show = false
				this._then instanceof Function ? this._then(__list) : ''
				this._finally instanceof Function ? this._finally() : ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-container {
		border-radius: 30px 30px 0px 0px;
		background: #FFFFFF;
		padding: 0 16px;
		box-sizing: border-box;
		padding-bottom: calc(constant(safe-area-inset-bottom));
		padding-bottom: calc(env(safe-area-inset-bottom));
		
		.header {
			height: 44px;
			position: relative;
			margin-bottom: 10px;
			.tile {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			.confirm {
				color: #1F68F4;
				
			}
		}
		
		.select-wrapper {
			// border: 1px #F00 solid;
			max-height: 70vh;
			overflow-y: auto;
			box-sizing: border-box;
			.item {
				position: relative;
				height: 44px;
				padding: 0 16px;
				border-radius: 8px;
				margin-bottom: 10px;
				background-color: #FAFAFA;
				box-sizing: border-box;
				border: 2px solid #FAFAFA;
				&.active {
					background: rgba(31, 104, 244, 0.1);
					border: 2px solid #1F68F4;
					color: #1F68F4;
					box-sizing: border-box;
				}
			}
		}
	}
</style>