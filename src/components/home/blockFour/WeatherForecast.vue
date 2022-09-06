<template>
  <div class="weather-forecast-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>天气预报</span>
    </div>
    <div class="content-wrap">
      <img :src="getWeatherIcon(weatherInfo?.weaImg)" alt="" />
      <div class="info-wrap">
        <div class="temperature">{{ weatherInfo?.tem }}</div>
        <div class="weather-wrap">
          <p class="weather-text">
            <span class="sky">{{ weatherInfo?.wea }}</span>
            <span class="line"></span>
            <span class="air">{{ weatherInfo?.airPm25 }}</span>
          </p>
          <p>{{ weatherInfo?.airLevel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiGetWeatherInfo } from '@/service/api/intelligentBuildingSite'
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
@import '../../../assets/style/home.less';
.weather-forecast-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/project-overview.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .content-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 110px;
      margin-right: 16px;
    }
    .info-wrap {
      .temperature {
        color: #ffffff;
        font-size: 45px;
      }
      .weather-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        .weather-text {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          .line {
            margin: 0 18px;
            width: 2px;
            height: 24px;
            background-color: #6a6f7c;
          }
        }
        p:last-child {
          display: inline-block;
          padding: 2px 10px;
          text-align: center;
          border-radius: 8px;
          background-color: #029843;
          font-size: 18px;
          margin-left: 14px;
        }
      }
    }
  }
}
</style>
