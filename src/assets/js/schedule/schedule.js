import Week from "@/components/schedule/Week.vue";
import { CirclePlus } from "@element-plus/icons";
import { ElMessage } from "element-plus";

//格式转换
import {
  handleAddRuleData,
  ruleTypeId,
  handleBackRuleData,
} from "@/assets/utils/rule";
import { formatDate } from "@/assets/utils/utils";

//接口
import {
  addOrChangeRule,
  isRepeatTaskName,
  getFixedRule,
  getAllRule,
} from "@/api/schedule/rule";
import { getPosts } from "@/api/posts";

export default {
  components: {  Week, CirclePlus },
  data() {
    return {
      //对话框
      dialogVisible: false,
      form: {
        setUpRule: {
          hours: "",
          formula: "",
          positionNames: [],
          min: "",
        },
        endRule: {
          hours: "",
          formula: "",
          positionNames: [],
          min: "",
        },
        aduitRule: {
          formula: "",
          positionNames: [],
        },
        minRule: {
          min: "",
        },
      },
      dialogVisibleOne: false,
      dialogVisibleTwo: false,

      //自定义规则
      taskRuleList: [],
      taskRuleLists: [],
      isAddRule: false,

      //职位选项
      positions: [],
      checkAll: true,
      isIndeterminate: true,

      //任务表单
      taskRule: {
        formula: [
          { required: true, message: "请输入规则名称", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "请输入规则名称", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        taskName: [
          {
            asyncValidator: this.isRepeatTaskName,
            // message: "请输入规则名称",
            trigger: "blur",
          },
        ],
      },
      pickerOptionsStart: {
        // 开始时间小于结束时间
        disabledDate: (time) => {
          let beginTime = this.form.endTime;
          if (beginTime) {
            return time.getTime() > new Date(beginTime).getTime();
          }
        },
      },
      pickerOptionsEnd: {
        // 结束时间大于开始时间
        disabledDate: (time) => {
          let beginTime = this.form.startTime;
          if (beginTime) {
            return time.getTime() < new Date(beginTime).getTime();
          }
        },
      },
    };
  },
  created() {
    //设置最初的日期为当天
    this.dayDate = new Date().toISOString();
    this.getAllPostions();
    this.getAllTaskList();
    this.value = "周";
    for (var i = 1; i <= 4; i++) {
      this.getFixedRuleData(i);
    }
  },
  methods: {
    //得到职位
    async getAllPostions() {
      const res = await getPosts();
      // console.log(res,"职位");
      if (res.data.code === this.$store.state.globel.success) {
        this.positions = res.data.data.map((item) => item.positionName);
      }
    },
    //得到所有的任务列表
    async getAllTaskList() {
      const res = await getAllRule();
      console.log(res);
      this.taskRuleList = res.data.data;
    },
    //打开规则界面
    turnTo() {
      window.open("/rule", "_blank");
    },
    check() {
      console.log(this.value, "value");
    },
    getValue(data) {
      this.value = data.value;
      this.dayDate = data.dayDate;
    },

    //添加任务
    addTask() {
      this.form.taskName = "";
      this.dialogVisible = true;
    },
    //对自定义任务提交
    addRule() {
      this.$refs.taskForm.validate(async (valid) => {
        if (!valid) {
          ElMessage.warning("请调整数据后再请求");
          return false;
        } else {
          if (this.form.positionNames === null) {
            this.$message.warning("最少选择一个职业");
          }
          //添加的数据处理
          const addRuleData = handleAddRuleData(this.form, 5);
          const res = await addOrChangeRule(addRuleData);
          if (res.data.code === this.$store.state.globel.success) {
            ElMessage.success("操作成功");
          } else {
            ElMessage.error("操作失败");
          }
          this.getAllTaskList();
          this.cancel();
        }
      });
    },
    //对固定规定规则的提交
    submitRule() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          ElMessage.warning("请调整数据后再请求");
          return false;
        } else {
          if (this.form.positionNames === null) {
            this.$message.warning("最少选择一个职业");
          }
          const ruleData = handleAddRuleData(
            this.form,
            ruleTypeId(this.form.taskName)
          );
          const res = await addOrChangeRule(ruleData);
          console.log(res);
          if (res.data.code === this.$store.state.globel.success) {
            ElMessage.success("修改成功");
          } else {
            ElMessage.error("修改失败");
          }
          this.getFixedRuleData(ruleTypeId(this.form.taskName));
          this.cancel();
        }
      });
    },
    //查看固定的规则
    checkRule(data) {
      this.form.taskName = data + "规则";
      this.dialogVisibleOne = true;
    },
    //得到固定规则的数据
    async getFixedRuleData(data) {
      //得到固定规则的数据
      const res = await getFixedRule(data);
      console.log(res, "返回固定规则的值");
      //处理后端过来的数据
      const ruleData = handleBackRuleData(res.data.data);
      switch (ruleData.ruleTypeId) {
        //开店规则
        case 1:
          this.form.setUpRule = ruleData;
          break;
        //客流规则
        case 2:
          this.form.aduitRule = ruleData;
          break;
        //关店规则
        case 3:
          this.form.endRule = ruleData;
          break;
        //最低人员配备规则
        case 4:
          this.form.minRule = ruleData;
          break;
      }
    },

    //判断一下规则名字是否查重
    async isRepeatTaskName(rule, value, callback) {
      if (value === "") {
        return callback(new Error("请输入规则名"));
      }
      const res = await isRepeatTaskName(value);
      // console.log(res, "查重的规则名");
      if (res.data.code !== this.$store.state.globel.success) {
        callback(new Error("规则名字已重复"));
      } else {
        return callback();
      }
    },

    // 取消弹窗
    cancel() {
      this.handleClose();
    },
    //关闭对话框
    handleClose() {
      const name = this.form.taskName;
      //清空表单
      if (
        name === "开店规则" ||
        name === "客流规则" ||
        name === "关店规则" ||
        name === "最少人员配备规则"
      ) {
        this.$refs.form.resetFields();
      } else {
        this.$refs.taskForm.resetFields();
      }
      // 关闭弹窗
      this.dialogVisible = false;
      this.dialogVisibleOne = false;
      this.dialogVisibleTwo = false;
    },

    //查看修改规则
    checkChangeRule(item) {
      this.form = handleBackRuleData(item);
      this.dialogVisibleTwo = true;
    },

    //进行排班表
    async scheduling() {
      if (this.taskRuleLists.length === 0) {
        ElMessage.error("最少选择一个自己制定的规则");
        return;
      }
      //排班表的规则id
      if (this.isAddRule === false) {
        this.taskRuleLists.push(this.form.setUpRule.ruleId);
        this.taskRuleLists.push(this.form.aduitRule.ruleId);
        this.taskRuleLists.push(this.form.endRule.ruleId);
        this.taskRuleLists.push(this.form.minRule.ruleId);
        this.isAddRule = true;
      }
      //将排班表的规则id数组保存在store中
      this.$store.commit("changeTaskList", this.taskRuleLists);
      const date = new Date();
      this.$refs.week.getTimePeriodListData(formatDate(date).substring(0,10));
    },
  },
};
