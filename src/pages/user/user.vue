<template>
  <view>
    user
    <button @click="handleToList">go list</button>
    <button @click="handleToPageList">go pageClick</button>
    <button @click="handleToDown">go down</button>
  </view>
</template>

<route lang="json">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "我的",
    "navigationStyle": "custom"
  }
}
</route>

<script lang="ts" setup>
const handleToList = () => {
  uni.navigateTo({
    url: '/pages/list/list',
  })
}

const handleToPageList = () => {
  uni.navigateTo({
    url: '/pages/pageList/pageList',
  })
}

const handleToDown = () => {
  uni.navigateTo({
    url: '/pages/pull-down/pull-down',
  })
}
</script>

<style lang="scss"></style>
