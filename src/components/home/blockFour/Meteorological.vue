<template>
  <div class="meteorological-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon-warning.png" alt="" />
      <span>气象预警</span>
    </div>
    <div class="warning-date">2022-08-23 04:05</div>
    <div class="content-wrap">
      <div class="warning-title">
        <div class="type-wrap">
          <span class="label-wrap">预警类型</span>
          <span class="value-wrap" :style="{ color: getWarningStyle(level) }">雷电</span>
        </div>
        <div class="level-wrap">
          <span class="label-wrap">预警等级</span>
          <span
            class="value-wrap"
            :style="{ backgroundColor: getWarningStyle(level), color: level === '白色' ? '#000000' : '#ffffff' }"
          >
            {{ level }}预警
          </span>
        </div>
      </div>
      <div class="warning-text">{{ meteorologicalInfo.warnText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const meteorologicalInfo = ref({
  warnText:
    '北海市气象台23日4时05分更新发布雷电橙色预警信号：雷雨云团正影响涠洲岛、海城区、银海区及北部湾海面，雷雨云团向偏北方向移动，预计未来3小时，上述地区仍受雷电活动影响，并伴有短时强降雨和大风，请防范。',
})

const level = '橙色'

const getWarningStyle = (type: string) => {
  switch (type) {
    case '蓝色':
      return '#0CB1F1'
    case '橙色':
      return '#FA9027'
    case '黄色':
      return 'yellow'
    case '红色':
      return 'red'
    case '白色':
      return 'white'
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.meteorological-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/meteorological.png');
  background-size: 100% 100%;
  padding: 24px 32px;
  .title-wrap {
    span {
      color: #f44765;
    }
  }
  .warning-date {
    position: absolute;
    top: 38px;
    right: 34px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8);
  }
  .content-wrap {
    color: #ffffff;
    .warning-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;
      .type-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        .label-wrap {
          font-size: 24px;
        }
        .value-wrap {
          font-size: 40px;
          margin-left: 8px;
        }
      }
      .level-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        .label-wrap {
          font-size: 24px;
        }
        .value-wrap {
          font-size: 20px;
          // background-color: #fa9027;
          border-radius: 16px;
          margin-left: 8px;
          padding: 2px 10px;
        }
      }
    }
    .warning-text {
      margin-top: 14px;
      font-size: 28px;
    }
  }
}
</style>
