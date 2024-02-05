<template>
  <view>
    <view
      class="border bg-purple mb-2 rounded border-b border-[#333] h-[200px]"
      style="transition: all 0.3s"
      v-for="(item, index) in data"
      :key="index"
    >
      {{ item }}
    </view>

    <view class="py-1" v-if="data.length">
      <uni-load-more :status="loadStatus" :contentText="contentText" :iconSize="18"></uni-load-more>
    </view>
  </view>
</template>

<route lang="json">
{
  "layout": "home",
  "style": {
    "navigationBarTitleText": "页面列表页",
    "enablePullDownRefresh": true
  }
}
</route>

<script lang="ts" setup>
import Test from '@/model/test'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'

const test = new Test()

const loadStatus = ref<any>('more')
const contentText = {
  contentdown: '下拉拉显示更多',
  contentrefresh: '正在加载...',
  contentnomore: '没有更多数据了',
}

const data = ref<any>([])

const getData = async () => {
  const res = await test.reset().getTestData({})
  data.value = res

  console.log(data.value)
}

getData()

onPullDownRefresh(async () => {
  await getData()
  uni.stopPullDownRefresh()
})

onReachBottom(async () => {
  // 获取下一页的数据并且和当前的数据合并
  if (!test.hasMoreData) {
    return
  }
  loadStatus.value = 'loading'
  const res = await test.getTestData({})
  loadStatus.value = 'more'
  data.value = res
})
</script>

<style lang="scss"></style>
