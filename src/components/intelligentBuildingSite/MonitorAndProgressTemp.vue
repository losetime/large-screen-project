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
        <!-- <span>工程进度(总工期{{ projectProgress?.totalDuration }}天)</span> -->
      </div>
      <div class="progress-view">
        <!-- <div class="construction-days">
          <p class="days-value">{{ projectProgress?.constructionDay }}</p>
          <p class="days-label">已施工(天)</p>
        </div> -->
        <div class="timelines-wrap">
          <div class="title">土建施工</div>
          <Timelines :timelines="civilTimelines" />
        </div>
        <div class="timelines-wrap">
          <div class="title">电气施工</div>
          <Timelines :timelines="electricTimelines" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Timelines from '@/components/intelligentBuildingSite/Timelines.vue'
import { apiGetProjectProgress } from '@/service/api/intelligentBuildingSite'
import { getDate, dateUtil } from '@/utils/dateUtil'
import lantian from '@/assets/images/intelligentBuildingSite/lantian.png'
import xianyang from '@/assets/images/intelligentBuildingSite/xianyang.png'
import zhongying from '@/assets/images/intelligentBuildingSite/zhong-ying.png'
import normal from '@/assets/images/intelligentBuildingSite/normal.png'

const props = defineProps<{
  type: string
}>()

const projectProgress = ref<any>({})

// 土建施工
const civilTimelines = ref<any[]>([])

// 电气施工
const electricTimelines = ref<any[]>([])

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

onMounted(() => {
  getProjectProgress()
})

const getProjectProgress = async () => {
  const { code, data } = await apiGetProjectProgress()
  if (code === 20000) {
    data.forEach((item: any) => {
      switch (item.constructionEnum) {
        case 'CIVIL_ENGINEERING':
      }
      if (item.constructionEnum === 'CIVIL_ENGINEERING') {
      }
    })
    projectProgress.value = data
  }
}

// const formatProgess = (data: any) => {
//   const len = data.largeMilestoneProjectList.length
//   if (len <= 3) {
//     timelines.value = data.largeMilestoneProjectList.map((item: any) => ({
//       nodeTime: item.milestoneDate,
//       nodeTitle: item.milestoneName,
//       isDone: true,
//     }))
//   } else {
//     const currenDate = dateUtil(getDate())
//     const findIndex = data.largeMilestoneProjectList.findIndex((item: any) => {
//       return dateUtil(item.milestoneDate).diff(currenDate) > 0
//     })
//     if (findIndex === undefined) {
//       const progressList = data.largeMilestoneProjectList.slice(len - 3)
//       timelines.value = progressList.map((item: any) => ({
//         nodeTime: item.milestoneDate,
//         nodeTitle: item.milestoneName,
//         isDone: true,
//       }))
//     } else {
//       const needIndex = findIndex - 2
//       const progressList = data.largeMilestoneProjectList.slice(needIndex, needIndex + 3)
//       timelines.value = progressList.map((item: any, index: number) => {
//         if (index === 2) {
//           return {
//             nodeTime: item.milestoneDate,
//             nodeTitle: item.milestoneName,
//             isDone: false,
//           }
//         } else {
//           return {
//             nodeTime: item.milestoneDate,
//             nodeTitle: item.milestoneName,
//             isDone: true,
//           }
//         }
//       })
//     }
//   }
// }
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
