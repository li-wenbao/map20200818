<template>
  <view class="flex">
    <view
      v-for="(star, index) in stars"
      :key="index"
      :class="[margin,size]"
      class="cu-rate-icon"
      @click="_onClick(index)"
    >
      <text :class="[isFill ? 'cuIcon-favorfill' : 'cuIcon-favor',color]"></text>
      <text
        :class="['cuIcon-favorfill',activeColor]"
        class="cu-rate-icon-on" :style="{ width: star.activeWitch }"
      ></text>
    </view>
  </view>
</template>

<script>
export default {
  name: "cu-rate",
  props: {
    isFill: {
      // 星星的类型，是否镂空
      type: [Boolean, String],
      default: true
    },
    color: {
      // 星星的颜色
      type: String,
      default: "text-xgray"
    },
    activeColor: {
      // 星星选中状态颜色
      type: String,
      default: "text-yellow"
    },
    size: {
      // 星星的大小
      type: String,
      default: "text-df"
    },
    value: {
      // 当前评分
      type: [Number, String],
      default: 0
    },
    max: {
      // 最大评分
      type: [Number, String],
      default: 5
    },
    margin: {
      // 星星的间距
      type: String,
      default: "margin-right"
    },
    disabled: {
      // 是否可点击
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      valueSync: ""
    };
  },
  computed: {
    stars() {
      const value = Number(this.valueSync) ? Number(this.valueSync) : 0;
      const starList = [];
      const floorValue = Math.floor(value);
      const ceilValue = Math.ceil(value);
      for (let i = 0; i < this.max; i++) {
        if (floorValue > i) {
          starList.push({
            activeWitch: "100%"
          });
        } else if (ceilValue - 1 === i) {
          starList.push({
            activeWitch: (value - floorValue) * 100 + "%"
          });
        } else {
          starList.push({
            activeWitch: "0"
          });
        }
      }
      return starList;
    }
  },
  created() {
    this.valueSync = this.value;
  },
  methods: {
    _onClick(index) {
      if (this.disabled) {
        return;
      }
      this.valueSync = index + 1;
      this.$emit("change", {
        value: this.valueSync
      });
    }
  }
};
</script>

<style>
.cu-rate-icon {
  position: relative;
  display: inline-block;
}
.cu-rate-icon-on {
  line-height: 1;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>