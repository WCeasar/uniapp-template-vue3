<template>
  <view class="flex flex-col overflow-hidden">
    <view class="bg-purple h-[100px] flex-shrink-0">3123213</view>

    <scroll-view
      :scroll-y="true"
      class="pt-3 box-border list-box"
      @scrolltolower="handleGetMoreData"
      refresher-enabled
      @refresherrefresh="handleRefreshData"
      :refresher-triggered="triggered"
    >
      <view
        class="border bg-light mb-2 rounded border-b border-[#333] h-[200px]"
        style="transition: all 0.3s"
        v-for="(item, index) in data"
        :key="index"
      >
        {{ item }}
      </view>

      <view class="py-1" v-if="!triggered">
        <uni-load-more
          :status="loadStatus"
          :contentText="contentText"
          :iconSize="18"
        ></uni-load-more>
      </view>

      <fly-safe-area></fly-safe-area>
    </scroll-view>
  </view>
</template>

<route lang="json">
{
  "layout": "home",
  "enablePullDownRefresh": true,
  "style": {
    "navigationBarTitleText": "列表页"
  }
}
</route>

<script lang="ts" setup>
const loadStatus = ref<any>('more')
const contentText = {
  contentdown: '下拉拉显示更多',
  contentrefresh: '正在加载...',
  contentnomore: '没有更多数据了',
}

const page = ref(1)
const limit = ref(5)
const data = ref<any>([1, 2, 3, 4, 5, 6, 7])
const count = ref(0)
const triggered = ref(false)

const handleGetMoreData = () => {
  if (loadStatus.value !== 'more') {
    return
  }

  page.value++
  getData()
}

const getData = async (status = 'loading') => {
  if (loadStatus.value !== 'more') {
    return
  }

  loadStatus.value = status
  const res = await new Promise<Array<number>>((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5, 6])
    }, 1000)
  })

  count.value = 50

  data.value = [...data.value, ...res]

  if (data.value.length >= count) {
    loadStatus.value = 'noMore'
  } else {
    loadStatus.value = 'more'
  }
}

const handleRefreshData = async () => {
  page.value = 1
  data.value = []
  loadStatus.value = 'more'
  triggered.value = true
  await getData('more')
  triggered.value = false
}
</script>

<style lang="scss">
.list-box {
  height: calc(100vh - 100px);
}
</style>
