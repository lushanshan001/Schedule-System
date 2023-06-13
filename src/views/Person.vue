<template>
    <el-dialog v-model="personVisible" title="修改个人资料">
      <el-form ref="form" :model="form" :label-position="labelPosition" label-width="100px">
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth" class="input">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender" :label-width="formLabelWidth" class="input">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="id_number" :label-width="formLabelWidth" class="input">
          <el-input v-model="form.id_number" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="员工邮箱" prop="staffEmail" :label-width="formLabelWidth" class="input">
          <el-input v-model="form.staffEmail" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="personVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="content-header">
        <div class="avatar-container">
            <img :src="avatar" class="avatar"/>
        </div>
        <div class="label-container">
            <span class="header-label">{{ form.name }}</span>
            <span class="header-label">{{ form.email }}</span>
        </div>
    </div>
    <div class="content-middle">
        <ul>
            <li @click="changePersonInfo">编辑</li>
        </ul>
    </div>
    <div class="content-bottom">
        <div class="left">
            <div class="small-div">
                <div class="small-div-header">
                    <h3>工作信息</h3>
                </div>
                <div class="small-div-body">
                    <div class="label">
                        <div class="label-name">公司名称</div>
                        <div class="label-content">{{ form.companyName }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">店铺名称</div>
                        <div class="label-content">{{ form.shopName }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">职位</div>
                        <div class="label-content">{{ form.position }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">时薪</div>
                        <div class="label-content">{{ form.hourWage }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">上次登录时间</div>
                        <div class="label-content">{{ form.lastTime }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">员工邮箱</div>
                        <div class="label-content">{{ form.staffEmail }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="small-div">
                <div class="small-div-header">
                    <h3>基本信息</h3>
                </div>
                <div class="small-div-body">
                    <div class="label">
                        <div class="label-name">员工ID号</div>
                        <div class="label-content">{{ form.id }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">姓名</div>
                        <div class="label-content">{{ form.name }}</div>
                    </div>
                </div>
            </div>
            <div class="small-div">
                <div class="small-div-header">
                    <h3>个人详细信息</h3>
                </div>
                <div class="small-div-body">
                    <div class="label">
                        <div class="label-name">性别</div>
                        <div class="label-content">{{ form.gender }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">身份证号</div>
                        <div class="label-content">{{ form.id_number }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">创建时间</div>
                        <div class="label-content">{{ form.createTime }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">邮箱地址</div>
                        <div class="label-content">{{ form.email }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped src="@/assets/css/person.css"></style>
<script src="@/assets/js/person.js"></script>