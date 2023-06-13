import { ElMessage } from "element-plus";
import { changePassword } from "@/api/user";
import { checkCode } from "@/api/code";

export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetPasswordForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      forgetPasswordRules: {
        //这里没有用到el-form，所以规则暂时没有用到
        // TODO: 邮箱正则需要适用多种邮箱，当前只能匹配QQ邮箱
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { pattern: /[1-9]\d{7,10}@qq\.com$/, message: "不符合邮箱规范" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: "不符合密码规范",
          },
        ],
        rePassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur", required: true },
        ],
      },
      forgetPasswordForm: {
        email: "",
        code: "",
        password: "",
        rePassword: "",
      },
      warn: null, //有多种，每一个输入框都有两种
      flag: 1, //分别展示跳转到哪一步的界面，flag为1时，是输入邮箱界面，为2时，是输入验证码界面，为3时，就是设置新密码的界面
      code: "",
      codeButton: "获取",
      isClick: false,
    };
  },
  methods: {
    emailNextStep() {
      this.$refs.forgetPasswordForm.validateField("email", (valid) => {
        if (valid) {
          const res = login(this.loginForm.email, null);
          if (res.code === this.$store.state.globel.success) {
            this.flag = 2;
          } else {
            this.warn = "notExist";
          }
        }
      });
    },
    changeEmail() {
      this.warn = "";
      this.$refs.forgetPasswordForm.clearValidate();
      this.flag = 1;
    },
    getCode() {
      if (this.isClick === true) {
        return;
      }
      const res = getCode(this.forgetPasswordForm.email, null);
      if (res.data.code === this.$store.state.globel.success) {
        ElMessage.error("发送验证码失败");
      } else {
        let time = 60; //倒计时时间
        let timer = setInterval(() => {
          this.codeButton = time + "s后重新获取";
          this.isClick = true;
          time--;
          if (time < 0) {
            this.codeButton = "获取验证码";
            this.isClick = false;
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    codeNextStep() {
      this.$refs.forgetPasswordForm.validateField("code", (valid) => {
        if (valid) {
          const res = checkCode(this.code);
          if (res.code === this.$store.state.globel.success) {
            this.flag = 3;
          } else {
            this.warn = "codeError";
          }
        }
      });
    },
    forgetPassword() {
      this.$refs.forgetPasswordForm.validateField(
        "password",
        "rePassword",
        (valid) => {
          if (valid) {
            const res = changePassword(this.forgetPassword);
            if (res.code === this.$store.state.globel.success) {
              ElMessage.success("找回密码成功");
            } else {
              ElMessage.error("找回密码失败，请重试");
            }
          }
        }
      );
    },
  },
};
