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
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { EffectCube, Pagination } from 'swiper'
import { setItem, getItem } from '@/utils/base'
import useComponents from '@/hooks/useComponents'

const { componentsContainer } = useComponents(5)

const modules = [EffectCube, Pagination]

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    const tempIndex = index + 1
    return '<span class="' + className + '"> ' + tempIndex + '</span>'
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
