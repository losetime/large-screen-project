<template>
  <div class="safety-stats-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>安全宝数据</span>
    </div>
    <div class="stats-wrap">
      <div class="stats-item-wrap">
        <p class="stats-label">今日手环领用</p>
        <p class="stats-value">{{ safetyStats?.onlineTotal }}</p>
      </div>
      <div class="stats-item-wrap">
        <p class="stats-label">今日手环归还</p>
        <p class="stats-value">{{ safetyStats?.offlineTotal }}</p>
      </div>
    </div>
    <div class="chart-wrap">
      <Bar :series="safetyChart.series" :x-axis="safetyChart.xAxis" :color="['#404DFD', '#55B1FF']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetSafetyStats, apiGetSafetyChart } from '@/service/api/home'
import Bar from '@/components/charts/Bar.vue'
import useSubscription from '@/hooks/useSubscription'

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
  const { code, data } = await apiGetSafetyStats()
  if (code === 20000) {
    safetyStats.value = data
  }
}

/**
 * @desc 获取现场人员统计图表
 */
const getScenePeopleChart = async () => {
  const { code, data } = await apiGetSafetyChart()
  if (code === 20000) {
    safetyChart.value.series = [
      {
        type: 'bar',
        name: data.yData[0].label,
        barWidth: 40,
        itemStyle: {
          normal: {
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: 20,
          },
        },
        data: data.yData[0].data,
      },
      {
        type: 'bar',
        name: data.yData[1].label,
        barWidth: 40,
        itemStyle: {
          normal: {
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: 20,
          },
        },
        data: data.yData[1].data,
      },
    ]
    safetyChart.value.xAxis = data.xData
  }
}

/**
 * @desc MQTT订阅回调
 */
const listenMqttMsg = (res: any) => {
  const { topic, msg } = res
  if (topic === '/S/push/aqb') {
    const { dataType } = msg
    if (dataType === 'aqbSign') {
      getScenePeopleStats()
      getScenePeopleChart()
    }
  }
}

useSubscription(listenMqttMsg)
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.safety-stats-wrapper {
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
