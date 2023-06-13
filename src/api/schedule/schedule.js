/**
 *排班表
 */
//统一接口管理
import request from "../request";
import store from "@/store";

/**
 * 生成一周排班表
 * @param {email} data
 * @returns
 */
export const getSchedule = (data) => {
  return request({
    url: "/content/shiftSchedule/add-schedule",
    method: "post",
    data:data,
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

/**
 * 得到一周的排班表
 * @param {} data 
 * @returns 
 */
export const getWeekSchedule = (data) => {
  return request({
    url: "/content/shiftSchedule/get-one-week",
    method: "get",
    params: {
      date: data.date,
      positionName: data.positionName,
      skill: data.skill,
    },
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

//得到一天的排班表
export const getOneSchedule = (data) => {
  return request({
    url: "/content/shiftSchedule/get-schedule",
    method: "get",
    params: {
      date: data.date,
      skill: data.skill,
      positionName: data.positionName
    },
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
}

/**
 * 获得一个职位的所有人
 */
 export const getOnePositionAllPeople= (data) => {
  return request({
    url: "/content/shiftSchedule/get-shop-staff",
    method: "get",
    params: {
      positionName: data
    },
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
}

/**
 * 修改班次
 */
export const changeSchedule = (date) =>{
  return request({
    url: "/content/shiftSchedule",
    method: "get",
    params: {
      // date: date.date,
      // startTime: date.startTime,
      // endTime: date.endTime,
      scheduleId: date.scheduleId,
      staffId: "1094597892582146048",
      // staffName: date.staffName,
      // positionName: date.positionName, 
    },
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
}