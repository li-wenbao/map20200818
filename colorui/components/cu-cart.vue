<template>
	<view class="cu-car">
		<view class="margin-lr-xl flex justify-between align-center round" style="height:90upx;background-color: #5C5C5C;">
			<view class="" style="position:relative;bottom:10upx;left:20upx;">
				<view class="cu-tag badge">5</view>
				<image class="" style="width:130upx;height:130upx;" src="/static/car.png" />
			</view>
			<view class="text-white">
				<view class="text-xs">
					合计￥
					<text class="text-xl text-bold text-white">3</text>
				</view>
			</view>
			<view class="round bg-grey padding-lr-xl flex align-center" style="height:90upx;">提交订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-cart',
		computed: {

		},
		props: {

		},
		methods: {

		}
	}
</script>

<style>
	.cu-car {
		position: fixed;
		width: 100%;
		bottom: 0;
		min-height: 0px;
		box-shadow: 0px 0px 0px;
		z-index: 999;
	}

	.cu-tag.badge {
		border-radius: 50%;
		position: absolute;
		top: 10upx;
		right: -5upx;
		font-size: 20upx;
		height: 30upx;
		width: 30upx;
		line-height: 30upx;
		text-align: center;
		color: #ffffff;
		z-index: 1000;
	}

	.cu-tag.badge:not([class*="bg-"]) {
		background-color: #FA0000;
	}
</style>
