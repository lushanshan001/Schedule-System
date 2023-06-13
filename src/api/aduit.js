/**
 * 客流量
 */
import request from "./request";
import store from '@/store';

/**
 * 得到最近一天上传的客流量
 * @param {*} data 
 * @returns 
 */
export const getAduit = (data) => {
  //发请求：axios发请求返回结果Promise对象
  return request({
    url: "/content/footfallForecast/get-footfall?date="+data,
    method: "get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

/**
 * 添加客流量
 */
export const addAduit = (data) => {
  return request({
    url: "/content/footfallForecast/add-footfall",
    method: "post",
    data: data,
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};
