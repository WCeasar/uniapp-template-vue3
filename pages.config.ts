import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  // 可以定义 pages 字段，它具有最高的优先级
  pages: [],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-help',
    navigationBarBackgroundColor: '#fff',
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
      },
      {
        pagePath: 'pages/user/user',
      },
    ],
  },
  easycom: {
    autoscan: true,
    custom: {
      // 以Fly开头的组件,在components文件中查找引入
      '^Fly(.*)': '@/components/fly-$1/fly-$1.vue',
      '^fly-(.*)': '@/components/fly-$1/fly-$1.vue',

      // uni-ui 规则如下配置
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
})
