<template>
	<view class="page">
		<map id="map" style="width: 100%; height:100vh;" :latitude="latitude" :longitude="longitude" :scale="scale" :markers="markers"
		 show-location>
		</map>
		<view style="position: absolute; top:0rpx;width: 100%;">
			<navigator class="flex align-center" url="/pages/map/location" hover-class="none">
				<view class="flex width100 align-center padding bg-brown">
					{{getUserLocName}}
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				latitude: 0,
				longitude: 0,
				scale: 16,
				takeOrders: true
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN 
			this.getAuthorizeInfo()
			// #endif
			// #ifdef MP-ALIPAY  
			this.myGetLocation()
			// #endif
		},
		computed: {
			...mapState(["userLocationName","markers"]),
			...mapGetters(['getUserLocName'])
		},
		methods: {
			getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				var _this = this;
				uni.authorize({
					scope: a,
					success() { //1.1 允许授权
						_this.wxGetLocation();
					},
					fail() { //1.2 拒绝授权
						console.log("你拒绝了授权，无法获得周边信息")
					}
				})
			},
			wxGetLocation() {
				// let _this = this
				wx.getLocation({
					type: 'gcj02',
					altitude: true,
					isHighAccuracy: true,
					success: res => {
						this.latitude = res.latitude
						this.longitude = res.longitude
						// this.router(this.latitude, this.longitude, 25.092839, 102.739821, "我", "/static/dtt.png") //获取距离
						this.$store.dispatch('router', {
							startLat:this.latitude,
							startLng:this.longitude,
							endLat:25.092839,
							endLng:102.739821,
							title:"我",
							icon:"/static/dtt.png"
						}) //调用actions
					}
				})
				this.$store.dispatch('getjX') //调用actions
			},

			// #ifdef MP-ALIPAY  
			myGetLocation() {
				// let _this = this
				my.getLocation({
					type: 3,
					success: res => {
						this.latitude = res.latitude
						this.longitude = res.longitude
						this.$store.dispatch('router', {
							startLat:this.latitude,
							startLng:this.longitude,
							endLat:25.092839,
							endLng:102.739821,
							title:"我",
							icon:"/static/dtt.png"
						}) //调用actions
					}
				})
				this.$store.dispatch('getjX') //调用actions
			},
			// 选择地址
			myChooseLocation() {
				my.chooseLocation({
					success: (res) => {
						console.log(JSON.stringify(res))
						this.name = res.name
					},
					fail: (error) => {
						my.alert({
							content: '调用失败：' + JSON.stringify(error),
						});
					},
				});
			},
			// #endif
		}
	}
</script>

<style>

</style>
