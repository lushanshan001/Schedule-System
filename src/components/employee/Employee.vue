<template>
  <div class="right">
    <div class="small-div-header">
        <h3>员工管理</h3>
    </div>
    <div class="content">
          <div class="header">
            <div class="add" ref="add">
              <excel-export class="add-excel" :excel-list="newExcelList"></excel-export>
              <excel-leading-in
                class="add-excel"
                :character="employeeCharacter"
                @getAddData="getAddData"
              ></excel-leading-in>
            </div>
            <search
              :options="employeeSearchList"
              @getSearchNews="getSearchNews"
            ></search>
          </div>
        <div class="middle" style="height: auto">
          <div class="changeShow">
            <el-select v-model="showContent" size="middle">
              <el-option value="技能" />
              <el-option value="偏好" />
            </el-select>
          </div>
        </div>
        <div class="form">
          <el-dialog
            title="提示"
            v-model="dialogVisible"
            :before-close="handleClose"
            width="50%"
          >
            <!-- 表单消息 -->
            <el-form
              class="show"
              ref="form"
              :rules="rules"
              :inline="true"
              :model="form"
              label-width="auto"
            >
              <el-form-item label="姓名" prop="staffName">
                <el-input v-model="form.staffName"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-input v-model="form.sex"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="position">
                <select-position
                  :position="form.position"
                  @getPosition="getPosition"
                ></select-position>
              </el-form-item>
              <el-form-item label="时薪" prop="hourlyWage">
                <el-input v-model="form.hourlyWage"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idNumber">
                <el-input v-model="form.idNumber"></el-input>
              </el-form-item>
              <el-form-item
                v-if="this.showContent === '技能'"
                label="电话号码"
                prop="phone"
              >
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item
                v-if="this.showContent === '技能'"
                label="邮箱"
                prop="staffEmail"
              >
                <el-input v-model="form.staffEmail"></el-input>
              </el-form-item>
              <el-form-item
                v-if="this.showContent === '技能'"
                label="技能"
                prop="skills"
                min-width="30%"
              >
                <el-input v-model="form.skills"></el-input>
              </el-form-item>
              <el-form-item
                v-if="this.showContent === '偏好'"
                label="工作日偏好"
                prop="timePreference"
                min-width="30%"
              >
                <el-input v-model="form.preferences[0].preferenceValue"></el-input>
              </el-form-item>
              <el-form-item
                v-if="this.showContent === '偏好'"
                label="工作时间偏好"
                prop="datePreference"
              >
                <el-input v-model="form.preferences[1].preferenceValue"></el-input>
              </el-form-item>
              <el-form-item
                v-if="this.showContent === '偏好'"
                label="班次时长偏好"
                prop="timeLongPreference"
              >
                <el-input v-model="form.preferences[2].preferenceValue"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
        <div class="bottom">
          <el-row class="table">
            <el-table :data="employeeData" border stripe style="width: 100%">
              <el-table-column prop="staffName" label="姓名" width="150px" />
              <el-table-column prop="sex" label="性别" width="80px" :formatter="formatter">
              </el-table-column>
              <el-table-column prop="position" label="职位" width="200px" />
              <el-table-column prop="hourlyWage" label="时薪" width="120px" />
              <el-table-column prop="idNumber" label="身份证号" width="180px" />
              <el-table-column
                v-if="this.showContent === '技能'"
                prop="phone"
                label="电话号码"
                width="130px"
              />
              <el-table-column
                v-if="this.showContent === '技能'"
                prop="staffEmail"
                label="邮箱"
                width="200px"
              />
              <el-table-column
                v-if="this.showContent === '技能'"
                aria-placeholder="无"
                prop="skills"
                label="技能"
                max-height="20px"
              />
              <el-table-column
                prop="timePreference"
                v-if="this.showContent === '偏好'"
                aria-placeholder="无"
                label="工作日偏好"
                min-width="120px"
                max-height="60px"
              />
              <el-table-column
                prop="datePreference"
                v-if="this.showContent === '偏好'"
                aria-placeholder="无"
                label="工作时间偏好"
                min-width="120px"
                max-height="60px"
              />
              <el-table-column
                prop="timeLongPreference"
                v-if="this.showContent === '偏好'"
                aria-placeholder="无"
                label="班次时长偏好"
                min-width="120px"
                max-height="60px"
              />
              <el-table-column label="操作" width="120">
                <template v-slot="scope">
                  <el-button link type="primary" @click="handleEdit(scope.row)"
                    >编辑</el-button
                  >
                  <el-button link type="danger" @click="handleDelete(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <div class="pager">
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              @current-change="handlePage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>
<script src="@/assets/js/employee"></script>
<style src="@/assets/css/header/add-header.css" scoped>
</style>
<style src="@/assets/css/middle/showContent.css">
</style><style src="@/assets/css/form/form.css"></style>