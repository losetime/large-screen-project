<template>
  <div class="bracelet-record-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>手环领还记录</span>
    </div>
    <div class="detail-wrap">
      <div class="item-wrap" v-for="(item, index) in braceletRecord" :key="index">
        <img :src="item.useImageUrl || avatar" alt="" />
        <p class="name-wrap">{{ item.userName }}</p>
        <p class="post-wrap">{{ item.post }}</p>
        <p class="time-wrap">{{ item.accessTime.slice(10) }}</p>
        <span :class="{ 'status-wrap': true, 'out-site': item.accessType === '2' }">
          {{ item.accessType === '1' ? '进场' : '出场' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { apiGetRealTimeInAndOut } from '@/service/api/intelligentBuildingSite'
import avatar from '../../../assets/images/peopleInAndOut/people-avatar.png'

const braceletRecord = ref<any[]>([
  {
    userName: '张三',
    post: '吊车司机',
    accessTime: '2021-12-21 15:30',
    accessType: '1',
  },
])

onMounted(() => {
  // getRealTimeInAndOut()
})

/**
 * @desc 人员实时进出
 */
// const getRealTimeInAndOut = async () => {
//   const { code, data } = await apiGetRealTimeInAndOut()
//   if (code === 20000) {
//     braceletRecord.value = data
//   }
// }
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.bracelet-record-wrapper {
  height: inherit;
  width: 100%;
  background-image: url('../../../assets/images/home/real-time-in-and-out.png');
  background-size: 100% 100%;
  padding: 14px 20px;
  .detail-wrap {
    margin-top: 14px;
    display: flex;
    .item-wrap {
      width: 82px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      img {
        width: 76px;
        height: 106px;
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
        font-size: 18px;
        margin-top: 8px;
      }
      .post-wrap {
      }
      .time-wrap {
        font-size: 18px;
        color: #8e91a1;
        margin-top: 8px;
      }
      .status-wrap {
        background-color: #04b2ff;
        padding: 2px 14px;
        border-radius: 14px;
        margin-top: 5px;
      }
      .out-site {
        background-color: #f44765;
      }
    }
  }
}
</style>
