<template>
  <div class="intelligent-building-site-wrapper">
    <div class="header-wrap">
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
            <div class="item-wrap">
              <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
              <p class="name-wrap">王丽娟</p>
              <p class="type-wrap">施工人员</p>
              <p class="time-wrap">08:32</p>
              <span class="status-wrap">出场</span>
            </div>
            <div class="item-wrap">
              <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
              <p class="name-wrap">王丽娟</p>
              <p class="type-wrap">施工人员</p>
              <p class="time-wrap">08:32</p>
              <span class="status-wrap">出场</span>
            </div>
            <div class="item-wrap">
              <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
              <p class="name-wrap">王丽娟</p>
              <p class="type-wrap">施工人员</p>
              <p class="time-wrap">08:32</p>
              <span class="status-wrap">出场</span>
            </div>
            <div class="item-wrap">
              <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
              <p class="name-wrap">王丽娟</p>
              <p class="type-wrap">施工人员</p>
              <p class="time-wrap">08:32</p>
              <span class="status-wrap">出场</span>
            </div>
            <div class="item-wrap">
              <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
              <p class="name-wrap">王丽娟</p>
              <p class="type-wrap">施工人员</p>
              <p class="time-wrap">08:32</p>
              <span class="status-wrap">出场</span>
            </div>
            <div class="item-wrap">
              <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
              <p class="name-wrap">王丽娟</p>
              <p class="type-wrap">施工人员</p>
              <p class="time-wrap">08:32</p>
              <span class="status-wrap">出场</span>
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
              <p class="stats-value">39</p>
            </div>
            <div class="stats-item-wrap">
              <p class="stats-label">今日进场</p>
              <p class="stats-value">57</p>
            </div>
            <div class="stats-item-wrap">
              <p class="stats-label">今日出场</p>
              <p class="stats-value">18</p>
            </div>
            <div class="stats-item-wrap">
              <p class="stats-label">项目总人数</p>
              <p class="stats-value">129</p>
            </div>
          </div>
          <div class="chart-wrap">
            <Line :series="inAndOutRecord.series" :x-axis="inAndOutRecord.xAxis" :color="['#26477A', '#F44765']" />
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
                <p class="stats-value">12</p>
              </div>
              <div class="split-line"></div>
              <div class="stats-item-wrap">
                <p class="stats-label">一般违章</p>
                <p class="stats-value">8</p>
              </div>
              <div class="split-line"></div>
              <div class="stats-item-wrap">
                <p class="stats-label">严重违章</p>
                <p class="stats-value">4</p>
              </div>
            </div>
            <div class="sub-title-wrap">5月违章记录</div>
            <div class="calendar-wrap">
              <YmCalendar :eventData="eventData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import YmWeather from '@/components/intelligentBuildingSite/YmWeather.vue'
import ProjectOverview from '@/components/intelligentBuildingSite/ProjectOverview.vue'
import ProjectPeople from '@/components/intelligentBuildingSite/ProjectPeople.vue'
import MonitorAndProgress from '@/components/intelligentBuildingSite/MonitorAndProgress.vue'
import WorkTicket from '@/components/intelligentBuildingSite/WorkTicket.vue'
import YmCalendar from '@/components/common/YmCalendar.vue'
import useDateTime from '@/hooks/useDateTime'

const { date, time, week } = useDateTime()

const eventData = [
  {
    day: 1,
    type: 'warning',
    content: '',
  },
  {
    day: 6,
    type: 'warning',
    content: '',
  },
]

const inAndOutRecord = ref({
  series: [
    {
      type: 'line',
      data: [12, 35, 40],
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
      data: [40, 20, 8],
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
  ],
  xAxis: ['1点', '2点', '3点'],
})
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
    justify-content: end;
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
              font-size: 18px;
              color: #ffffff;
              margin-top: 8px;
            }
            .type-wrap {
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
            background-image: url('../../assets/images/intelligentBuildingSite/work-ticket-line.png');
            background-size: 100% 100%;
            color: #55b1ff;
            text-align: center;
            line-height: 4px;
            font-size: 18px;
            font-weight: bold;
          }
          .form-wrap {
            margin-top: 28px;
            .form-item {
              display: flex;
              margin-top: 14px;
              .item-label {
                display: inline-block;
                width: 56px;
                font-size: 14px;
                color: #8e91a1;
              }
              .item-value {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                margin-left: 14px;
                font-size: 14px;
                color: #ffffff;
                span {
                  border: 1px solid #ffa721;
                  padding: 2px 14px;
                  color: #ffa721;
                  border-radius: 14px;
                  margin-right: 8px;
                  margin-bottom: 8px;
                }
              }
            }
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
