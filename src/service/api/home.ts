import { $http } from '../http/index'

enum Api {
  getWeatherInfo = '/doorway/largeScreenDoorway/selectWeatherInfo',
  getWindInfo = '/doorway/largeScreenDoorway/selectWeatherInfo2',
  getWeatherDay7 = '/doorway/largeScreenDoorway/selectLastSevenWeather',
  getPeopleInAndOutStats = '/doorway/largeScreenDoorway/selectPersonInoutData',
  getPeoplePostDistribute = '/doorway/largeScreenDoorway/selectPersonPostDistributed',
  getPeopleType = '/doorway/largeScreenDoorway/selectPersonTypeDistributed',
  getProjectDistribute = '/doorway/largeScreenDoorway/selectProjectDistributed',
  getPeopleInAndOutRecord = '/doorway/largeScreenDoorway/selectPersonInoutRecord',
}

// -------------------------------------- 人员进出管理大屏 -----------------------------------------------

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
 * @desc: 获取风力相关信息
 */
export function apiGetWindInfo(): Promise<any> {
  return $http.request({
    url: Api.getWindInfo,
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
 * @desc: 获取人员进出统计
 */
export function apiGetPeopleInAndOutStats(): Promise<any> {
  return $http.request({
    url: Api.getPeopleInAndOutStats,
    method: 'GET',
  })
}

/**
 * @desc 在场人员岗位分布
 */
export function apiGetPeoplePostDistribute(): Promise<any> {
  return $http.request({
    url: Api.getPeoplePostDistribute,
    method: 'GET',
  })
}

/**
 * @desc 在场人员类型
 */
export function apiGetPeopleType(): Promise<any> {
  return $http.request({
    url: Api.getPeopleType,
    method: 'GET',
  })
}

/**
 * @desc 项目部分布
 */
export function apiGetProjectDistribute(): Promise<any> {
  return $http.request({
    url: Api.getProjectDistribute,
    method: 'GET',
  })
}

/**
 * @desc 获取人员进出记录
 */
export function apiGetPeopleInAndOutRecord(): Promise<any> {
  return $http.request({
    url: Api.getPeopleInAndOutRecord,
    method: 'GET',
  })
}
