<template>
  <main>
    <div class="all">
      <div class="login-container">
        <div class="login-container-logo"></div>
        <div class="login-introduction">
          <span class="big-heavy">登录</span>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <div v-if="flag === true" class="form">
            <div>
              <el-form-item prop="userEmail">
                <el-input
                  v-model="loginForm.userEmail"
                  class="email-input"
                  type="text"
                  placeholder="电子邮件地址"
                ></el-input>
                <div class="warning" v-if="warn === 'notExist'">
                  此Zoho账号不存在。使用其他账号或<router-link
                    :to="{ path: '/register' }"
                    >注册</router-link
                  >新的账号
                </div>
              </el-form-item>
              <el-button class="login-button" type="primary" @click="nextStep"
                >下一步</el-button
              >
            </div>
            <div>
              <div>
                <span class="go-forget-password">
                  <router-link :to="{ path: '/forgetPassword' }"
                    >忘记密码?</router-link
                  >
                </span>
              </div>
              <div class="line">
                <span class="line-text">或</span>
              </div>
              <div>
                <span class="go-register">
                  还没有账号?
                  <router-link :to="{ path: '/register' }"
                    >立即注册</router-link
                  >
                </span>
              </div>
            </div>
          </div>
          <div v-if="flag === false" class="form">
            <div class="next-email-div">
              <div class="next-email">{{ loginForm.userEmail }}</div>
              <span class="change-email" @click="changeEmail">更改</span>
            </div>
            <div>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  class="email-input"
                  type="password"
                  placeholder="密码"
                ></el-input>
              </el-form-item>
              <el-button class="login-button" type="primary" @click="login"
                >登录</el-button
              >
            </div>
            <div>
              <div>
                <span class="go-forget-password">
                  <router-link :to="{ path: '/forgetPassword' }"
                    >忘记密码?</router-link
                  >
                </span>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </main>
</template>
  <script src="../assets/js/login.js"></script>
  <style src="../assets/css/global.css"></style>
  <style scoped src="../assets/css/login.css"></style>
  
