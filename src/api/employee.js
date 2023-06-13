//统一接口管理
import request from "./request";
import store from "@/store";

/**
 * 获得员工信息
 * @param {页数，每页行数} data
 * @returns
 */
export const getShopEmployees = (data) => {
  return request({
    url:
      "/information/get-shop-employee",
    method: "get",
    params: {
      pages: data.pages,
      limit: data.limit,
      isSearch: data.isSearch,
      searchType: data.searchType,
      searchKeywords: data.searchKeywords,
    },
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};
/**
 * 获得员工信息
 * @param {页数，每页行数} data
 * @returns
 */
 export const getCompanyEmployees = (data) => {
  return request({
    url:
      "/information/get-company-employee",
    method: "get",
    params: {
      pages: data.pages,
      limit: data.limit,
      isSearch: data.isSearch,
      searchType: data.searchType,
      searchKeywords: data.searchKeywords,
    },
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};


/**
 * 修改员工信息
 * @param {员工数据} data 
 * @returns 
 */
// 修改员工信息
export const changeEmployee = (data) => {
  return request({
    url: "/information/information-update",
    method: "post",
    data: data,
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

//删除员工信息 data为员工id
export const deleteEmployees = (data) => {
  return request({
    url: "/employee/delete-employee",
    method: "post",
    data: data,
  });
};

/**
 * 添加员工信息
 * @param {员工消息列表} data
 * @returns
 */
export const addEmployees = (data) => {
  return request({
    url: "/information/employee/add-employee",
    method: "post",
    data: data,
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

/**
 * 员工一周上班总时间
 */
export const weekWorkHour = (data) =>{
  return request({
    url: "/content/shiftSchedule/get-staff-worktime?shopId="+data,
    // url: "/content/shiftSchedule/get-staff-worktime?shopId",
    method: "get",
    // data: data,
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
}

/**
 * 获取员工增长率
 * @param {*} data 
 * @returns 
 */
export const staffIncrease = (data) => {
  return request({
    url: "/information/get-employeeNumber",
    method: "get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};
