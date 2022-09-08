<template>
  <div class="alarm-record-wrapper">
    <div class="title-wrap">
      <img src="../../assets/images/home/title-icon.png" alt="" />
      <span>体征告警</span>
    </div>
    <div class="stats-wrap">
      <div class="stats-item-wrap">
        <p class="stats-label">今日告警</p>
        <p class="stats-value">20</p>
      </div>
      <div class="split-line"></div>
      <div class="stats-item-wrap">
        <p class="stats-label">本周告警</p>
        <p class="stats-value">20%</p>
      </div>
      <div class="split-line"></div>
      <div class="stats-item-wrap">
        <p class="stats-label">本月告警</p>
        <p class="stats-value">20%</p>
      </div>
    </div>
    <div class="sub-title-wrap">告警列表</div>
    <div class="alarm-list-wrap">
      <div class="alarm-item-wrap">
        <div class="header-wrap">
          <div class="alarm-type">
            <warning-filled />
            <span>气象告警</span>
          </div>
          <div class="alarm-time">14:43</div>
        </div>
        <div class="alarm-content">蓝色大风预警</div>
      </div>
      <div class="alarm-item-wrap">
        <div class="header-wrap">
          <div class="alarm-type">
            <warning-filled />
            <span>气象告警</span>
          </div>
          <div class="alarm-time">14:43</div>
        </div>
        <div class="alarm-content">蓝色大风预警</div>
      </div>
      <div class="alarm-item-wrap">
        <div class="header-wrap">
          <div class="alarm-type">
            <warning-filled />
            <span>气象告警</span>
          </div>
          <div class="alarm-time">14:43</div>
        </div>
        <div class="alarm-content">蓝色大风预警</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WarningFilled } from '@ant-design/icons-vue'
</script>

<style lang="less" scoped>
@import '../../assets/style/home.less';
.alarm-record-wrapper {
  flex: 1;
  height: 1092px;
  background-image: url('../../assets/images/home/right-bottom.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  margin-left: 14px;
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
  .alarm-list-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .alarm-item-wrap {
      width: 90%;
      height: 202px;
      background: linear-gradient(
        360deg,
        rgba(114, 12, 29, 0.38) 0%,
        rgba(114, 12, 29, 0.19) 100%,
        rgba(11, 24, 43, 0.42) 100%
      );
      border-radius: 16px;
      border: 2px solid #7b2332;
      padding: 28px 32px;
      margin-top: 26px;
      .header-wrap {
        display: flex;
        justify-content: space-between;
        .alarm-type {
          width: 40%;
          border-bottom: 2px solid #ef3e2d;
          .anticon {
            font-size: 28px;
            color: #ef3e2d;
            margin-right: 16px;
          }
          span {
            font-size: 28px;
            color: #ffc80b;
          }
        }
        .alarm-time {
          font-size: 24px;
          color: #ffffff;
        }
      }
      .alarm-content {
        height: 100px;
        margin-top: 14px;
        display: flex;
        align-items: center;
        font-size: 28px;
        color: #ffffff;
      }
    }
    .alarm-item-wrap:first-child {
      margin-top: 0;
    }
  }
}
</style>
