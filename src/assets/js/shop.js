import { getShopInfo } from "@/api/shop";
import { editShop } from "@/api/shop";
import { getPositions } from "@/api/shop";
import { editPosition } from "@/api/shop";
import { addPosition } from "@/api/shop";
import { deletePosition } from "@/api/shop";
import { getManagers } from "@/api/shop";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      shopForm: {
        shopId: "111",
        shopName: "111",
        managerId: "111",
        managerName: "",
        shopSize: "111",
        address: "111",
        companyName: "111",
      },

      //职位
      positionData: [],
      filterPositionData: [],
      positionForm: {
        positionId: "",
        positionName: "",
        positionDescription: "",
        isDefaulted: 0,
      },

      shopVisible: false,
      positionVisible: false,
      formTitle: "",
      positionTitle: "",
      searchContent: "",
      index: "", //当前点击的表格的某一条数据
      managers: [
        {
          id: "111",
          name: "一",
        },
        {
          id: "222",
          name: "二",
        },
        {
          id: "333",
          name: "三",
        },
        {
          id: "444",
          name: "四",
        },
      ],
      loading: false,
    };
  },
  methods: {
    getShopInfo() {
      const shopId = this.$route.query.data;
      console.log(shopId);
      // if(shopId === null ||shopId === undefined){

      // }
      // const res = getShopInfo();
      // if(res.data.code == this.$store.state.globel.success){
      //   this.shopForm = res.data.data;
      // }
    },
    async getPositions() {
      const res = await getPositions(5);
      console.log(res, "职位选项");
      if (res.data.code == this.$store.state.globel.success) {
        this.positionData = res.data.data;
        this.filterPositionData = this.positionData;
      }
    },
    getStaffs() {
      // const user = sessionStorage.getItem("user");
      // const params = new FormData();
      // params.append("companyId",user.companyId);
      // params.append('query',query);
      // const res = getManagers(params);
      // if(res.data.code == this.$store.state.globel.success){
      //   this.loading = false;
      //   this.managers = res.data.data;
      // }
    },
    remoteMethod(query) {
      //query是查询的内容，可为空
      this.loading = true;
      this.getStaffs(query);
    },
    selectFocus() {
      this.managers = [];
      this.loading = true;
      this.getStaffs("");
    },
    handleManager(value) {
      this.shopForm.managerId = value;
    },
    changeShopInfo(id, index) {
      this.shopVisible = true;
      this.formTitle = "修改店铺信息";
    },
    async confirmEdit() {
      this.shopVisible = false;
      const res = await editShop(this.shopForm);
      if (res.data.code == this.$store.state.globel.success) {
        ElMessage.success(res.data.data);
      }
    },
    addPosition() {
      this.positionTitle = "添加职位";
      this.positionVisible = true;
    },
    async confirmAdd() {
      const form = [];
      form[0] = this.positionForm;
      const res = await addPosition(form);
      if (res.data.code == this.$store.state.globel.success) {
        ElMessage({
          type: "success",
          message: "添加职位成功",
        });
      }
      this.$refs.positionForm.resetFields();
      this.positionVisible = false;
      this.getPositions();
    },
    editPosition(id, index) {
      this.positionTitle = "修改职位信息";
      this.positionVisible = true;
      this.positionForm = this.positionData[index];
    },
    async confirmEdit() {
      // this.positionForm.positionId = Long.fromNumber(this.positionForm.positionId);
      const res = await editPosition(this.positionForm);
      if (res.data.code == this.$store.state.globel.success) {
        ElMessage.success("修改成功");
      }
      this.$refs.positionForm.resetFields();
      this.positionVisible = false;
      this.getPositions();
    },
    deletePosition(id, index) {
      ElMessageBox.confirm("确定删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          const res =await deletePosition(id);
          if (res.data.code == this.$store.state.globel.success) {
            
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            this.getPositions();
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "删除失败",
          });
        });
    },
    filtPosition() {
      if (this.searchContent !== undefined && this.searchContent !== "") {
        this.filterPositionData = this.filterPositionData.filter(
          (position) =>
            position.positionName.includes(this.searchContent) ||
            position.positionName.includes(this.searchContent)
        );
      }
    },
  },
  created() {
    // this.getShopInfo();
    this.getPositions();
  },
};
