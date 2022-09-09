<template>
  <div class="paging-wrap">
    <p>{{ activeIndex }}/{{ length }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    length: number
    activeIndex?: number
  }>(),
  {
    activeIndex: 1,
  },
)
</script>

<style lang="less" scoped>
.paging-wrap {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  p {
    width: 120px;
    height: 48px;
    background: #060d30;
    border-radius: 8px;
    border: 2px solid #55b1ff;
    color: #ffffff;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
  }
}
</style>
