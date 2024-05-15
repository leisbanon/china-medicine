<template>
	<view class="player-page flex_c_center">
		<view class="mui-player" id="mui-player">
			<view v-if="runtimeSys != 'window'">
				<view v-if="isPaused" class="play-button flex_j_center" @click.stop="onPlay">
					<image src="@/static/img/play.png" style="width: 22px;height: 22px;padding-left: 3px;"></image>
				</view>
				
				<view v-if="!isPaused && isPlayerButton" class="play-button flex_j_center" @click.stop="onPause">
					<image src="@/static/img/pause.png" style="width: 22px;height: 22px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import '@/static/css/mui-player.min.css'
	import MuiPlayer from '@/static/js/mui-player.min.js'
	import MuiPlayerMobilePlugin from '@/static/js/mui-player-mobile-plugin.min.js'
	import MuiPlayerDesktopPlugin from 'mui-player-desktop-plugin'
	
	export default {
		data() {
			return {
				address: '',
				name: '',
				
				mp: null,
				
				runtimeSys: '',
				
				isPaused: true, // 媒体是否暂停
				
				isPlayerButton: true, // 是否显示播放切换按钮
			}
		},
		onLoad(e) {
			this.address = decodeURIComponent(e.url)
			this.name = decodeURIComponent(e.name)
			this.runtimeSys = this.returnSys()
			console.log(this.runtimeSys)
			
			this.$nextTick(() => {
				uni.setNavigationBarTitle({ title: this.name })
				
				for(let meta of document.querySelectorAll('meta')) {
					let attr = meta.getAttribute('property')
					if(attr == 'og:title') {
						meta.setAttribute('content', this.name)
						break
					}
				}
				
				this.initPlayer()
			})
		},
		methods: {
			onPlay() {
				this.mp.video()?.play()
			},
			onPause() {
				this.mp.video()?.pause()
			},
			// 平台判断IOS OR Anndroid
			returnSys() {
				var sys = "";
				var browser = function() {
					var u = navigator.userAgent, app = navigator.appVersion;
					return { //移动终端浏览器版本信息
						ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
						iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
						iPad: u.indexOf('iPad') > -1, //是否iPad
					};
				};
				
				var b = new browser();
				if (b.iPhone || b.iPad || b.ios) {
					sys = "ios"; 
				}else if (b.android) { 
					sys= "androd"; 
				}else {
					sys = 'window';
				}
				return sys;
			},
			// 激活播放按钮
			__playControlActive() {
				this.isPlayerButton = true
				if(this.c_timer) clearTimeout(this.c_timer)
				
				this.c_timer = setTimeout(() => {
					this.isPlayerButton = false
				}, 3000)
			},
			// 播放器事件监听
			eventPlayer() {
				this.mp.on('back', () => {
					this.$com.toHref('back')
				})
				
				this.mp.on('controls-toggle', (e) => {
					let show = e.show
					if(show) {
						this.__playControlActive()
					}
				})
				
				// 视频播放监听
				this.mp.video().onplay = () => {
					console.log('播放...')
					this.isPaused = false
					
					this.__playControlActive()
				}
				
				this.mp.video().onplay
				
				// 视频暂停监听
				this.mp.video().onpause = () => {
					console.log('暂停...')
					this.isPaused = true
				}
			},
			// 初始化播放器
			initPlayer() {
				this.mp = new MuiPlayer({
				    container: '#mui-player',
				    title: this.name,
				    src: this.address,
					poster: `${ this.address }?x-oss-process=video/snapshot,t_1000,m_fast`,
					// autoplay: true,
					pageHead: true,
					width: '100%',
					themeColor: '#3CB371',
					
					// 此属性为添加更多H5 Video 标签的属性。参数为接受每个为Object的对象.注意如果该数组中属性值在已有设置中存在，那么会覆盖。
					videoAttribute:[
						{attrKey:'webkit-playsinline',attrValue:''},
						{attrKey:'playsinline',attrValue:''},
						{attrKey:'x5-playsinline',attrValue:''},
						{attrKey:'t7-video-player-type',attrValue:'inline'},
						{attrKey:'x5-video-player-type',attrValue:'h5-page'},
						{attrKey:'x-webkit-airplay',attrValue:'allow'},
						{attrKey:'controlslist',attrValue:'nodownload'},
					],
						
					plugins:[
						new MuiPlayerMobilePlugin({
							key:'01C01F01D01F01H01J01E01F01K01D01J01K01D01D01G',
							showMenuButton:true,
							hotKeyConfig: {
								volumeHandle: false
							}
						}),
						new MuiPlayerDesktopPlugin({ })
					]
				})
				
				this.mp.on('ready', () => {
					this.runtimeSys != 'window' && this.eventPlayer()
					this.mp.video().play()
					this.mp.toggleControls(true).closeTimer()
					
					if(this.runtimeSys != 'window') {
						let controls = this.mp.getControls()
						for(let el of controls) {
							let id = el.getAttribute('id')
							if(id == 'play-switch') {
								el.style.display = 'none'
								break
							}
						}
					}
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	@keyframes __playButton{
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	.player-page {
		height: 100%;
		background-color: rgba(0,0,0,0.33);
		
		/deep/ .mui-player {
			.mplayer-header {
				padding-top: 5px;
			}
			.mplayer-footer {
				padding-bottom: 5px;
			}
		}
		
		.play-button {
			height: 60px;
			width: 60px;
			z-index: 100;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 100%;
			background-color: rgba(0, 0, 0, 0.66);
			animation: __playButton 300ms linear;
			&:active {
				opacity: 0.88;
			}
		}
	}
</style>