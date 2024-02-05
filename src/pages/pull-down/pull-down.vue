<template>
  <view>
    <fly-collapse>
      <template #title> 1=============1 </template>
      <template #content>
        <view v-for="item in 10" :key="item"> {{ item }}=============1 </view>
      </template>
    </fly-collapse>
  </view>
</template>
<route lang="json">
{
  "layout": "home",
  "style": {
    "navigationBarTitleText": "下拉盒子",
    "enablePullDownRefresh": true
  }
}
</route>

<script lang="ts" setup></script>

<style scoped></style>
