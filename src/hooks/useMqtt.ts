import { watch } from 'vue'
import mqtt from 'mqtt/dist/mqtt'
import { message } from 'ant-design-vue'
import { throttle } from 'lodash-es'
import { useStore } from '@/store'
import { nanoid } from 'nanoid'

const useMqtt = () => {
  let client: any

  let msgLoading: Function

  const topicList = ['/S/push/person', '/S/push/warning', '/S/push/aqb']

  const store = useStore()

  const msgKey = 'tip'

  const options = {
    connectTimeout: 10000,
    username: 'cvit',
    password: 'Cvit@029',
  }

  watch(
    () => store.state.mqttUrl,
    (value) => {
      if (value) {
        initMqtt()
      }
    },
  )

  const initMqtt = () => {
    const mqttUrl = store.state.mqttUrl
    client = mqtt.connect(mqttUrl, options)
    client.on('connect', () => {
      if (msgLoading) {
        msgLoading()
      }
      client.subscribe(topicList, (error: any) => {
        //订阅指定主题testtopic
        // client.subscribe('#',{qos:0},(error)=>{//订阅全部主题testtopic
        if (!error) {
          message.success('MQTT订阅成功')
        } else {
          msgLoading = message.loading({ content: 'MQTT订阅失败...', key: msgKey, duration: 0 })
        }
      })
    })
    client.on('message', (topic: any, msg: any) => {
      console.log(msg)
      const tempMsg = JSON.parse(msg.toString())
      // callback(topic, msg)
      store.commit('SET_SUBSCRIPTION_MQTT_INFO', { id: nanoid(), topic, msg: tempMsg })
    })
    client.on('close', () => {
      throttle(reconnect, 5000)
    })
  }

  const reconnect = () => {
    client.reconnect()
    msgLoading = message.loading({ content: 'MQTT服务连接失败, 正在重连', key: msgKey, duration: 0 })
  }

  return {
    initMqtt,
  }
}

export default useMqtt
