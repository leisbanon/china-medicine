<template>
	<u-popup
		:show="show"
		:overlayOpacity="0.33"
		round="15px"
		@close="close"
		@touchmove.native.prevent
	>
		<view class="popup-container">
			<view class="header family_blod fz16 flex_j_center">
				<view class="header__back" @click="close"></view>
				<text class="header__name color_3">{{ name }}</text>
				<text class="header__delete" @click="onDelete">删除</text>
			</view>
			
			<view class="item">
				<text
					class="label"
					v-for="(name, index) of formulaList" 
					:key="index" 
					@click="$com.toHref(`/pages/maxDictionary/result?name=${ name }`)">
					{{ name }}
				</text>
			</view>
		</view>
		
		<confirm-component ref="_confirmComponent" />
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				
				datainfo: {},
			}
		},
		computed: {
			name() {
				return this.datainfo?.name
			},
			formulaList() {
				return this.datainfo?.value || []
			}
		},
		methods: {
			close() {
				this.show = false
			},
			open(item) {
				this.datainfo = item || {}
				this.show = true
			},
			onDelete() {
				let win = this.$refs._confirmComponent.open({
					content: '确认删除？'
				})
				
				win.then(() => {
					this.DBDelete(this.name, this.TABLE_GROUP_DATA_NAME).then(() => {
						this.$com.toast('删除成功')
					}).catch(err => {
						this.$com.toast('删除失败')
					}).finally(() => {
						this.$emit('change')
						this.close()
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-container {
		height: 60vh;
		.item {
			padding: 12px;
			.label {
				// border: 1px #DDD solid;
				color: #3951b3;
				margin-right: 12px;
				font-size: 18px;
				padding: 0px 12px;
				text-decoration: underline;
				margin-bottom: 12px;
				display: inline-block;
				white-space: nowrap;
				&:active {
					opacity: 0.66;
				}
			}
		}
		
		.header {
			border-bottom: 1px #DDD solid;
			height: 50px;
			position: relative;
			font-size: 16px;
			&__back {
				// border: 1px #F00 solid;
				width: 33px;
				height: 33px;
				background-image: url('@/static/img/arrow_left.png');
				background-size: 18px 18px;
				background-repeat: no-repeat;
				background-position: center center;
				position: absolute;
				left: 16px;
				top: 50%;
				transform: translateY(-50%);
			}
			&__delete {
				color: #E4414E;
				position: absolute;
				right: 25px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
</style>