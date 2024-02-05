<template>
  <view class="default-layout overflow-hidden">
    <slot />
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;

  // #ifdef MP-WEIXIN
  height: 100vh;

  // #endif
  // #ifndef MP-WEIXIN
  height: 100vh;
  box-sizing: content-box;

  // #endif
  overflow: hidden;

  .tabbar-box {
  }
}
</style>
