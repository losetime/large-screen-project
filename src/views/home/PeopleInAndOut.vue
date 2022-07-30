<template>
  <div class="overview-wrapper">
    <div class="header-wrap"></div>
    <div class="content-wrap">
      <div class="date-and-weather-wrap">
        <div class="date-wrap">
          <div class="date-text">
            <span>{{ date }}</span>
            <span>{{ week }}</span>
          </div>
          <time-calendar />
        </div>
        <ym-weather />
        <div class="wind-speed-wrap">
          <div class="wind-level">{{ windInfo.winSpeed }}</div>
          <div class="wind-content-wrap">
            <div class="wind-speed">
              <img src="../../assets/images/peopleInAndOut/wind-speed.png" alt="" />
              <div class="wind-speed-text">
                <p>
                  <span>{{ windInfo.winMeter || 0 }}</span>
                  km/h
                </p>
                <p>风速</p>
              </div>
            </div>
            <div class="wind-direction">
              <img src="../../assets/images/peopleInAndOut/wind-direction.png" alt="" />
              <div class="wind-direction-text">
                <p>{{ windInfo.win }}</p>
                <p>风向</p>
              </div>
            </div>
          </div>
        </div>
        <div class="five-days-weather-wrap">
          <template v-for="item in weatherDay7" :key="item.date">
            <div class="item-weather-wrap">
              <p>{{ item.date.slice(5) }}</p>
              <img :src="getWeatherIcon(item.weaImg)" alt="" />
              <p>{{ item.tem2 }}</p>
              <p class="line"></p>
              <p>{{ item.tem1 }}</p>
            </div>
          </template>
        </div>
      </div>
      <div class="main-content-wrap">
        <div class="stats-wrap">
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/presence-people-number.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">在场人数</p>
              <p class="value-wrap">{{ peopleInAndOutStats.presencePersonQuantity }}</p>
            </div>
          </div>
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/today-presence.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">今日进场</p>
              <p class="value-wrap">{{ peopleInAndOutStats.todayInPersonQuantity }}</p>
            </div>
          </div>
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/today-go-out.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">今日出场</p>
              <p class="value-wrap">{{ peopleInAndOutStats.todayOutPersonQuantity }}</p>
            </div>
          </div>
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/project-count.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">项目总人数</p>
              <p class="value-wrap">{{ peopleInAndOutStats.projectPersonQuantity }}</p>
            </div>
          </div>
        </div>
        <div class="bottom-wrap">
          <div class="chart-wrap">
            <div class="post-distribute-wrap">
              <div class="title">
                <span></span>
                <span>在场人员岗位分布</span>
              </div>
              <div class="chart-content-wrap">
                <Bar
                  :series="peoplePostDistribute.series || []"
                  :x-axis="peoplePostDistribute.xAxis || []"
                  y-axis-name="单位：人"
                />
              </div>
            </div>
            <div class="people-type-and-project-distribute-wrap">
              <div class="title">
                <span></span>
                <span>在场人员类型 & 项目部分布</span>
              </div>
              <div class="chart-content-wrap">
                <div class="people-type-wrap">
                  <Pie :series="peopleType" title="在场人员类型" />
                </div>
                <div class="project-distribute-wrap">
                  <Pie :series="projectDistribute" title="项目部分布" />
                </div>
              </div>
            </div>
          </div>
          <div class="in-and-out-record-wrap">
            <div class="title">
              <span></span>
              <span>进出场记录</span>
            </div>
            <div class="record-content-wrap">
              <template v-for="item in peopleInAndOutRecord" :key="item.userName">
                <div class="item-wrap">
                  <img :src="item.useImageUrl" alt="" />
                  <div class="prople-info-wrap">
                    <div class="name-wrap">
                      <span class="name-text">{{ item.userName }}</span>
                      <span class="action-status">{{ item.accessType === '1' ? '进场' : '出场' }}</span>
                    </div>
                    <p class="people-post">{{ item.postName }}</p>
                    <p class="in-or-out-time">{{ item.accessTime }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import TimeCalendar from '@/components/peopleInAndOut/TimeCalendar.vue'
import YmWeather from '@/components/peopleInAndOut/YmWeather.vue'
import Bar from '@/components/charts/Bar.vue'
import Pie from '@/components/charts/Pie.vue'
import useDateTime from '@/hooks/useDateTime'
import { getWeatherIcon } from '@/utils/base'
import {
  apiGetWindInfo,
  apiGetWeatherDay7,
  apiGetPeopleInAndOutStats,
  apiGetPeoplePostDistribute,
  apiGetPeopleType,
  apiGetProjectDistribute,
  apiGetPeopleInAndOutRecord,
} from '@/service/api/home'

const { date, week } = useDateTime()

const windInfo = ref<any>({})

const weatherDay7 = ref<any[]>([])

const peopleInAndOutStats = ref<any>({})

const peoplePostDistribute = ref<any>({})

const peopleType = ref<any[]>([])

const projectDistribute = ref<any[]>([])

const peopleInAndOutRecord = ref<any[]>([])

onBeforeMount(() => {
  getWindInfo()
  getWeatherDay7()
  getPeopleInAndOutStats()
  getPeoplePostDistribute()
  getPeopleType()
  getProjectDistribute()
  getPeopleInAndOutRecord()
})

/**
 * @desc 获取风力信息
 */
const getWindInfo = async () => {
  const { code, data } = await apiGetWindInfo()
  if (code === 20000) {
    windInfo.value = { ...data, winMeter: data.winMeter.split('k')[0] }
  }
}

/**
 * @desc 获取近7天天气预报
 */
const getWeatherDay7 = async () => {
  const { code, data } = await apiGetWeatherDay7()
  if (code === 20000) {
    weatherDay7.value = data
  }
}

/**
 * @desc 获取人员进出统计
 */
const getPeopleInAndOutStats = async () => {
  const { code, data } = await apiGetPeopleInAndOutStats()
  if (code === 20000) {
    peopleInAndOutStats.value = data
  }
}

/**
 * @desc 现场人员岗位分布
 */
const getPeoplePostDistribute = async () => {
  const { code, data } = await apiGetPeoplePostDistribute()
  if (code === 20000) {
    peoplePostDistribute.value = {
      series: [
        {
          type: 'bar',
          data: data.yData,
          barMaxWidth: 50,
          label: {
            show: true,
            position: 'top',
            color: '#ffffff',
          },
        },
      ],
      xAxis: data.xData,
    }
  }
}

/**
 * @desc 人员类型
 */
const getPeopleType = async () => {
  const { code, data } = await apiGetPeopleType()
  if (code === 20000) {
    peopleType.value = [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        itemStyle: {
          borderRadius: 4,
        },
        label: {
          formatter: '{d}%',
          backgroundColor: 'none',
          color: '#ffffff',
        },
        data: data.map((item: any) => ({ value: item.value, name: item.label })),
      },
    ]
  }
}

