<template>
  <div class="project-overview-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
      <span>项目概况</span>
    </div>
    <div class="overview-wrap">
      <div class="item-wrap">
        <span>建管单位</span>
        <span>国网陕西省电力公司西安供电公司</span>
      </div>
      <div class="item-wrap">
        <span>设计单位</span>
        <span>西安众源电力设计有限公司</span>
      </div>
      <div class="item-wrap">
        <span>监理单位</span>
        <span>西北电力建设工程监理有限责任公司</span>
      </div>
      <div class="item-wrap">
        <span>施工单位</span>
        <span>西安亮丽电力集团有限公司</span>
      </div>
      <div class="item-wrap">
        <span>开工日期</span>
        <span>2021年8月1日</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { reactive, ref } from 'vue'
</script>

<style lang="less" scoped>
@import '../../assets/style/intelligentBuildingSite.less';

.project-overview-wrap {
  height: 250px;
  width: 100%;
  background-image: url('../../assets/images/intelligentBuildingSite/project-overview.png');
  background-size: 100% 100%;
  padding: 14px 20px;
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
