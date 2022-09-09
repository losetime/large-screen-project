<template>
  <div class="video-monitor-wrapper">
    <div class="full-screen-video-wrap" v-if="fullScreenVideoList.length > 0 && fullScreenVideoList.length <= 2">
      <swiper
        :modules="modules"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :loop="true"
        @swiper="onSwiper"
        @active-index-change="onActiveIndexChange"
      >
        <template v-for="(item, index) in fullScreenVideoList" :key="index">
          <swiper-slide>
            <div class="video-item">
              <video :src="item.channelChild[0].videoAddress" controls></video>
              <div class="time-wrap">{{ item.dateTime }}</div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
      <Indicator :length="fullScreenVideoList.length" :active-index="activeIndex" />
    </div>
    <div class="split-screen-video-wrap" v-else>
      <!-- :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }" -->
      <swiper :modules="modules" :loop="true" @swiper="onSwiper" @active-index-change="onActiveIndexChange">
        <template v-for="(videoList, index) in splitScreenVideoList" :key="index">
          <swiper-slide>
            <div class="video-content">
              <template v-for="item in videoList" :key="item.title">
                <div class="video-item" v-if="item.channelId">
                  <video :src="item.channelChild[0].videoAddress" controls></video>
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
      <Indicator :length="splitScreenVideoList.length" :active-index="activeIndex" />
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

const modules = [Pagination, Autoplay]

const fullScreenVideoList = ref<any[]>([])

const splitScreenVideoList = ref<any[][]>([])

const activeIndex = ref(1)

const swiperInstance = ref()

onMounted(() => {
  // swiperInstance.value.slideTo(1, false)
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
    } else {
      let sourceDataTemp: any[] = []
      const fillLen = 4 - (data.length % 4)
      if (fillLen > 0) {
        sourceDataTemp = [...data, ...new Array(fillLen).fill({})]
      }
      splitScreenVideoList.value = handleChunk(sourceDataTemp, 4)
    }
  }
}

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onActiveIndexChange = (event: any) => {
  activeIndex.value = event.realIndex + 1
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
