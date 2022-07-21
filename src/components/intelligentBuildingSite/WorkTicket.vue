<template>
  <div class="work-ticket-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/intelligentBuildingSite/title-icon.png" alt="" />
      <span>工作票信息</span>
    </div>
    <div class="stats-wrap">
      <div class="stats-item-wrap">
        <p class="stats-label">作业人数</p>
        <p class="stats-value">10</p>
      </div>
      <div class="split-line"></div>
      <div class="stats-item-wrap">
        <p class="stats-label">出勤率</p>
        <p class="stats-value">80%</p>
      </div>
    </div>
    <div class="sub-title-wrap">标题</div>
    <div class="form-wrap">
      <div class="form-item">
        <span class="item-label">作业部位</span>
        <span class="item-value">电缆隧道、围墙</span>
      </div>
      <div class="form-item">
        <span class="item-label">设计单位</span>
        <span class="item-value">施工一班</span>
      </div>
      <div class="form-item">
        <span class="item-label">作业时间</span>
        <span class="item-value">2021-03-30至2021-04-0</span>
      </div>
      <div class="form-item">
        <span class="item-label">作业内容</span>
        <div class="item-value">
          <p>1.电缆隧道混凝土养护</p>
          <p>2.钢筋加工口</p>
          <p>3.围墙基础施工</p>
          <p>4.安全文明施工</p>
          <p>5.电缆隧道模板拆除</p>
        </div>
      </div>
      <div class="form-item">
        <span class="item-label">作业人员</span>
        <div class="item-value">
          <span>张三王德王德</span>
          <span>王德</span>
          <span>张三</span>
          <span>王德</span>
          <span>张三</span>
          <span>王德</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { reactive, ref } from 'vue'
</script>

<style lang="less" scoped>
@import '../../assets/style/intelligentBuildingSite.less';

.work-ticket-wrap {
  flex: 1;
  height: 546px;
  background-image: url('../../assets/images/intelligentBuildingSite/work-ticket.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .stats-wrap {
    width: 90%;
    height: 72px;
    margin: 20px 0 0 5%;
    background-image: url('../../assets/images/intelligentBuildingSite/work-ticket-stats.png');
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
        font-size: 14px;
        color: #8e91a1;
      }
      .stats-value {
        font-size: 20px;
        font-weight: bold;
        color: #1ae3f0;
      }
    }
    .split-line {
      width: 2px;
      height: 24px;
      background-color: #55b1ff;
    }
  }
  .sub-title-wrap {
    height: 4px;
    width: 100%;
    margin-top: 42px;
    background-image: url('../../assets/images/intelligentBuildingSite/work-ticket-line.png');
    background-size: 100% 100%;
    color: #55b1ff;
    text-align: center;
    line-height: 4px;
    font-size: 18px;
    font-weight: bold;
  }
  .form-wrap {
    margin-top: 28px;
    .form-item {
      display: flex;
      margin-top: 14px;
      .item-label {
        display: inline-block;
        width: 56px;
        font-size: 14px;
        color: #8e91a1;
      }
      .item-value {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        margin-left: 14px;
        font-size: 14px;
        color: #ffffff;
        span {
          border: 1px solid #ffa721;
          padding: 2px 14px;
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
