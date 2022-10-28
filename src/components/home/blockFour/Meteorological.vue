<template>
  <div class="meteorological-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon-warning.png" alt="" />
      <span>气象预警</span>
    </div>
    <div class="warning-date">{{ meteorologicalInfo[activeIndex - 1]?.warningTime }}</div>
    <Indicator :length="meteorologicalInfo.length" :active-index="activeIndex" v-if="meteorologicalInfo.length > 1" />
    <swiper
      :modules="modules"
      :autoplay="{
        delay: 10000,
        disableOnInteraction: false,
      }"
      @swiper="onSwiper"
      @active-index-change="onActiveIndexChange"
      v-if="meteorologicalInfo.length > 0"
    >
      <template v-for="(item, index) in meteorologicalInfo" :key="index">
        <swiper-slide>
          <div class="item-wrap">
            <div class="warning-title">
              <div class="type-wrap">
                <span class="label-wrap">预警类型</span>
                <span class="value-wrap" :style="{ color: getWarningStyle(item.warningLevel) }">{{
                  item.warningType
                }}</span>
              </div>
              <div class="level-wrap">
                <span class="label-wrap">预警等级</span>
                <span
                  class="value-wrap"
                  :style="{
                    backgroundColor: getWarningStyle(item.warningLevel),
                    color: item.warningLevel === '白色' || item.warningLevel === '黄色' ? '#000000' : '#ffffff',
                  }"
                >
                  {{ item.warningLevel }}预警
                </span>
              </div>
            </div>
            <div class="warning-text">{{ item.warningContent }}</div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
    <div class="empty-wrap" v-else>
      <img src="../../../assets/images/home/warning-empty.png" alt="" />
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import Indicator from '@/components/common/Indicator.vue'
import { apiGetMeteorologicalAlarm } from '@/service/api/home'
import useSubscription from '@/hooks/useSubscription'

const modules = [Pagination, Autoplay]

const meteorologicalInfo = ref<any>([])

const activeIndex = ref(1)

const swiperInstance = ref()

onMounted(() => {
  getMeteorologicalAlarm()
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}

const getMeteorologicalAlarm = async () => {
  const { code, data } = await apiGetMeteorologicalAlarm()
  if (code === 20000) {
    meteorologicalInfo.value = data
  }
}

const onActiveIndexChange = (event: any) => {
  activeIndex.value = event.realIndex + 1
}

const getWarningStyle = (type: string) => {
  switch (type) {
    case '蓝色':
      return '#0CB1F1'
    case '橙色':
      return '#FA9027'
    case '黄色':
      return 'yellow'
    case '红色':
      return 'red'
    case '白色':
      return 'white'
  }
}

/**
 * @desc MQTT订阅回调
 */
const listenMqttMsg = (res: any) => {
  const { topic, msg } = res
  if (topic === '/S/push/warning') {
    const { dataType } = msg
    if (dataType === 'weatherWarning') {
      getMeteorologicalAlarm()
    }
  }
}

useSubscription(listenMqttMsg)
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.meteorological-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/meteorological.png');
  background-size: 100% 100%;
  padding: 24px 32px;
  .title-wrap {
    span {
      color: #f44765;
    }
  }
  .warning-date {
    position: absolute;
    top: 32px;
    right: 35px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8);
  }
  .paging-wrap {
    position: absolute;
    bottom: 20px;
    left: 45%;
    z-index: 100;
  }
  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      .swiper-slide {
        .item-wrap {
          color: #ffffff;
          .warning-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 14px;
            .type-wrap {
              display: flex;
              justify-content: center;
              align-items: center;
              .label-wrap {
                font-size: 24px;
              }
              .value-wrap {
                font-size: 40px;
                margin-left: 8px;
              }
            }
            .level-wrap {
              display: flex;
              justify-content: center;
              align-items: center;
              .label-wrap {
                font-size: 24px;
              }
              .value-wrap {
                font-size: 20px;
                border-radius: 16px;
                margin-left: 8px;
                padding: 2px 10px;
              }
            }
          }
          .warning-text {
            margin-top: 14px;
            font-size: 28px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
  .empty-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      color: #f44765;
      font-size: 28px;
    }
  }
}
</style>
