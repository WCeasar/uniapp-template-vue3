<template>
  <view class="content">
    <view class="text-area">
      <fly-header></fly-header>
      <text class="title">{{ store.count }}</text>
      <button class="i-carbon-sun dark:i-carbon-moon text-3xl" />
      <uni-icons type="contact" size="30"></uni-icons>
      <uni-badge text="1"></uni-badge>
      <view class="flex flex-col">
        <view v-for="item in 200" :key="item"> 2313 + {{ item }} </view>
      </view>
    </view>
  </view>
</template>

<route lang="json">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "首页",
    "navigationStyle": "custom"
  }
}
</route>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountStore } from '@/store'

const store = useCountStore()

const title = ref('Hello')

const handleClick = () => {
  // uni.navigateTo({
  //   url: '/pages/word/word',
  // })
  // store.increment()
  uni.navigateTo({
    url: '/pages/user/user',
  })
}
</script>

<style lang="scss" scoped>
page {
  background-color: #8f8f94;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
@/store/count
