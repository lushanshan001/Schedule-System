// 职位分布echarts配置项
var scale = 1;
// var xData = function (weekData) {
//   var data = [];
//   for (var i = 0; i < weekData.length; i++) {
//     data.push(weekData[i].staffName);
//   }
//   return data;
// }(weekData);
// var yData = function (weekData) {
//   var data = [];
//   for (var i = 0; i < weekData.length; i++) {
//     data.push(weekData[i].workTime);
//   }
//   return data;
// }(weekData);
var rich = {
  yellow: {
      color: "#ffc72b", 
      fontSize: 24 * scale,
      padding: [5, 4],
      align: 'center'
  },
  total: {
      color: "#ffc72b",
      fontSize: 32 * scale,
      align: 'center'
  },
  white: {
      color: "black",
      align: 'center',
      fontSize: 14 * scale,
      padding: [21, 0]
  },
  blue: {
      color: '#49dff0',
      fontSize: 12 * scale,
      align: 'center',
      fontWeight: 'bolder',
  },
  hr: {
      borderColor: '#0b5263',
      width: '100%',
      borderWidth: 1,
      height: 0,
  }
}
export const getPositionPercentageOptions = (data) => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '职位分布',
      left: 'center',
      top: '48%',
      padding: [24, 0],
      textStyle: {
        color: 'black',
        fontSize: 16 * scale,
        align: 'center'
      }
    },
    legend: {
      selectedMode: false,
      formatter: function (name) {
        var total = 0; //各科正确率总和
        var averagePercent; //综合正确率
        data.forEach(function (value, index, array) {
          total += value.value;
        });
        return '{total|' + total + '人' + '}';
      },
      data: [data[0].name],
      left: 'center',
      top: 'center',
      icon: 'none',
      align: 'center',
      textStyle: {
        color: "#ccc",
        fontSize: 16 * scale,
        rich: rich
      },
    },
    series: [{
      name: '各职位分布',
      type: 'pie',
      radius: ['38%', '46%'],
      hoverAnimation: false,
      color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
      label: {
        normal: {
          formatter: function (params, ticket, callback) {
            var total = 0; //考生总数量
            var percent = 0; //考生占比
            data.forEach(function (value, index, array) {
              total += value.value;
            });
            percent = ((params.value / total) * 100).toFixed(1);
            return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
          },
          rich: rich
        },
      },
      labelLine: {
        normal: {
          length: 45 * scale,
          length2: 0,
          lineStyle: {
            color: '#0b5263'
          }
        }
      },
      data: data
    }]
  };
};