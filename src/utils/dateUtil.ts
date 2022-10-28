import { isObject, isString } from 'lodash-es'
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(date: dayjs.ConfigType): string {
  return dayjs(date).format(DATE_TIME_FORMAT)
}

export function formatToDate(date: dayjs.ConfigType): string {
  return dayjs(date).format(DATE_FORMAT)
}

export const formatAgo = (str: string | number) => {
  if (!str) return ''
  const date = new Date(Number(str))
  const time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if (time / 1000 < 30) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt(String(time / 1000)) + '秒前'
  } else if (time / 60000 < 60) {
    return parseInt(String(time / 60000)) + '分钟前'
  } else if (time / 3600000 < 24) {
    return parseInt(String(time / 3600000)) + '小时前'
  } else if (time / 86400000 < 31) {
    return parseInt(String(time / 86400000)) + '天前'
  } else if (time / 2592000000 < 12) {
    return parseInt(String(time / 2592000000)) + '月前'
  } else {
    return parseInt(String(time / 31536000000)) + '年前'
  }
}

/**
 * @description: 格式化请求参数时间
 */
export function formatRequestDate(params: any) {
  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}

export const getDate = (format?: string) => {
  return dayjs().format(format || 'YYYY-MM-DD')
}

export const getTime = (format?: string) => {
  return dayjs().format(format || 'HH:mm:ss')
}

export const getWeek = () => {
  const tempWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return tempWeek[dayjs().day()]
}

/**
 * @desc 格式化时间（如果是今日，只显示时分；非今日数据还需显示日期）
 */
export const fromatTime = (time: string) => {
  if (!time) return '--'
  const currentDate = getDate()
  const arr = time.split(' ')
  const splitDate = arr[0]
  const splitTime = arr[1]
  if (currentDate === splitDate) {
    return splitTime.slice(3)
  } else {
    return `${splitDate.slice(5)} ${splitTime.slice(0, 5)}`
  }
}

export const dateUtil = dayjs
