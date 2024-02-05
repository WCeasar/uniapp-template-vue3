import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo } from '@/typings/index'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()

  const setUserInfo = (val: UserInfo) => {
    userInfo.value = val
  }

  const clearUserInfo = () => {
    userInfo.value = undefined
  }

  return {
    userInfo,
    setUserInfo,
    clearUserInfo,
  }
})
