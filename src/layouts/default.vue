<template>
  <view class="default-layout overflow-hidden">
    <fly-navbar :title="currentTitle" :backIcon="false" path="/pages/index/index"></fly-navbar>
    <view class="overflow-y-scroll">
      <slot />
    </view>
    <fly-tabbar :currentUrl="currentUrl" :tabbarList="tabbarList"></fly-tabbar>
  </view>
</template>

<script setup lang="ts">
const tabbarList = [
  {
    icon: 'i-carbon-home',
    path: 'pages/index/index',
    text: '首页',
  },
  {
    icon: 'i-carbon-user',
    path: 'pages/user/user',
    text: '我的',
  },
]

const currentUrl = computed(() => {
  let pages = getCurrentPages() //获取加载的页面
  let currentPage = pages[pages.length - 1] //获取当前页面的对象
  console.log('🚀 ~ currentUrl ~ currentPage:', currentPage)
  let url = currentPage.route //当前页面url
  return url || ''
})

const currentTitle = computed(() => {
  return currentUrl.value && tabbarList.find((item) => currentUrl.value.includes(item.path))?.text
})

const HeadNavHeight = ref(0)
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;

  // #ifdef MP-WEIXIN
  height: 100vh;

  // #endif
  // #ifndef MP-WEIXIN
  min-height: 100vh;

  // #endif
  overflow: hidden;

  .tabbar-box {
  }
}
</style>
