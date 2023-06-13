import { getRequest } from "@/utils/api";
import { postRequest } from "@/utils/api";
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      changePasswordRules:{
        // TODO: 邮箱正则需要适用多种邮箱，当前只能匹配QQ邮箱
        email:[{required:true,message:'请输入邮箱',trigger:'blur'},
        {pattern:/[1-9]\d{7,10}@qq\.com$/,message:'不符合邮箱规范'},],
        oldPassword:[{required:true,message:'请输入密码',trigger:'blur'},],
        password:[{required:true,message:'请输入密码',trigger:'blur'},
        {pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,message:"不符合密码规范"}],
      },
      changePasswordForm: {
        email:'',
        oldPassword: '',
        password:'',
      },
      warn: null,//密码错误的提示
      flag: 1,//分别展示跳转到哪一步的界面，flag为1时，是输入邮箱界面，为2时，是输入验证码界面，为3时，就是设置新密码的界面
    }
  },
  methods: {
    input() {
      this.warn = '';
    },
    emailNextStep() {
      this.$refs.changePasswordForm.validateField('email',valid => {
        if(valid){
          getRequest("/email/check?"+this.changePasswordForm.email,null).then((resp) => {
            if(resp.code === 2000){
              this.flag = 2;
            }else{
              this.warn = 'notExist';
            }
          })
        }
      })
    },
    changeEmail() {
      this.warn = '';
      this.$refs.changePasswordForm.clearValidate();
      this.flag=1;
    },
    passwordNextStep() {
      console.log(this.changePasswordForm);
      this.$refs.changePasswordForm.validateField('oldPassword',valid => {
        if(valid){
          getRequest("/email/check?"+this.changePasswordForm.email,null).then((resp) => {
            if(resp.code === 2000){
              this.flag = 2;
            }else{
              this.warn = 'notTrue';
            }
          })
        }
      })
    },
    changePassword() {
      this.$refs.changePasswordForm.validateField('password', valid => {
        if(valid){
          postRequest("/user/change-password",this.changePasswordForm).then((resp) => {
            if(resp.code === 2000){
              ElMessage.success('修改密码成功');
            }else{
              ElMessage.error('修改密码失败，请重试');
            }
          })
        }
      })
    },
  }
}