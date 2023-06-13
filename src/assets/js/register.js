import { ElMessage } from "element-plus";
import { register } from "@/api/user";
import { getCode } from "@/api/code";

export default {
  data() {
    return {
      registerRules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        userName: [{ required: true, message: "请输入名字", trigger: "blur" }],
        userEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { pattern: /[1-9]\d{8,10}@qq\.com$/, message: "不符合邮箱规范" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: "密码是由最少8位的字符和数字组成",
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      registerForm: {
        companyName: "",
        userName: "",
        userEmail: "",
        password: "",
        code: "",
      },
      code: "",
      codeButton: "获取",
      isClick: false,
      warn: "",
    };
  },
  methods: {
    async getCode() {
      if (this.isClick === true) {
        return;
      }
      const res = await getCode(this.registerForm.userEmail);
      if (res.data.code !== this.$store.state.globel.success) {
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
    register() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          console.log(this.registerForm,"注册表单")
          const res = await register(this.registerForm);
          if (res.data.code === this.$store.state.globel.success) {
            ElMessage.success("注册成功");
            this.$router.replace("/");
          } else {
            ElMessage.error(res.data.msg);
          }
        }
      });
    },
  },
};
