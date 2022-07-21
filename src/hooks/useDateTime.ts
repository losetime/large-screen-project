import { ref, onMounted } from 'vue'
import { getDate, getTime, getWeek } from '@/utils/dateUtil'

const useDateTime = (dateFormat?: string, timeFormat?: string) => {
  const date = ref('')
  const time = ref('')
  const week = ref('')

  onMounted(() => {
    getDateTime()
  })

  const getDateTime = () => {
    date.value = getDate(dateFormat)
    time.value = getTime(timeFormat)
    week.value = getWeek()
    setTimeout(getDateTime, 1000)
  }

  return {
    date,
    time,
    week,
  }
}

export default useDateTime
