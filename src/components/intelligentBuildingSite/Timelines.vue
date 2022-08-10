<template>
  <div class="timelines-wrapper">
    <div class="base-line-wrap">
      <div class="node-wrap" v-for="(item, index) in timelines" :key="index">
        <span :class="{ 'dot-wrap': true }"></span>
        <div class="content-wrap">
          <p class="time">{{ item.nodeTime }}</p>
          <p class="title">{{ item.nodeTitle }}</p>
        </div>
      </div>
    </div>
    <div class="actual-line-wrap">
      <template v-for="(item, index) in timelines" :key="index">
        <div class="node-wrap" v-if="item.isDone">
          <span :class="{ 'dot-wrap': true }"></span>
          <span class="indicator" v-if="index === timelines.length - 2"></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'

defineProps<{
  timelines: any[]
}>()

// const timelines = ref<any>([
//   {
//     nodeTime: '2019-09-05',
//     nodeTitle: '土方开挖',
//     isDone: true,
//   },
//   {
//     nodeTime: '2019-09-05',
//     nodeTitle: '土方开挖',
//     isDone: true,
//   },
//   {
//     nodeTime: '2019-09-05',
//     nodeTitle: '土方开挖',
//     isDone: true,
//   },
//   {
//     nodeTime: '2019-09-05',
//     nodeTitle: '土方开挖',
//     isDone: true,
//   },
//   {
//     nodeTime: '2019-09-05',
//     nodeTitle: '土方开挖',
//     isDone: true,
//   },
// ])
</script>

<style lang="less" scoped>
.timelines-wrapper {
  display: inline-block;
  position: relative;
  .base-line-wrap {
    display: flex;
    height: 6px;
    background-color: #26477a;
    .node-wrap {
      height: 6px;
      width: 100px;
      position: relative;
      .dot-wrap {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #7196cf;
        position: absolute;
        top: -4px;
        left: 0;
      }
      .content-wrap {
        position: absolute;
        top: 14px;
        left: -35px;
        .time {
          color: #bebfcc;
          font-size: 16px;
          text-align: center;
        }
        .title {
          color: #ffffff;
          font-size: 16px;
          text-align: center;
        }
      }
    }
  }
  .actual-line-wrap {
    display: flex;
    height: 10px;
    background-image: linear-gradient(to right, #104db7, #1fa9dc);
    position: absolute;
    top: -2px;
    left: 0;
    .node-wrap {
      height: 6px;
      width: 100px;
      position: relative;
      .dot-wrap {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        // background-color: #7196cf;
        position: absolute;
        top: -3px;
        left: 0;
        border: 3px solid #ffffff;
      }
      .indicator {
        border-top: 10px solid #1fa9dc;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: absolute;
        top: -18px;
        right: -6px;
      }
    }
    .node-wrap:last-child {
      height: 6px;
      width: 12px;
    }
  }
}
</style>
