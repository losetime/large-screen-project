<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = reactive(zhCN)

onMounted(() => {
  exportVersion()
})

/**
 * @desc 输出当前版本
 */
const exportVersion = () => {
  console.log(
    '%c💡当前版本%c' + '1.0.5',
    'background: #44CF00; color: #fff; border-radius: 2px 0 0 2px; padding:2px 5px; font-family: AliPH;',
    'background: #1475B2; color: #fff; border-radius: 0 2px 2px 0; padding:2px 10px; font-family: AliPH;',
  )
}
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
