import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { loadEnv } from 'vite'
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import dayjs from 'dayjs'
import svgLoader from 'vite-svg-loader'
// 打包后，会在根目录下生成一个 stats.html文件
import { visualizer } from 'rollup-plugin-visualizer'
// 通过监听文件修改，自动重启 vite 服务  最常用的场景就是监听 vite.config.js 和 .env.development 文件,修改 vite 配置文件和环境配置文件，是需要重启 vite 才会生效
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import ViteImagemin from 'vite-plugin-imagemin'
import autoprefixer from 'autoprefixer'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'

// 自定义插件方法
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transFormIndexHtml(html) {
      return html.replace('%BUILD_DATE%', dayjs().format(''))
    },
  }
}

// unplugin-vue-components uniapp 不支持，uniapp 使用easycom的方式自动引入组件，不需要这个vite插件

export default ({ mode }) => {
  // mode区分生产环境还是开发环境
  // process.cwd() 获取当前文件的目录和地址
  // loadEnv 返回当前环境env文件中额外定义的变量

  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))
  console.log(env)

  return defineConfig({
    plugins: [
      UniPages({
        exclude: ['**/components/**/**.*'],
        routeBlockLang: 'json5', // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
        homePage: 'pages/index/index',
        subPackages: ['src/pages-sub'], // 这是个数组，可以写多个
      }),
      UniLayouts(),
      // UniXXX 需要在 Uni 之前引入
      uni(),
      // 在 Vite 驱动的 uni-app 上使用基于文件的路由系统。
      UnoCSS(),
      htmlPlugin(),
      svgLoader(),
      // 打包分析插件 打包后，会在根目录下生成一个 stats.html文件
      visualizer(),
      ViteRestart({
        // 修改vite.config.ts 不用手动重启vite就能生效
        restart: ['vite.config.ts'],
      }),
      // vue3等插件hooks自动引入
      // 支持vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core等自动引入
      AutoImport({
        imports: ['vue'],
        // 可以选择auto-import.d.ts生成的位置,使用ts建议设置为src/auto-import.d.ts
        dts: 'src/auto-import.d.ts',
      }),
      // 在使用setup语法糖的时候没办法直接为组件定义name，需要使用两个script标签来完成
      // 使用vite-plugin-vue-setup-extend
      // <script lang="ts" setup name="自定义name">
      VueSetupExtend(),
      createSvgIconsPlugin({
        // 指定svg图标 保存的文件夹路径,
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // 会多出一些.gz文件，如xxx.js.gz，这里默认是不会删除xxx.js文件的，如果想删除也可以增加配置
      // vite-plugin-compression是一个基于Vite的插件,用于gzip或Brotli压缩你的资源，从而减少页面的加载时间和网络带宽，提高用户访问速度和体验。
      viteCompression(),
      ViteImagemin({
        gifsicle: {
          // gif图片压缩
          optimizationLevel: 3, // 选择1到3之间的优化级别
          interlaced: false, // 隔行扫描gif进行渐进式渲染
          // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
        },
        optipng: {
          // png
          optimizationLevel: 7, // 选择0到7之间的优化级别
        },
        mozjpeg: {
          // jpeg
          quality: 20, // 压缩质量, 范围从0(最差)到100(最佳)
        },
        pngquant: {
          // png
          // min和max是介于0(最差)到1(最佳)之间的数字,类似于jpeg,
          // 达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
          quality: [0.8, 0.9],
        },
        svgo: {
          // svg压缩
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
    ],

    css: {
      postcss: {
        plugins: [
          // 前端开发中，为兼容所有浏览器，部分CSS属性需要加上不同的浏览器前缀
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['> 1%', 'last 2 versions'],
          }),
        ],
      },
    },

    resolve: {
      // 配置路径别名
      alias: {
        '@': path.join(process.cwd(), './src'),
      },
    },

    server: {
      host: '0.0.0.0',
      hmr: true,
      port: 7001,
      // 自定义代理规则
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://localhost:6666',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      // 处理清除console的插件
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: env.VITE_DELETE_CONSOLE === 'true',
          drop_debugger: env.VITE_DELETE_CONSOLE === 'true',
        },
      },
    },
  })
}
