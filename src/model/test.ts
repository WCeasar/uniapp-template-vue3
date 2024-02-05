import request from '@/utils/http'
import Base from './base'

class Test extends Base {
  // 继承，子类，父类
  async getTestData(data: any) {
    if (!this.hasMoreData) {
      return this.data
    }
    // 发起网络请求，获取数据
    const res = await request<{
      list: Array<any>
      total: number
    }>({
      method: 'GET',
      url: '/api/question',
      data: {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...data,
      },
    })

    const list = res.data.list
    const total = res.data.total

    this.data = this.data.concat(list)
    this.hasMoreData = !(this.data.length === total)
    this.currentPage = this.hasMoreData ? this.currentPage + 1 : this.currentPage
    return this.data
  }
}

export default Test
