<template>
  <div class="monitor-and-progress-wrap">
    <div class="monitor-wrap">
      <div class="title-wrap">
        <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
        <span>工地实时监控</span>
      </div>
      <div class="monitor-view">
        <img :src="monitorView" alt="" />
      </div>
    </div>
    <div class="progress-wrap">
      <div class="title-wrap">
        <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
        <!-- (总工期{{ projectProgress?.totalDuration }}天) -->
        <span>工程进度</span>
      </div>
      <div class="progress-view">
        <!-- <div class="construction-days">
          <p class="days-value">{{ projectProgress?.constructionDay }}</p>
          <p class="days-label">已施工(天)</p>
        </div> -->
        <div class="timelines-wrap">
          <div class="title">土建施工</div>
          <Timelines :timelines="civilTimelines" :progress="civilProgress" />
        </div>
        <div class="timelines-wrap">
          <div class="title">电气施工</div>
          <Timelines :timelines="electricTimelines" :progress="electricProgress" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Timelines from '@/components/intelligentBuildingSite/Timelines.vue'
import { apiGetProjectProgress } from '@/service/api/intelligentBuildingSite'
import lantian from '@/assets/images/intelligentBuildingSite/lantian.png'
import xianyang from '@/assets/images/intelligentBuildingSite/xianyang.png'
import zhongying from '@/assets/images/intelligentBuildingSite/zhong-ying.png'
import normal from '@/assets/images/intelligentBuildingSite/normal.png'

const props = defineProps<{
  type: string
}>()

// 土建施工
const civilTimelines = ref<any[]>([])

const civilProgress = ref<string>('')

// 电气施工
const electricTimelines = ref<any[]>([])

const electricProgress = ref<string>('')

const monitorView = computed(() => {
  switch (props.type) {
    case 'zhongying':
      return zhongying
    case 'xianyang':
      return xianyang
    case 'lantian':
      return lantian
    default:
      return normal
  }
})

// 土建阶段
const civilStep = ref([
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
])

// 电气阶段
const electricStep = ref([
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
])

onMounted(() => {
  getProjectProgress()
})

const getProjectProgress = async () => {
  const { code, data } = await apiGetProjectProgress()
  if (code === 20000) {
    data.forEach((item: any) => {
      switch (item.constructionEnum) {
        case 'CIVIL_ENGINEERING':
          civilTimelines.value = formatTimelines(civilStep.value, item.progress.phase)
          civilProgress.value = item.progress.progress
        case 'ELECTRIC':
          electricTimelines.value = formatTimelines(electricStep.value, item.progress.phase)
          electricProgress.value = item.progress.progress
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
</script>

<style lang="less" scoped>
@import '../../assets/style/intelligentBuildingSite.less';

.monitor-and-progress-wrap {
  height: 610px;
  width: 100%;
  background-image: url('../../assets/images/intelligentBuildingSite/monitor-and-progress.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .monitor-wrap {
    .monitor-view {
      height: 338px;
      width: 100%;
      margin: 20px 0;
      background-image: url('../../assets/images/intelligentBuildingSite/monitor-background.png');
      background-size: 100% 100%;
      padding: 14px 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .progress-wrap {
    .progress-view {
      display: flex;
      margin-top: 20px;
      .construction-days {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 140px;
        border-right: 1px dashed #1f5bb5;
        .days-value {
          color: #1ae3f0;
          font-size: 45px;
          font-weight: bold;
        }
        .days-label {
          color: #ffffff;
          font-size: 18px;
        }
      }
      .timelines-wrap {
        flex: 1;
        margin-left: 35px;
        .title {
          color: #55b1ff;
          font-weight: bold;
          margin-bottom: 25px;
          position: relative;
          &::before {
            content: '';
            display: inline-block;
            width: 3px;
            height: 20px;
            background: #55b1ff;
            border-radius: 2px;
            position: absolute;
            left: -14px;
            top: 1px;
          }
        }
      }
    }
  }
}
</style>
