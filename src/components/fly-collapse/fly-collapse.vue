<template>
  <!-- <view class="box bg-pink" :class="{ 'h-[400px]!': isFolded }"> -->
  <view
    class="box"
    :style="{ height: !isFolded ? `${originHeight}px` : `${foldedHeight}px` }"
    ref="compRef"
  >
    <view class="content before" v-if="!isFolded">
      <!-- 这里放置你的内容 -->
      <slot name="title"></slot>
    </view>

    <view class="content after">
      <slot name="content"></slot>
    </view>
  </view>
  <view class="fold-button" @click="toggleFold">
    <!-- 这里放置你的折叠图标 -->
    <view :class="`${isFolded ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'}`"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isFolded: false,
      originHeight: 0,
      foldedHeight: 0,
    }
  },
  methods: {
    toggleFold() {
      this.isFolded = !this.isFolded
    },
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this)

    query
      .select('.after')
      .boundingClientRect((data) => {
        this.foldedHeight = data.height
        console.log('foldedHeight.value:', this.foldedHeight)
      })
      .exec()

    query
      .select('.before')
      .boundingClientRect((data) => {
        this.originHeight = data.height
        console.log('originHeight.value:', this.originHeight)
      })
      .exec()
  },
}
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden; /* 默认折叠时隐藏内容 */
  transition: height 0.3s ease-in-out; /* 添加过渡动画 */
  position: relative;
  background-color: rgb(238, 238, 238);
}

.content {
  position: absolute;
  top: 0;
  z-index: 2;
  background-color: rgb(238, 238, 238);
}

.fold-button {
  /* 这里添加你的折叠按钮样式 */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
