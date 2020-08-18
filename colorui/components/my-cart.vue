<template>
	<view class="cu-car margin-bottom">
		<view class="margin-lr-xl flex justify-between align-center round" style="height:90upx;background-color: #5C5C5C;">
			<view></view>
			<view class="text-white margin-sm align-center">
				<view class="text-sm">
					合计￥
					<text class="text-xl text-bold text-white">3</text>
				</view>
			</view>
			<view class="round bg-orange padding-lr-xl flex align-center text-white" @click="cartTopay"
			style="height:90upx;border-top-left-radius: 0;border-bottom-left-radius: 0;">提交订单</view>
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
			cartTopay(item) {
				this.$emit('cartTopay', item)
			},
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
