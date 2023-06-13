import { getRequest } from "@/utils/api";
import { postRequest } from "@/utils/api";

export default {
  data() {
    return {
      //没有用el-form标签，所以这个暂时没有用
      loginRules:{
        // TODO: 邮箱正则需要适用多种邮箱，当前只能匹配QQ邮箱
        email:[{required:true,message:'请输入邮箱',trigger:'blur'},
        {pattern:/[1-9]\d{7,10}@qq\.com$/,message:'不符合邮箱规范'},],
        password:[{required:true,message:'请输入密码',trigger:'blur'},],
      },
      loginForm: { 
        email:'',
        password:'',
      },
      warn: null, //判断点击下一步之后给出的warning，是没输入邮箱，还是有些不存在
      flag: true, //判断是显示输入邮箱部分（为true），还是输入密码部分（为false）
    }
  },
  methods: {
    nextStep() {
      this.$refs.loginForm.validateField('email',valid => {
        if(valid){
          getRequest("/email/check?"+this.loginForm.email,null).then((resp) => {
            if(resp.code === 2000){
              this.flag = false;
            }else{
              this.warn = 'notExist';
            }
          })
        }
      })
    },
    changeEmail() {
      this.warn = '';
      this.$refs.loginForm.clearValidate();
      this.flag=true;
    },
    login() {
      this.$refs.loginForm.validateField( 'password', valid => {
        if(valid){
          postRequest("/user/login-password",this.loginForm).then((resp) => {
            if(resp.code === 2000){
              //TODO: 登录成功，sessionStorage存入的是一个user
              sessionStorage.setItem("user",resp.data);
              this.$router.replace("/main");
            }else{
              this.warn = 'notExist';
            }
          })
        }
      })
    }
  }
}