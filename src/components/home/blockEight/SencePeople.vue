<template>
  <div class="sence-people-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>现场人员</span>
    </div>
    <div class="stats-wrap">
      <div class="stats-item-wrap">
        <p class="stats-label">在场人数</p>
        <p class="stats-value">{{ scenePeopleStats?.presencePersonQuantity }}</p>
      </div>
      <div class="stats-item-wrap">
        <p class="stats-label">今日进场</p>
        <p class="stats-value">{{ scenePeopleStats?.todayInPersonQuantity }}</p>
      </div>
      <div class="stats-item-wrap">
        <p class="stats-label">今日出场</p>
        <p class="stats-value">{{ scenePeopleStats?.todayOutPersonQuantity }}</p>
      </div>
      <div class="stats-item-wrap">
        <p class="stats-label">项目总人数</p>
        <p class="stats-value">{{ scenePeopleStats?.projectPersonQuantity }}</p>
      </div>
    </div>
    <div class="chart-wrap">
      <Line :series="scenePeopleChart.series" :x-axis="scenePeopleChart.xAxis" :color="['#26477A', '#F44765']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetScenePeopleStats, apiGetScenePeopleChart } from '@/service/api/home'
import Line from '@/components/charts/Line.vue'
import useSubscription from '@/hooks/useSubscription'

const scenePeopleStats = ref<any>({})

const scenePeopleChart = ref<any>({
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
    scenePeopleStats.value = data
  }
}

/**
 * @desc 获取现场人员统计图表
 */
const getScenePeopleChart = async () => {
  const { code, data } = await apiGetScenePeopleChart()
  if (code === 20000) {
    scenePeopleChart.value.series = [
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
    scenePeopleChart.value.xAxis = data.xData
  }
}

/**
 * @desc MQTT订阅回调
 */
const listenMqttMsg = (res: any) => {
  const { topic, msg } = res
  if (topic === '/S/push/person') {
    const { dataType } = msg
    if (dataType === 'personInOut') {
      getScenePeopleStats()
      getScenePeopleChart()
    }
  }
}

useSubscription(listenMqttMsg)
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.sence-people-wrapper {
  width: 100%;
  height: 100%;
  background-image: url('../../../assets/images/home/right-top.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  .stats-wrap {
    display: flex;
    margin-top: 30px;
    margin-left: 46px;
    .stats-item-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 290px;
      height: 144px;
      margin-right: 22px;
      background-image: url('../../../assets/images/home/scene-stats.png');
      background-size: 100% 100%;
      .stats-label {
        color: #8e91a1;
        font-size: 28px;
      }
      .stats-value {
        font-size: 48px;
        font-weight: bold;
        color: #1ae3f0;
      }
    }
  }
  .chart-wrap {
    height: 420px;
    width: 100%;
    margin-top: 28px;
  }
}
</style>
