/**
 *规则
 */
//统一接口管理
import request from "../request";
import store from "@/store";

/**
 * 添加规则
 * @param {email} data
 * @returns
 */
export const addOrChangeRule = (data) => {
  return request({
    url: "/content/schedulingRules",
    method: "post",
    data:data,
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

/**
 * 获得所有任务列表
 * @returns 
 */
export const getAllRule = () => {
  return request({
    url: "/content/schedulingRules/get-all-task",
    method: "get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

/**
 * 规则名查重
 * @param {*} data 
 * @returns 
 */
export const isRepeatTaskName = (data) =>{
  return request({
    url: "/content/schedulingRules/check-rule-name?name="+data,
    method: "get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
}

/**
 * 得到店铺固定自定义规则的信息
 * @param {} data 
 * @returns 
 */
export const getFixedRule = (data) =>{
  return request({
    url: "/content/schedulingRules/get-one?ruleTypeId="+data,
    method: "get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
}