<template>
	<u-modal
		@touchmove.native.prevent
		class="c-u-modal"
		:show="show"
		confirmColor="#1F68F4"
		cancelColor="rgba(51, 51, 51, 0.75)"
		:showCancelButton="true"
		@confirm="onConfirm"
		@cancel="close"
	>
		<view class="content fz15 family_blod">{{ content }}</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return  {
				show: false,
				content: '软件为了更好的提供服务，请授权用户信息',
				
				_then: null,
				_catch: null,
			}
		},
		methods: {
			close(symbol) {
				this.show = false
				symbol != '__noCatch' && this._catch instanceof Function ? this._catch() : ''
			},
			open(params = {}) {
				this.show = true
				Object.keys(params).forEach(key => {
					params[key] && (this[key] = params[key])
				})
				
				let call = {
					then: (fun) => {
						this._then = fun
					},
					catch: (fun) => {
						this._catch = fun
					},
				}
				return call
			},
			onConfirm() {
				this._then instanceof Function ? this._then(this.close) : ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.c-u-modal {
		/deep/ .u-popup__content {
			border-radius: 8px !important;
		}
		
		/deep/ .u-modal__content {
			padding: 41px 24px !important;
		}
		
	}
	
	.content {
		color: rgba(51, 51, 51, 0.75);
		text-align: center;
		line-height: 24px;
		color: #212121;
	}
	
</style>