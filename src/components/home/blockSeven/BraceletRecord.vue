<template>
  <div class="bracelet-record-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>手环领还记录</span>
    </div>
    <div class="detail-wrap">
      <div class="item-wrap" v-for="(item, index) in braceletRecord" :key="index">
        <img :src="item?.useImageUrl || avatar" alt="" />
        <p class="name-wrap">{{ item?.personName }}</p>
        <p class="type-wrap">{{ item?.postName }}</p>
        <p class="time-wrap">{{ item?.actionTime.slice(10) }}</p>
        <span :class="{ 'receive-wrap': item.status === 'ONLINE', 'return-wrap': item.status === 'OFFLINE' }">
          {{ item.status === 'ONLINE' ? '领用' : '归还' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import avatar from '../../../assets/images/peopleInAndOut/people-avatar.png'
import { apiGetBraceletRecord } from '@/service/api/home'

const braceletRecord = ref<any[]>([])

onMounted(() => {
  getBraceletRecord()
})

/**
 * @desc 手环领还记录
 */
const getBraceletRecord = async () => {
  const { code, data } = await apiGetBraceletRecord()
  if (code === 20000) {
    braceletRecord.value = data
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.bracelet-record-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/middle-bottom.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  .detail-wrap {
    margin-top: 14px;
    display: flex;
    .item-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      width: 238px;
      img {
        width: 164px;
        height: 224px;
        border: 1px solid #1f5bb5;
        border-radius: 5px;
        padding: 4px;
      }
      .name-wrap {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 40px;
        margin-top: 6px;
      }
      .type-wrap {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 32px;
        color: #ffa721;
        margin-top: 4px;
      }
      .time-wrap {
        font-size: 40px;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 4px;
      }
      .receive-wrap {
        padding: 2px 20px;
        margin-top: 4px;
        font-size: 28px;
        background: rgba(60, 32, 7, 0.42);
        box-shadow: inset 0px 0px 16px 0px rgba(241, 157, 85, 0.5);
        border-radius: 32px;
        border: 2px solid #90490c;
      }
      .return-wrap {
        padding: 2px 20px;
        margin-top: 4px;
        font-size: 28px;
        background: rgba(11, 83, 43, 0.42);
        box-shadow: inset 0px 0px 16px 0px rgba(101, 202, 146, 0.5);
        border-radius: 32px;
        border: 2px solid #076c63;
      }
    }
    .item-wrap:first-child {
      margin-left: 0;
    }
  }
}
</style>
