<template>
  <div class="block-seven-wrapper">
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
        <PeopleInAndOut />
      </swiper-slide>
      <swiper-slide>
        <PeopleReportToDuty />
      </swiper-slide>
      <swiper-slide>
        <BraceletRecord />
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
import PeopleInAndOut from './PeopleInAndOut.vue'
import PeopleReportToDuty from './PeopleReportToDuty.vue'
import BraceletRecord from './BraceletRecord.vue'
import { setItem, getItem } from '@/utils/base'

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '"></span>'
  },
}

const modules = [EffectCube, Pagination]

const swiperInstance = ref()

onMounted(() => {
  const slideIndex = getItem('blockSeven')
  if (slideIndex !== null) {
    swiperInstance.value.slideTo(slideIndex, false)
  }
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onActiveIndexChange = (event: any) => {
  setItem('blockSeven', event.realIndex)
}
</script>

<style lang="less" scoped>
.block-seven-wrapper {
  height: 636px;
  margin-top: 32px;
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
    .swiper-pagination,
    .swiper-pagination-horizontal {
      bottom: 90% !important;
      left: 97% !important;
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
