<template>
  <div class="project-people-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
      <span>项目人员</span>
    </div>
    <div class="details-wrap">
      <div class="chart-wrap">
        <Pie :series="projectPeople" />
      </div>
      <div class="chart-title">人员一码通分布</div>
      <div class="code-count-wrap">
        <span>绿码</span>
        <img src="../../assets/images/intelligentBuildingSite/green-code.png" alt="" />
        <a-progress :percent="peopleCodeStats.green" strokeColor="#25CA93" />
      </div>
      <div class="code-count-wrap">
        <span>黄码</span>
        <img src="../../assets/images/intelligentBuildingSite/yellow-code.png" alt="" />
        <a-progress :percent="peopleCodeStats.yellow" strokeColor="#F6B900" />
      </div>
      <div class="code-count-wrap">
        <span>红码</span>
        <img src="../../assets/images/intelligentBuildingSite/red-code.png" alt="" />
        <a-progress :percent="peopleCodeStats.red" strokeColor="#F44765" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetProjectPeople, apiGetPeopleCodeStats } from '@/service/api/intelligentBuildingSite'
const projectPeople = ref<any[]>([])
const peopleCodeStats = ref<any>({})
onMounted(() => {
  getProjectPeople()
  getPeopleCodeStats()
})
/**
 * @desc 获取项目人员
 */
const getProjectPeople = async () => {
  const { code, data } = await apiGetProjectPeople()
  if (code === 20000) {
    projectPeople.value = [
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
        data: data.map((item: any) => ({ name: item.label, value: item.value })),
      },
    ]
  }
}
/**
 * @desc 获取人员一码通统计
 */
const getPeopleCodeStats = async () => {
  const { code, data } = await apiGetPeopleCodeStats()
  if (code === 20000) {
    const temp: any = {}
    let maxCount = 0
    data.forEach((item: any) => {
      if (item.peopleQuantity > maxCount) {
        maxCount = item.peopleQuantity
      }
    })
    data.forEach((item: any) => {
      temp[item.qrcodeColor] = Math.floor((item.peopleQuantity / maxCount) * 100)
    })
    peopleCodeStats.value = temp
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/intelligentBuildingSite.less';
.project-people-wrap {
  height: 465px;
  width: 100%;
  margin-top: 14px;
  background-image: url('../../assets/images/intelligentBuildingSite/project-people.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .details-wrap {
    .chart-wrap {
      width: 100%;
      height: 220px;
    }
    .chart-title {
      margin: 28px 0;
      text-align: center;
      color: #55b1ff;
      font-size: 20px;
      font-weight: bold;
    }
    .code-count-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      margin-top: 12px;
      img {
        width: 20px;
        height: 20px;
      }
      ::v-deep(.ant-progress) {
        width: 200px;
        .ant-progress-text {
          color: #94e0ff;
        }
      }
    }
  }
}
</style>
