//excel文件的处理
import {
  employeeCharacter,
  employeeHeader,
  handleEmployeeData,
} from "@/assets/utils/excel/excelLeadingIn";
//excel文件数据解析
import { ElMessage } from "element-plus";

//把数据传到后端
import { addEmployees } from "@/api/employee";
import {
  deleteEmployee,
  handleDataBack,
  getList,
  preferences
} from "@/assets/utils/employee";
import { changeEmployee } from "@/api/employee";

//界面
import ExcelExport from "@/components/excel/ExcelExport.vue";
import ExcelLeadingIn from "@/components/excel/ExcelLeadingIn.vue";
import Search from "@/components/common/Search.vue";
import SelectPosition from "@/components/position/SelectPosition.vue";
import { employeeSearchList } from "@/assets/utils/search";

export default {
  components: { Search, ExcelExport, ExcelLeadingIn, SelectPosition },
  data() {
    return {
      //表单数据
      tableData: [],
      //员工数据
      employeeData: [],
      //分页数据
      total: 0, //总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      //设置打开添加框
      dialogVisible: false,
      disabled: false,
      //对话框添加数据
      form: [],
      //搜索
      searchNews: [],
      isSearch: false,
      //添加员工
      addData: [],
      //导出的表格表头
      newExcelList: [],
      employeeCharacter: [],
      employeeSearchList: [],

      //选择展示的是技能还是偏好
      showContent: "偏好",
    };
  },
  created() {
    this.getList();
    this.getExcelList();
  },
  mounted() {
    this.employeeForUser();
  },
  methods: {
    //删除门店身份的导入员工
    employeeForUser() {
      const user = sessionStorage.getItem("user");
      if (user === "公司") {
        this.$refs.add.style.visibility = "hidden";
      } else {
        this.disabled = true;
      }
    },
    //导出新输入的表
    getExcelList() {
      //导出excel表的表头
      this.newExcelList.jsonData = [{}];
      this.newExcelList.listHander = employeeHeader;
      this.newExcelList.excelName = "员工表";
      this.newExcelList.show = "导出员工输入表";
      this.employeeCharacter = employeeCharacter;
      this.employeeSearchList = employeeSearchList;
    },

    //添加员工信息
    async getAddData(data) {
      //读取file中的数据
      //把文件解析成二进制数据，把二级制数据变成excel表格式的数据
      this.addData = handleEmployeeData(data);
      // this.employeeData = handleDataBack(this.addData);
      // console.log(this.addData)
      //把数据传给后端，展示在界面上
      const res = await addEmployees(this.addData);

      if (res.data.code === this.$store.state.globel.success) {
        //获得员工数据
        ElMessage.success("添加成功");
      } else {
        //没有获得员工数据
        ElMessage.error("没有添加成功");
      }
      //重新获得员工数据
      this.getList();
    },

    //得到表单数据
    async getList() {
      //获得员工数据
      const res = await getList(
        this.pageData.page,
        this.pageData.limit,
        this.isSearch,
        this.searchNews.data,
        this.searchNews.msg
      );
      
      if (res.data.code === this.$store.state.globel.success) {
        if (res.data.data.records !== null) {
          //把数据显示在界面上
          this.employeeData = handleDataBack(res.data.data.records);
          this.total = res.data.data.total;
        }
      } else {
        //没有获得员工数据
        this.employeeData = "没有员工数据";
      }
      this.isSearch = false;
    },

    //点击修改员工信息弹窗
    handleEdit(row) {
      this.dialogVisible = true;
      console.log(row);
      this.form = JSON.parse(JSON.stringify(row));
    },
    //修改员工信息
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //把表单消息传到后
          console.log(this.form, "表单消息");
          const res = await changeEmployee(this.form);
          console.log(res, "修改员工数据");
          //清空表单
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
        } else {
          alert("消息提交错误");
        }
      });
    },
    // 弹窗关闭时触发
    handleClose() {
      //清空表单
      this.$refs.form.resetFields();
      // 关闭弹窗
      this.dialogVisible = false;
    },
    // 取消弹窗
    cancel() {
      this.handleClose();
    },

    //删除员工信息
    handleDelete(row) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除员工
          // deleteEmployee(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //选择页面的回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },

    //得到子组件中的search
    getSearchNews(data) {
      this.searchNews = data;
      console.log(this.searchNews, "搜索值");
      this.isSearch = true;
      this.getList();
    },

    //得到修改后的position
    getPosition(data) {
      this.form.position = data;
    },

    //显示的时候 显示性别
    formatter(row, column) {
      return row.sex === 1 ? "男" : "女";
    },
  },
};
