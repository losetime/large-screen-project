<template>
  <div class="env-monitor-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>环境监测</span>
    </div>
    <div class="content-wrap">
      <div class="item-wrap">
        <img src="../../../assets/images/common/temperature.png" alt="" />
        <p class="label">温度</p>
        <p class="value">
          <span>{{ envMonitor?.tem || 0 }}</span>
          <span class="unit">℃</span>
        </p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/humidity.png" alt="" />
        <p class="label">湿度</p>
        <p class="value">
          <span>{{ envMonitor?.humidity || 0 }}</span>
          <span class="unit">%</span>
        </p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/wind-speed.png" alt="" />
        <p class="label">风速</p>
        <p class="value">
          <span>{{ envMonitor?.windSpeed || 0 }}</span>
          <span class="unit">m/s</span>
        </p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/wind-direction.png" alt="" />
        <p class="label">风向</p>
        <p class="value">
          <span>{{ envMonitor?.windDirection || '暂无' }}</span>
        </p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/air-pressure.png" alt="" />
        <p class="label">气压</p>
        <p class="value">
          <span>{{ envMonitor?.airPressure || 0 }}</span>
          <span class="unit">hPa</span>
        </p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/noise.png" alt="" />
        <p class="label">噪声</p>
        <p class="value">
          <span>{{ envMonitor?.noise || 0 }}</span>
          <span class="unit">dB</span>
        </p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/pm2-5.png" alt="" />
        <p class="label">PM2.5</p>
        <p class="value">
          <span>{{ envMonitor?.pm25 || 0 }}</span>
        </p>
      </div>
      <div class="item-wrap">
        <img src="../../../assets/images/common/pm10.png" alt="" />
        <p class="label">PM10</p>
        <p class="value">
          <span>{{ envMonitor?.pm10 || 0 }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetEnvMonitorInfo } from '@/service/api/home'

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
  padding: 24px 32px;
  .content-wrap {
    display: flex;
    flex-wrap: wrap;
    .item-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      margin-top: 12px;
      img {
        width: 64px;
        height: 64px;
      }
      .label {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.7);
      }
      .value {
        span:first-child {
          font-size: 32px;
          color: #ffffff;
        }
        .unit {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.85);
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
