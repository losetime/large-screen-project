<template>
  <div class="weather-wrapper">
    <img :src="getWeatherIcon(weatherInfo.weaImg)" alt="" />
    <div class="info-wrap">
      <div class="temperature">{{ weatherInfo.tem }}</div>
      <div class="weather-wrap">
        <p class="weather-text">
          <span class="sky">{{ weatherInfo.wea }}</span>
          <span class="line"></span>
          <span class="air">{{ weatherInfo.airPm25 }}</span>
        </p>
        <p>{{ weatherInfo.airLevel }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiGetWeatherInfo } from '@/service/api/home'
import { getWeatherIcon } from '@/utils/base'

const weatherInfo = ref<any>({})

onMounted(() => {
  getWeatherInfo()
})

/**
 * @desc 获取天气预报
 */
const getWeatherInfo = async () => {
  const { code, data } = await apiGetWeatherInfo()
  if (code === 20000) {
    weatherInfo.value = data
  }
}
</script>

<style lang="less" scoped>
.weather-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 133px;
    height: 110px;
    margin-right: 16px;
  }
  .info-wrap {
    .temperature {
      color: #ffffff;
      font-size: 50px;
    }
    .weather-wrap {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #ffffff;
      .weather-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        .line {
          margin: 0 18px;
          width: 2px;
          height: 28px;
          background-color: #6a6f7c;
        }
      }
      p:last-child {
        display: inline-block;
        width: 64px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border-radius: 8px;
        background-color: #029843;
        font-size: 20px;
        margin-left: 14px;
      }
    }
  }
}
</style>
