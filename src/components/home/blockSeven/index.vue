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

const { componentsContainer } = useComponents(7)

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
@import '@/assets/style/swiper.less';
.block-seven-wrapper {
  height: 636px;
  margin-top: 32px;
}
</style>
