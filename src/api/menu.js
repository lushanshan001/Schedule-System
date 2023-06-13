//统一接口管理
import request from "./request";
import store from '@/store'

export const menuList = () => {
  return request({
    url: "/auth/get-menus",
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  });
};
