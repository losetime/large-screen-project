<template>
  <div class="overview-wrapper">
    <div id="map-wrap"></div>
    <div style="display: none">
      <div class="info-window-wrap" ref="infoWindowInstance">
        <div class="icon-wrap" @click="closeInfoWindow">
          <close-circle-outlined />
        </div>
        <h4>{{ activeMarker.bindUserName }}</h4>
        <Player :player-id="activeMarker.deviceId" ref="playerInstance" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import useMap from '@/hooks/useMap'
import HatSuccess from '@/assets/images/home/hat-success.png'
import HatWarning from '@/assets/images/home/hat-warning.png'
import { apiGetSecurityHatLocation } from '@/service/api/home'
import Player from '@/components/common/Player.vue'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
import axios from 'axios'

let infoWindow: any = null

const infoWindowInstance = ref()

const playerInstance = ref()

const markerList = ref<any[]>([])

const activeMarker = ref<any>({
  bindUserName: '',
  deviceId: '',
})

const { AMap, map, initMap, destroyMap } = useMap()

onMounted(() => {
  initMap('map-wrap').then((initDone: any) => {
    if (initDone) {
      getSecurityHatLocation()
    }
  })
})

onBeforeUnmount(() => {
  destroyMap()
})

/**
 * @desc 获取在线安全帽位置
 */
const getSecurityHatLocation = async () => {
  const { code, data } = await apiGetSecurityHatLocation()
  if (code === 20000) {
    if (data.length > 0) {
      let coords = ''
      data.forEach((item: any) => {
        const lng = item.longitude.toFixed(6)
        const lat = item.latitude.toFixed(6)
        coords = coords ? `${coords}|${lng},${lat}` : `${lng},${lat}`
      })
      convertCoords(coords).then((newCoords: any) => {
        markerList.value = data.map((item: any, index: number) => {
          const tempCoords = newCoords[index].split(',')
          return { ...item, longitude: tempCoords[0], latitude: tempCoords[1] }
        })
        createMarker()
        creatInfoWindow()
      })
    }
  }
}

const createMarker = () => {
  if (AMap) {
    const hatSuccessIcon = new AMap.value.Icon({
      size: new AMap.value.Size(50, 50),
      image: HatSuccess,
      imageSize: new AMap.value.Size(50, 50),
    })
    const hatWarningIcon = new AMap.value.Icon({
      size: new AMap.value.Size(50, 50),
      image: HatWarning,
      imageSize: new AMap.value.Size(50, 50),
    })
    const makers = markerList.value.map((item: any) => {
      const marker = new AMap.value.Marker({
        position: new AMap.value.LngLat(item.longitude, item.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        icon: item.type === 'VIDEO_HAT' ? hatSuccessIcon : hatWarningIcon,
        label: {
          direction: 'top',
          content: `<div class='mark-label'>${item.bindUserName ? item.bindUserName : item.deviceId}</div>`,
        },
      })
      if (item.type === 'VIDEO_HAT') {
        marker.on('click', (e: any) => handleMarkEvent(e, item))
      }
      return marker
    })
    map.value.add(makers)
    map.value.setFitView()
  }
}

const convertCoords = async (coords: string) => {
  const result = await axios({
    method: 'get',
    url: `https://restapi.amap.com/v3/assistant/coordinate/convert?key=54b594391cc485898ba027887d5df709&locations=${coords}&coordsys=gps`,
  })
  const { status, data } = result
  if (status === 200 && data.info === 'ok') {
    return data.locations.split(';')
  }
}

const handleMarkEvent = (e: any, marker: any) => {
  activeMarker.value = marker
  infoWindow.open(map.value, e.target.getPosition())
  playerInstance.value.handleOpen()
}

/**
 * @desc 创建信息窗口
 */
const creatInfoWindow = () => {
  infoWindow = new AMap.value.InfoWindow({
    isCustom: true,
    content: infoWindowInstance.value,
    anchor: 'top-center',
    offset: new AMap.value.Pixel(25, 45),
    close: () => {
      console.log(21323)
    },
  })
}

/**
 * @desc 关闭信息窗口
 */
const closeInfoWindow = () => {
  playerInstance.value.handleClose() // 关闭播放器
  infoWindow.close()
}
</script>

<style lang="less" scoped>
.overview-wrapper {
  #map-wrap {
    width: 100%;
    height: 652px;
    overflow: hidden;
    border: 6px solid #ffffff;
    ::v-deep(.amap-maps) {
      .amap-marker-label {
        border: 0 !important;
        background-color: transparent;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .info-window-wrap {
    width: 450px;
    height: 314px;
    padding: 14px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: 0px 0px 18px 0px rgba(233, 233, 233, 0.5);
    position: relative;
    .icon-wrap {
      position: absolute;
      top: 10px;
      right: 18px;
      color: #666666;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #ff4d4f;
      }
    }
    h4 {
      color: #666666;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 14px;
    }
    .player-wapper {
      width: 420px;
      height: 236px;
    }
  }
}
</style>
