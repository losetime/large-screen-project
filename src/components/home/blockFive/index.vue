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
@import '@/assets/style/swiper.less';
.block-five-wrapper {
  width: 90%;
  height: 100%;
  margin-left: 5%;
  position: relative;
  ::v-deep(.swiper) {
    .swiper-pagination,
    .swiper-pagination-horizontal {
      left: 97% !important;
    }
  }
}
</style>
