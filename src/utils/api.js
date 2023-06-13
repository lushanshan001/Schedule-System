import { ElMessage } from 'element-plus';
import axios from "axios";
import router from '../router'

axios.interceptors.response.use(success=>{
  if(success.status&&success.status==200){
    if(success.data.code==20001||success.data.code==20002){
      ElMessage.error({message:success.data.message});
      return;
    }
    if(success.data.code==20000){
      ElMessage.success({message:success.data.message});
    }
  }
  return success.data;
}, error=>{//接口访问不到
  if(error.response.code==504||error.response.code==404){
    ElMessage.error({message:'网络忙'})
  }else if(error.message.code==403){
    ElMessage.error({message:'权限不足'})
  }else if(error.message.code==401){
    ElMessage.error({message:'尚未登录，请登录'})
    router.replace('/login');
  }else{
    if(error.response.data.message){
      ElMessage.error({message:error.response.data.message})
    }else{
      ElMessage.error({message:'未知错误'})
    }
  }
  return;
})

export const postRequest=(url,params)=>{
  return axios({
    method:'post',
    url:url,
    data:params
  })
}
export const getRequest=(url,params)=>{
  return axios({
    method:'get',
    url:url,
    data:params
  })
}