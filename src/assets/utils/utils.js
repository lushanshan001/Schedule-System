// 设置异步延迟间隔
export function delay(interval = 0) {
  return new Promise((resolve) => {
    let timer = setTimeout((_) => {
      clearTimeout(timer);
      resolve();
    }, interval);
  });
}


//将数字变成yyy-MM-dd HH-MM-SS格式的日期
export function  formatDate(value) {
  var date = new Date(value);
  var y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (i < 10) {
    i = "0" + i;
  }
  if (s < 10) {
    s = "0" + s;
  }
  var t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
  return t;
}