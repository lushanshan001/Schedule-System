import XLSX from "xlsx";

// 按照二进制读取文件
export function readFile(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
}

// 时间字符串格式化
export function formatTime(str, tpl) {
  let arr = str.match(/\d+/g).map((item) => {
    return item.length < 2 ? "0" + item : item;
  });
  tpl = tpl || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
  return tpl.replace(/\{(\d+)\}/g, (_, group) => {
    return arr[group] || "00";
  });
}

//excel文件导入
export function excelLeadingIn(data, character) {
  let workbook = XLSX.read(data, { type: "binary" });
  // console.log(workbook,"workbook");
  //拿到第一个sheet表的数据，把第一个表格的数据转换成JSON数据
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  data = XLSX.utils.sheet_to_json(worksheet);
  // console.log(data, "workSheet");
  // console.log(character,"设置的表格数据")

  //把读取出来的数据变成最后可以传递给服务器的数据
  let list = [];
  data.forEach((item) => {                                 
    let obj = {};
    for (let key in character) {
      if (!character.hasOwnProperty(key)) break;
      let v = character[key];
      const text = v.text;
      const type = v.type;
      v = item[text] || "";
      type === "string" ? (v = String(v)) : null;
      type === "number" ? (v = Number(v)) : null;
      obj[key] = v;
    }
    list.push(obj);
  });
  //得要预处理的数据，把数据处理后传入后端。
  console.log(list, "得到要处理的数据");
  return list;
}

//员工表的导出头行
// 字段对应表
export let employeeHeader = {
  staffName: "姓名",
  position: "职位",
  sex: "性别",
  idNumber: "身份证号",
  staffEmail: "邮箱",
  phone: "电话号码",
  hourlyWage: "时薪",
  timePreference: "工作日偏好",
  dataPreference: "工作时间偏好",
  timeLongPreference: "班次时长偏好",
  skills: "技能"
};

//客流量表的导出头行
export let aduitHeader = {
  date:"日期",
  startTime:"开始时间",
  endTime:"结束时间",
  aduit:"预测顾客流量"
}

// 员工表字段对应表
export let employeeCharacter = {
  staffName: {
    text: "姓名",
    type: "string",
  },
  sex: {
    text: "性别",
    type: "string",
  },
  idNumber: {
    text: "身份证号",
    type: "string",
  },
  staffEmail: {
    text: "邮箱",
    type: "string",
  },
  phone: {
    text: "电话号码",
    type: "string",
  },
  hourlyWage: {
    text: "时薪",
    type: "string",
  },
  position: {
    text: "职位",
    type: "string",
  },
  timePreference: {
    text: "工作日偏好",
    type: "string",
  },
  datePreference: {
    text: "工作时间偏好",
    type: "string",
  },
  timeLongPreference: {
    text: "班次时长偏好",
    type: "string",
  },
  skills: {
    text: "技能",
    type: "string",
  },
};

//客流量表字段对应表
export let aduitCharacter = {
  date: {
    text: "日期",
    type: "int",
  },
  startTime: {
    text: "开始时间",
    type: "string",
  },
  endTime: {
    text: "结束时间",
    type: "string",
  },
  aduit: {
    text: "预测顾客流量",
    type: "string",
  }
};

//对解析后得到的数据，进行处理，（sex int，preference变成数组，日期从数字转换成日期）
export function handleEmployeeData(data) {
  const handleData = [];
  data.forEach((item) => {
    //姓名不为空
    if (item.staffName === "") return;

    //对邮箱，电话号码，身份证进行正则表达式进行判断
    var e = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
    var email = e.test(item.staffEmail);
    var p = /^[1][0-9]{10}$/;
    var phone = p.test(item.phone);
    var i =
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var idNumber = i.test(item.idNumber);
    if (!email || !phone || !idNumber) return; //跳出本次循环

    if (item.sex === "男") {
      item.sex = 1;
    } else if (item.sex === "女") {
      item.sex = 2;
    }

    //把偏好设置成数组
    const preferences = [];
    preferences.push(
      {
        preferenceId: "",
        preferenceType: "工作日偏好",
        preferenceValue: item.timePreference,
      },
      {
        preferenceId: "",
        preferenceType: "工作时间偏好",
        preferenceValue: item.datePreference,
      },
      {
        preferenceId: "",
        preferenceType: "班次时长偏好",
        preferenceValue: item.timeLongPreference,
      }
    );
    item.preferences = preferences;
    // console.log(item.preferences, "偏好数组");

    //把技能变成数组
    const skills = [];
    for (let i = 0; i < item.skills.length; i++) {
      if (
        item.skills[i] === " " ||
        item.skills[i] === "，" ||
        item.skills[i] === "；" ||
        item.skills[i] === "," ||
        item.skills[i] === ";"
      )
        continue;
      let s = "";
      while (
        item.skills[i] !== " " &&
        item.skills[i] !== "，" &&
        item.skills[i] !== "；" &&
        item.skills[i] !== "," &&
        item.skills[i] !== ";"
      ) {
        s = s.concat(item.skills[i]);
        i++;
        if (i >= item.skills.length) {
          break;
        }
      }
      skills.push({skillId: "", skill: s });
    }
    item.skills = skills;
    // console.log(skills, "技能处理");

    //删除对象中多余的属性
    delete item.datePreference;
    delete item.timePreference;
    delete item.timeLongPreference;

    //把处理好的数组加入指定数组中
    handleData.push(item);
  });
  return handleData;
}

//对解析后得到的数据，进行处理                     
export function handleAduitData(data){
  data.forEach((item) => {
  //把数字转换成日期格式
  item.date = getFormatDate(item.date);
  })
  return data;
}

//把字符串转成日期  
export function getFormatDate(serial) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);
  var fractional_day = serial - Math.floor(serial) + 0.0000001;
  var total_seconds = Math.floor(86400 * fractional_day);
  var seconds = total_seconds % 60;
  total_seconds -= seconds;
  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;
  var d = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  //得到Date()对象后，便可进行日期格式化了！
  var YYYY = d.getFullYear();
  var MM = addZero(d.getMonth() + 1);
  var DD = addZero(d.getDate());
  return `${YYYY}-${MM}-${DD}`;
}

//在月和日之前补0
export function addZero(num){
  if(num < 10){
    return '0' +num;
  }else{
    return num;
  }
}

