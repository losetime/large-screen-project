<template>
  <div class="people-report-to-duty-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>项目经理到岗到位</span>
    </div>
    <div class="detail-wrap">
      <div class="item-wrap" v-for="(item, index) in peopleDutyRecord" :key="index">
        <img :src="item.useImageUrl || avatar" alt="" class="avatar" />
        <p class="name-wrap">{{ item.userName }}</p>
        <p class="post-wrap">{{ item.post }}</p>
        <img src="../../../assets/images/home/arriving.png" alt="" class="arriving-mark" />
        <!-- <img src="../../../assets/images/home/not-arriving.png" alt="" class="arriving-mark" /> -->
      </div>
    </div>
    <div class="paging-wrap">
      <p>1/2</p>
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
  background-image: url('../../../assets/images/home/middle-bottom.png');
  background-size: 100% 100%;
  padding: 39px 35px;
  .detail-wrap {
    margin-top: 14px;
    display: flex;
    margin-top: 62px;
    .item-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 96px;
      position: relative;
      .avatar {
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
        color: #ffffff;
      }
      .post-wrap {
        padding: 2px 20px;
        font-size: 28px;
        background: linear-gradient(
          360deg,
          rgba(26, 73, 129, 0.42) 0%,
          rgba(14, 29, 51, 0.42) 14%,
          rgba(11, 24, 43, 0.42) 100%
        );
        box-shadow: inset 0px 0px 16px 0px rgba(42, 140, 222, 0.54);
        border-radius: 32px;
        border: 2px solid #26477a;
        color: #ffffff;
      }
      .out-site {
        background-color: #f44765;
      }
      .arriving-mark {
        position: absolute;
        top: -65px;
        right: -86px;
        width: 252px;
        height: 182px;
      }
    }
    .item-wrap:first-child {
      margin-left: 0;
    }
  }
  .paging-wrap {
    width: 100%;
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
}
</style>
