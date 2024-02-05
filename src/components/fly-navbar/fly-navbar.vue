<template>
  <view :style="{ height: height + 'px' }"></view>
  <view
    class="nav-box fixed top-0 w-full z-100"
    :style="{ height: height + 'px', background: bgColor }"
  >
    <!-- 状态栏占位 -->
    <view class="status_bar" :style="{ height: statusBarHeight + 'px' }"></view>
    <!-- 导航内容 -->
    <view class="nav-main flex justify-center text-[#333]" :style="{ height: navBarHeight + 'px' }">
      <!-- 回退图标 -->
      <view
        v-if="backIcon"
        class="i-carbon-chevron-left text-[28px] absolute left-0 px-[10px]"
        @click="handleBack"
      ></view>
      <!-- 标题 -->
      <text class="nav-main-title">
        {{ title }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    // 导航栏背景色相关
    bgColor: string
    // 控制回退图标
    backIcon: boolean
    // 标题相关
    title: string
    // 特定路径
    path: string
  }>(),
  {
    bgColor: '#F5F5F5',
    backIcon: true,
    title: '首页',
    path: '',
  },
)

// 自定义导航栏高度总和
const height = ref(0)
// 微信小程序胶囊布局位置信息
const menuButtonRect = ref({})
// 状态栏高度
const statusBarHeight = ref(0)
// 导航栏高度（不包含状态栏）
const navBarHeight = ref(0)

//计算导航栏总高度
const getHeight = () => {
  // 判断获取微信小程序胶囊API是否可用
  if (uni.canIUse('getMenuButtonBoundingClientRect')) {
    // 获取状态栏高度(电量时间通知等信息-单位px)
    let sysInfo = uni.getSystemInfoSync()
    statusBarHeight.value = sysInfo.statusBarHeight || 0
    // 获取微信小程序胶囊布局位置信息
    let rect = uni.getMenuButtonBoundingClientRect()
    menuButtonRect.value = JSON.parse(JSON.stringify(rect))
    // (胶囊上部高度-状态栏高度)*2 + 胶囊高度 = 导航栏高度（不包含状态栏）
    //以此保证胶囊位于中间位置，多机型适配
    let navBarH = (rect.top - (sysInfo.statusBarHeight || 0)) * 2 + rect.height
    navBarHeight.value = navBarH
    // 状态栏高度 + 导航栏高度 = 自定义导航栏高度总和
    height.value = (sysInfo.statusBarHeight || 0) + navBarH
  } else {
    uni.showToast({
      title: '您的微信版本过低，界面可能会显示不正常',
      icon: 'none',
      duration: 4000,
    })
  }
}
//返回上一级
const handleBack = () => {
  uni.navigateBack()
}

getHeight()
</script>

<style lang="scss">
.status_bar {
  width: 100%;
}

.nav-main {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: 0 40rpx 0 20rpx;

  .back {
    width: 50rpx;
    height: 50rpx;
    margin-right: 20rpx;
  }

  .nav-main-title {
    font-size: 32rpx;
  }
}
</style>
