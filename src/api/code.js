/**
 * 验证码
 */
//统一接口管理
import request from "./request";

/**
 * 发送验证码
 * @param {email} data 
 * @returns 
 */
export const  getCode = (email) =>{
    return request({
        url: "/auth/send-code/"+email,
        method:"get",
    })
}
