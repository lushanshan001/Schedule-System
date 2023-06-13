<template>
    <header>
      <div class="header">
        <div class="register-logo"></div>
        <div class="login-block">
          <span class="go-login">
            是否有Zoho账号？
            <router-link :to="{ path: '/' }">登录</router-link>
          </span>
        </div>
      </div>
      <div class="line">
        <span class="line-text"></span>
      </div>
    </header>
    <main class="register-container">
      <div class="register-form">
        <h3>立即注册，免费使用</h3>
        <div>
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" >
            <el-form-item prop="companyName">
              <el-input v-model="registerForm.companyName" class="register-input" type="text" placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input v-model="registerForm.userName" class="register-input" type="text" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item prop="userEmail">
              <el-input v-model="registerForm.userEmail" class="register-input" type="text" placeholder="企业邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" class="register-input" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="code" :inline="true">
              <el-input v-model="registerForm.code" class="code-input" type="text" placeholder="验证码"></el-input>
              <el-button class="code-button" type="primary" @click="getCode">{{codeButton}}</el-button>
              <div class="warning" v-if="warn === 'codeError'">验证码错误</div>
            </el-form-item>
          </el-form>
          <el-button @click="register" class="register-button" type="primary">立即注册</el-button>
        </div>
      </div>
    </main>
  </template>
  <script src="../assets/js/register.js"></script>
  <style src="../assets/css/global.css"></style>
  <style scoped src="../assets/css/register.css"></style>
