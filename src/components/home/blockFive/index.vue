<template>
  <div class="block-five-wrapper">
    <swiper
      :effect="'cube'"
      :grabCursor="true"
      :cubeEffect="{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }"
      :direction="'vertical'"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { EffectCube, Pagination } from 'swiper'
import VideoMonitor from './VideoMonitor.vue'
import Location from './Location.vue'
import DesignDrawing from './DesignDrawing.vue'

const modules = [EffectCube, Pagination]
</script>

<style lang="less" scoped>
/* 创建正方体旋转动画 */
@keyframes cube {
  from {
    transform: rotateX(0);
  }

  to {
    transform: rotateX(360deg);
  }
}
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
