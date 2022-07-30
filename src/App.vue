<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = reactive(zhCN)
</script>
<style lang="less">
/* 自定义字体引入 */
@font-face {
  font-family: DINAlternate-Bold;
  src: url(./assets/font/DINAlternate-bold.ttf) format('truetype');
}

body {
  p {
    margin: 0;
  }
}
</style>
