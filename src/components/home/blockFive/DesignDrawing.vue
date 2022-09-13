<template>
  <div class="design-drawing-wrapper">
    <swiper
      :modules="modules"
      :autoplay="{
        delay: 10000,
        disableOnInteraction: false,
      }"
      @active-index-change="onActiveIndexChange"
    >
      <template v-for="(item, index) in designImg" :key="index">
        <swiper-slide>
          <div class="img-item">
            <img :src="item.base64Image" />
          </div>
        </swiper-slide>
      </template>
    </swiper>
    <Indicator :length="designImg.length" :active-index="activeIndex" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import Indicator from '@/components/common/Indicator.vue'
import { apiGetProjectDesignImg } from '@/service/api/home'

const modules = [Pagination, Autoplay]

const designImg = ref<any[]>([])

const activeIndex = ref(1)

onMounted(() => {
  getProjectDesignImg()
})

const onActiveIndexChange = (event: any) => {
  activeIndex.value = event.realIndex + 1
}

const getProjectDesignImg = async () => {
  const { code, data } = await apiGetProjectDesignImg()
  if (code === 20000) {
    designImg.value = data
  }
}
</script>

<style lang="less" scoped>
.design-drawing-wrapper {
  width: 100%;
  height: 100%;
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      .swiper-slide {
        .img-item {
          height: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .paging-wrap {
    position: absolute;
    top: 0;
    right: 20px;
    z-index: 100;
  }
}
</style>
