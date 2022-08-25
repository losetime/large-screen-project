<template>
  <div class="monitor-and-progress-wrap">
    <div class="monitor-wrap">
      <div class="title-wrap">
        <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
        <span>工地实时监控</span>
      </div>
      <div class="monitor-view"></div>
    </div>
    <div class="progress-wrap">
      <div class="title-wrap">
        <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
        <span>工程进度(总工期{{ projectProgress.totalDuration }}天)</span>
      </div>
      <div class="progress-view">
        <div class="construction-days">
          <p class="days-value">{{ projectProgress.constructionDay }}</p>
          <p class="days-label">已施工(天)</p>
        </div>
        <div class="timelines-wrap">
          <Timelines :timelines="timelines" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Timelines from '@/components/intelligentBuildingSite/Timelines2.vue'
import { apiGetProjectProgress } from '@/service/api/intelligentBuildingSite'
import { getDate, dateUtil } from '@/utils/dateUtil'
const projectProgress = ref<any>({})
const timelines = ref<any[]>([])
onMounted(() => {
  getProjectProgress()
})
const getProjectProgress = async () => {
  const { code, data } = await apiGetProjectProgress()
  if (code === 20000) {
    projectProgress.value = data
    const len = data.largeMilestoneProjectList.length
    if (len <= 5) {
      timelines.value = data.largeMilestoneProjectList.map((item: any) => ({
        nodeTime: item.milestoneDate,
        nodeTitle: item.milestoneName,
        isDone: true,
      }))
    } else {
      const currenDate = dateUtil(getDate())
      const findIndex = data.largeMilestoneProjectList.findIndex((item: any) => {
        return dateUtil(item.milestoneDate).diff(currenDate) > 0
      })
      if (findIndex === undefined) {
        const progressList = data.largeMilestoneProjectList.slice(len - 5)
        timelines.value = progressList.map((item: any) => ({
          nodeTime: item.milestoneDate,
          nodeTitle: item.milestoneName,
          isDone: true,
        }))
      } else {
        const needIndex = findIndex - 4
        const progressList = data.largeMilestoneProjectList.slice(needIndex, needIndex + 5)
        timelines.value = progressList.map((item: any, index: number) => {
          if (index === 4) {
            return {
              nodeTime: item.milestoneDate,
              nodeTitle: item.milestoneName,
              isDone: false,
            }
          } else {
            return {
              nodeTime: item.milestoneDate,
              nodeTitle: item.milestoneName,
              isDone: true,
            }
          }
        })
      }
    }
  }
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
        margin-left: 70px;
        margin-top: 20px;
      }
    }
  }
}
</style>
