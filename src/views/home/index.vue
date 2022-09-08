<template>
  <div class="intelligent-building-site-wrapper">
    <div class="header-wrap">
      <div class="project-wrap">
        <img src="../../assets/images/home/logo.svg" alt="" />
        <span>{{ projectName }}</span>
      </div>
      <div class="time-wrap">
        <span>{{ time }}</span>
        <span>{{ date }}</span>
        <span>{{ week }}</span>
      </div>
    </div>
    <div class="content-wrap">
      <div class="left-wrap">
        <ProjectOverview />
        <ProjectPeople :height="[388, 328]" />
        <BlockFour />
      </div>
      <div class="middle-wrap">
        <MonitorAndProgress :type="judgeBuildingSite" />
        <BlockSeven />
      </div>
      <div class="right-wrap">
        <BlockEight />
        <div class="right-bottom-wrap">
          <WorkTicket />
          <AlarmRecord />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ProjectOverview from '@/components/home/ProjectOverview.vue'
import ProjectPeople from '@/components/home/ProjectPeople.vue'
import MonitorAndProgress from '@/components/home/MonitorAndProgress.vue'
import WorkTicket from '@/components/home/WorkTicket.vue'
import useDateTime from '@/hooks/useDateTime'
import {
  apiGetSceneBreakRulesStats,
  apiGetSceneBreakRulesCalendar,
  apiGetProjectInfo,
  apiGetEnvMonitorInfo,
  apiGetVRTrainInfo,
  apiGetSignsAlarmInfo,
} from '@/service/api/home'
import BlockSeven from '@/components/home/blockSeven/index.vue'
import BlockFour from '@/components/home/blockFour/index.vue'
import BlockEight from '@/components/home/blockEight/index.vue'
import AlarmRecord from '@/components/home/AlarmRecord.vue'

const { date, time, week } = useDateTime()

const projectName = ref('')

const breakRulesStats = ref<any>({})

const calendarInfo = ref([])

const signsAlarm = ref<any[]>([])

const signsAlarmCount = ref(0)

const envMonitor = ref<any>({})

const vrTrainInfo = ref<any>({})

// 判断是哪个工地
const judgeBuildingSite = computed(() => {
  if (projectName.value.includes('中营')) {
    return 'zhongying'
  } else if (projectName.value.includes('蓝田')) {
    return 'lantian'
  } else if (projectName.value.includes('咸阳')) {
    return 'xianyang'
  } else {
    return 'normal'
  }
})

onMounted(() => {
  getProjectInfo()
  // getScenePeopleStats()
  // getScenePeopleChart()
  // getSceneBreakRulesStats()
  // getSceneBreakRulesCalendar()
  getEnvMonitorInfo()
  getVRTrainInfo()
  getSignsAlarmfo()

  // setInterval(() => {
  //   getScenePeopleStats()
  // }, 15000)

  setInterval(() => {
    getProjectInfo()
    // getScenePeopleChart()
    getSceneBreakRulesStats()
    getSceneBreakRulesCalendar()
    getEnvMonitorInfo()
    getVRTrainInfo()
    getSignsAlarmfo()
  }, 1000 * 60 * 15)
})

/**
 * @desc 获取工程信息
 */
const getProjectInfo = async () => {
  const { code, data } = await apiGetProjectInfo()
  if (code === 20000) {
    projectName.value = data.prjSingleName
  }
}

/**
 * @desc 获取违章统计
 */
const getSceneBreakRulesStats = async () => {
  const { code, data } = await apiGetSceneBreakRulesStats()
  if (code === 20000) {
    breakRulesStats.value = data
  }
}

/**
 * @desc 获取违章日历信息
 */
const getSceneBreakRulesCalendar = async () => {
  const { code, data } = await apiGetSceneBreakRulesCalendar()
  if (code === 20000) {
    calendarInfo.value = data.map((item: any) => {
      const tempDay = item.illegalDate.split('-')[2]
      const type = item.illegalLevel === 'red' ? 'error' : item.illegalLevel === 'yellow' ? 'warning' : 'green'
      return { day: parseInt(tempDay), type: type, content: '' }
    })
  }
}

/**
 * @desc 环境监测
 */
const getEnvMonitorInfo = async () => {
  const { code, data } = await apiGetEnvMonitorInfo()
  if (code === 20000 && data) {
    envMonitor.value = data
  }
}

/**
 * @desc VR培训
 */
const getVRTrainInfo = async () => {
  const { code, data } = await apiGetVRTrainInfo()
  if (code === 20000 && data) {
    vrTrainInfo.value = data
  }
}

/**
 * @desc 体征告警
 */
const getSignsAlarmfo = async () => {
  const { code, data } = await apiGetSignsAlarmInfo()
  if (code === 20000 && data) {
    let count = 0
    signsAlarm.value = [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        itemStyle: {
          borderRadius: 4,
        },
        label: {
          position: 'inside',
          formatter: '{c}',
          backgroundColor: 'none',
          color: '#ffffff',
        },
        data: data.map((item: any) => {
          count += item.value
          return { name: item.label, value: item.value }
        }),
      },
    ]
    signsAlarmCount.value = count
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/home.less';

.intelligent-building-site-wrapper {
  width: 3840px;
  height: 2160px;
  background-image: url('../../assets/images/home/background.png');
  background-size: cover;
  .header-wrap {
    height: 231px;
    width: 100%;
    background-image: url('../../assets/images/home/header.png');
    background-size: cover;
    background-position: 100% 25%;
    display: flex;
    justify-content: space-between;
    .project-wrap {
      height: 118px;
      width: 28%;
      display: flex;
      align-items: center;
      margin-left: 40px;
      img {
        width: 80px;
        height: 80px;
      }
      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #09bcf2;
        margin-left: 14px;
        font-size: 60px;
        font-weight: bold;
      }
    }
    .time-wrap {
      color: #ffffff;
      font-size: 40px;
      height: 118px;
      line-height: 118px;
      margin-right: 40px;
      span:nth-child(2) {
        margin: 0 14px;
      }
    }
  }
  .content-wrap {
    display: flex;
    padding: 14px;
    .left-wrap {
      width: 20%;
    }
    .middle-wrap {
      width: 40%;
      margin-left: 14px;
    }
    .right-wrap {
      width: 38.6%;
      margin-left: 14px;
      .right-bottom-wrap {
        display: flex;
        margin-top: 32px;
      }
    }
  }
}
</style>
