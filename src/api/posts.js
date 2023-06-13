/**
 * 职位
 */
import request from "./request";
import store from '@/store';

/**
 * 获得一个店铺的所有职位信息
 * @returns 
 */
export const getPosts = () => {
  return request({
    url: "/information/get-position",
    method: "GET",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};

/**
 * 得到一个店铺的技能消息
 */
export const getSkill = () =>{
  return request({
    url: "/content/shiftSchedule/get-shop-skill",
    method: "GET",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
}