<template>
	<view class="page">
		<view>
			<!-- 定位开始 -->
			<view class="bg-white cu-bar search" style="z-index: 100;">
				<!-- 城市定位 -->
				<navigator url="/pages/user/city" hover-class="none">
					<text class="cuIcon-location margin-left-sm"></text>
					<text class="text-black padding-lr-xs">{{city}}</text>
					<text class="cuIcon-unfold"></text>
				</navigator>
				<!-- 搜索框 -->
				<view class="search-form">
					<text class="cuIcon-search text-grey text-xxxl"></text>
					<input type="text" placeholder="请输入收货地址" :focus="focus" confirm-type="search" @input="input" @focus="focusfun" />
				</view>
			</view>
			<!-- 具体定位 -->
			<view class="bg-white padding-lr cu-bar solid-top">
				<view class="text-black">{{getUserLocName}}</view>
				<view @click="_getCurLocation" class="text-blue">
					<text class="cuIcon-radiobox"></text>
					<text class="margin-left-xs">重新定位</text>
				</view>
			</view>
			<!-- 定位结束 -->
			<!-- 我的收货地址开始 -->
			<view class="bg-white padding margin-top-sm">
				<view class="padding-bottom-sm flex justify-between align-center">
					<view>
						<text class="cuIcon-home text-gray margin-right-xs"></text>
						<text class="text-gray">我的收货地址</text>
					</view>
					<navigator url="/pages/user/address/addAddress" hover-class="none">
						<text class="text-blue">管理</text>
					</navigator>
				</view>
				<view class="padding-left margin-left-xs">
					<block v-for="(item,index) in userLocationArr" :key="index">
						<view @click="_chooseMyLocation(item)" class="solid-bottom padding-tb-sm">
							<view>
								<text class="margin-right-sm text-black">{{item.address}}</text>
								<text v-if="item.tag !==''" class="cu-tag bg-olive light sm">{{item.tag}}</text>
							</view>
							<view class="text-sm margin-top-xs">
								<text class="margin-right">{{item.name}}</text>
								<text>{{item.tel}}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<!-- 我的收货地址结束 -->
			<!-- 附近地址开始 -->
			<view class="bg-white padding margin-top-sm">
				<view class="padding-bottom-sm">
					<text class="cuIcon-location text-gray margin-right-xs"></text>
					<text class="text-gray">附近地址</text>
				</view>
				<view class="padding-left margin-left-xs">
					<view v-for="(item,index) in allAddres" :key="index" :data-id="index" class="solid-bottom padding-tb">
						<text class="margin-right-sm text-black" @click="_choosePoisLocation(item)">{{item.name}}</text>
					</view>
				</view>
			</view>
			<!-- 附近地址结束 -->
		</view>
		<view class="arrList" v-show="focus">
			<scroll-view scroll-y style="max-height: 300px;border-top-left-radius:20px;border-top-right-radius: 20rpx;">
				<view  class="width100">
					<view v-for="(item,index) in jsAddres" :key="index" :data-id="index">
						<view class="padding-sm" @click="_choosejsLocation(item)">{{item.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="listMask" @touchmove.stop.prevent="moveHandle" v-show="focus"></view>
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
				focus: false,
				city: "昆明市",
				address: "null",
				isLocation: false,
				locationError: false,
			};
		},
		onLoad: function() {
			// uni.showLoading({
			// 	title: "加载中...",
			// 	mask: true
			// });
		},
		onReady() {
			uni.hideLoading();
		},
		computed: {
			...mapState(["userLocationName", "allAddres", "userLocationArr","jsAddres"]),
			...mapGetters(['getUserLocName'])
		},
		methods: {
			// 空函数 阻止穿透
			moveHandle(){},
			//搜索
			input(val) {
				console.log("搜索", val.target.value)
				if (val.target.value.length === 0) {
					this.focus = false
				}
				this.$store.dispatch('getParameters', val.target.value) //调用actions
			},
			focusfun() {
				this.focus = true
			},
			// 开始获取定位数据,选择地址
			_getCurLocation() {
				this.$store.dispatch('getjX')
			},
			// 选择我定义的地址
			_chooseMyLocation(e) {
				this.$store.commit('getUserLocation', {
					name: e.address,
					location: e.location,
				})
			},
			// 选择附近地址
			_choosePoisLocation(e) {
				this.$store.commit('getUserLocation', {
					name: e.name,
					location: e.location,
				})
			},
			_choosejsLocation(e){
				this.$store.commit('chooseAddress', {
					name: e.name,
					location: e.location,
				})
			}
		}
	};
</script>

<style>
	.cu-load::before {
		font-family: "cuIcon";
		display: inline-block;
		margin-right: 6upx;
		font-size: 28upx;
	}

	.cu-load.loading::after {
		content: "定位中...";
		font-size: 28upx;
	}

	.cu-load.erro::before {
		font-size: 28upx;
		content: "\e658";
	}

	.cu-load.over::after {
		content: "定位失败，重新定位";
		font-size: 28upx;
	}

	.arrList {
		position: fixed;
		background: #FFFFFF;
		margin-top:88rpx;
		top: 0;
		left: 0;
		right: 0;
		z-index: 90;
	}
	/* 遮布 */
	.listMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 89;
		opacity: 0.5;
		background: #6a7076;
	}
</style>
