<template>
  <div class="overview-wrapper">
    <div id="map-wrap"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import useMap from '@/hooks/useMap'
import videoHat from '@/assets/images/home/video-hat.png'
import locationHat from '@/assets/images/home/location.png'
import bracelet from '@/assets/images/home/bracelet.png'
import { apiGetLocationInfo } from '@/service/api/home'
import axios from 'axios'

const markerList = ref<any[]>([])

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
  const { code, data } = await apiGetLocationInfo()
  if (code === 20000) {
    const { safetyHatLocations, watchLocations } = data
    if (safetyHatLocations.length > 0) {
      let coords = ''
      safetyHatLocations.forEach((item: any) => {
        const lng = item.longitude.toFixed(6)
        const lat = item.latitude.toFixed(6)
        coords = coords ? `${coords}|${lng},${lat}` : `${lng},${lat}`
      })
      convertCoords(coords).then((newCoords: any) => {
        markerList.value = safetyHatLocations.map((item: any, index: number) => {
          const tempCoords = newCoords[index].split(',')
          return { ...item, longitude: tempCoords[0], latitude: tempCoords[1] }
        })
        createMarker()
      })
    }
    if (watchLocations.length > 0) {
      let coords = ''
      watchLocations.forEach((item: any) => {
        const lng = item.longitude.toFixed(6)
        const lat = item.latitude.toFixed(6)
        coords = coords ? `${coords}|${lng},${lat}` : `${lng},${lat}`
      })
      convertCoords(coords).then((newCoords: any) => {
        markerList.value = safetyHatLocations.map((item: any, index: number) => {
          const tempCoords = newCoords[index].split(',')
          return {
            longitude: tempCoords[0],
            latitude: tempCoords[1],
            bindUserName: item.personName,
            deviceId: item.deviceSn,
          }
        })
        createMarker()
      })
    }
  }
}

const createMarker = () => {
  if (AMap) {
    const videoHatIcon = new AMap.value.Icon({
      size: new AMap.value.Size(69, 69),
      image: videoHat,
      imageSize: new AMap.value.Size(69, 69),
    })
    const locationHatIcon = new AMap.value.Icon({
      size: new AMap.value.Size(69, 69),
      image: locationHat,
      imageSize: new AMap.value.Size(69, 69),
    })
    const braceletIcon = new AMap.value.Icon({
      size: new AMap.value.Size(69, 69),
      image: bracelet,
      imageSize: new AMap.value.Size(69, 69),
    })
    const makers = markerList.value.map((item: any) => {
      const marker = new AMap.value.Marker({
        position: new AMap.value.LngLat(item.longitude, item.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        icon: item.type === 'VIDEO_HAT' ? videoHatIcon : item.type === 'LOCATION_HAT' ? locationHatIcon : braceletIcon,
        label: {
          direction: 'top',
          content: `<div class='mark-label' style="font-size: 24px; margin-bottom: 10px;">${
            item.bindUserName ? item.bindUserName : item.deviceId
          }</div>`,
        },
      })
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
</script>

<style lang="less" scoped>
.overview-wrapper {
  #map-wrap {
    width: 100%;
    height: 680px;
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
}
</style>
