/**
 * 排班表
 * 数据
 */

/**
 * 视图选择框的数据
 */
const options = [
  {
    value: "月",
  },
  {
    value: "日",
  },
  {
    value: "周",
  },
];

/**
 * 对话框表单的数据
 */
const form = {
  taskName:"",
  startTime:"09:00",
  endTime:"21:00",
  setUpRule: {
    time: "",
    area: "",
    positionNames: {},
  },
  endRule: {
    time: "",
    area: "",
    positionNames: {},
  },
  rule: {
    num: "",
    positionNames: {},
  },
}

/**
 * 任务表格的规则
 */
const taskRule = {
  rule: [{ required: true, message: "请输入规则名称", trigger: "blur" }],
  startTime: [
    { required: true, message: "请输入开始时间", trigger: "blur" },
  ],
  endTime: [
    { required: true, message: "请输入结束时间", trigger: "blur" },
  ],
  taskName: [
    { required: true, message: "请输入任务名称", trigger: "blur" },
  ],
}