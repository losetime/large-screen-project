import { $http } from '../http/index'

enum Api {
  getWeatherInfo = '/cvtouch/largeScreenCvTouch/selectWeatherInfo',
  getWeatherDay7 = '/doorway/largeScreenDoorway/selectLastSevenWeather',
  getProjectOverview = '/cvtouch/largeScreenCvTouch/selectProjectInfo',
  getProjectPeople = '/cvtouch/largeScreenCvTouch/selectProjectPeople',
  getPeopleCodeStats = '/cvtouch/largeScreenCvTouch/selectProjectPeopleQrcode',
  getRealTimeInAndOut = '/cvtouch/largeScreenCvTouch/selectRealInoutRecord',
  getScenePeopleStats = '/cvtouch/largeScreenCvTouch/selectPersonInoutData',
  getScenePeopleChart = '/cvtouch/largeScreenCvTouch/selectPersonInoutRecordLineChart',
  getWorkTicketInfo = '/cvtouch/largeScreenCvTouch/selectWorkTicket',
  getSceneBreakRulesStats = '/cvtouch/largeScreenCvTouch/selectIllegalDataStat',
  getSceneBreakRulesCalendar = '/cvtouch/largeScreenCvTouch/selectIllegalRecord',
  getProjectInfo = '/cvtouch/largeScreenCvTouch/selectProjectSingleName',
  getEnvMonitorInfo = '/cvtouch/largeScreenCvTouch/selectEnvironmentalLatest',
  getVRTrainInfo = '/cvtouch/largeScreenCvTouch/selectVrTrain',
  getSignsAlarmInfo = '/cvtouch/largeScreenCvTouch/selectSingsAlarm',

  getLocationInfo = '/cvtouch/largeScreenCvTouch/selectMapLocation',
  getVideoList = '/cvtouch/largeScreenCvTouch/selectMonitorList',

  getPowerTransformProjectProgress = '/cvtouch/largeScreenCvTouch/selectProjectProgress',
  getLineRouteProjectProgress = '/cvtouch/largeScreenCvTouch/selectConstructionProgressOfXl',

  getProjectManagerDuty = '/cvtouch/largeScreenCvTouch/selectCurrentMonthProjectManagerArrival',
  getBraceletRecord = '/cvtouch/largeScreenCvTouch/selectLatestWatchSignList',

  getSafetyStats = '/cvtouch/largeScreenCvTouch/selectAqbWatchTodayTotal',
  getSafetyChart = '/cvtouch/largeScreenCvTouch/selectAqbWatchDataStats',

  getAlarmStats = '/cvtouch/largeScreenCvTouch/selectWarningStats',
  getAlarmRecord = '/cvtouch/largeScreenCvTouch/selectWarningRecord',
}

// -------------------------------------- e基建智慧工地 -----------------------------------------------

/**
 * @desc: 获取当前天气
 */
export function apiGetWeatherInfo(): Promise<any> {
  return $http.request({
    url: Api.getWeatherInfo,
    method: 'GET',
  })
}

/**
 * @desc: 获取近7天天气预报
 */
export function apiGetWeatherDay7(): Promise<any> {
  return $http.request({
    url: Api.getWeatherDay7,
    method: 'GET',
  })
}

/**
 * @desc: 获取项目概况
 */
export function apiGetProjectOverview(): Promise<any> {
  return $http.request({
    url: Api.getProjectOverview,
    method: 'GET',
  })
}

/**
 * @desc: 获取项目人员信息
 */
export function apiGetProjectPeople(): Promise<any> {
  return $http.request({
    url: Api.getProjectPeople,
    method: 'GET',
  })
}

/**
 * @desc: 获取人员一码通统计
 */
export function apiGetPeopleCodeStats(): Promise<any> {
  return $http.request({
    url: Api.getPeopleCodeStats,
    method: 'GET',
  })
}

/**
 * @desc: 获取实时进出
 */
export function apiGetRealTimeInAndOut(): Promise<any> {
  return $http.request({
    url: Api.getRealTimeInAndOut,
    method: 'GET',
  })
}

/**
 * @desc: 获取现场人员统计数据
 */
