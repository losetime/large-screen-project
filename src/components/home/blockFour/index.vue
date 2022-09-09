<template>
  <div class="block-four-wrapper">
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
    >
      <swiper-slide>
        <EnvMonitor />
      </swiper-slide>
      <swiper-slide>
        <Meteorological />
      </swiper-slide>
      <swiper-slide>
        <WeatherForecast />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCube, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cube'
import EnvMonitor from './EnvMonitor.vue'
import Meteorological from './Meteorological.vue'
import WeatherForecast from './WeatherForecast.vue'

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '"></span>'
  },
}

const modules = [EffectCube, Pagination]

const swiperInstance = ref()

onMounted(() => {
  swiperInstance.value.slideTo(1, false)
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}
</script>

<style lang="less" scoped>
.block-four-wrapper {
  height: 436px;
  margin-top: 34px;
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
    .swiper-pagination,
    .swiper-pagination-horizontal {
      bottom: 90% !important;
      left: 95% !important;
      width: 50px !important;
      z-index: 99;
      .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: #7282a1;
      }
      .swiper-pagination-bullet-active {
        background: #ffffff;
      }
    }
  }
}
</style>
