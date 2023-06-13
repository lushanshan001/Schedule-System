//统一接口管理
import request from "../request";

export const getPersonInfo = (data) =>{
  return request({
      url: "/user/check-user?id",
      method:"get",
      data:data,
  })
}

export const changePersonInfo = (data) =>{
  return request({
      url: "/user/change-user",
      method:"post",
      data:data,
  })
}