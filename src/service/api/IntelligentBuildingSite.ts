import { $http } from '../http/index'

enum Api {
  getWeatherInfo = '/cvtouch/largeScreenCvTouch/selectWeatherInfo',
  getProjectOverview = '/cvtouch/largeScreenCvTouch/selectProjectInfo',
  getProjectPeople = '/cvtouch/largeScreenCvTouch/selectProjectPeople',
  getPeopleCodeStats = '/cvtouch/largeScreenCvTouch/selectProjectPeopleQrcode',
  getRealTimeInAndOut = '/cvtouch/largeScreenCvTouch/selectRealInoutRecord',
  getScenePeopleStats = '/cvtouch/largeScreenCvTouch/selectPersonInoutData',
  getScenePeopleChart = '/cvtouch/largeScreenCvTouch/selectPersonInoutRecordLineChart',
  getWorkTicketInfo = '/cvtouch/largeScreenCvTouch/selectWorkTicket',
  getSceneBreakRulesStats = '/cvtouch/largeScreenCvTouch/selectIllegalDataStat',
  getSceneBreakRulesCalendar = '/cvtouch/largeScreenCvTouch/selectIllegalRecord',
  getProjectProgress = '/cvtouch/largeScreenCvTouch/selectProjectProgress',
  getProjectInfo = '/cvtouch/largeScreenCvTouch/selectProjectSingleName',
  getEnvMonitorInfo = '/cvtouch/largeScreenCvTouch/selectEnvironmentalLatest',
  getVRTrainInfo = '/cvtouch/largeScreenCvTouch/selectVrTrain',
  getSignsAlarmInfo = '/cvtouch/largeScreenCvTouch/selectSingsAlarm',
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
 * @desc 获取工程进度
 */
export function apiGetProjectProgress(): Promise<any> {
  return $http.request({
    url: Api.getProjectProgress,
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
