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
import useSubscription from '@/hooks/useSubscription'

const { componentsContainer } = useComponents(4)

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
  const slideIndex = getItem('blockFour')
  if (slideIndex !== null) {
    swiperInstance.value.slideTo(slideIndex, false)
  }
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const onActiveIndexChange = (event: any) => {
  setItem('blockFour', event.realIndex)
}

/**
 * @desc MQTT订阅回调
 */
const listenMqttMsg = (res: any) => {
  console.log(333, res)
  const { topic, msg } = res
  if (topic === '/S/push/warning') {
    const { dataType } = msg
    if (dataType === 'weatherWarning') {
      const findIndex = componentsContainer.value.findIndex((item: any) => item.__name === 'Meteorological')
      if (findIndex !== -1) {
        swiperInstance.value.slideTo(findIndex, false)
      }
    }
  }
}

useSubscription(listenMqttMsg)
</script>

<style lang="less" scoped>
@import '@/assets/style/swiper.less';
.block-four-wrapper {
  height: 436px;
  margin-top: 34px;
  ::v-deep(.swiper) {
    .swiper-pagination,
    .swiper-pagination-horizontal {
      left: 94% !important;
    }
  }
}
</style>
