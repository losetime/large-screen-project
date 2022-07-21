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
        <div class="weather-chart-wrap">
          <Line :series="weatherChart.series" :x-axis="weatherChart.xAxis" :color="['#26477A']" />
        </div>
        <div class="five-days-weather-wrap">
          <div class="item-weather-wrap">
            <p>今天</p>
            <img src="../../assets/images/peopleInAndOut/cloudy.png" alt="" />
            <p>19℃</p>
            <p class="line"></p>
            <p>32℃</p>
          </div>
          <div class="item-weather-wrap">
            <p>今天</p>
            <img src="../../assets/images/peopleInAndOut/cloudy.png" alt="" />
            <p>19℃</p>
            <p class="line"></p>
            <p>32℃</p>
          </div>
          <div class="item-weather-wrap">
            <p>今天</p>
            <img src="../../assets/images/peopleInAndOut/cloudy.png" alt="" />
            <p>19℃</p>
            <p class="line"></p>
            <p>32℃</p>
          </div>
          <div class="item-weather-wrap">
            <p>今天</p>
            <img src="../../assets/images/peopleInAndOut/cloudy.png" alt="" />
            <p>19℃</p>
            <p class="line"></p>
            <p>32℃</p>
          </div>
          <div class="item-weather-wrap">
            <p>今天</p>
            <img src="../../assets/images/peopleInAndOut/cloudy.png" alt="" />
            <p>19℃</p>
            <p class="line"></p>
            <p>32℃</p>
          </div>
        </div>
      </div>
      <div class="main-content-wrap">
        <div class="stats-wrap">
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/presence-people-number.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">在场人数</p>
              <p class="value-wrap">231</p>
            </div>
          </div>
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/today-presence.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">今日进场</p>
              <p class="value-wrap">124</p>
            </div>
          </div>
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/today-go-out.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">今日出场</p>
              <p class="value-wrap">36</p>
            </div>
          </div>
          <div class="stats-item-wrap">
            <img src="../../assets/images/peopleInAndOut/project-count.png" alt="" />
            <div class="text-wrap">
              <p class="label-wrap">项目总人数</p>
              <p class="value-wrap">351</p>
            </div>
          </div>
        </div>
        <div class="bottom-wrap">
          <div class="chart-wrap">
            <div class="post-distribute-wrap">
              <div class="title">在场人员岗位分布</div>
              <div class="chart-content-wrap">
                <Bar :series="postDistribute.series" :x-axis="postDistribute.xAxis" />
              </div>
            </div>
            <div class="people-type-and-project-distribute-wrap">
              <div class="title">在场人员类型 & 项目部分布</div>
              <div class="chart-content-wrap">
                <div class="people-type-wrap">
                  <Pie :series="peopleType" />
                </div>
                <div class="project-distribute-wrap">
                  <Pie :series="peopleType" />
                </div>
              </div>
            </div>
          </div>
          <div class="in-and-out-record-wrap">
            <div class="title">进出长记录</div>
            <div class="record-content-wrap">
              <div class="item-wrap">
                <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
                <div class="prople-info-wrap">
                  <div class="name-wrap">
                    <span class="name-text">张镇涛</span>
                    <span class="action-status">进场</span>
                  </div>
                  <p class="people-post">施工人员</p>
                  <p class="in-or-out-time">08:24:32</p>
                </div>
              </div>
              <div class="item-wrap">
                <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
                <div class="prople-info-wrap">
                  <div class="name-wrap">
                    <span class="name-text">张镇涛</span>
                    <span class="action-status">进场</span>
                  </div>
                  <p class="people-post">施工人员</p>
                  <p class="in-or-out-time">08:24:32</p>
                </div>
              </div>
              <div class="item-wrap">
                <img src="../../assets/images/peopleInAndOut/people-avatar.png" alt="" />
                <div class="prople-info-wrap">
                  <div class="name-wrap">
                    <span class="name-text">张镇涛</span>
                    <span class="action-status">进场</span>
                  </div>
                  <p class="people-post">施工人员</p>
                  <p class="in-or-out-time">08:24:32</p>
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
import { ref, onBeforeMount } from 'vue'
import TimeCalendar from '@/components/peopleInAndOut/TimeCalendar.vue'
import YmWeather from '@/components/peopleInAndOut/YmWeather.vue'
import Line from '@/components/charts/Line.vue'
import Bar from '@/components/charts/Bar.vue'
import Pie from '@/components/charts/Pie.vue'
import useDateTime from '@/hooks/useDateTime'

const { date, week } = useDateTime()

const weatherChart = ref({
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
  ],
  xAxis: ['1点', '2点', '3点'],
})

const postDistribute = ref({
  series: [{ type: 'bar', data: [12, 35, 40], barMaxWidth: 50 }],
  xAxis: ['1点', '2点', '3点'],
})

const peopleType = ref([
  {
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['50%', '50%'],
    itemStyle: {
      borderRadius: 4,
    },
    label: {
      formatter: '{d}%',
      backgroundColor: 'none',
      color: '#ffffff',
    },
    data: [
      {
        value: 20,
        name: '绿码',
      },
      {
        value: 100,
        name: '黄码',
      },
      {
        value: 50,
        name: '红码',
      },
    ],
  },
])

onBeforeMount(() => {
  getOverviewInfo()
  // peopleType.value = createPieData()
})

/**
 * @desc 获取统计和图表数据
 */
const getOverviewInfo = () => {}
</script>

<style lang="less" scoped>
.overview-wrapper {
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/images/peopleInAndOut/background.png');
  background-size: cover;
  .header-wrap {
    height: 100px;
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
      height: calc(100vh - 120px);
      width: 439px;
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
        margin-top: 30px;
      }
      .weather-chart-wrap {
        width: 100%;
        height: 200px;
        padding: 0 14px;
        margin-top: 30px;
      }
      .five-days-weather-wrap {
        display: flex;
        justify-content: space-around;
        padding: 0 14px;
        margin-top: 30px;
        .item-weather-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 65px;
          height: 200px;
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
      height: calc(100vh - 120px);
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
              color: #b6e2ff;
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
            margin-top: 14px;
            .title {
              color: #ffffff;
              font-size: 18px;
            }
            .chart-content-wrap {
              width: 100%;
              height: 200px;
              margin-top: 14px;
            }
          }
          .people-type-and-project-distribute-wrap {
            padding: 0 14px;
            margin-top: 14px;
            .title {
              color: #ffffff;
              font-size: 18px;
            }
            .chart-content-wrap {
              width: 100%;
              display: flex;
              .people-type-wrap,
              .project-distribute-wrap {
                width: 50%;
                height: 268px;
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
          margin-left: 28px;
          padding: 14px;
          .title {
            color: #ffffff;
            font-size: 18px;
          }
          .record-content-wrap {
            .item-wrap {
              width: 100%;
              display: flex;
              background-image: url('../../assets/images/peopleInAndOut/record-item.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              padding: 14px;
              margin-top: 14px;
              img {
                width: 102px;
                height: 135px;
              }
              .prople-info-wrap {
                flex: 1;
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
          }
        }
      }
    }
  }
}
</style>
