import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { isDevMode } from '@/enums/envEnum'
import { StateInterface, UserInfoInterface } from './types'
import { apiGetUserInfo } from '@/service/api/login'
import { apiGetScreenConfigInfo, apiGetConnectionInfo } from '@/service/api/home'

export const key: InjectionKey<Store<StateInterface>> = Symbol()

/**
 * @desc 包装useStore，避免组件每次都需要导入key值
 */
export function useStore() {
  return baseUseStore(key)
}

const store = createStore({
  state() {
    return <StateInterface>{
      token: '',
      userInfo: { userName: '', userId: 0 },
      sidebarStatus: false,
      screenConfigInfo: [],
      mqttUrl: '',
      subscriptionMqttInfo: {
        id: '',
        topic: '',
        msg: '',
      },
    }
  },
  mutations: {
    SET_TOKEN(state: StateInterface, payload: string) {
      state.token = payload
    },
    SET_USER_INFO(state: StateInterface, payload: UserInfoInterface): void {
      state.userInfo = payload
    },
    SET_SIDEBAR_STATUS(state: StateInterface, payload: StateInterface['sidebarStatus']) {
      state.sidebarStatus = payload
    },
    SET_SCREEN_CONFIG_INFO(state: StateInterface, payload: StateInterface['screenConfigInfo']) {
      state.screenConfigInfo = payload
    },
    SET_MQTT_URL(state: StateInterface, payload: StateInterface['mqttUrl']) {
      state.mqttUrl = payload
    },
    SET_SUBSCRIPTION_MQTT_INFO(state: StateInterface, payload: StateInterface['subscriptionMqttInfo']) {
      state.subscriptionMqttInfo = payload
    },
  },
  actions: {
    /**
     * @desc 获取用户信息
     */
    async GetUserInfo({ commit }) {
      const { code, data } = await apiGetUserInfo()
      if (code === 20000) {
        const userInfo = {
          userName: data.user.userName,
          userId: data.user.userId,
        }
        commit('SET_USER_INFO', userInfo)
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    },
    /**
     * @desc 获取全局模块配置
     */
    async GetScreenConfigInfo({ commit }) {
      const { code, data } = await apiGetScreenConfigInfo()
      if (code === 20000) {
        commit('SET_SCREEN_CONFIG_INFO', data)
      }
    },
    /**
     * @desc 获取mqtt连接信息
     */
    async GetConnectionInfo({ commit }) {
      const protocol = window.location.protocol
      const hostname = window.location.hostname
      const url = 'http://192.168.35.159'
      // const { code, data } = await apiGetConnectionInfo(`${protocol}//${hostname}:12240`)
      const { code, data } = await apiGetConnectionInfo(`${url}:12240`)
      if (code === 20000) {
        commit('SET_MQTT_URL', data.EMQX_URL)
      }
    },
  },
  strict: isDevMode(),
})

export default store
