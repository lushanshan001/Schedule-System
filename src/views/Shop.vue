<template>
  <div>
    <el-dialog v-model="shopVisible" :title="formTitle">
      <el-form ref="shopForm" :model="shopForm" :rules="shopRules">
        <el-form-item label="店铺名称" prop="shopName" :label-width="formLabelWidth" class="input">
          <el-input v-model="shopForm.shopName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="店长姓名" prop="managerName" :label-width="formLabelWidth" class="input">
          <el-select v-model="shopForm.managerId"
            @change="handleManager" 
            @focus="selectFocus"
            filterable remote reserve-keyword placeholder="请选择店长"
            remote-show-suffix :remote-method="remoteMethod" :loading="loading" loading-text="加载中">
            <el-option  v-for="item in managers" :key="item.id" :label="item.managerName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺规模" prop="shopSize" :label-width="formLabelWidth" class="input">
          <el-input v-model="shopForm.shopSize" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="店铺地址" prop="address" :label-width="formLabelWidth" class="input">
          <el-input v-model="shopForm.address" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="所属公司" prop="companyName" :label-width="formLabelWidth" class="input">
          <el-input v-model="shopForm.companyName" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shopVisible = false">取消</el-button>
          <el-button type="primary" @click="formTitle=='添加店铺'?confirmAdd():confirmEdit()">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="positionVisible" :title="positionTitle">
      <el-form ref="positionForm" :model="positionForm" :rules="positionRules">
        <el-form-item label="职位名称" prop="positionName">
          <el-input v-model="positionForm.positionName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="职位描述" prop="positionDescription">
          <el-input v-model="positionForm.positionDescription" type="textarea" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shopVisible = false">取消</el-button>
          <el-button type="primary" @click="positionTitle === '添加职位'?confirmAdd():confirmEdit()">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- <div class="content-middle">
      <ul>
          <li @click="changeShopInfo">编辑</li>
      </ul>
    </div> -->
    <div class="content-bottom">
      <!-- <div class="small-div">
        <div class="small-div-header">
            <h3>基本信息</h3>
        </div>
        <div class="small-div-body">
          <div class="label">
              <div class="label-name">店铺ID号</div>
              <div class="label-content">{{ shopForm.shopId }}</div>
          </div>
          <div class="line"></div>
          <div class="label">
              <div class="label-name">店铺名称</div>
              <div class="label-content">{{ shopForm.shopName }}</div>
          </div>
          <div class="line"></div>
          <div class="label">
              <div class="label-name">店长姓名</div>
              <div class="label-content">{{ shopForm.managerName }}</div>
          </div>
          <div class="line"></div>
          <div class="label">
              <div class="label-name">店铺规模</div>
              <div class="label-content">{{ shopForm.shopSize }}</div>
          </div>
          <div class="line"></div>
          <div class="label">
              <div class="label-name">店铺地址</div>
              <div class="label-content">{{ shopForm.address }}</div>
          </div>
          <div class="line"></div>
          <div class="label">
              <div class="label-name">所属公司</div>
              <div class="label-content">{{ shopForm.companyName }}</div>
          </div>
        </div>
      </div> -->
      <div class="small-div">
        <div class="small-div-header">
            <h3>职位信息</h3>
        </div>
        <div class="button-div">
          <el-input v-model="searchContent" placeholder="搜索内容" autocomplete="off" class="input"/>
          <el-button type="success" @click="filtPosition"><el-icon><Search></Search></el-icon>搜索职位</el-button>
          <el-button type="primary" @click="addPosition"><el-icon><Plus></Plus></el-icon>添加职位</el-button>
        </div>
        <el-row>
          <el-col v-for="(item,index) in filterPositionData" :key="item.positionId" :span="6" style="margin-bottom: 10px" :offset="1">
            <el-card>
              <div class="clearfix">
                <el-icon class="shop-icon"><Position></Position></el-icon>
                <span class="shop-name">{{ item.positionName }}</span>
                <div class="icon-div">
                  <el-tooltip effect="dark" content="编辑职位">
                    <el-icon @click="editPosition(item.positionId, index)" class="shop-icon"><Edit></Edit></el-icon>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="删除职位">
                    <el-icon @click="deletePosition(item.positionId, index)" class="shop-icon"><Delete></Delete></el-icon>
                  </el-tooltip>
                </div>
              </div>
              <div>
                <div class="shop-info">职位名称：{{ item.positionName }}</div>
                <div class="line"></div>
                <div class="shop-info">职位描述：{{ item.positionDescription }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style scoped src="@/assets/css/shop.css"></style>
<script src="@/assets/js/shop.js"></script>
