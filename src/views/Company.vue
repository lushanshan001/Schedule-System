<template>
    <el-dialog v-model="companyVisible" title="修改公司信息">
      <el-form ref="form" :model="form" :label-position="labelPosition" label-width="100px">
        <el-form-item label="公司名称" prop="name" :label-width="formLabelWidth" class="input">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="logo" prop="logo" :label-width="formLabelWidth" class="input">
          <el-upload
            class="avatar-uploader"
            action="none"
            :show-file-list="true"
            accept=".jpg, .png, .webp"
            
            :on-change="handleFileChange"
            :auto-upload="false">
            <img v-if="logo" :src="logo" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="创立时间" prop="createTime" :label-width="formLabelWidth" class="input">
          <el-input v-model="form.createTime" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="简介" prop="introduction" :label-width="formLabelWidth" class="input">
          <el-input v-model="form.introduction" :rows="4" type="textarea" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="公司地址" prop="address" :label-width="formLabelWidth" class="input">
          <el-input v-model="form.address" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="companyVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="content-header">
        <div class="logo-container">
            <img :src="form.logo" class="logo"/>
        </div>
        <div class="label-container">
            <h1 class="name">{{ form.name }}</h1>
            <span class="create-time">创立于 {{ form.createTime }}</span>
        </div>
    </div>
    <div class="content-middle" v-if="this.type === '公司'">
        <ul>
            <li @click="changeCompanyInfo">编辑</li>
        </ul>
    </div>
    <div class="content-bottom">
        <div class="small-div">
            <div class="small-div-header">
                <h3>公司简介</h3>
            </div>
            <div class="small-div-body">
                {{ form.introduction }}
            </div>
        </div>
        <div class="small-div">
            <div class="small-div-header">
                <h3>基本信息</h3>
            </div>
            <div class="small-div-body">
                <!-- <div class="label">
                    <div class="label-name">公司ID号</div>
                    <div class="label-content">{{ form.id }}</div>
                </div> -->
                <div class="line"></div>
                <div class="label">
                    <div class="label-name">公司名称</div>
                    <div class="label-content">{{ form.name }}</div>
                </div>
                <div class="line"></div>
                <div class="label">
                    <div class="label-name">公司创立者</div>
                    <div class="label-content">{{ form.creator }}</div>
                </div>
                <div class="line"></div>
                <div class="label">
                    <div class="label-name">注册地址</div>
                    <div class="label-content">{{ form.address }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped src="@/assets/css/company.css"></style>
<script src="@/assets/js/company.js"></script>