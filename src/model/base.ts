// 基类

class Base {
  currentPage = 1 // 当前页面
  pageSize = 8 // 页面item个数
  data: Array<any> = [] // 数据
  hasMoreData = true // 是否有更多

  reset() {
    this.currentPage = 1
    this.pageSize = 8
    this.data = []
    this.hasMoreData = true
    return this
  }
}

export default Base
