//统一接口管理
import request from "./request";
import store from '@/store'

/**
 * 获取该公司的所有店铺
 * @param {*} data 
 * @returns 
 */
export const getShops = () =>{
  return request({
      url: "/shopservice/shop/check-all-shop",
      method:"get",
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

//
/**
 * 获得一个店铺的所有数据（老板）
 * @param {} data 
 * @returns 
 */
export const getShopInfo = (data) =>{
  return request({
      url: "/user/check-shop?id",
      method:"get",
      data:data,
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}
//
/**
 * 店长
 * @returns 
 */
export const getShopInfoByManager =() =>{
  return request({
    url: "/shopservice/shop/check-one-shop",
    method:"get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
})
}

/**
 * 添加店铺
 * @param {*} data 
 * @returns 
 */
export const addShop = (data) =>{
  return request({
      url: "/shopservice/shop/add-shop",
      method:"post",
      data:data,
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

//修改店铺信息
export const editShop = (data) =>{
  return request({
      url: "/user/edit-shop",
      method:"post",
      data:data,
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

/**
 * 删除店铺
 * @param {*} data 
 * @returns 
 */
export const deleteShop = (data) =>{
  return request({
      url: "/user/delete-shop",
      method:"post",
      data:data,
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

//获得所有店长，添加店铺时，需要设置店长，不能手填店长姓名
export const getManagers = (data) =>{
  return request({
      url: "/shop/check-shop-all-manager?shopId",
      method:"get",
      data:data,
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

/**
 * 获取该店铺所有职位
 * @param {*} data 
 * @returns 
 */
export const getPositions = (data) =>{
  return request({
      url: "/information/get-position",
      method:"get",
      params:{
        shopId: data,
      },
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

/**
 * 删除职位
 * @param {} data 
 * @returns 
 */
export const deletePosition = (data) =>{
  return request({
      url: "/information/delete-position",
      method:"get",
      params:{
        id: data.toString(),
      },
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

/**
 * 编辑职位
 * @param {*} data 
 * @returns 
 */
export const editPosition = (data) =>{
  return request({
      url: "/information/update-position",
      method:"post",
      data:data,
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

/**
 * 添加职位
 * @param {*} data 
 * @returns 
 */
export const addPosition = (data) =>{
  return request({
      url: "/information/add-position",
      method:"post",
      data:data,
      headers: {
        Authorization: `Bearer ${store.state.globel.token}`,
      },
  })
}

/**
 * 获取店铺在全国的分布
 * @returns
 */
export const getShopDistribution =() =>{
  return request({
    url: "/shopservice/shop/getShopDistribution",
    method:"get",
    headers: {
      Authorization: `Bearer ${store.state.globel.token}`,
    },
  })
}
