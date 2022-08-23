<template>
  <div class="calendar-wrapper">
    <div class="calendar-switch">
      <div class="icon" @click="lowerClick()">&lt;</div>
      <div class="title">{{ year }}-{{ month > 9 ? month : '0' + month }}</div>
      <div class="icon" @click="upperCLick()">&gt;</div>
    </div>
    <div class="calendar-content">
      <div class="calendar-content-week">
        <div class="calendar-content-week-item" v-for="(item, index) in weekList" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="calendar-content-day">
        <div class="calendar-content-day-item" v-for="(item, index) in calendarList" :key="index">
          <span :class="{ 'day-text': true, 'is-current-month': item.isCurrentMonth, 'is-active': item.isActive }">
            {{ item.day }}
          </span>
          <span :class="item.type"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'

const props = defineProps<{
  eventData: any[]
}>()

/* 定义内容 */
const weekList = reactive<string[]>(['周日', '周一', '周二', '周三', '周四', '周五', '周六'])
let year = ref<number>(0)
let month = ref<number>(0)
let day = ref<number>(0)

/* 生命周期 */
onMounted(() => {
  getInitDate()
})

/* 获取当前年月日 */
const getInitDate = () => {
  const date = new Date()
  year.value = date.getFullYear()
  month.value = date.getUTCMonth() + 1
  day.value = date.getDate()
}

/* 获取天数 */
const calendarList = computed(() => {
  let arr = []
  const temp = {
    day: '',
    isCurrentMonth: true,
    isActive: false,
    type: 'default',
    content: '',
  }
  /* 获取当前月份多少天 */
  const nowDays = getDays(year.value, month.value)
  /* 获取上个月多少天 */
  const upperDays = getDays(year.value, month.value - 1)
  /* 获取当前月份多少天 */
  const nowWeek = getWeek(year.value, month.value)
  /* 将这个月多少天加入数组days */
  for (let i = 1; i <= nowDays; i++) {
    const findItem = props.eventData.find((item) => item.day === i)
    const newTemp = {
      ...temp,
      day: i < 10 ? `0${i}` : `${i}`,
      type: findItem ? findItem.type : 'default',
      isActive: day.value === i ? true : false,
    }
    arr.push(newTemp)
  }
  /* 将下个月要显示的天数加入days */
  for (let i = 1; i <= 42 - nowDays - nowWeek; i++) {
    const newTemp = { ...temp, day: i < 10 ? `0${i}` : `${i}`, isCurrentMonth: false }
    arr.push(newTemp)
  }
  /* 将上个月要显示的天数加入days */
  for (let i = 0; i < nowWeek; i++) {
    const newTemp = {
      ...temp,
      day: upperDays - i < 10 ? `0${upperDays - i}` : `${upperDays - i}`,
      isCurrentMonth: false,
    }
    arr.unshift(newTemp)
  }
  return arr
})

/* 得到当前年这个月分有多少天 */
const getDays = (Y: number, M: number): number => {
  return new Date(Y, M, 0).getDate()
}

/* 得到当前年，这个月的一号是周几 */
const getWeek = (Y: number, M: number): number => {
  const now = new Date()
  now.setFullYear(Y)
  now.setMonth(M - 1)
  now.setDate(1)
  return now.getDay()
}

/* 月份切换增加 */
const upperCLick = () => {
  if (month.value !== 12) {
    month.value = month.value + 1
  } else {
    year.value = year.value + 1
    month.value = 1
  }
}

/* 月份切换减少 */
const lowerClick = () => {
  if (month.value !== 1) {
    month.value = month.value - 1
  } else {
    year.value = year.value - 1
    month.value = 12
  }
}
</script>

<style lang="less" scoped>
.calendar-content-item {
  box-sizing: border-box;
  flex: 0 calc(100% / 7);
  // border-bottom: 1px solid #ececec;
  // border-right: 1px solid #ececec;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.calendar-wrapper {
  width: 100%;
  height: 100%;

  .calendar-switch {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    line-height: 50px;
    display: none;

    .icon {
      cursor: pointer;
      font-size: 16px;
      color: #2c3e50;
      user-select: none;
    }

    .title {
      margin: 0 20px;
      font-size: 16px;
      font-weight: bold;
      color: #2c3e50;
    }
  }

  .calendar-content {
    .calendar-content-week {
      display: flex;

      .calendar-content-week-item {
        height: 36px;
        color: #9b9cad;
        .calendar-content-item();
      }
    }

    .calendar-content-day {
      display: flex;
      flex-wrap: wrap;

      .calendar-content-day-item {
        height: 40px;
        margin-bottom: 5px;
        position: relative;
        // transition: all 0.3s;
        .calendar-content-item();
        .day-text {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          color: rgba(155, 156, 173, 1);
          border-radius: 50%;
        }
        .is-current-month {
          color: rgba(255, 255, 255, 1);
          &:hover {
            background-color: #2b4e8b;
            border: 1px solid #55b1ff;
          }
        }
        .is-active {
          background-color: #2b4e8b;
          border: 1px solid #55b1ff;
        }
        .default {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0);
          position: absolute;
          bottom: -4px;
          left: 18px;
        }
        .warning {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #f6b900;
          position: absolute;
          bottom: -4px;
          left: 18px;
        }
        .error {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #f44765;
          position: absolute;
          bottom: -4px;
          left: 18px;
        }
        .success {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #1ae3f0;
          position: absolute;
          bottom: -4px;
          left: 18px;
        }
      }
    }
  }
}
</style>
