<template>
  <div class="video-monitor-wrapper">
    <div class="full-screen-video-wrap" v-if="fullScreenVideoList.length > 0 && fullScreenVideoList.length <= 2">
      <swiper
        :modules="modules"
        :autoplay="{
          delay: 20000,
          disableOnInteraction: false,
        }"
        @active-index-change="onActiveIndexChange"
      >
        <template v-for="(item, index) in fullScreenVideoList" :key="index">
          <swiper-slide>
            <div class="video-item">
              <video :id="'video' + index" preload="auto" muted autoplay type="rtmp/flv">
                <source src="" />
              </video>
              <div class="time-wrap">{{ item.dateTime }}</div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
      <Indicator
        :length="fullScreenVideoList.length"
        :active-index="activeIndex"
        v-if="fullScreenVideoList.length > 0"
      />
    </div>
    <div class="split-screen-video-wrap" v-else>
      <swiper
        :modules="modules"
        :autoplay="{
          delay: 10000,
          disableOnInteraction: false,
        }"
        @active-index-change="onActiveIndexChange"
      >
        <template v-for="(chunk, chunkIndex) in splitScreenVideoList" :key="chunkIndex">
          <swiper-slide>
            <div class="video-content">
              <template v-for="(item, index) in chunk" :key="item.title">
                <div class="video-item" v-if="item.channelId">
                  <video :id="'video' + chunkIndex + '_' + index" preload="auto" muted autoplay type="rtmp/flv">
                    <source src="" />
                  </video>
                  <div class="time-wrap">{{ item.dateTime }}</div>
                </div>
                <div class="video-item" v-else>
                  <img src="../../../assets/images/home/nothing-video.png" alt="" class="placeholder-img" />
                  <p class="placeholder-tip">暂无视频</p>
                </div>
              </template>
            </div>
          </swiper-slide>
        </template>
      </swiper>
      <Indicator
        :length="splitScreenVideoList.length"
        :active-index="activeIndex"
        v-if="splitScreenVideoList.length > 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import Indicator from '@/components/common/Indicator.vue'
import { apiGetVideoList } from '@/service/api/home'
import flvjs from 'flv.js'

const modules = [Pagination, Autoplay]

const fullScreenVideoList = ref<any[]>([])

const splitScreenVideoList = ref<any[][]>([])

const activeIndex = ref(1)

const flvPlayer: any = []

onMounted(() => {
  getVideoList()
})

/**
 * @desc 获取视频列表
 */
const getVideoList = async () => {
  const { code, data } = await apiGetVideoList()
  if (code === 20000) {
    if (data.length <= 2) {
      fullScreenVideoList.value = data
      setTimeout(() => {
        fullScreenVideoList.value.forEach((item: any, index: number) => {
          if (flvjs.isSupported()) {
            const videoElement: any = document.getElementById('video' + index)
            var flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url: item.channelChild[0].videoAddress,
            })
            flvPlayer.attachMediaElement(videoElement)
            flvPlayer.load()
            flvPlayer.play()
          }
        })
      }, 200)
    } else {
      let sourceDataTemp: any[] = []
      const fillLen = 4 - (data.length % 4)
      if (fillLen > 0) {
        sourceDataTemp = [...data, ...new Array(fillLen).fill({})]
      }
      splitScreenVideoList.value = handleChunk(sourceDataTemp, 4)
      setTimeout(() => {
        const chunk = splitScreenVideoList.value[0]
        chunk.forEach((item: any, index: number) => {
          if (item.monitorId && flvjs.isSupported()) {
            var videoElement: any = document.getElementById('video' + 0 + '_' + index)
            flvPlayer[index] = flvjs.createPlayer({
              type: 'flv',
              url: item.channelChild[0].videoAddress,
            })
            flvPlayer[index].attachMediaElement(videoElement)
            flvPlayer[index].load()
            flvPlayer[index].play()
          }
        })
      }, 200)
    }
  }
}

const onActiveIndexChange = (event: any) => {
  activeIndex.value = event.realIndex + 1
  const chunk = splitScreenVideoList.value[event.realIndex]
  destroyPlayer()
  setTimeout(() => {
    chunk.forEach((item: any, index: number) => {
      if (item.monitorId && flvjs.isSupported()) {
        const videoElement: any = document.getElementById('video' + event.realIndex + '_' + index)
        flvPlayer[index] = flvjs.createPlayer({
          type: 'flv',
          url: item.channelChild[0].videoAddress,
        })
        flvPlayer[index].attachMediaElement(videoElement)
        flvPlayer[index].load()
        flvPlayer[index].play()
      }
    })
  }, 200)
}

/**
 * @desc 分割一维数组为二维数组
 */
const handleChunk = (arr: any[], size: number): any[][] => {
  var objArr = []
  var index = 0
  var objArrLen = arr.length / size
  for (var i = 0; i < objArrLen; i++) {
    var arrTemp = []
    for (var j = 0; j < size; j++) {
      arrTemp[j] = arr[index++]
      if (index == arr.length) {
        break
      }
    }
    objArr[i] = arrTemp
  }
  return objArr
}

const destroyPlayer = () => {
  for (const [index, item] of flvPlayer.entries()) {
    if (item) {
      item.pause()
      item.unload()
      item.detachMediaElement()
      item.destroy()
      flvPlayer[index] = null
    }
  }
}
</script>

<style lang="less" scoped>
.video-monitor-wrapper {
  width: 100%;
  height: 100%;
  .full-screen-video-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    ::v-deep(.swiper) {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        .swiper-slide {
          .video-item {
            height: 100%;
            height: 100%;
            video {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .paging-wrap {
      position: absolute;
      top: 0;
      right: 20px;
      z-index: 100;
    }
  }
  .split-screen-video-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    ::v-deep(.swiper) {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        .swiper-slide {
          .video-content {
            height: 100%;
            display: grid;
            grid-template-columns: repeat(2, 50%);
            grid-template-rows: repeat(2, 50%);
            grid-row-gap: 14px;
            grid-column-gap: 14px;
            .video-item {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: #010349;
              video {
                width: 100%;
                height: 100%;
              }
              .placeholder-img {
                width: 72px;
                height: 58px;
              }
              .placeholder-tip {
                font-size: 28px;
                color: #256ab4;
                margin-top: 8px;
              }
            }
          }
        }
      }
    }
    .paging-wrap {
      position: absolute;
      top: 0;
      right: 20px;
      z-index: 100;
    }
  }
}
</style>
