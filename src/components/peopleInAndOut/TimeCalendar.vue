<template>
  <div class="time-calendar-wrapper">
    <template v-for="(item, index) in dateTime" :key="index">
      <span>{{ item }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dateUtil } from '@/utils/dateUtil'

const dateTime = ref<string[]>([])

onMounted(() => {
  getTime()
})

const getTime = () => {
  setInterval(() => {
    const time = dateUtil().format('HH:mm:ss')
    dateTime.value = time.split('')
  }, 1000)
}
</script>

<style lang="less" scoped>
.time-calendar-wrapper {
  display: flex;
  justify-content: center;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 66px;
    border: 1px solid #034176;
    border-radius: 3px;
    font-size: 50px;
    font-weight: bold;
    color: #1cd3f3;
    margin-left: 8px;
    font-family: DINAlternate-Bold, DINAlternate, serif;
    &:nth-child(3),
    &:nth-child(6) {
      padding-bottom: 10px;
      border: none;
      margin-left: 0;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
  }
}
</style>
