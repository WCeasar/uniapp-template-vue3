import { useUserStore } from '@/store'
import type { UserInfo } from '@/typings'

const userStore = useUserStore()
type Data<T> = {
  code: number
  msg: string
  data: T
}

// 请求基地址
const baseUrl = import.meta.env.VITE_SERVER_BASEURL

// 拦截器配置
const httpInterceptor = {
  // 拦截器触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非http开头的请求地址需要拼接地址
    if (!options.url?.startsWith('http')) {
      options.url = baseUrl + options.url
    }

    // 2. 请求超时
    options.timeout = 10000 // 10s

    // 3. 添加小程序请求头标识
    options.header = {
      platform: 'mp-weixin', // 可选值与uniapp定义的平台一致, 告诉后台来源
      ...options.header,
    }

    // 4. 添加token请求头标识
    const token = (userStore.userInfo as unknown as UserInfo)?.token
    if (token) {
      options.header.Authorization = `Bearer ${token}`
    }
  },
}

// 拦截request请求
uni.addInterceptor('request', httpInterceptor)

// 拦截uploadFile文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

const http = <T>(options: UniApp.RequestOptions) => {
  // 返回Promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx 参考axios的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误 -> 清理用户信息, 跳转到登录页
          userStore.clearUserInfo()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          // 其他状态码 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },

      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误, 换个网络试试',
        })

        reject(err)
      },
    })
  })
}

export default http
