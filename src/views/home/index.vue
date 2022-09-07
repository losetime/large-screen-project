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
        <div class="work-ticket-and-break-rules-wrap">
          <WorkTicket />
          <!-- <div class="break-rules-wrap">
            <div class="title-wrap">
              <img src="../../assets/images/home/title-icon.png" alt="" />
              <span>现场违章</span>
            </div>
            <div class="stats-wrap">
              <div class="stats-item-wrap">
                <p class="stats-label">累计违章</p>
                <p class="stats-value">{{ breakRulesStats?.grandIllegal }}</p>
              </div>
              <div class="split-line"></div>
              <div class="stats-item-wrap">
                <p class="stats-label">一般违章</p>
                <p class="stats-value stats-warning">{{ breakRulesStats?.generalIllegal }}</p>
              </div>
              <div class="split-line"></div>
              <div class="stats-item-wrap">
                <p class="stats-label">严重违章</p>
                <p class="stats-value stats-error">{{ breakRulesStats?.seriousIllegal }}</p>
              </div>
            </div>
            <div class="sub-title-wrap">{{ dateUtil().month() + 1 }}月违章记录</div>
            <div class="calendar-wrap">
              <YmCalendar :eventData="calendarInfo" />
            </div>
          </div> -->
          <div class="right-blick-wrap">
            <div class="signs-alarm-wrap">
              <div class="title-wrap">
                <img src="../../assets/images/home/title-icon.png" alt="" />
                <span>体征告警</span>
              </div>
              <div class="chart-wrap">
                <Pie :series="signsAlarm" />
                <div class="count-wrap">
                  <p>告警总数</p>
                  <p>{{ signsAlarmCount }}</p>
                </div>
              </div>
            </div>
            <div class="warehousing-wrap">
              <div class="title-wrap">
                <img src="../../assets/images/home/title-icon.png" alt="" />
                <span>VR培训</span>
              </div>
              <div class="stats-wrap">
                <div class="stats-item-wrap">
                  <p class="stats-label">培训人数</p>
                  <p class="stats-value">{{ vrTrainInfo?.trainNum }}</p>
                </div>
                <div class="stats-item-wrap">
                  <p class="stats-label">人均培训时长</p>
                  <p class="stats-value">{{ vrTrainInfo?.trainDurationStr }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ProjectOverview from '@/components/intelligentBuildingSite/ProjectOverview.vue'
import ProjectPeople from '@/components/intelligentBuildingSite/ProjectPeopleTemp.vue'
import MonitorAndProgress from '@/components/intelligentBuildingSite/MonitorAndProgressTemp.vue'
import WorkTicket from '@/components/intelligentBuildingSite/WorkTicket.vue'
// import Line from '@/components/charts/Line.vue'
import Pie from '@/components/charts/Pie.vue'
import useDateTime from '@/hooks/useDateTime'
import {
  // apiGetScenePeopleStats,
  // apiGetScenePeopleChart,
  apiGetSceneBreakRulesStats,
  apiGetSceneBreakRulesCalendar,
  apiGetProjectInfo,
  apiGetEnvMonitorInfo,
  apiGetVRTrainInfo,
  apiGetSignsAlarmInfo,
} from '@/service/api/intelligentBuildingSite'
import BlockSeven from '@/components/home/blockSeven/index.vue'
import BlockFour from '@/components/home/blockFour/index.vue'
import BlockEight from '@/components/home/blockEight/index.vue'

const { date, time, week } = useDateTime()

const projectName = ref('')

// const scenePeopleStats = ref<any>({})

// const scenePeopleChart = ref<any>({
//   series: [],
//   xAxis: [],
// })

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
  width: 100%;
  height: 1080px;
  background-image: url('../../assets/images/home/background.png');
  background-size: cover;
  .header-wrap {
    height: 100px;
    width: 100%;
    background-image: url('../../assets/images/home/header.png');
    background-size: cover;
    background-position: 100% 25%;
    display: flex;
    justify-content: space-between;
    .project-wrap {
      height: 40px;
      width: 28%;
      display: flex;
      align-items: center;
      margin: 6px 0 0 14px;
      img {
        width: 40px;
        height: 40px;
      }
      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #09bcf2;
        margin-left: 14px;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .time-wrap {
      color: #ffffff;
      font-size: 18px;
      margin: 14px 28px 0 0;
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
      .work-ticket-and-break-rules-wrap {
        display: flex;
        margin-top: 14px;
        .break-rules-wrap {
          flex: 1;
          height: 546px;
          background-image: url('../../assets/images/home/work-ticket.png');
          background-size: 100% 100%;
          padding: 14px 20px;
          margin-left: 14px;
          .stats-wrap {
            width: 90%;
            height: 72px;
            margin: 20px 0 0 5%;
            background-image: url('../../assets/images/home/work-ticket-stats.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .stats-item-wrap {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .stats-label {
                font-size: 14px;
                color: #8e91a1;
              }
              .stats-value {
                font-size: 20px;
                font-weight: bold;
                color: #1ae3f0;
              }
              .stats-warning {
                color: #f6b900;
              }
              .stats-error {
                color: #f44765;
              }
            }
            .split-line {
              width: 2px;
              height: 24px;
              background-color: #55b1ff;
            }
          }
          .sub-title-wrap {
            height: 4px;
            width: 100%;
            margin-top: 42px;
            background-image: url('../../assets/images/home/break-rules-line.png');
            background-size: 100% 100%;
            color: #55b1ff;
            text-align: center;
            line-height: 4px;
            font-size: 18px;
            font-weight: bold;
          }
          .calendar-wrap {
            width: 100%;
            margin-top: 20px;
          }
        }
        .right-blick-wrap {
          width: 341px;
          margin-left: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .signs-alarm-wrap {
            padding: 14px 20px;
            height: 332px;
            background-image: url('../../assets/images/home/work-ticket.png');
            background-size: 100% 100%;
            .chart-wrap {
              height: 270px;
              position: relative;
              .count-wrap {
                position: absolute;
                top: 42%;
                left: 41%;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
            }
          }
          .warehousing-wrap {
            padding: 14px 20px;
            height: 200px;
            background-image: url('../../assets/images/home/work-ticket.png');
            background-size: 100% 100%;
            .stats-wrap {
              display: flex;
              justify-content: space-between;
              .stats-item-wrap {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 35px;
                width: 140px;
                height: 71px;
                background-image: url('../../assets/images/home/scene-stats.png');
                background-size: 100% 100%;
                .stats-label {
                  color: #8e91a1;
                  font-size: 14px;
                }
                .stats-value {
                  font-size: 18px;
                  font-weight: bold;
                  color: #1ae3f0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
