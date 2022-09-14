import { ref, computed, watch } from 'vue'
import { useStore } from '@/store'
// blockFour
import EnvMonitor from '@/components/home/blockFour/EnvMonitor.vue'
import Meteorological from '@/components/home/blockFour/Meteorological.vue'
import WeatherForecast from '@/components/home/blockFour/WeatherForecast.vue'
// blockFive
import VideoMonitor from '@/components/home/blockFive/VideoMonitor.vue'
import Location from '@/components/home/blockFive/Location.vue'
import DesignDrawing from '@/components/home/blockFive/DesignDrawing.vue'
// blockSeven
import PeopleInAndOut from '@/components/home/blockSeven/PeopleInAndOut.vue'
import PeopleReportToDuty from '@/components/home/blockSeven/PeopleReportToDuty.vue'
import BraceletRecord from '@/components/home/blockSeven/BraceletRecord.vue'
// blockEight
import SencePeople from '@/components/home/blockEight/SencePeople.vue'
import SafetyStats from '@/components/home/blockEight/SafetyStats.vue'

/**
 * @desc 表格逻辑
 * @param isImmediately 是否立即执行
 */
const useComponents = (type: number) => {
  const store = useStore()

  const screenConfigInfo = computed(() => store.state.screenConfigInfo)

  const componentsContainer = ref<any[]>([])

  watch(
    () => screenConfigInfo.value,
    (value) => {
      if (value) {
        getActiveBlockInfo(type)
      }
    },
  )

  const getActiveBlockInfo = (block: number) => {
    for (const item of screenConfigInfo.value.values()) {
      if (item.block === block) {
        filterComponents(item.cardList)
      }
    }
  }

  const filterComponents = (blockList: string[]) => {
    const componentsTemp: any[] = []
    blockList.forEach((item: any) => {
      switch (item) {
        // 天气预报
        case 'WEATHER_INFO':
          componentsTemp.push(WeatherForecast)
          break
        // 气象预警
        case 'WEATHER_WARNING':
          componentsTemp.push(Meteorological)
          break
        // 环境监测
        case 'ENVIRONMENT_MONITOR':
          componentsTemp.push(EnvMonitor)
          break
        // 视频监控
        case 'VIDEO_MONITOR':
          componentsTemp.push(VideoMonitor)
          break
        // 地图定位(安全帽&手环)
        case 'MAP_LOCATION':
          componentsTemp.push(Location)
          break
        // 工程图片
        case 'PROJECT_IMAGE':
          componentsTemp.push(DesignDrawing)
          break
        // 进出场记录
        case 'IN_OUT_RECORD':
          componentsTemp.push(PeopleInAndOut)
          break
        // 项目经理到岗到位
        case 'PROJECT_MANAGER_ARRIVAL':
          componentsTemp.push(PeopleReportToDuty)
          break
        // 手环领还记录
        case 'WATCH_SIGN_RECORD':
          componentsTemp.push(BraceletRecord)
          break
        // 现场人员
        case 'PERSON_INOUT_STAT':
          componentsTemp.push(SencePeople)
          break
        // 安全宝数据
        case 'WATCH_SIGN_STAT':
          componentsTemp.push(SafetyStats)
          break
        case 'PROJECT_INFO':
          componentsTemp.push('PROJECT_INFO')
          break
        case 'PROJECT_INFO_CODE':
          componentsTemp.push('PROJECT_INFO_CODE')
          break
        case 'PROJECT_PEOPLE':
          componentsTemp.push('PROJECT_PEOPLE')
          break
        case 'PROJECT_PEOPLE_CODE':
          componentsTemp.push('PROJECT_PEOPLE_CODE')
          break
      }
    })
    componentsContainer.value = componentsTemp
  }

  return {
    componentsContainer,
  }
}

export default useComponents
