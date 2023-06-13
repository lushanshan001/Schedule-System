//统一接口管理
import request from "../request";

export const getCompanyInfo = (data) =>{
  return request({
      url: "/user/check-company?id",
      method:"get",
      data:data,
  })
}

export const changeCompanyInfo = (data) =>{
  return request({
      url: "/user/change-company?id",
      method:"get",
      data:data,
  })
}

