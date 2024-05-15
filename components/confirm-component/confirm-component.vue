<template>
	<view class="prompt-components">
		<u-modal
			@touchmove.native.prevent
			:show="show"
			:confirmText="confirmText"
			:cancelText="cancelText"
			:showConfirmButton="showConfirmButton"
			:showCancelButton="showCancelButton"
			cancelColor="rgba(51, 51, 51, 0.5)"
			confirmColor="#1F68F4"
			width="560rpx"
			@confirm="onConfirm"
			@cancel="close"
		>
			<view class="flex column flex__center">
				<view v-if="title" class="title fz15 family_blod">{{ title }}</view>
				<view v-if="content" class="content fz14 family_medium">{{ content }}</view>
			</view>
		</u-modal>
	</view>
    
</template>

<script>
    export default {
		props:{
			confirmText: {
				type: String,
				default: '确定',
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			showConfirmButton: {
				type: Boolean,
				default: true,
			},
			showCancelButton: {
				type: Boolean,
				default: true,
			}
		},
        data(){
            return {
                show:false,
				title: '',
				content: '',
				
				_then: null,
				_catch: null,
				_finally: null,
            }
        },
        mounted() {
        },
        methods:{
			open(params = {}) {
				this.title = params.title || ''
				this.content = params.content || ''
				this.show = true
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
			close(symbol) {
				this.show = false
				symbol != '__noCatch' && this._catch instanceof Function ? this._catch() : ''
				this._finally instanceof Function ? this._finally() : ''
			},
			onConfirm() {
				this.show = false
				this._then instanceof Function ? this._then() : ''
				this._finally instanceof Function ? this._finally() : ''
			}
        }
    }
</script>

<style lang="scss" scoped>
	.prompt-components {
		/deep/ .u-modal {
			&__content {
				padding: 64rpx 48rpx;
			}
			.u-line {
				border: 1px #F2F2F2 solid !important;
				transform: scaleY(0.35) !important;
			}
			.u-modal__button-group {
				.u-line {
					display: none;
				}
				&__wrapper {
					height: 88rpx;
					&__text {
						font-size: 30rpx;
						font-weight: normal;
						font-family: "PingFang Bold";
					}
				}
			}
		}
		.title {
			color: #333333;
		}
		.content {
			color: rgba(0,0,0,0.6);
			margin-top: 24rpx;
			text-align: center;
			line-height: 48rpx;
		}
	}
</style>