/**
 * @desc 项目分布
 */
const getProjectDistribute = async () => {
  const { code, data } = await apiGetProjectDistribute()
  if (code === 20000) {
    projectDistribute.value = [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        itemStyle: {
          borderRadius: 4,
        },
        label: {
          formatter: '{d}%',
          backgroundColor: 'none',
          color: '#ffffff',
        },
        data: data.map((item: any) => ({ value: item.value, name: item.label })),
      },
    ]
  }
}

/**
 * @desc 获取人员进出记录
 */
const getPeopleInAndOutRecord = async () => {
  const { code, data } = await apiGetPeopleInAndOutRecord()
  if (code === 20000) {
    peopleInAndOutRecord.value = data
  }
}
</script>

<style lang="less" scoped>
.overview-wrapper {
  width: 100%;
  height: 1080px;
  background-image: url('../../assets/images/peopleInAndOut/background.png');
  background-size: cover;
  .header-wrap {
    height: 110px;
    width: 100%;
    background-image: url('../../assets/images/peopleInAndOut/header.png');
    background-size: cover;
    background-position: 100% 25%;
  }
  .content-wrap {
    display: none;
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
    .date-and-weather-wrap {
      height: 950px;
      width: 439px;
      padding: 0 14px;
      background-image: url('../../assets/images/peopleInAndOut/date-and-weather.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .date-wrap {
        .date-text {
          display: flex;
          justify-content: space-between;
          padding: 0 28px;
          margin: 28px 0;
          font-size: 32px;
          color: #ffffff;
        }
      }
      .weather-wrapper {
        margin-top: 55px;
      }
      .wind-speed-wrap {
        width: 100%;
        height: 220px;
        margin-top: 55px;
        background-image: url('../../assets/images/peopleInAndOut/record-item.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 28px 14px;
        .wind-level {
          font-size: 28px;
          font-weight: bold;
          color: #ffc80b;
        }
        .wind-content-wrap {
          display: flex;
          margin-top: 28px;
          .wind-speed {
            flex: 1;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
            }
            .wind-speed-text {
              margin-left: 8px;
              p:first-child {
                color: #ffffff;
                span {
                  font-size: 32px;
                  font-weight: bold;
                  color: #ffc80b;
                }
              }
              p:last-child {
                color: #9ea1ab;
                font-size: 20px;
              }
            }
          }
          .wind-direction {
            flex: 1;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
            }
            .wind-direction-text {
              margin-left: 8px;
              p:first-child {
                font-size: 32px;
                font-weight: bold;
                color: #0cb1f1;
              }
              p:last-child {
                color: #9ea1ab;
                font-size: 20px;
              }
            }
          }
        }
      }
      .five-days-weather-wrap {
        display: flex;
        justify-content: space-around;
        margin-top: 55px;
        .item-weather-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 65px;
          height: 227px;
          background-image: url('../../assets/images/peopleInAndOut/weather-background.png');
          background-size: 100% 100%;
          color: #ffffff;
          img {
            width: 37px;
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
    .main-content-wrap {
      height: 950px;
      flex: 1;
      margin-left: 14px;
      .stats-wrap {
        display: flex;
        justify-content: space-between;
        height: 210px;
        .stats-item-wrap {
          width: 339px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('../../assets/images/peopleInAndOut/stats-background.png');
          background-size: 100% 100%;
          img {
            width: 118px;
            height: 156px;
          }
          .text-wrap {
            margin-left: 20px;
            .label-wrap {
              font-size: 28px;
              font-weight: bold;
              color: #b6e2ff;
            }
            .value-wrap {
              font-size: 60px;
              font-weight: bold;
              text-align: center;
              color: #b6e2ff;
              font-family: DINAlternate-Bold, DINAlternate, serif;
            }
          }
        }
      }
      .bottom-wrap {
        display: flex;
        height: calc(100% - 224px);
        margin-top: 14px;
        .chart-wrap {
          flex: 1;
          height: 100%;
          background-image: url('../../assets/images/peopleInAndOut/chart-background.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          .post-distribute-wrap {
            padding: 0 14px;
            margin-top: 20px;
            .title {
              display: flex;
              align-items: center;
              color: #ffffff;
              font-size: 18px;
              span:first-child {
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: #4bd5ff;
                margin-right: 10px;
              }
            }
            .chart-content-wrap {
              width: 100%;
              height: 280px;
              margin-top: 24px;
            }
          }
          .people-type-and-project-distribute-wrap {
            padding: 0 14px;
            margin-top: 14px;
            .title {
              display: flex;
              align-items: center;
              color: #ffffff;
              font-size: 18px;
              span:first-child {
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: #4bd5ff;
                margin-right: 10px;
              }
            }
            .chart-content-wrap {
              width: 100%;
              display: flex;
              margin-top: 14px;
              .people-type-wrap,
              .project-distribute-wrap {
                width: 50%;
                height: 290px;
              }
            }
          }
        }
        .in-and-out-record-wrap {
          width: 340px;
          height: 100%;
          background-image: url('../../assets/images/peopleInAndOut/in-and-out-record.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-left: 26px;
          padding: 14px;
          overflow: hidden;
          .title {
            display: flex;
            align-items: center;
            color: #ffffff;
            font-size: 18px;
            margin-top: 6px;
            span:first-child {
              display: inline-block;
              width: 6px;
              height: 6px;
              background-color: #4bd5ff;
              margin-right: 10px;
            }
          }
          .record-content-wrap {
            .item-wrap {
              width: 100%;
              height: 191px;
              display: flex;
              background-image: url('../../assets/images/peopleInAndOut/record-item.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              display: flex;
              align-items: center;
              padding: 14px;
              margin-top: 14px;
              img {
                width: 102px;
                height: 144px;
              }
              .prople-info-wrap {
                flex: 1;
                height: 144px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 20px;
                .name-wrap {
                  display: flex;
                  justify-content: space-between;
                  .name-text {
                    font-size: 16px;
                    color: #ffffff;
                  }
                  .action-status {
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #04b2ff;
                    padding: 2px 16px;
                    border-radius: 16px;
                  }
                }
                .people-post {
                  font-size: 16px;
                  color: #ffa721;
                  margin-top: 50px;
                }
                .in-or-out-time {
                  font-size: 16px;
                  color: #9ca0a8;
                }
              }
            }
            .item-wrap:first-child {
              margin-top: 32px;
            }
          }
        }
      }
    }
  }
}
</style>
