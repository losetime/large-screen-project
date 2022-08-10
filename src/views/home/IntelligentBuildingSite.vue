<template>
  <div class="intelligent-building-site-wrapper">
    <div class="header-wrap">
      <div class="project-wrap">
        <img src="../../assets/images/intelligentBuildingSite/logo.svg" alt="" />
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
        <ProjectPeople />
        <div class="weather-forecast-wrap">
          <div class="title-wrap">
            <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
            <span>天气预报</span>
          </div>
          <ym-weather />
        </div>
      </div>
      <div class="middle-wrap">
        <MonitorAndProgress />
        <div class="real-time-in-and-out-wrap">
          <div class="title-wrap">
            <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
            <span>实时进出</span>
          </div>
          <div class="detail-wrap">
            <div class="item-wrap" v-for="(item, index) in realTimeInAndOut" :key="index">
              <img :src="item.imageUrl || avatar" alt="" />
              <p class="name-wrap">{{ item.userName }}</p>
              <p class="type-wrap">{{ item.postName }}</p>
              <p class="time-wrap">{{ item.accessTime.slice(10) }}</p>
              <span class="status-wrap">{{ item.accessType === '1' ? '进场' : '出场' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-wrap">
        <div class="scene-people-wrap">
          <div class="title-wrap">
            <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
            <span>现场人员</span>
          </div>
          <div class="stats-wrap">
            <div class="stats-item-wrap">
              <p class="stats-label">在场人数</p>
              <p class="stats-value">{{ scenePeopleStats.presencePersonQuantity }}</p>
            </div>
            <div class="stats-item-wrap">
              <p class="stats-label">今日进场</p>
              <p class="stats-value">{{ scenePeopleStats.todayInPersonQuantity }}</p>
            </div>
            <div class="stats-item-wrap">
              <p class="stats-label">今日出场</p>
              <p class="stats-value">{{ scenePeopleStats.todayOutPersonQuantity }}</p>
            </div>
            <div class="stats-item-wrap">
              <p class="stats-label">项目总人数</p>
              <p class="stats-value">{{ scenePeopleStats.projectPersonQuantity }}</p>
            </div>
          </div>
          <div class="chart-wrap">
            <Line :series="scenePeopleChart.series" :x-axis="scenePeopleChart.xAxis" :color="['#26477A', '#F44765']" />
          </div>
        </div>
        <div class="work-ticket-and-break-rules-wrap">
          <WorkTicket />
          <div class="break-rules-wrap">
            <div class="title-wrap">
              <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
              <span>现场违章</span>
            </div>
            <div class="stats-wrap">
              <div class="stats-item-wrap">
                <p class="stats-label">累计违章</p>
                <p class="stats-value">{{ breakRulesStats.grandIllegal }}</p>
              </div>
              <div class="split-line"></div>
              <div class="stats-item-wrap">
                <p class="stats-label">一般违章</p>
                <p class="stats-value stats-warning">{{ breakRulesStats.generalIllegal }}</p>
              </div>
              <div class="split-line"></div>
              <div class="stats-item-wrap">
                <p class="stats-label">严重违章</p>
                <p class="stats-value stats-error">{{ breakRulesStats.seriousIllegal }}</p>
              </div>
            </div>
            <div class="sub-title-wrap">{{ dateUtil().month() + 1 }}月违章记录</div>
            <div class="calendar-wrap">
              <YmCalendar :eventData="calendarInfo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import YmWeather from '@/components/intelligentBuildingSite/YmWeather.vue'
import ProjectOverview from '@/components/intelligentBuildingSite/ProjectOverview.vue'
import ProjectPeople from '@/components/intelligentBuildingSite/ProjectPeople.vue'
import MonitorAndProgress from '@/components/intelligentBuildingSite/MonitorAndProgress.vue'
import WorkTicket from '@/components/intelligentBuildingSite/WorkTicket.vue'
import YmCalendar from '@/components/common/YmCalendar.vue'
import useDateTime from '@/hooks/useDateTime'
import {
  apiGetRealTimeInAndOut,
  apiGetScenePeopleStats,
  apiGetScenePeopleChart,
  apiGetSceneBreakRulesStats,
  apiGetSceneBreakRulesCalendar,
  apiGetProjectInfo,
} from '@/service/api/intelligentBuildingSite'
import avatar from '../../assets/images/peopleInAndOut/people-avatar.png'
import { dateUtil } from '@/utils/dateUtil'

const { date, time, week } = useDateTime()

const projectName = ref('')

const realTimeInAndOut = ref<any[]>([])

const scenePeopleStats = ref<any>({})

const scenePeopleChart = ref<any>({
  series: [],
  xAxis: [],
})

const breakRulesStats = ref<any>({})

const calendarInfo = ref([])

onMounted(() => {
  getProjectInfo()
  getRealTimeInAndOut()
  getScenePeopleStats()
  getScenePeopleChart()
  getSceneBreakRulesStats()
  getSceneBreakRulesCalendar()
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
 * @desc 获取实时进出
 */
const getRealTimeInAndOut = async () => {
  const { code, data } = await apiGetRealTimeInAndOut()
  if (code === 20000) {
    realTimeInAndOut.value = data
  }
}

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
</script>

<style lang="less" scoped>
@import '../../assets/style/intelligentBuildingSite.less';

.intelligent-building-site-wrapper {
  width: 100%;
  height: 1080px;
  background-image: url('../../assets/images/intelligentBuildingSite/background.png');
  background-size: cover;
  .header-wrap {
    height: 100px;
    width: 100%;
    background-image: url('../../assets/images/intelligentBuildingSite/header.png');
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
      width: 342px;
      .weather-forecast-wrap {
        height: 202px;
        width: 100%;
        background-image: url('../../assets/images/intelligentBuildingSite/project-overview.png');
        background-size: 100% 100%;
        padding: 14px 20px;
        margin-top: 14px;
        .weather-wrapper {
          margin-top: 20px;
        }
      }
    }
    .middle-wrap {
      width: 817px;
      margin-left: 14px;
      .real-time-in-and-out-wrap {
        height: 322px;
        width: 100%;
        background-image: url('../../assets/images/intelligentBuildingSite/real-time-in-and-out.png');
        background-size: 100% 100%;
        padding: 14px 20px;
        margin-top: 14px;
        .detail-wrap {
          margin-top: 14px;
          display: flex;
          justify-content: space-around;
          .item-wrap {
            width: 82px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
              width: 76px;
              height: 106px;
              border: 1px solid #1f5bb5;
              border-radius: 5px;
              padding: 4px;
            }
            .name-wrap {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: center;
              font-size: 18px;
              color: #ffffff;
              margin-top: 8px;
            }
            .type-wrap {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: center;
              font-size: 16px;
              color: #ffa721;
              margin-top: 2px;
            }
            .time-wrap {
              font-size: 18px;
              color: #8e91a1;
              margin-top: 8px;
            }
            .status-wrap {
              color: #ffffff;
              background-color: #04b2ff;
              padding: 2px 14px;
              border-radius: 14px;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .right-wrap {
      flex: 1;
      margin-left: 14px;
      .scene-people-wrap {
        width: 100%;
        height: 384px;
        background-image: url('../../assets/images/intelligentBuildingSite/scene-people.png');
        background-size: 100% 100%;
        padding: 14px 20px;
        .stats-wrap {
          display: flex;
          justify-content: space-around;
          .stats-item-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 14px;
            width: 145px;
            height: 71px;
            background-image: url('../../assets/images/intelligentBuildingSite/scene-stats.png');
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
      .work-ticket-and-break-rules-wrap {
        display: flex;
        margin-top: 14px;
        .break-rules-wrap {
          flex: 1;
          height: 546px;
          background-image: url('../../assets/images/intelligentBuildingSite/work-ticket.png');
          background-size: 100% 100%;
          padding: 14px 20px;
          margin-left: 14px;
          .stats-wrap {
            width: 90%;
            height: 72px;
            margin: 20px 0 0 5%;
            background-image: url('../../assets/images/intelligentBuildingSite/work-ticket-stats.png');
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
            background-image: url('../../assets/images/intelligentBuildingSite/break-rules-line.png');
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
      }
    }
  }
}
</style>
