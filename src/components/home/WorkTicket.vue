<template>
  <div class="work-ticket-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/home/title-icon.png" alt="" />
      <span>工作票信息</span>
    </div>
    <div class="stats-wrap">
      <div class="stats-item-wrap">
        <p class="stats-label">作业人数</p>
        <p class="stats-value">{{ workTicketInfo[indexes]?.peopNum }}</p>
      </div>
      <div class="split-line"></div>
      <div class="stats-item-wrap">
        <p class="stats-label">出勤率</p>
        <p class="stats-value">{{ workTicketInfo[indexes]?.attendanceRate }}%</p>
      </div>
    </div>
    <div class="sub-title-wrap">工作票内容</div>
    <div class="form-wrap">
      <div class="form-item">
        <span class="item-label">作业部位</span>
        <span class="item-value">{{ workTicketInfo[indexes]?.workPart }}</span>
      </div>
      <div class="form-item">
        <span class="item-label">设计单位</span>
        <span class="item-value">{{ workTicketInfo[indexes]?.groupName }}</span>
      </div>
      <div class="form-item">
        <span class="item-label">作业时间</span>
        <span class="item-value">
          {{ workTicketInfo[indexes]?.beginDate }}至{{ workTicketInfo[indexes]?.planEndDate }}
        </span>
      </div>
      <div class="form-item">
        <span class="item-label">作业内容</span>
        <div class="item-value">{{ workTicketInfo[indexes]?.workContent }}</div>
      </div>
      <div class="form-item">
        <span class="item-label">作业人员</span>
        <div class="item-value">
          <span v-for="item in workTicketInfo[indexes]?.workPersonName || []" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetWorkTicketInfo } from '@/service/api/home'

const workTicketInfo = ref<any>([])

const indexes = ref(0)

onMounted(async () => {
  await getWorkTicketInfo()
  if (workTicketInfo.value.length > 1) {
    setInterval(() => {
      indexes.value = indexes.value >= workTicketInfo.value.length - 1 ? 0 : indexes.value + 1
    }, 5000)
  }
})

const getWorkTicketInfo = async () => {
  const { code, data } = await apiGetWorkTicketInfo()
  if (code === 20000) {
    workTicketInfo.value = data.map((item: any) => ({
      ...item,
      workPersonName: item.workPersonName.split(',').slice(0, 7).concat(['......']),
      beginDate: item.beginDate.split(' ')[0],
      planEndDate: item.beginDate.split(' ')[0],
      workContent: item.workContent.substr(0, 16 * 6) + ' ......',
    }))
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/home.less';

.work-ticket-wrap {
  flex: 1;
  height: 1092px;
  background-image: url('../../assets/images/home/right-bottom.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  .stats-wrap {
    width: 90%;
    height: 147px;
    margin: 20px 0 0 5%;
    background-image: url('../../assets/images/home/work-ticket-stats.png');
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
        font-size: 28px;
        color: #8e91a1;
      }
      .stats-value {
        font-size: 48px;
        font-weight: bold;
        color: #1ae3f0;
      }
    }
    .split-line {
      width: 2px;
      height: 48px;
      background-color: #55b1ff;
    }
  }
  .sub-title-wrap {
    height: 120px;
    line-height: 120px;
    width: 100%;
    background-image: url('../../assets/images/home/split-line.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position-y: center;
    color: #55b1ff;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
  }
  .form-wrap {
    .form-item {
      display: flex;
      margin-top: 8px;
      .item-label {
        display: inline-block;
        width: 112px;
        font-size: 28px;
        color: #8e91a1;
      }
      .item-value {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        margin-left: 32px;
        font-size: 28px;
        color: #ffffff;
        span {
          border: 1px solid #ffa721;
          padding: 0 10px;
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
</style>
