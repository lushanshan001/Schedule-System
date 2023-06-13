<template>
    <main>
      <div class="all">
        <div class="forget-password-container">
          <div class="forget-password-container-logo"></div>
          <div class="forget-password-introduction">
            <span class="big-heavy">忘记密码</span>
            <span class="big">输入您注册的电子邮件地址，以找回您的Zoho账户密码。</span>
          </div>
          <el-form ref="forgetPasswordForm" :model="forgetPasswordForm" :rules="forgetPasswordRules" >
            <el-form-item prop="email">
              <div v-if="flag === 1" class="form">
                <el-input v-model="forgetPasswordForm.email" class="email-input" type="text" placeholder="请输入邮箱"></el-input>
                <div class="warning" v-if="warn === 'notExist'">此Zoho账号不存在。使用其他账号</div>
                <el-button class="forget-password-button" type="primary" @click="emailNextStep">下一步</el-button>
              </div>
            </el-form-item>
            <div v-if="flag === 2">
              <div class="next-email-div">
                <div class="next-email">{{ forgetPasswordForm.email }}</div>
                <span class="change-email" @click="changeEmail">更改</span>
              </div>
              <el-form-item prop="code" class="form">
                <div class="next-email-div">
                  <el-input v-model="forgetPasswordForm.code" class="code-input" placeholder="验证码"></el-input>
                  <el-button class="code-button" type="primary" @click="getCode">{{ codeButton }}</el-button>
                </div>
              </el-form-item>
              <div class="warning" v-if="warn === 'codeError'">验证码错误。请重新输入</div>
              <el-button class="forget-password-button" type="primary" @click="codeNextStep">下一步</el-button>
            </div>
            <div v-if="flag === 3">
              <el-form-item prop="password" class="form">
                <el-input v-model="forgetPasswordForm.password" class="email-input" type="text" placeholder="新密码"></el-input>
              </el-form-item>
              <el-form-item prop="rePassword" class="form">
                <el-input v-model="forgetPasswordForm.rePassword" class="email-input" type="text" placeholder="确认新密码"></el-input>
              </el-form-item>
              <el-button class="forget-password-button" type="primary" @click="forgetPassword">更改密码</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </main>
  </template>
  <script src="../assets/js/forget-password.js"></script>
  <style src="../assets/css/global.css"></style>
  <style scoped src="../assets/css/forget-password.css"></style>
