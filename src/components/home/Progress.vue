<template>
  <div class="progress-wrapper">
    <div class="base-progress-wrap"></div>
    <div class="actual-progress-wrap" :style="{ width: props.progress + '%' }"></div>
    <div
      class="dot-wrap"
      :style="{
        left: props.progress < 8 ? 0 : `calc(${props.progress}% - 30px)`,
        backgroundColor: props.progress < 8 ? '#156BC3' : '',
      }"
    ></div>
    <div class="progress-label" :style="{ left: props.progress < 8 ? '-22px' : `calc(${props.progress}% - 52px)` }">
      {{ progress }}%
    </div>
  </div>
</template>

<script setup lang="ts">
// import { reactive, ref } from 'vue'
const props = defineProps<{
  progress: number
}>()
</script>

<style lang="less" scoped>
.progress-wrapper {
  position: relative;
  width: 400px;
  .base-progress-wrap {
    width: 100%;
    height: 20px;
    background-color: #1c3865;
    border-radius: 9px;
  }
  .actual-progress-wrap {
    height: 20px;
    background: linear-gradient(224deg, #20afde 0%, #0e42b2 100%);
    border-radius: 9px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .dot-wrap {
    width: 30px;
    height: 30px;
    border: 6px solid #ffffff;
    border-radius: 50%;
    position: absolute;
    top: -5px;
  }
  .progress-label {
    width: 80px;
    position: absolute;
    top: -47px;
    color: #ffffff;
    font-size: 28px;
    text-align: center;
  }
}
</style>
