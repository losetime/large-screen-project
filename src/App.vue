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
  font-family: AliPH;
  src: url(./assets/font/Alibaba_PuHuiTi_2.0_55_Regular_55_Regular.ttf) format('truetype');
}

body {
  font-family: AliPH !important;
  p {
    margin: 0;
  }
}
</style>
