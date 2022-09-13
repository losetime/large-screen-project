import { $http } from '../http/index'

enum Api {
  getProjectOverview = '/cvtouch/largeScreenCvTouch/selectProjectInfo',
  getProjectPeople = '/cvtouch/largeScreenCvTouch/selectProjectPeople',
  getPeopleCodeStats = '/cvtouch/largeScreenCvTouch/selectProjectPeopleQrcode',
  getRealTimeInAndOut = '/cvtouch/largeScreenCvTouch/selectRealInoutRecord',
  getScenePeopleStats = '/cvtouch/largeScreenCvTouch/selectPersonInoutData',
  getScenePeopleChart = '/cvtouch/largeScreenCvTouch/selectPersonInoutRecordLineChart',
  getProjectInfo = '/cvtouch/largeScreenCvTouch/selectProjectSingleName',

  getQRCode = '/cvtouch/largeScreenCvTouch/selectProjectInfoOfQrcode',
  getProjectType = '/cvtouch/largeScreenCvTouch/selectProjectType',

  getEnvMonitorInfo = '/cvtouch/largeScreenCvTouch/selectEnvironmentalLatest',
  getMeteorologicalAlarm = '/cvtouch/largeScreenCvTouch/selectWeatherWarningList',
  getWeatherInfo = '/cvtouch/largeScreenCvTouch/selectTodayWeatherInfo',
  getWeatherDay7 = '/cvtouch/largeScreenCvTouch/selectWeatherInfo',

  getLocationInfo = '/cvtouch/largeScreenCvTouch/selectMapLocation',
  getVideoList = '/cvtouch/largeScreenCvTouch/selectMonitorList',

  getPowerTransformProjectProgress = '/cvtouch/largeScreenCvTouch/selectProjectProgress',
  getLineRouteProjectProgress = '/cvtouch/largeScreenCvTouch/selectConstructionProgressOfXl',
  getProjectDesignImg = '/cvtouch/largeScreenCvTouch/selectProjectImageList',

  getProjectManagerDuty = '/cvtouch/largeScreenCvTouch/selectCurrentMonthProjectManagerArrival',
  getBraceletRecord = '/cvtouch/largeScreenCvTouch/selectLatestWatchSignList',

  getSafetyStats = '/cvtouch/largeScreenCvTouch/selectAqbWatchTodayTotal',
  getSafetyChart = '/cvtouch/largeScreenCvTouch/selectAqbWatchDataStats',

  getWorkTicketInfo = '/cvtouch/largeScreenCvTouch/selectWorkTicket',

  getAlarmStats = '/cvtouch/largeScreenCvTouch/selectWarningStats',
  getAlarmRecord = '/cvtouch/largeScreenCvTouch/selectWarningRecord',
}

// ----------------------------------------项目概况--------------------------------------------------------

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
 * @desc: 获取项目概况
 */
export function apiGetProjectOverview(): Promise<any> {
  return $http.request({
    url: Api.getProjectOverview,
    method: 'GET',
  })
}

/**
 * @desc 获取项目二维码
 */
export function apiGetQRCode(): Promise<any> {
  return $http.request({
    url: Api.getQRCode,
    method: 'GET',
  })
}

/**
 * @desc 获取项目类型
 */
export function apiGetProjectType(): Promise<any> {
  return $http.request({
    url: Api.getProjectType,
    method: 'GET',
  })
}

// ----------------------------------------人员总览-----------------------------------------------------

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

// ----------------------------------------block-four-----------------------------------------------------

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
 * @desc 气象预警
 */
export function apiGetMeteorologicalAlarm(): Promise<any> {
  return $http.request({
    url: Api.getMeteorologicalAlarm,
    method: 'GET',
  })
}

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
export function apiGetWeatherDay5(): Promise<any> {
  return $http.request({
    url: Api.getWeatherDay7,
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

/**
 * @desc 获取项目设计图
 */
export function apiGetProjectDesignImg(): Promise<any> {
  return $http.request({
    url: Api.getProjectDesignImg,
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
 * @desc: 获取实时进出
 */
export function apiGetRealTimeInAndOut(): Promise<any> {
  return $http.request({
    url: Api.getRealTimeInAndOut,
    method: 'GET',
  })
}

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

// ---------------------------------------工作票------------------------------------------------------

/**
 * @desc 获取工作票信息
 */
export function apiGetWorkTicketInfo(): Promise<any> {
  return $http.request({
    url: Api.getWorkTicketInfo,
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
