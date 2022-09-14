<template>
  <div class="intelligent-building-site-wrapper">
    <div class="header-wrap">
      <div class="project-wrap">
        <img src="../../assets/images/home/logo.svg" alt="" />
        <span>{{ projectName }}</span>
      </div>
      <div class="title-wrap">
        <img src="../../assets/images/home/header-title.png" alt="" />
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
        <MonitorAndProgress />
        <BlockSeven />
      </div>
      <div class="right-wrap">
        <BlockEight />
        <div class="right-bottom-wrap">
          <WorkTicket />
          <AlarmRecord />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProjectOverview from '@/components/home/ProjectOverview.vue'
import ProjectPeople from '@/components/home/ProjectPeople.vue'
import MonitorAndProgress from '@/components/home/MonitorAndProgress.vue'
import WorkTicket from '@/components/home/WorkTicket.vue'
import useDateTime from '@/hooks/useDateTime'
import BlockSeven from '@/components/home/blockSeven/index.vue'
import BlockFour from '@/components/home/blockFour/index.vue'
import BlockEight from '@/components/home/blockEight/index.vue'
import AlarmRecord from '@/components/home/AlarmRecord.vue'
import { apiGetProjectInfo } from '@/service/api/home'
import { useStore } from '@/store'
import useMqtt from '@/hooks/useMqtt'

useMqtt()

const store = useStore()

const { date, time, week } = useDateTime()

const projectName = ref('')

onMounted(() => {
  store.dispatch('GetScreenConfigInfo')
  store.dispatch('GetConnectionInfo')
  getProjectInfo()
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
</script>

<style lang="less" scoped>
@import '../../assets/style/home.less';

.intelligent-building-site-wrapper {
  width: 3840px;
  height: 2160px;
  background-image: url('../../assets/images/home/background.png');
  background-size: cover;
  .header-wrap {
    height: 231px;
    width: 100%;
    background-image: url('../../assets/images/home/header.png');
    background-size: cover;
    background-position: 100% 25%;
    display: flex;
    justify-content: space-between;
    .project-wrap {
      height: 118px;
      width: 28%;
      display: flex;
      align-items: center;
      margin-left: 40px;
      img {
        width: 80px;
        height: 80px;
      }
      span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #09bcf2;
        margin-left: 14px;
        font-size: 60px;
        font-weight: bold;
      }
    }
    .title-wrap {
      width: 32%;
      height: 107px;
      margin-top: 38px;
      margin-left: -16%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .time-wrap {
      color: #ffffff;
      font-size: 40px;
      height: 118px;
      line-height: 118px;
      margin-right: 40px;
      span:nth-child(2) {
        margin: 0 14px;
      }
    }
  }
  .content-wrap {
    display: flex;
    padding: 0 14px;
    .left-wrap {
      width: 20%;
    }
    .middle-wrap {
      width: 40%;
      margin-left: 23px;
    }
    .right-wrap {
      width: 38.6%;
      margin-left: 23px;
      .right-bottom-wrap {
        display: flex;
        margin-top: 32px;
      }
    }
  }
}
</style>
