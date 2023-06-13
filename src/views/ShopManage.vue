<template>
  <el-dialog v-model="shopVisible" :title="formTitle">
    <el-form ref="shopForm" :model="shopForm" :inline="true" :rules="shopRules">
      <el-form-item
        label="店铺名称"
        prop="shopName"
        :label-width="formLabelWidth"
      >
        <el-input v-model="shopForm.shopName" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="店长姓名"
        prop="managerName"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="shopManager.staffName"
          placeholder="请选择店长"
          @change="changeShopManager"
          :remote-method="remoteMethod"
          :loading="loading"
          loading-text="加载中"
          
        >
          <el-option
            v-for="item in managers"
            :key="item"
            :label="item.staffName"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="店铺规模" prop="size" :label-width="formLabelWidth">
        <el-input v-model="shopForm.size" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="店铺地址"
        prop="address"
        :label-width="formLabelWidth"
      >
        <Address @getAddress="getAddress"></Address>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="shopVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="formTitle == '添加店铺' ? confirmAdd() : confirmEdit()"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
  <div class="right">
    <div class="small-div-header">
        <h3>店铺管理</h3>
    </div>
    <div class="content">
      <div class="button-div">
        <el-input
          v-model="searchContent"
          placeholder="搜索内容"
          autocomplete="off"
          class="input"
        />
        <el-button type="success" @click="filterShop"
          ><el-icon><Search></Search></el-icon>搜索店铺</el-button
        >
        <el-button type="primary" @click="addShop"
          ><el-icon><Plus></Plus></el-icon>添加店铺</el-button
        >
      </div>
      <el-row>
        <el-col
          v-for="(item, index) in filterShopData"
          :key="item.id"
          :span="5"
          style="margin-bottom: 10px"
          :offset="1"
        >
          <el-card>
            <div class="clearfix">
              <el-icon class="shop-icon"><ShoppingCart></ShoppingCart></el-icon>
              <span class="shop-name">{{ item.shopName }}</span>
              <div class="icon-div">
                <el-tooltip effect="dark" content="查看店铺">
                  <el-icon @click="doCheck(item.shopId)" class="shop-icon"
                    ><View></View
                  ></el-icon>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除店铺">
                  <el-icon @click="doDelete(item.shopId, index)" class="shop-icon"
                    ><Delete></Delete
                  ></el-icon>
                </el-tooltip>
              </div>
            </div>
            <div>
              <!-- <div class="shop-info">店长姓名：{{ item.shopManagerName }}</div> -->
              <div class="line"></div>
              <div class="shop-info">店铺位置：{{ item.address }}</div>
              <div class="shop-info">店铺规模：{{ item.size }} 平方米</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  
  
</template>
<style scoped src="@/assets/css/shop-manage.css"></style>
<script src="@/assets/js/shop-manage.js"></script>