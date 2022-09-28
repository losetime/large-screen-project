<template>
  <div class="timelines-wrapper">
    <div class="base-line-wrap">
      <div
        :class="{ 'node-wrap': true, 'first-node': index === 0 }"
        v-for="(item, index) in props.timelines"
        :key="index"
      >
        <span :class="{ 'dot-wrap': true }"></span>
        <div class="content-wrap">
          <p class="title">{{ item.nodeTitle }}</p>
        </div>
      </div>
    </div>
    <div class="actual-line-wrap">
      <template v-for="(item, index) in props.timelines" :key="index">
        <div class="node-wrap" v-if="item.isDone">
          <span :class="{ 'dot-wrap': true }"></span>
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
    height: 20px;
    background-color: #26477a;
    .node-wrap {
      height: 100%;
      width: 227px;
      position: relative;
      .dot-wrap {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 6px solid #ffffff;
        position: absolute;
        top: -5px;
        right: -4px;
      }
      .content-wrap {
        position: absolute;
        top: 26px;
        right: -58px;
        width: 150px;
        .time {
          color: #bebfcc;
          font-size: 16px;
          text-align: center;
        }
        .title {
          color: #ffffff;
          font-size: 28px;
          text-align: center;
        }
      }
    }
    .first-node {
      width: 0px;
    }
  }
  .actual-line-wrap {
    display: flex;
    height: 20px;
    background-image: linear-gradient(to right, #104db7, #1fa9dc);
    position: absolute;
    top: 0px;
    left: 0px;
    .node-wrap {
      height: 100%;
      width: 227px;
      position: relative;
      .dot-wrap {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        top: -5px;
        right: -4px;
        border: 6px solid #ffffff;
      }
      .progress {
        width: 90px;
        text-align: center;
        color: #ffffff;
        position: absolute;
        top: -51px;
        right: -34px;
        font-size: 32px;
      }
    }
    .node-wrap:first-child {
      width: 0;
      .dot-wrap {
        background-color: #104db7;
      }
    }
  }
}
</style>
