<template>
  <div class="project-people-wrap" :style="{ height: height[0] + 'px' }">
    <div class="title-wrap">
      <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
      <span>人员总览</span>
    </div>
    <div class="details-wrap">
      <div class="chart-wrap" :style="{ height: height[1] + 'px' }">
        <Pie :series="projectPeople" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Pie from '@/components/charts/Pie.vue'
import { apiGetProjectPeople, apiGetPeopleCodeStats } from '@/service/api/intelligentBuildingSite'

defineProps<{
  height: number[]
}>()

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
        radius: ['45%', '70%'],
        center: ['50%', '50%'],
        itemStyle: {
          borderRadius: 4,
        },
        label: {
          position: 'inside',
          formatter: '{c}',
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
  width: 100%;
  margin-top: 14px;
  background-image: url('../../assets/images/intelligentBuildingSite/project-people.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .details-wrap {
    .chart-wrap {
      width: 100%;
    }
  }
}
</style>
