<template>
  <div class="timelines-wrapper">
    <div class="base-line-wrap">
      <div class="node-wrap" v-for="(item, index) in timelines" :key="index">
        <span :class="{ 'dot-wrap': true }"></span>
        <div class="content-wrap">
          <!-- <p class="time">{{ item.nodeTime }}</p> -->
          <p class="title">{{ item.nodeTitle }}</p>
        </div>
      </div>
    </div>
    <div class="actual-line-wrap">
      <template v-for="(item, index) in timelines" :key="index">
        <div class="node-wrap" v-if="item.isDone">
          <span :class="{ 'dot-wrap': true }"></span>
          <!-- <span class="indicator" v-if="index === timelines.length - 2"></span> -->
          <span class="progress" v-if="progessIndex() === index">{{ progress }}%</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  timelines: any[]
  progress: string
}>()

const progessIndex = () => {
  const findIndex = props.timelines.findIndex((item: any) => !item.isDone)
  if (findIndex === -1) {
    return props.timelines.length - 1
  } else {
    return findIndex === 0 ? 0 : findIndex - 1
  }
}
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
        width: 90px;
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
      .progress {
        width: 28px;
        text-align: center;
        color: #ffffff;
        position: absolute;
        top: -25px;
        right: -10px;
      }
    }
    .node-wrap:last-child {
      height: 6px;
      width: 12px;
    }
  }
}
</style>
