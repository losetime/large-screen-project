<template>
  <div class="meteorological-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon-warning.png" alt="" />
      <span>气象预警</span>
    </div>
    <div class="content-wrap">
      <div class="warning-title">
        <div class="type-wrap">
          <span class="label-wrap">预警类型</span>
          <span class="value-wrap">雷电</span>
        </div>
        <div class="level-wrap">
          <span class="label-wrap">预警等级</span>
          <span class="value-wrap">橙色</span>
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
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.meteorological-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/meteorological.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .title-wrap {
    span {
      color: #f44765;
    }
  }
  .content-wrap {
    color: #ffffff;
    .warning-title {
      display: flex;
      justify-content: space-between;
      .type-wrap {
        .label-wrap {
        }
        .value-wrap {
        }
      }
      .level-wrap {
      }
    }
  }
}
</style>
