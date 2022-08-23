<template>
  <div class="project-overview-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
      <span>项目概况</span>
    </div>
    <div class="overview-wrap">
      <div class="item-wrap">
        <span>建管单位</span>
        <span>{{ projectOverview?.jgUnit }}</span>
      </div>
      <div class="item-wrap">
        <span>设计单位</span>
        <span>{{ projectOverview?.sjUnit }}</span>
      </div>
      <div class="item-wrap">
        <span>监理单位</span>
        <span>{{ projectOverview?.jlUnit }}</span>
      </div>
      <div class="item-wrap">
        <span>施工单位</span>
        <span>{{ projectOverview?.sgUnit }}</span>
      </div>
      <div class="item-wrap">
        <span>开工日期</span>
        <span>{{ projectOverview?.startDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetProjectOverview } from '@/service/api/intelligentBuildingSite'

const projectOverview = ref<any>({})

onMounted(() => {
  getProjectOverview()
})

/**
 * @desc 获取项目概况
 */
const getProjectOverview = async () => {
  const { code, data } = await apiGetProjectOverview()
  if (code === 20000) {
    projectOverview.value = data
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/intelligentBuildingSite.less';

.project-overview-wrap {
  height: 250px;
  width: 100%;
  background-image: url('../../assets/images/intelligentBuildingSite/project-overview.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  position: relative;
  .overview-wrap {
    margin-top: 20px;
    color: #ffffff;
    .item-wrap {
      display: flex;
      align-items: center;
      margin-top: 8px;
      span:first-child {
        margin-right: 16px;
        color: #9a9caa;
      }
    }
  }
}
</style>
