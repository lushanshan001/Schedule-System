import { getShops } from "@/api/shop";
import { addShop } from "@/api/shop";
import { deleteShop } from "@/api/shop";
import { getManagers } from "@/api/shop";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { getList } from "@/assets/utils/employee";
import Address from '@/components/common/Address.vue'

export default {
  components: { Address },
  data() {
    return {
      shopData: [],
      filterShopData: [],
      shopVisible: false,
      formLabelWidth: "70px",
      formTitle: "",
      shopForm: {
        shopName: "",
        size: "",
        address: "",
      },
      shopManager:{},
      index: "", //当前点击的表格的某一条数据
      managers: [],
      searchContent: "",
      loading: false,
    };
  },
  methods: {
    //获取所有店铺
    async getShops() {
      const res = await getShops();
      if (res.data.code == this.$store.state.globel.success) {
        this.shopData = res.data.data;
        this.filterShopData = this.shopData;
      }
    },
    //添加或者修改店铺信息时，需要用到管理级的员工id以及姓名
    async getStaffs(query) {
      let res;
      if (query === "") {
        //获得员工数据
        res = await getList(1, 20, false, "", "");
      } else {
        //获得员工数据
        res = await getList(1, 20, true, "staffName", "query");
      }

      if (res.data.code === this.$store.state.globel.success) {
        if (res.data.data.records !== null) {
          //把数据显示在界面上
          this.managers = res.data.data.records;
        }
      } else {
        //没有获得员工数据
        this.managers = "没有员工数据";
      }
      this.loading = false;

      console.log(this.managers, "员工数据");
    },
    //远程查询下拉框需要用到的
    remoteMethod(query) {
      //query是查询的内容，可为空
      this.loading = true;
      this.getStaffs(query);
    },
    //添加店铺
    addShop() {
      this.getStaffs("");
      this.loading = true;
      this.shopVisible = true;
      this.formTitle = "添加店铺";
    },
    //确认添加店铺
    async confirmAdd() {
      this.shopForm.shopManagerEmail= this.shopManager.staffEmail;
      this.shopForm.shopManagerName = this.shopManager.staffName;
      console.log(this.shopForm)
      const res = await addShop(this.shopForm);
      console.log(res,"添加店铺")
      if (res.data.code == this.$store.state.globel.success) {
        ElMessage({
          type: "success",
          message: "添加成功,店长账号初始密码是"+res.data.data.shopManagerPassWord,
        });
      }else{
        ElMessage({
          type: "fail",
          message: "添加失败,"+res.data.msg,
        });
      }
      this.getShops();
      //清空表单
      this.$refs.shopForm.resetFields();
      // 关闭弹窗
      this.shopVisible = false;
    },
    //修改选择店长
    changeShopManager(value){
      this.shopManager = value;
    },
    // 查看店铺
    doCheck(id) {
      let newUrl = this.$router.resolve({
        path: "/shop",
        query: {
          data: id,
        },
      });
      window.open(newUrl.href, "_blank");
    },
    //删除店铺
    doDelete(id, index) {
      ElMessageBox.confirm("确定删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const res = deleteShop(id);
          if (res.data.code == this.$store.state.globel.success) {
            this.shopData.splice(index, 1);
            ElMessage({
              type: "success",
              message: "删除成功",
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    },
    //过滤符合条件的店铺，搜索需要用到
    filterShop() {
      if (this.searchContent !== undefined && this.searchContent !== "") {
        this.filterShopData = this.shopData.filter(
          (shop) =>
            shop.shopName.includes(this.searchContent) ||
            shop.managerName.includes(this.searchContent) ||
            shop.address.includes(this.searchContent)
        );
      }
    },

    //得到地址
    getAddress(data){
      this.shopForm.address = data;
      console.log(this.shopForm.address)
    }
  },
  created() {
    this.getShops();
  },
};
