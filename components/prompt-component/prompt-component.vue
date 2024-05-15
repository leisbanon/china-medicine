<template>
	<view class="prompt-components">
		<u-modal
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
			<view class="column flex__center">
				<view class="title">{{ title }}</view>
				<input class="_input" type="text" v-model="content" :placeholder="placeholder" :placeholder-style="JSON.stringify(placeholderStyle)" />
			</view>
		</u-modal>
	</view>
    
</template>

<script>
    export default {
		props:{
			placeholder: String,
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
				content: '双12大促销',
				
				placeholderStyle: {
					color: 'rgba(51, 51, 51, 0.3)',
					fontSize: '26rpx',
					fontFamily: "PingFang Medium"
				},
				
				_then: null,
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
					}
				}
				return call
			},
			close() {
				this.show = false
			},
			onConfirm() {
				this._then instanceof Function ? this._then(this.content, this.close) : ''
			}
        }
    }
</script>

<style lang="scss" scoped>
	.prompt-components {
		/deep/ .u-modal {
			&__content {
				padding-top: 48rpx !important;
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
			font-size: 30rpx;
			color: #333333;
			margin-bottom: 32rpx;
			font-family: "PingFang Bold";
		}
		._input {
			background-color: rgba(249, 249, 249, 1);
			border-radius: 8rpx;
			width: 496rpx;
			height: 68rpx;
			padding-left: 24rpx;
			font-size: 24rpx;
			font-family: "PingFang Medium";
		}
	}
</style>
