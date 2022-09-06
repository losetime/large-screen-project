<template>
  <div class="people-report-to-duty-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>项目经理到岗到位</span>
    </div>
    <div class="detail-wrap">
      <div class="item-wrap" v-for="(item, index) in peopleDutyRecord" :key="index">
        <img :src="item.useImageUrl || avatar" alt="" />
        <p class="name-wrap">{{ item.userName }}</p>
        <p class="post-wrap">{{ item.post }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { apiGetRealTimeInAndOut } from '@/service/api/intelligentBuildingSite'
import avatar from '../../../assets/images/peopleInAndOut/people-avatar.png'

const peopleDutyRecord = ref<any[]>([
  {
    userName: '张三',
    post: '业主项目经理',
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
.people-report-to-duty-wrapper {
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
        background-color: #04b2ff;
        padding: 2px 14px;
        border-radius: 14px;
      }
      .out-site {
        background-color: #f44765;
      }
    }
  }
}
</style>
