import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { setCookies, certCookies,  } from '@/plugins/cookies'

import * as s$auth from '@/services/auth'

export const d$auth = defineStore('auth', () => {
  // State
  const user = ref({
    id: undefined,
    name: undefined,
    role: undefined
  })
  // Set Login System
  const setUser = () => {
    try {
      const { id, name, role } = certCookies()
      user.value = {
        id,
        name,
        role
      }
      // return 'User Authenticated'
      return user.value
    } catch ({ message }) {
      user.value = {
        id: undefined,
        name: undefined,
        role: undefined
      }
      throw message
    }
  }
  const login = async (body) => {
    try {
      const { data } = await s$auth.login(body)
      setCookies('CERT', data.token, { datetime: data.expiresAt })
      return true
    } catch ({ error, message }) {
      throw message ?? error
    }
  }
  const register = async (body) => {
    try {
      const { data } = await s$auth.register(body)
      return data
    } catch ({ error, message }) {
      throw message ?? error
    }
  }
  // Getter
  const getUser = computed(() => user.value)
  const isLoggedIn = computed(() => !!user.value.id)

  return {
    // actions
    setUser,
    login,
    register,
    getUser,
    isLoggedIn
  }
})