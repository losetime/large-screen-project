<template>
  <div class="block-five-wrapper">
    <swiper
      :effect="'cube'"
      :grabCursor="true"
      :cubeEffect="{
        shadow: false,
        slideShadows: false,
      }"
      :direction="'vertical'"
      :pagination="pagination"
      :modules="modules"
      @swiper="onSwiper"
      @active-index-change="onActiveIndexChange"
    >
      <swiper-slide>
        <VideoMonitor />
      </swiper-slide>
      <swiper-slide>
        <Location />
      </swiper-slide>
      <swiper-slide>
        <DesignDrawing />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { EffectCube, Pagination } from 'swiper'
import VideoMonitor from './VideoMonitor.vue'
import Location from './Location.vue'
import DesignDrawing from './DesignDrawing.vue'
import { setItem, getItem } from '@/utils/base'

const modules = [EffectCube, Pagination]

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '"></span>'
  },
}

const swiperInstance = ref()

onMounted(() => {
  const slideIndex = getItem('blockFive')
  if (slideIndex !== null) {
    swiperInstance.value.slideTo(slideIndex, false)
  }
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onActiveIndexChange = (event: any) => {
  setItem('blockFive', event.realIndex)
}
</script>

<style lang="less" scoped>
.block-five-wrapper {
  width: 90%;
  height: 100%;
  margin-left: 5%;
  position: relative;
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0%;
    top: 0%;
    .swiper-slide {
      background-position: center;
      background-size: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
