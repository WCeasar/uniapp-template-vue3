// uno.config.ts
import { presetUni } from '@uni-helper/unocss-preset-uni'

import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    // presetUno(),
    presetUni(), // 生成小程序文件去除*等小程序不识别的css符号
    // 支持css class属性化 eg: <button bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" text="sm white">attributify Button</button>``
    presetAttributify(),
    // 支持图标, 需要搭配图标库 eg: @iconify-json/carbon 使用`<button class="i-carbon-sun dark:i-carbon-moon" />``
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
    // 支持css class组合, eg:`<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
  ],
})
