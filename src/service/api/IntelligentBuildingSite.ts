import { $http } from '../http/index'

enum Api {
  getWeatherInfo = '/cv-touch/largeScreenCvTouch/selectWeatherInfo',
  getProjectOverview = '/cv-touch/largeScreenCvTouch/selectProjectInfo',
  getProjectPeople = '/cv-touch/largeScreenCvTouch/selectProjectPeople',
  getPeopleCodeStats = '/cv-touch/largeScreenCvTouch/selectProjectPeopleQrcode',
  getRealTimeInAndOut = '/cv-touch/largeScreenCvTouch/selectRealInoutRecord',
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
