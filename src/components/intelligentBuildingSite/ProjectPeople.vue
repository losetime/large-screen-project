<template>
  <div class="project-people-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
      <span>项目人员</span>
    </div>
    <div class="details-wrap">
      <div class="chart-wrap">
        <Pie :series="peopleType" />
      </div>
      <div class="chart-title">人员一码通分布</div>
      <div class="code-count-wrap">
        <span>绿码</span>
        <img src="../../assets/images/intelligentBuildingSite/green-code.png" alt="" />
        <a-progress :percent="30" strokeColor="#25CA93" />
      </div>
      <div class="code-count-wrap">
        <span>黄码</span>
        <img src="../../assets/images/intelligentBuildingSite/yellow-code.png" alt="" />
        <a-progress :percent="30" strokeColor="#F6B900" />
      </div>
      <div class="code-count-wrap">
        <span>红码</span>
        <img src="../../assets/images/intelligentBuildingSite/red-code.png" alt="" />
        <a-progress :percent="30" strokeColor="#F44765" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const peopleType = ref([
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
    data: [
      {
        value: 20,
        name: '绿码',
      },
      {
        value: 100,
        name: '黄码',
      },
      {
        value: 50,
        name: '红码',
      },
    ],
  },
])
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
