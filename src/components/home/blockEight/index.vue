<template>
  <div class="block-eight-wrapper">
    <swiper :pagination="pagination" :modules="modules" :loop="true" @swiper="onSwiper">
      <swiper-slide>
        <SencePeople />
      </swiper-slide>
      <swiper-slide>
        <SafetyStats />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import SencePeople from './SencePeople.vue'
import SafetyStats from './SafetyStats.vue'

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '"></span>'
  },
}

const modules = [Pagination]

const swiperInstance = ref()

onMounted(() => {
  // swiperInstance.value.slideTo(0, false)
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}
</script>

<style lang="less" scoped>
.block-eight-wrapper {
  // height: 280px;
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
    .swiper-pagination,
    .swiper-pagination-horizontal {
      bottom: 90% !important;
      left: 91% !important;
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
