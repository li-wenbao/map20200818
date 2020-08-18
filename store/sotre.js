import Vue from 'vue'
import Vuex from 'vuex'
import comfun from "../common/utils.js"
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		mapKey: '7b08519b13cab78fcd0014bfdcd324a9',
		latitude: '', //经纬度 
		longitude: '', //经纬度 
		userLocation: '',
		userLocationName: '', //用户位置名称
		allAddres: [], //附近所有地址
		jsAddres: [], //搜素周边地址
		markers: [], //标记点
		qXtime: "", //骑行时间
		qXdistance: "", //骑行距离
		// #ifdef MP-ALIPAY
		mapCtx: my.createMapContext('map'), //创建地图
		// #endif
		scale: 16, //设置地图显示等级
		userLocationArr: [{ //用户自己动手添加的地址
				address: "云南农业大学13栋",
				name: "马XX",
				tel: "18211112222",
				tag: "学校"
			},
			{
				address: "云南农业大学综合楼 507",
				name: "周XX",
				tel: "18211112222",
				tag: ""
			},
			{
				address: "昆明理工大学计算机与科学技术学院",
				name: "修XX",
				tel: "18211112222",
				tag: "学校"
			}
		],
	},
	mutations: {
		// 重置 userLocation 赋值
		initGetjX(state, list) {
			state.userLocationName = list.info
			state.userLocation = list.location
			state.allAddres = list.pois
		},
		// 选择地址
		getUserLocation(state, list) {
			state.userLocationName = list.name
			state.userLocation = list.location
			uni.navigateBack()
		},
		// 检索周边位置信息
		getAddress(state, list) {
			// console.log("list++++",list)
			state.jsAddres = list
		},
		chooseAddress(state, list) {
			// console.log("list++++",list.name)
			state.userLocationName = list.name
			uni.navigateBack()
		},
		// 显示用户//商家//骑手的makers
		initRouter(state, list) {
			// #ifdef MP-WEIXIN  
			state.qXtime = comfun.ChangeHourMinutestr(list.paths[0].duration); //转换成小时或者分钟
			state.qXdistance = comfun.Changedistance(list.paths[0].distance); //转换成千米或者米
			// console.log('路线值返：时间', state.qXtime + ',' + '距离:' + state.qXdistance);
			state.markers = [{
				id: 1,
				latitude: list.startLat,
				longitude: list.startLng,
				iconPath: '/static/qishou.png',
				width: 36,
				height: 36,
				callout: {
					content: "距离" + state.qXdistance + ",预计" + "\n" + state.qXtime + "后送达",
					bgColor: "#ffffff",
					padding: 10,
					display: "ALWAYS"
				}
			}, {
				id: 2,
				latitude: list.endLat,
				longitude: list.endLng,
				iconPath: list.icon,
				width: 36,
				height: 36,
				callout: {
					content: list.title,
					bgColor: "#ffffff",
					padding: 10,
					display: "ALWAYS"
				}
			}]
			// #endif
			// #ifdef MP-ALIPAY
			state.qXtime = comfun.ChangeHourMinutestr(list.paths.duration); //转换成小时或者分钟
			state.qXdistance = comfun.Changedistance(list.paths.distance); //转换成千米或者米
			// console.log('路线值返：时间', state.qXtime + ',' + '距离:' + state.qXdistance);
			state.mapCtx.updateComponents({
				scale: state.scale,
				markers: [{
					id: 1,
					latitude: list.startLat,
					longitude: list.startLng,
					style: {
						type: 1,
						text1: list.title,
						icon1: list.icon,
					},
					markerLevel: 2
				}, {
					id: 2,
					latitude: list.endLat,
					longitude: list.endLng,
					iconPath: "/static/qishou.png",
					customCallout: {
						"type": 2,
						"descList": [{
							"desc": "距离",
							"descColor": "#333333"
						}, {
							"desc": state.qXdistance,
							"descColor": "#108EE9"
						}, {
							"desc": ",预计",
							"descColor": "#333333"
						}, {
							"desc": state.qXtime,
							"descColor": "#108EE9"
						}, {
							"desc": "送达",
							"descColor": "#333333"
						}],
						"isShow": 1,
					},
					markerLevel: 2
				}]
			});
			// #endif
		}
	},
	actions: {
		// 定位
		getjX(context, val) {
			// #ifdef MP-WEIXIN  
			wx.getLocation({
				type: 'gcj02',
				altitude: true,
				isHighAccuracy: true,
				success: res => {
					let ulatitude = res.latitude
					let ulongitude = res.longitude
					uni.request({
							url: "https://restapi.amap.com/v3/geocode/regeo",
							method: "GET",
							data: {
								key: context.state.mapKey,
								extensions: "all",
								location: ulongitude + "," + ulatitude,
							}
						})
						.then(res => {
							// console.log("data", res)
							let {
								pois
							} = res[1].data.regeocode
							let info = pois[0].name
							context.commit("initGetjX", {
								pois,
								info
							})
						});
				}
			})
			// #endif
			// 在支付宝上运行的代码
			// #ifdef MP-ALIPAY  
			my.getLocation({
				type: 3,
				success: res => {
					let {
						pois
					} = res;
					let info = pois[0].name
					context.commit("initGetjX", {
						pois,
						info
					}) //获取到数据后提交 mutations
				}
			})
			// #endif
		},

		// 计算配送距离
		router(context, {
			startLat,
			startLng,
			endLat,
			endLng,
			title,
			icon
		}) {
			// console.log("参数：",{startLat,startLng, endLat, endLng, title, icon})
			// 微信方式
			// #ifdef MP-WEIXIN  
			uni.request({
					url: "https://restapi.amap.com/v4/direction/bicycling?parameters",
					method: "GET",
					data: {
						key: context.state.mapKey,
						// key: "7b08519b13cab78fcd0014bfdcd324a9",
						origin: String(startLng) + "," + String(startLat), //起点坐标
						destination: String(endLng) + "," + String(endLat), //终点坐标
					}
				})
				.then(res => {
					console.log("data", res)
					let paths = res[1].data.data.paths;
					context.commit("initRouter", {
						paths,
						startLat,
						startLng,
						endLat,
						endLng,
						title,
						icon
					})
				});
			// #endif
			// #ifdef MP-ALIPAY  
			my.calculateRoute({
				searchType: "ride", // 搜索类型："walk", "bus", "drive", "ride", 默认值为walk
				startLat: startLat, // 起点纬度  骑手
				startLng: startLng, // 起点经度
				endLat: endLat, // 终点纬度 到商家
				endLng: endLng, // 终点经度
				mode: 0, // 只有驾车模式和公交模式支持，可选，具体值见 mode 参数列表
				city: 'kunming', // 公交模式下必填
				// destinationCity:'hangzhou',      // 公交跨城模式下必填
				success: (e) => {
					console.log("支付宝计算距离：", e)
					let paths = e;
					context.commit("initRouter", {
						paths,
						startLat,
						startLng,
						endLat,
						endLng,
						title,
						icon
					})
				}
			});
			// #endif
		},

		//周边地址搜索
		getParameters(context, val) {
			// #ifdef MP-WEIXIN  
			wx.getLocation({
				type: 'gcj02',
				altitude: true,
				isHighAccuracy: true,
				success: res => {
					let ulatitude = res.latitude
					let ulongitude = res.longitude
					uni.request({
							url: "https://restapi.amap.com/v3/place/around?parameters",
							method: "GET",
							data: {
								key: context.state.mapKey,
								keywords: val,
								location: ulongitude + "," + ulatitude,
								citylimit: true
							}
						})
						.then(res => {
							let {
								pois
							} = res[1].data;
							context.commit("getAddress", pois) //获取到数据后提交 mutations
						});
				}
			})
			// #endif
			// 在支付宝上运行的代码
			// #ifdef MP-ALIPAY  
			my.getLocation({
				type: 3,
				success: res => {
					let ulatitude = res.latitude
					let ulongitude = res.longitude
					// console.log("经纬度坐标：++++++++", ulatitude, ulongitude)
					my.request({
							url: "https://restapi.amap.com/v3/place/around?parameters",
							method: "GET",
							data: {
								key: context.state.mapKey,
								keywords: val,
								location: ulongitude + "," + ulatitude,
								citylimit: true
							}
						})
						.then(res => {
							let {
								pois
							} = res.data;
							// let pois = res.data.pois;
							console.log("pois支付宝", pois)
							context.commit("getAddress", pois) //获取到数据后提交 mutations
						})
				}
			})
			// #endif
		}
	},
	getters: {
		getUserLocName: (state) => {
			console.log("state.userLocationName:", state.userLocationName)
			return state.userLocationName == '' || null ? "正在定位..." : state.userLocationName
		}
	}
})
