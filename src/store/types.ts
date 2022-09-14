export interface StateInterface {
  token: string
  userInfo: UserInfoInterface
  sidebarStatus: boolean
  screenConfigInfo: any[]
  mqttUrl: string
  subscriptionMqttInfo: ISubscriptionMqttInfo
}

export interface UserInfoInterface {
  userName: string
  userId: number
}

export interface ISubscriptionMqttInfo {
  id: string
  topic: string
  msg: string
}
