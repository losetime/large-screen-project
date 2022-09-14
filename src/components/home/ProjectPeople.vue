<template>
  <div class="project-people-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/home/title-icon.png" alt="" />
      <span>人员总览</span>
    </div>
    <div class="details-wrap">
      <div class="chart-wrap" :style="{ height: showPeopleDistribute ? '450px' : '700px' }">
        <Pie :series="projectPeople" />
      </div>
      <template v-if="showPeopleDistribute">
        <div class="chart-title">人员一码通分布</div>
        <div class="code-count-wrap">
          <span class="label-wrap">绿码</span>
          <img src="../../assets/images/home/green-code.png" alt="" />
          <a-progress :percent="peopleCodeStats.green" :steps="30" strokeColor="#25CA93" trailColor="#424267" />
        </div>
        <div class="code-count-wrap">
          <span class="label-wrap">黄码</span>
          <img src="../../assets/images/home/yellow-code.png" alt="" />
          <a-progress :percent="peopleCodeStats.yellow" :steps="30" strokeColor="#F6B900" trailColor="#424267" />
        </div>
        <div class="code-count-wrap">
          <span class="label-wrap">红码</span>
          <img src="../../assets/images/home/red-code.png" alt="" />
          <a-progress :percent="peopleCodeStats.red" :steps="30" strokeColor="#F44765" trailColor="#424267" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Pie from '@/components/charts/Pie.vue'
import { apiGetProjectPeople, apiGetPeopleCodeStats } from '@/service/api/home'
import useComponents from '@/hooks/useComponents'

const { componentsContainer } = useComponents(3)

const projectPeople = ref<any[]>([])

const peopleCodeStats = ref<any>({})

const showPeopleDistribute = computed(() => componentsContainer.value.includes('PROJECT_PEOPLE_CODE'))

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
          fontSize: 28,
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
@import '../../assets/style/home.less';
.project-people-wrap {
  height: 886px;
  width: 100%;
  margin-top: 34px;
  background-image: url('../../assets/images/home/left-middle.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  .details-wrap {
    .chart-wrap {
      width: 100%;
      height: 450px;
    }
    .chart-title {
      margin: 28px 0;
      text-align: center;
      color: #55b1ff;
      font-size: 40px;
      font-weight: bold;
      background-image: url('../../assets/images/home/split-line.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position-y: center;
    }
    .code-count-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      margin-top: 12px;
      .label-wrap {
        font-size: 28px;
      }
      img {
        width: 30px;
        height: 30px;
      }
      ::v-deep(.ant-progress) {
        width: 76%;
        .ant-progress-steps-outer {
          .ant-progress-steps-item {
            height: 24px !important;
          }
          .ant-progress-text {
            color: #94e0ff;
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
