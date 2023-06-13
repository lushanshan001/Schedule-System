//统一接口管理
import request from "./request";
import store from '@/store'

/**
 * 登录
 * @param {} data 
 * @returns 
 */
export const login = (data) => {
  return request({
    url: "/auth/oauth/token",
    method: "post",
    params: data,
  });
};

/**
 * 登录 验证邮箱
 * @param {email} data 
 * @returns 
 */
export const checkEmail = (data) =>{
  return request({
    url: "/auth/check-email/"+data,
    method: "GET",
  });
}

//忘记密码
export const changePassword =(data) =>{
  return request({
    url: "/user/change-password",
    method: "post",
    params: data,
  });
}

/**
 * 注册
 * @param {user对象} data 
 * @returns 
 */
export const register = (data) =>{
  return request({
    url:"/auth/register",
    method:"post",
    data:data
  })
}

/**
 * 获取用户的信息
 */
export const getUserRole = () =>{
  return request({
    url:"/auth/getUserRole",
    method:"get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  })
}