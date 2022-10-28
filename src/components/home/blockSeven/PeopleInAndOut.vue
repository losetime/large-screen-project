<template>
  <div class="people-in-and-out-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>实时进出</span>
    </div>
    <div class="detail-wrap">
      <div class="item-wrap" v-for="(item, index) in realTimeInAndOut" :key="index">
        <img :src="item.useImageUrl || peopleAvatar" alt="" v-if="item.type === 'person'" />
        <img :src="item.useImageUrl || car" alt="" v-else />
        <p class="name-wrap">{{ item.userName || '--' }}</p>
        <p class="type-wrap">{{ item.postName || '--' }}</p>
        <p class="time-wrap">{{ fromatTime(item.accessTime) }}</p>
        <span :class="{ 'in-site-wrap': item.accessType === '1', 'out-site-wrap': item.accessType === '2' }">
          {{ item.accessType === '1' ? '进场' : '出场' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiGetRealTimeInAndOut } from '@/service/api/home'
import peopleAvatar from '@/assets/images/home/people-avatar.png'
import car from '@/assets/images/home/car.png'
import useSubscription from '@/hooks/useSubscription'
import { fromatTime } from '@/utils/dateUtil'

const realTimeInAndOut = ref<any[]>([])

onMounted(() => {
  getRealTimeInAndOut()
})

/**
 * @desc 人员实时进出
 */
const getRealTimeInAndOut = async () => {
  const { code, data } = await apiGetRealTimeInAndOut()
  if (code === 20000) {
    realTimeInAndOut.value = data
  }
}

/**
 * @desc MQTT订阅回调
 */
const listenMqttMsg = (res: any) => {
  const { topic, msg } = res
  if (topic === '/S/push/person') {
    const { dataType } = msg
    if (dataType === 'personInOut') {
      getRealTimeInAndOut()
    }
  }
}

useSubscription(listenMqttMsg)
</script>

<style lang="less" scoped>
@import '../../../assets/style/home.less';
.people-in-and-out-wrapper {
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
        color: rgba(255, 255, 255, 0.7);
        margin-top: 4px;
      }
      .time-wrap {
        font-size: 32px;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 4px;
      }
      .in-site-wrap {
        padding: 2px 20px;
        margin-top: 4px;
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
      }
      .out-site-wrap {
        padding: 2px 20px;
        margin-top: 4px;
        font-size: 28px;
        background: rgba(68, 4, 15, 0.42);
        box-shadow: inset 0px 0px 16px 0px rgba(244, 71, 101, 0.5);
        border-radius: 32px;
        border: 2px solid #70242b;
      }
    }
    .item-wrap:first-child {
      margin-left: 0;
    }
  }
}
</style>
