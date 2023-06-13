<template>
  <main>
    <div class="all">
      <div class="forget-password-container">
        <div class="forget-password-container-logo"></div>
        <div class="forget-password-introduction">
          <span class="big-heavy">修改密码</span>
          <span class="big">输入您注册的电子邮件地址，以更改您的Zoho账户密码。</span>
        </div>
        <el-form ref="changePasswordForm" :model="changePasswordForm" :rules="changePasswordRules" >
          <el-form-item prop="email">
            <div v-if="flag === 1" class="form">
              <el-input @click="input" v-model="changePasswordForm.email" class="email-input" type="text" placeholder="电子邮箱"></el-input>
              <div class="warning" v-if="warn === 'notExist'">此Zoho账号不存在。使用其他账号</div>
              <el-button class="forget-password-button" type="primary" @click="emailNextStep">下一步</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="oldPassword">
            <div v-if="flag === 2" >
              <div class="next-email-div">
                <div class="next-email">{{ changePasswordForm.email }}</div>
                <span class="change-email" @click="changeEmail">更改</span>
              </div>
              <div class="next-email-div">
                <el-input @click="input" v-model="changePasswordForm.oldPassword" class="email-input" placeholder="旧密码"></el-input>
              </div>
              <div class="warning" v-if="warn === 'notTrue'">旧密码错误。请重新输入</div>
              <el-button class="forget-password-button" type="primary" @click="passwordNextStep">下一步</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div v-if="flag === 3">
              <el-input v-model="changePasswordForm.password" class="email-input" type="text" placeholder="新密码"></el-input>
              <el-button class="forget-password-button" type="primary" @click="changePassword">更改密码</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </main>
</template>
<script src="../assets/js/change-password.js"></script>
<style src="../assets/css/global.css"></style>
<style scoped src="../assets/css/change-password.css"></style>