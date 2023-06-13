import { postRequest } from '@/utils/api';
import { getRequest } from "@/utils/api";
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      registerRules:{
        companyName:[{required:true,message:'请输入公司名称',trigger:'blur'}],
        name:[{required:true,message:'请输入名字',trigger:'blur'}],
        phone:[{required:true,message:'请输入手机号码',trigger:'blur'},
        {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message:'请输入正确的手机号码'},],
        email:[{required:true,message:'请输入邮箱',trigger:'blur'},
        {pattern:/[1-9]\d{8,10}@qq\.com$/,message:'不符合邮箱规范'},],
        companySize:[{required:true,message:'请输入公司规模',trigger:'blur'},
        {pattern:/^\d{1,8}$/,message:"请按正确格式输入，如：200"}],
        password:[{required:true,message:'请输入密码',trigger:'blur'},
        {pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,message:"不符合密码规范"}],
        code:[{required:true,message:'请输入验证码',trigger:'blur'}]
      },
      registerForm: {
        companyName:'',
        name:'',
        phone:'',
        email:'',
        companySize:'',
        password:'',
        code:'',
      },
      code: '',
      codeButton: '获取',
      isClick: false,
      warn: '',
    }
  },
  methods: {
    getCode(){
      if(this.isClick === true ){
        return;
      }
      this.$refs.registerForm.validateField('email',valid => {
        if(valid){
          getRequest('/code/get-code?'+this.registerForm.email,null).then(resp=>{
            if(resp.data.code==20002){
              ElMessage.error("发送验证码失败");
            }else{
              let time = 60; //倒计时时间
              let timer = setInterval(() => {
                this.codeButton =  time + "s后重新获取";
                this.isClick = true;
                time--;
                if (time < 0) {
                  this.codeButton = "获取验证码";
                  this.isClick = false;
                  clearInterval(timer);
                }
              }, 1000);
            }
          })
        }
      })
    },
    checkCode() {
      this.$refs.registerForm.validateField('code',valid => {
        if(valid){
          postRequest("/code/check-code",this.code).then((resp) => {
            if(resp.code === 2000){
              return true;
            }else{
              this.warn = 'codeError';
              return false;
            }
          })
        }
      })
    },
    register(){
      this.$refs.registerForm.validate((valid)=>{
        if(valid){
          if(this.checkCode() === true){
            postRequest("/user/register",this.registerForm).then((resp) => {
              if(resp.code === 2000){
                ElMessage.success('注册成功');
                this.$router.replace('/');
              }else{
                ElMessage.error('注册失败，请重试');
              }
            })
          }
        }
      })
    },
  },
}