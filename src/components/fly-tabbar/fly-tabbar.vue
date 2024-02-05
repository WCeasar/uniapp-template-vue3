<template>
  <view>
    <view>
      <view class="h-[60px]"></view>
      <fly-safe-area></fly-safe-area>
    </view>
    <view
      class="tabbar-box flex w-full flex-col fixed bottom-0 border-[#ddd] border-b-0 border-l-0 border-r-0 border-t border-solid bg-white z-100"
    >
      <view class="flex w-full h-[60px]">
        <view
          :class="[
            'tabbar-item flex-1 flex flex-col items-center justify-center',
            { 'text-red': currentUrl.includes(item.path) },
          ]"
          v-for="(item, index) in tabbarList"
          :key="index"
          @click="handleNav(item.path)"
        >
          <view :class="[item.icon + ' ' + 'text-[22px] mb-[1px]']"></view>
          <text :class="['tab-text text-[14px]']">{{ item.text }}</text>
        </view>
      </view>

      <fly-safe-area></fly-safe-area>
    </view>
  </view>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    tabbarList: {
      path: string
      icon: string
      text: string
    }[]
    currentUrl: string
  }>(),
  {
    tabbarList: () => [],
    currentUrl: '',
  },
)

const handleNav = (path: string) => {
  console.log('🚀 ~ handleNav ~ path:', path)

  uni.switchTab({
    url: '/' + path,
  })
}
</script>

<style lang="scss"></style>
