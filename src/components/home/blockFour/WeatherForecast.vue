<template>
  <div class="weather-forecast-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>天气预报</span>
    </div>
    <div class="content-wrap">
      <img :src="getWeatherIcon(weatherInfo?.weaImg)" alt="" />
      <div class="info-wrap">
        <div class="temperature">{{ weatherInfo?.tem || '--' }}</div>
        <div class="weather-wrap">
          <p class="weather-text">
            <span class="sky">{{ weatherInfo?.wea || '暂无' }}</span>
            <span class="line"></span>
            <span class="air">{{ weatherInfo?.airPm25 || 0 }}</span>
          </p>
          <p>{{ weatherInfo?.airLevel || '无' }}</p>
        </div>
      </div>
    </div>
    <div class="five-days-weather-wrap">
      <template v-for="item in weatherDay7" :key="item.date">
        <div class="item-weather-wrap">
          <p>{{ item.week }}</p>
          <img :src="getWeatherIcon(item.weaImg)" alt="" />
          <p>{{ item.tem }}℃</p>
          <p class="line"></p>
          <p>{{ item.maxTem }}℃</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiGetWeatherInfo, apiGetWeatherDay5 } from '@/service/api/home'
import { getWeatherIcon } from '@/utils/base'

const weatherInfo = ref<any>({})

const weatherDay7 = ref<any[]>([
  {
    date: '今天',
    weaImg: 'qing',
    tem1: '19℃',
    tem2: '30℃',
  },
  {
    date: '今天',
    weaImg: 'qing',
    tem1: '19℃',
    tem2: '30℃',
  },
  {
    date: '今天',
    weaImg: 'qing',
    tem1: '19℃',
    tem2: '30℃',
  },
  {
    date: '今天',
    weaImg: 'qing',
    tem1: '19℃',
    tem2: '30℃',
  },
  {
    date: '今天',
    weaImg: 'qing',
    tem1: '19℃',
    tem2: '30℃',
  },
  {
    date: '今天',
    weaImg: 'qing',
    tem1: '19℃',
    tem2: '30℃',
  },
  {
    date: '今天',
    weaImg: 'qing',
    tem1: '19℃',
    tem2: '30℃',
  },
])

onMounted(() => {
  getWeatherInfo()
  getWeatherDay7()
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

/**
 * @desc 获取近7天天气预报
 */
const getWeatherDay7 = async () => {
  const { code, data } = await apiGetWeatherDay5()
  if (code === 20000) {
    weatherDay7.value = data
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.weather-forecast-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/left-bottom.png');
  background-size: 100% 100%;
  padding: 24px 32px;
  .content-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 32px;
    top: 30px;
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
          .sky {
            font-size: 28px;
          }
          .line {
            margin: 0 18px;
            width: 2px;
            height: 24px;
            background-color: #6a6f7c;
          }
          .air {
            font-size: 28px;
          }
        }
        p:last-child {
          display: inline-block;
          padding: 2px 10px;
          text-align: center;
          border-radius: 8px;
          background-color: #029843;
          font-size: 20px;
          margin-left: 14px;
        }
      }
    }
  }
  .five-days-weather-wrap {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
    .item-weather-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 108px;
      height: 250px;
      background-image: url('../../../assets/images/home/weather-background.png');
      background-size: 100% 100%;
      color: #ffffff;
      font-size: 30px;
      img {
        width: 60px;
      }
      .line {
        height: 20px;
        width: 2px;
        margin: -15px 0;
        border-radius: 1px;
        background-color: #6a6f7c;
      }
    }
  }
}
</style>
