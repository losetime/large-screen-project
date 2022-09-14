<template>
  <div class="block-eight-wrapper">
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
      <template v-for="(item, index) in componentsContainer" :key="index">
        <swiper-slide>
          <component :is="item" />
        </swiper-slide>
      </template>
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
import { setItem, getItem } from '@/utils/base'
import useComponents from '@/hooks/useComponents'

const { componentsContainer } = useComponents(8)

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    const tempIndex = index + 1
    return '<span class="' + className + '"> ' + tempIndex + '</span>'
  },
}

const modules = [EffectCube, Pagination]

const swiperInstance = ref()

onMounted(() => {
  const slideIndex = getItem('blockEight')
  if (slideIndex !== null) {
    swiperInstance.value.slideTo(slideIndex, false)
  }
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onActiveIndexChange = (event: any) => {
  setItem('blockEight', event.realIndex)
}
</script>

<style lang="less" scoped>
.block-eight-wrapper {
  height: 780px;
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
    .swiper-pagination,
    .swiper-pagination-horizontal {
      left: 96% !important;
      width: 50px !important;
      z-index: 99;
      .swiper-pagination-bullet {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        opacity: 0.4;
        border: 3px solid #55b1ff;
        color: #55b1ff;
      }
      .swiper-pagination-bullet-active {
        color: #ffffff;
        border: 3px solid #ffffff;
        background-color: #000000;
        box-shadow: 0px 0px 5px 1px #ffffff;
        font-weight: bold;
      }
    }
  }
}
</style>
