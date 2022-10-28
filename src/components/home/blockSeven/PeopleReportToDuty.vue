<template>
  <div class="people-report-to-duty-wrapper">
    <div class="title-wrap">
      <img src="../../../assets/images/home/title-icon.png" alt="" />
      <span>项目经理到岗到位</span>
    </div>
    <div class="detail-wrap">
      <swiper
        :modules="modules"
        :autoplay="{
          delay: 10000,
          disableOnInteraction: false,
        }"
        @active-index-change="onActiveIndexChange"
      >
        <template v-for="(record, recordIndex) in projectManagerDuty" :key="recordIndex">
          <swiper-slide>
            <div class="item-wrap" v-for="(item, index) in record" :key="index">
              <img :src="item.photoUrl || peopleAvatar" alt="" class="avatar" />
              <p class="name-wrap">{{ item.userName || '--' }}</p>
              <p class="post-wrap">{{ item.postName || '--' }}</p>
              <img src="../../../assets/images/home/arriving.png" alt="" class="arriving-mark" v-if="item.arriveFlag" />
              <img src="../../../assets/images/home/not-arriving.png" alt="" class="arriving-mark" v-else />
            </div>
          </swiper-slide>
        </template>
      </swiper>
      <Indicator :length="projectManagerDuty.length" :active-index="activeIndex" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import peopleAvatar from '../../../assets/images/home/people-avatar.png'
import Indicator from '@/components/common/Indicator.vue'
import { apiGetProjectManagerDuty } from '@/service/api/home'
import useSubscription from '@/hooks/useSubscription'

const modules = [Pagination, Autoplay]

const activeIndex = ref(1)

const projectManagerDuty = ref<any[]>([])

onMounted(() => {
  getProjectManagerDuty()
})

/**
 * @desc 人员实时进出
 */
const getProjectManagerDuty = async () => {
  const { code, data } = await apiGetProjectManagerDuty()
  if (code === 20000) {
    projectManagerDuty.value = handleChunk(data, 6)
  }
}

const onActiveIndexChange = (event: any) => {
  activeIndex.value = event.realIndex + 1
}

/**
 * @desc 分割一维数组为二维数组
 */
const handleChunk = (arr: any[], size: number): any[][] => {
  var objArr = []
  var index = 0
  var objArrLen = arr.length / size
  for (var i = 0; i < objArrLen; i++) {
    var arrTemp = []
    for (var j = 0; j < size; j++) {
      arrTemp[j] = arr[index++]
      if (index == arr.length) {
        break
      }
    }
    objArr[i] = arrTemp
  }
  return objArr
}

/**
 * @desc MQTT订阅回调
 */
const listenMqttMsg = (res: any) => {
  const { topic, msg } = res
  if (topic === '/S/push/person') {
    const { dataType } = msg
    if (dataType === 'personInOut') {
      getProjectManagerDuty()
    }
  }
}

useSubscription(listenMqttMsg)
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
    height: 450px;
    display: flex;
    position: relative;
    ::v-deep(.swiper) {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        .swiper-slide {
          .item-wrap {
            width: 210px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 238px;
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
              top: -12px;
              right: -86px;
              width: 252px;
              height: 182px;
            }
          }
          .item-wrap:first-child {
            margin-left: 0;
          }
        }
      }
    }
    .paging-wrap {
      position: absolute;
      bottom: -65px;
      left: 46%;
      z-index: 100;
    }
  }
}
</style>
