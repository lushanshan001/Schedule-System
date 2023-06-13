import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";
import {
  endLoading,
  loadingInstance,
  openLoading,
} from "@/assets/utils/loading";

const lyh = "http://192.168.50.243:63010/";
const pz = "http://192.168.50.139:63010/";
const zwy = "http://192.168.50.159:63010/";
const temp = "http://192.168.14.199:63010/";
//1.利用axios对象的方法create，去创建一个axios实例。
const requests = axios.create({
  //配置对象
  //接口当中：路径都带有/api     基础路径，发送请求的时候，路径当中会出现api
  baseURL: pz,
  //代表请求超时的时间
  timeout: 100000,
});

//请求拦截器：
requests.interceptors.request.use((config) => {
  //解析和上传到后端的时候进行loading加载显示
  openLoading("请稍等一下，数据正在处理中");
  //config:配置对象，对象里面有一个属性很重要，header请求头
  const token = localStorage.getItem("token");
  // 如果token存在就携带token到服务器
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}),
  (error) => {
    //关闭loading
    endLoading();
    return Promise.reject(error);
  };

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    if (loadingInstance !== null && loadingInstance !== undefined) {
      endLoading();
    }
    console.log(res, "连接数据");
    return res;
  },
  (error) => {
    if (loadingInstance !== null && loadingInstance !== undefined) {
      endLoading();
    }
    console.log(error, "错误数据");
    if (error.response !== null && error.response !== undefined) {
      const errorStatus = error.response.status;
      const errorText = error.response.statusText;
      if (errorStatus === 403) {
        ElMessage.error({ message: "权限不足" });
      } else if (errorStatus === 401) {
        ElMessage.error({ message: "尚未登录，请登录" });
        router.replace("/");
      } else {
        router.push({
          path: "/error",
          query: { errorNum: errorStatus, errorText: errorText },
        });
      }
    } else {
      router.push({
        path: "/error",
      });
    }
    return;
  }
);

//对外暴露
export default requests;
