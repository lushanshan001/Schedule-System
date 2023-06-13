/**
 * 规则转换格式
 */

//添加规则时向后端传数据
export function handleAddRuleData(data, type) {
  console.log(data);
  //将所有需要的内容 拼接成一个字符串
  let ruleValue = "";
  let positionNames = [];
  switch (type) {
    //开店规则
    case 1:
      ruleValue = {
        min: data.setUpRule.min,
        hours: data.setUpRule.hours,
        formula: data.setUpRule.formula,
      };
      positionNames = data.setUpRule.positionNames;
      break;
    //客流规则
    case 2:
      ruleValue = {
        formula: data.aduitRule.formula,
      };
      positionNames = data.aduitRule.positionNames;
      break;
    //关店规则
    case 3:
      ruleValue = {
        min: data.endRule.min,
        hours: data.endRule.hours,
        formula: data.endRule.formula,
      };
      positionNames = data.endRule.positionNames;
      break;
    //最低人员配备规则
    case 4:
      ruleValue = {
        min: data.minRule.min,
      };
      positionNames = data.minRule.positionNames;
      break;
    //任务规则
    case 5:
      ruleValue = {
        min: data.min,
        max: data.max,
        start: data.startTime.substring(0, data.startTime.indexOf(":")),
        end: data.endTime.substring(0, data.endTime.indexOf(":")),
        formula: data.formula,
      };
      positionNames = data.positionNames;
      break;
  }
  var ruleId;
  if(data.ruleId !== null ||data.ruleId!== "" || data.ruleId!== undefined){
    ruleId = data.ruleId;
  }
  const addRuleData = {
    positionNames: positionNames.join(","),
    ruleId: ruleId,
    ruleName: data.taskName,
    ruleTypeId: type,
    ruleValue: JSON.stringify(ruleValue),
  };
  // console.log(addRuleData, "处理后的规则数据");
  return addRuleData;
}

//把固定类型的类型转成字符串
export function ruleTypeId(data) {
  console.log(data);
  switch (data) {
    case "开店规则":
      return 1;
    case "客流规则":
      return 2;
    case "关店规则":
      return 3;
    case "最少人员配备规则":
      return 4;
  }
}

//将后端传过来的数据转改成数组
export function handleBackRuleData(data) {
  let ruleData = {
    min: "",
    max: "",
    hours: "",
    startTime: "",
    endTime: "",
    formula: "",
    positionNames: [],
    ruleId: data.ruleId,
    taskName: data.ruleName,
    ruleTypeId: data.ruleTypeId,
    shopId:data.shopId,
  };
  //将职位转成数组
  if (data.positionNames !== null) {
    ruleData.positionNames = data.positionNames.split(",");
  }
  const ruleValue = JSON.parse(data.ruleValue);
  switch (data.ruleTypeId) {
    //开店规则
    case 1:
      ruleData.min = ruleValue.min;
      ruleData.hours = ruleValue.hours;
      ruleData.formula = ruleValue.formula;
      break;
    //客流规则
    case 2:
      ruleData.formula = ruleValue.formula;
      break;
    //关店规则
    case 3:
      ruleData.min = ruleValue.min;
      ruleData.hours = ruleValue.hours;
      ruleData.formula = ruleValue.formula;
      break;
    //最低人员配备规则
    case 4:
      ruleData.min = ruleValue.min;
      break;
    //任务规则
    case 5:
      ruleData.min = ruleValue.min;
      ruleData.max = ruleValue.max;
      ruleData.startTime = ruleValue.start+":00";
      ruleData.endTime = ruleValue.end+":00";
      ruleData.formula = ruleValue.formula;
      break;
  }
  return  ruleData;
}