export function apiGetScenePeopleStats(): Promise<any> {
  return $http.request({
    url: Api.getScenePeopleStats,
    method: 'GET',
  })
}

/**
 * @desc: 获取现场人员统计图表
 */
export function apiGetScenePeopleChart(): Promise<any> {
  return $http.request({
    url: Api.getScenePeopleChart,
    method: 'GET',
  })
}

/**
 * @desc 获取工作票信息
 */
export function apiGetWorkTicketInfo(): Promise<any> {
  return $http.request({
    url: Api.getWorkTicketInfo,
    method: 'GET',
  })
}

/**
 * @desc 获取现场违章统计信息
 */
export function apiGetSceneBreakRulesStats(): Promise<any> {
  return $http.request({
    url: Api.getSceneBreakRulesStats,
    method: 'GET',
  })
}

/**
 * @desc 获取现场违章日历信息
 */
export function apiGetSceneBreakRulesCalendar(): Promise<any> {
  return $http.request({
    url: Api.getSceneBreakRulesCalendar,
    method: 'GET',
  })
}

/**
 * @desc 获取工程信息
 */
export function apiGetProjectInfo(): Promise<any> {
  return $http.request({
    url: Api.getProjectInfo,
    method: 'GET',
  })
}

/**
 * @desc 获取环境监测数据
 */
export function apiGetEnvMonitorInfo(): Promise<any> {
  return $http.request({
    url: Api.getEnvMonitorInfo,
    method: 'GET',
  })
}

/**
 * @desc 获取VR培训数据
 */
export function apiGetVRTrainInfo(): Promise<any> {
  return $http.request({
    url: Api.getVRTrainInfo,
    method: 'GET',
  })
}

/**
 * @desc 获取体征告警数据
 */
export function apiGetSignsAlarmInfo(): Promise<any> {
  return $http.request({
    url: Api.getSignsAlarmInfo,
    method: 'GET',
  })
}

// ----------------------------------------工地实时监控-----------------------------------------------------

/**
 * @desc 获取地图定位
 */
export function apiGetLocationInfo(): Promise<any> {
  return $http.request({
    url: Api.getLocationInfo,
    method: 'GET',
  })
}

/**
 * @desc 获取视频列表
 */
export function apiGetVideoList(): Promise<any> {
  return $http.request({
    url: Api.getVideoList,
    method: 'GET',
  })
}

// ----------------------------------------工程进度-----------------------------------------------------

/**
 * @desc 获取工程进度-变电
 */
export function apiGetPowerTransformProjectProgress(): Promise<any> {
  return $http.request({
    url: Api.getPowerTransformProjectProgress,
    method: 'GET',
  })
}

/**
 * @desc 获取工程进度-线路
 */
export function apiGetLineRouteProjectProgress(): Promise<any> {
  return $http.request({
    url: Api.getLineRouteProjectProgress,
    method: 'GET',
  })
}

// ----------------------------------------block-seven-----------------------------------------------------

/**
 * @desc 获取项目经理到岗到位
 */
export function apiGetProjectManagerDuty() {
  return $http.request({
    url: Api.getProjectManagerDuty,
    method: 'GET',
  })
}

/**
 * @desc 获取手环领还记录
 */
export function apiGetBraceletRecord() {
  return $http.request({
    url: Api.getBraceletRecord,
    method: 'GET',
  })
}

// ----------------------------------------block-eight-----------------------------------------------------

/**
 * @desc 获取安全宝统计数据
 */
export function apiGetSafetyStats() {
  return $http.request({
    url: Api.getSafetyStats,
    method: 'GET',
  })
}

/**
 * @desc 获取安全宝柱状图数据
 */
export function apiGetSafetyChart() {
  return $http.request({
    url: Api.getSafetyChart,
    method: 'GET',
  })
}

// ----------------------------------------体征告警-----------------------------------------------------

/**
 * @desc 获取体征告警统计数据
 */
export function apiGetAlarmStats() {
  return $http.request({
    url: Api.getAlarmStats,
    method: 'GET',
  })
}

/**
 * @desc 获取体征告警列表
 */
export function apiGetAlarmRecord() {
  return $http.request({
    url: Api.getAlarmRecord + '?size=3',
    method: 'GET',
  })
}
