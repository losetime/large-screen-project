<template>
  <div class="env-monitor-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>环境监测</span>
    </div>
    <div class="content-wrap">
      <div class="item-wrap">
        <img src="../../../assets/images/common/temperature.png" alt="" />
        <p>温度</p>
        <p>{{ envMonitor?.tem }}℃</p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/humidity.png" alt="" />
        <p>湿度</p>
        <p>{{ envMonitor?.humidity }}%</p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/wind-speed.png" alt="" />
        <p>风速</p>
        <p>{{ envMonitor?.windSpeed }}m/s</p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/wind-direction.png" alt="" />
        <p>风向</p>
        <p>{{ envMonitor?.windDirection }}</p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/air-pressure.png" alt="" />
        <p>气压</p>
        <p>{{ envMonitor?.airPressure }}hPa</p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/noise.png" alt="" />
        <p>噪声</p>
        <p>{{ envMonitor?.noise }}dB</p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/pm2-5.png" alt="" />
        <p>PM2.5</p>
        <p>{{ envMonitor?.pm25 }}</p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/pm10.png" alt="" />
        <p>PM10</p>
        <p>{{ envMonitor?.pm10 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetEnvMonitorInfo } from '@/service/api/intelligentBuildingSite'

const envMonitor = ref<any>({})

onMounted(() => {
  getEnvMonitorInfo()
})

/**
 * @desc 环境监测
 */
const getEnvMonitorInfo = async () => {
  const { code, data } = await apiGetEnvMonitorInfo()
  if (code === 20000 && data) {
    envMonitor.value = data
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.env-monitor-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/left-bottom.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .content-wrap {
    display: flex;
    flex-wrap: wrap;
    .item-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      margin-top: 15px;
      img {
        width: 50px;
        height: 50px;
      }
      p {
        color: #ffffff;
      }
    }
  }
}
</style>
