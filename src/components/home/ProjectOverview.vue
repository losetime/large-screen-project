<template>
  <div class="project-overview-wrap">
    <div class="title-wrap">
      <img src="../../assets/images/home/title-icon.png" alt="" />
      <span>项目概况</span>
    </div>
    <div class="qrcode-wrap" v-if="showQRCode">
      <img :src="qrcodeImg" alt="" />
    </div>
    <div class="overview-wrap">
      <div class="item-wrap">
        <span>建管单位</span>
        <span>{{ projectOverview?.jgUnit }}</span>
      </div>
      <div class="item-wrap">
        <span>监理单位</span>
        <span>{{ projectOverview?.jlUnit }}</span>
      </div>
      <div class="item-wrap">
        <span>施工单位</span>
        <span>{{ projectOverview?.sgUnit }}</span>
      </div>
      <div class="item-wrap">
        <span>开工日期</span>
        <span>{{ projectOverview?.startDate || '--' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { apiGetProjectOverview, apiGetQRCode } from '@/service/api/home'
import { createQRCode } from '@/utils/base'
import useComponents from '@/hooks/useComponents'

const { componentsContainer } = useComponents(2)

const projectOverview = ref<any>({})

const qrCodeInfo = ref<any>({})

const qrcodeImg = ref('')

const showQRCode = computed(() => componentsContainer.value.includes('PROJECT_INFO_CODE'))

onMounted(() => {
  getProjectOverview()
  getQRCode()
})

/**
 * @desc 获取项目概况
 */
const getProjectOverview = async () => {
  const { code, data } = await apiGetProjectOverview()
  if (code === 20000) {
    projectOverview.value = data
  }
}

/**
 * @desc 获取项目二维码
 */
const getQRCode = async () => {
  const { code, data } = await apiGetQRCode()
  if (code === 20000) {
    qrCodeInfo.value = data
    const { infoCode, codeColor } = data
    if (infoCode && codeColor) {
      qrcodeImg.value = createQRCode(infoCode, codeColor)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/home.less';

.project-overview-wrap {
  height: 510px;
  width: 100%;
  background-image: url('../../assets/images/home/left-top.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  position: relative;
  .qrcode-wrap {
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid #25ca93;
    border-radius: 16px;
    position: absolute;
    right: 76px;
    top: 38px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .overview-wrap {
    margin-top: 55px;
    color: #ffffff;
    .item-wrap {
      display: flex;
      align-items: center;
      margin-top: 24px;
      font-size: 28px;
      span:first-child {
        display: inline-block;
        width: 112px;
        margin-right: 16px;
        color: #9a9caa;
      }
      span:last-child {
        display: inline-block;
        width: 552px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
