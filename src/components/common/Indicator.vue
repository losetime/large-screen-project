<template>
  <div class="indicator-wrap">
    <template v-for="(item, index) in length" :key="item">
      <span :class="{ 'indicator-dot': true, 'active-dot': activeIndex === index }"></span>
    </template>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    length: number
    activeIndex?: number
  }>(),
  {
    activeIndex: 0,
  },
)
</script>

<style lang="less" scoped>
.indicator-wrap {
  position: absolute;
  right: 18px;
  top: 5px;
  .indicator-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #7282a1;
    margin-left: 5px;
    cursor: pointer;
  }
  .active-dot {
    background-color: #ffffff;
  }
}
</style>
