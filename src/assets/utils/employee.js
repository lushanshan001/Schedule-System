import {
  deleteEmployees,
  getCompanyEmployees,
  getShopEmployees,
} from "@/api/employee";

/**
 * 得到员工数据
 * @param {} page
 * @param {*} limit
 * @param {*} isSearch
 * @param {*} type
 * @param {*} msg
 * @returns
 */
export async function getList(page, limit, isSearch, type, msg) {
  if (type === undefined || type === "") {
    type = "没有type";
  }
  if (msg === undefined || msg === "") {
    msg = "没有msg";
  }
  const data = {
    pages: page,
    limit: limit,
    isSearch: isSearch,
    searchType: type.toString(),
    searchKeywords: msg.toString(),
  };

  //获得员工数据
  var res;
  if (sessionStorage.getItem("user") === "公司") {
    res = await getCompanyEmployees(data);
  } else {
    res = await getShopEmployees(data);
  }

  return res;
}

/**
 * 展示数据界面
 * 数组分解,得到skills 字符串 和偏好数组分解后的结果
 */
export function handleDataBack(data) {
  const handleData = [];
  data.forEach((item) => {
    //处理skills数组将其变成字符串
    const skills = [];
    for (let i = 0; i < item.skills.length; i++) {
      var reg = new RegExp(",", "g");
      skills.push(item.skills[i].skill.toString().replace(reg, ""));
    }
    item.skills = skills;

    //处理偏好数组
    item.preferences.forEach((single) => {
      switch (single.preferenceType) {
        case "工作日偏好":
          single.preferenceType = "timePreference";
          switch (single.preferenceValue) {
            case '1':
              single.preferenceValue = "星期一";
              break;
            case '2':
              single.preferenceValue = "星期二";
              break;
            case '3':
              single.preferenceValue = "星期三";
              break;
            case '4':
              single.preferenceValue = "星期四";
              break;
            case '5':
              single.preferenceValue = "星期五";
              break;
            case '6':
              singe.preferenceValue = "星期六";
              break;
            case '7':
              single.preferenceValue = "星期天";
              break;
          }
          break;
        case "工作时间偏好":
          single.preferenceType = "datePreference";
          var reg = single.preferenceValue.toString().indexOf(',');
          var begin = single.preferenceValue.substring(0,reg)+":00";
          var end = single.preferenceValue.substring(reg+1)+":00";
          single.preferenceValue = begin +"~" + end;
          break;
        case "班次时长偏好":
          single.preferenceType = "timeLongPreference";
          single.preferenceValue += "小时";
          break;
      }
      item[single.preferenceType] = single.preferenceValue;
    });
    handleData.push(item);
  });
  console.log(handleData)
  return handleData;
}

//删除员工消息
export function deleteEmployee(id) {
  const res = deleteEmployees(id);
  console.log(res.data);
  if (res.msg === true) {
    return true;
  } else {
    return false;
  }
}
