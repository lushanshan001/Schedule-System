//登录
import { login, checkEmail, getUserRole } from "@/api/user";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      loginRules: {
        // TODO: 邮箱正则需要适用多种邮箱，当前只能匹配QQ邮箱
        userEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { pattern: /[1-9]\d{7,10}@qq\.com$/, message: "不符合邮箱规范" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginForm: {
        userEmail: "",
        password: "",
      },
      form: {
        client_id: "SchedulingWebApp",
        client_secret: "SchedulingWebApp",
        grant_type: "password",
        username: {
          authType: "password",
          userEmail: "",
          passWord: "",
        },
      },
      warn: null, //判断点击下一步之后给出的warning，是没输入邮箱，还是有些不存在
      flag: true, //判断是显示输入邮箱部分（为true），还是输入密码部分（为false）
    };
  },
  methods: {
    nextStep() {
      this.$refs.loginForm.validateField("userEmail", async (valid) => {
        if (valid) {
          const res = await checkEmail(this.loginForm.userEmail);
          if (res.data.msg === "成功" || res.data === true) {
            this.flag = false;
          } else {
            this.warn = "notExist";
          }
        }
      });
    },
    changeEmail() {
      this.warn = "";
      this.$refs.loginForm.clearValidate();
      this.flag = true;
    },
    login() {
      this.$refs.loginForm.validateField("password", async (valid) => {
        if (valid) {
          this.form.username.userEmail = this.loginForm.userEmail;
          this.form.username.passWord = this.loginForm.password;
          this.form.username = JSON.stringify(this.form.username);
          const res = await login(this.form);
          this.form.username = JSON.parse(this.form.username);
          // console.log(res.data.access_token,"token")
          if (res.data.access_token !== undefined) {
            //TODO: 登录成功，sessionStorage存入的是一个token
            sessionStorage.setItem("token", res.data.access_token);
            //把token保存到stroe中去
            this.$store.commit("setToken", res.data.access_token);
            //登录成功获取 user的信息
            const resp = await getUserRole();
            sessionStorage.setItem("user",resp.data.data);
            this.$router.replace("/Home");
          } else {
            ElMessage(res.data.msg);
            this.warn = "notExist";
          }
        }
      });
    },
  },
};
