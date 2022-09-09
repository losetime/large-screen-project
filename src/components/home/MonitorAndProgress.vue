<template>
  <div class="monitor-and-progress-wrap">
    <div class="monitor-wrap">
      <div class="title-wrap">
        <img src="../../assets/images/home/title-icon.png" alt="" />
        <span>工地实时监控</span>
      </div>
      <div class="monitor-view">
        <BlockFive />
      </div>
    </div>
    <div class="progress-wrap">
      <div class="title-wrap">
        <img src="../../assets/images/home/title-icon.png" alt="" />
        <span>工程进度</span>
      </div>
      <div class="power-transform-wrap" v-if="projectType === 1">
        <div class="timelines-wrap">
          <div class="title">土建施工</div>
          <Timelines :timelines="civilTimelines" :progress="civilProgress" />
        </div>
        <div class="timelines-wrap">
          <div class="title">电气施工</div>
          <Timelines :timelines="electricTimelines" :progress="electricProgress" />
        </div>
      </div>
      <div class="line-route-wrap" v-else>
        <div class="progress-item-wrap">
          <div class="title">杆塔施工(共10基)</div>
          <div class="content-wrap">
            <div class="item-wrap base-construction">
              <span>基础施工</span>
              <Progress :progress="100" />
            </div>
            <div class="item-wrap">
              <span>组塔施工</span>
              <Progress :progress="20" />
            </div>
          </div>
        </div>
        <div class="progress-item-wrap">
          <div class="title">架线施工(工25.3公里)</div>
          <div class="content-wrap">
            <div class="item-wrap">
              <span>架线施工</span>
              <Progress :progress="100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Timelines from './Timelines.vue'
import Progress from './Progress.vue'
import { apiGetPowerTransformProjectProgress, apiGetLineRouteProjectProgress } from '@/service/api/home'
import BlockFive from './blockFive/index.vue'

const projectType = 2

// 土建施工
const civilTimelines = ref<any[]>([
  {
    nodeTitle: '测试1',
    isDone: true,
  },
  {
    nodeTitle: '测试2',
    isDone: true,
  },
  {
    nodeTitle: '测试3',
    isDone: false,
  },
])

const civilProgress = ref<string>('20')

// 电气施工
const electricTimelines = ref<any[]>([
  {
    nodeTitle: '测试1',
    isDone: true,
  },
  {
    nodeTitle: '测试2',
    isDone: true,
  },
  {
    nodeTitle: '测试3',
    isDone: false,
  },
])

const electricProgress = ref<string>('20')

// 土建阶段
const civilStep = [
  {
    nodeTitle: '土方开挖',
    isDone: false,
    type: 'EARTH_EXCAVATION',
  },
  {
    nodeTitle: '主体施工',
    isDone: false,
    type: 'MAIN_CONSTRUCTION',
  },
  {
    nodeTitle: '施工消缺',
    isDone: false,
    type: 'ELIMINATION',
  },
]

// 电气阶段
const electricStep = [
  {
    nodeTitle: '电气安装',
    isDone: false,
    type: 'ELECTRICAL_INSTALLATION',
  },
  {
    nodeTitle: '电气调试',
    isDone: false,
    type: 'ELECTRICAL_DEBUGGING',
  },
  {
    nodeTitle: '施工消缺',
    isDone: false,
    type: 'ELIMINATION',
  },
]

onMounted(() => {
  getPowerTransformProjectProgress()
  getLineRouteProjectProgress()
})

/**
 * @desc 获取工程进度-变电
 */
const getPowerTransformProjectProgress = async () => {
  const { code, data } = await apiGetPowerTransformProjectProgress()
  if (code === 20000) {
    data.forEach((item: any) => {
      switch (item.constructionEnum) {
        case 'CIVIL_ENGINEERING':
          civilTimelines.value = formatTimelines(civilStep, item.progress.phase)
          civilProgress.value = item.progress.progress
          break
        case 'ELECTRIC':
          electricTimelines.value = formatTimelines(electricStep, item.progress.phase)
          electricProgress.value = item.progress.progress
          break
      }
    })
  }
}

const formatTimelines = (sourceStep: any, currentStep: any) => {
  const findIndex = sourceStep.findIndex((val: any) => currentStep === val.type)
  return sourceStep.map((val: any, index: number) => {
    if (index <= findIndex) {
      val.isDone = true
    }
    return val
  })
}

/**
 * @desc 获取工程进度-线路
 */
const getLineRouteProjectProgress = async () => {
  const { code } = await apiGetLineRouteProjectProgress()
  if (code === 20000) {
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/home.less';

.monitor-and-progress-wrap {
  height: 1234px;
  width: 100%;
  background-image: url('../../assets/images/home/middle-top.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  .monitor-wrap {
    .monitor-view {
      height: 705px;
      width: 100%;
      margin: 20px 0;
      background-image: url('../../assets/images/home/monitor-background.png');
      background-size: 100% 100%;
      padding: 14px 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .progress-wrap {
    .power-transform-wrap {
      display: flex;
      margin-top: 20px;
      .timelines-wrap {
        flex: 1;
        margin-left: 35px;
        .title {
          color: #55b1ff;
          font-weight: bold;
          position: relative;
          font-size: 32px;
          &::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 34px;
            background: #55b1ff;
            border-radius: 2px;
            position: absolute;
            left: -14px;
            top: 8px;
          }
        }
        .timelines-wrapper {
          margin-left: 70px;
          margin-top: 85px;
        }
      }
      .timelines-wrap:first-child {
        position: relative;
        &::after {
          content: '';
          border: 1px dashed #1f5bb5;
          height: 140px;
          position: absolute;
          right: 46px;
          top: 75px;
        }
      }
    }
    .line-route-wrap {
      display: flex;
      margin-top: 20px;
      .progress-item-wrap {
        flex: 1;
        margin-left: 35px;
        .title {
          color: #55b1ff;
          font-weight: bold;
          position: relative;
          font-size: 32px;
          &::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 34px;
            background: #55b1ff;
            border-radius: 2px;
            position: absolute;
            left: -14px;
            top: 8px;
          }
        }
        .content-wrap {
          height: 128px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 60px;
          .item-wrap {
            display: flex;
            align-items: center;
            span {
              color: #ffffff;
              font-size: 28px;
              margin-right: 10px;
            }
          }
          .base-construction {
            margin-bottom: 50px;
          }
        }
      }
      .progress-item-wrap:first-child {
        position: relative;
        &::after {
          content: '';
          border: 1px dashed #1f5bb5;
          height: 140px;
          position: absolute;
          right: 46px;
          top: 100px;
        }
      }
    }
  }
}
</style>
