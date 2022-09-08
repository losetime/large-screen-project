<template>
  <div ref="playerContainer" class="player-wapper"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, watchEffect } from 'vue'
import { PuPlayer } from '@besovideo/webrtc-player'
import '@besovideo/webrtc-player/dist/main.es.css'
import { apiGetPlayerToken } from '@/service/api/home'

interface IProps {
  playerId: string
}

const props = defineProps<IProps>()

const videoFit = ref<any>('fill')
const playerInstance = ref<any>(null)
const token = ref('')
const connectStatus = ref<boolean>(false)

const playerContainer = ref()

watchEffect(() => {
  if (props.playerId && playerInstance.value) {
    playerInstance.value.setPuOption({
      id: props.playerId,
      index: 0,
    })
  }
})

onMounted(() => {
  getPlayerToken()
})

onBeforeUnmount(() => {
  playerInstance.value?.destroy()
  playerInstance.value = null
})

const getPlayerToken = async () => {
  const { code, data } = await apiGetPlayerToken()
  if (code === 20000) {
    token.value = data.loginInfo.token
    initPlayer(data.host)
  }
}

// 初始化
const initPlayer = (host: string) => {
  const { instance } = PuPlayer({
    // 容器节点,注意一个容器内只能存在一个实例
    container: playerContainer.value,
    // 必填 设备选项
    puOption: {
      // 设备id
      id: props.playerId,
      // 设备通道号
      index: 0,
    },
    // 必填 用户授权令牌
    token: token.value,
    videoFit: videoFit.value,
    // (可选) 双击是否全屏
    fullScreenOnDblclick: true,
    // (可选) 启用控制器
    enableController: true,
    onConnected: () => {
      connectStatus.value = true
      console.log('onConnected: 连接已建立')
    },
    onConnectedFailed: () => {
      connectStatus.value = false
      console.log('onConnectedFailed: 连接建立失败')
    },
    onClose: () => {
      connectStatus.value = false
      console.log('onClose: 连接已关闭（播放器关闭）')
    },
    onDisConnected: () => {
      connectStatus.value = false
      console.log('onDisConnected: 连接已关闭（服务器断开连接）')
    },
    onDestroy: () => {
      connectStatus.value = false
      console.log('onDestroy: 播放器实例已销毁')
    },
  })
  instance.setApiPrefix(host)
  playerInstance.value = instance
}

// 打开连接
const handleOpen = async () => {
  if (!playerInstance.value) return
  try {
    await playerInstance.value.open()
  } catch (e) {
    console.log(e)
  }
}

// 关闭连接
const handleClose = () => {
  playerInstance.value?.close()
}

defineExpose({
  handleOpen,
  handleClose,
  connectStatus,
})
</script>

<style lang="less">
.player-wapper {
  width: 100%;
  height: 100%;
  border: 1px solid #1691ff;
  border-radius: 14px;
  overflow: hidden;
}
</style>
