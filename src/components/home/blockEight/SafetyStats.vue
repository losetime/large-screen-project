<template>
  <div class="safety-stats-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>安全宝数据</span>
    </div>
    <div class="stats-wrap">
      <div class="stats-item-wrap">
        <p class="stats-label">今日手环领用</p>
        <p class="stats-value">{{ safetyStats?.presencePersonQuantity }}</p>
      </div>
      <div class="stats-item-wrap">
        <p class="stats-label">今日手环归还</p>
        <p class="stats-value">{{ safetyStats?.todayInPersonQuantity }}</p>
      </div>
    </div>
    <div class="chart-wrap">
      <Line :series="safetyChart.series" :x-axis="safetyChart.xAxis" :color="['#26477A', '#F44765']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetScenePeopleStats, apiGetScenePeopleChart } from '@/service/api/intelligentBuildingSite'
import Line from '@/components/charts/Line.vue'

const safetyStats = ref<any>({})

const safetyChart = ref<any>({
  series: [],
  xAxis: [],
})

onMounted(() => {
  getScenePeopleStats()
  getScenePeopleChart()
})

/**
 * @desc 获取现场人员统计
 */
const getScenePeopleStats = async () => {
  const { code, data } = await apiGetScenePeopleStats()
  if (code === 20000) {
    safetyStats.value = data
  }
}

/**
 * @desc 获取现场人员统计图表
 */
const getScenePeopleChart = async () => {
  const { code, data } = await apiGetScenePeopleChart()
  if (code === 20000) {
    safetyChart.value.series = [
      {
        type: 'line',
        name: data.yData[0].name,
        data: data.yData[0].data,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0674BC', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#081126', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        type: 'line',
        name: data.yData[1].name,
        data: data.yData[1].data,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(244,71,101, 0.8)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(244,71,101, 0.2)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ]
    safetyChart.value.xAxis = data.xData
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.safety-stats-wrapper {
  width: 100%;
  height: 384px;
  background-image: url('../../../assets/images/home/right-top.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .stats-wrap {
    display: flex;
    .stats-item-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 14px;
      width: 145px;
      height: 71px;
      margin-right: 22px;
      background-image: url('../../../assets/images/home/scene-stats.png');
      background-size: 100% 100%;
      .stats-label {
        color: #8e91a1;
        font-size: 14px;
      }
      .stats-value {
        font-size: 22px;
        font-weight: bold;
        color: #1ae3f0;
      }
    }
  }
  .chart-wrap {
    height: 200px;
    width: 100%;
    margin-top: 28px;
  }
}
</style>
