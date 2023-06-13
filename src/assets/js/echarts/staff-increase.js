// 公司员工增减echarts配置项
// var xData = function () {
//   var data = [];
//   for (var i = 0; i < weekData.length; i++) {
//     data.push(weekData[i].staffName);
//   }
//   return data;
// }();
// var yData = function () {
//   var data = [];
//   for (var i = 0; i < weekData.length; i++) {
//     data.push(weekData[i].workTime);
//   }
//   return data;
// }();
export const getStaffIncreaseOptions = (data) => {
  return {
    backgroundColor: '',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#a8aab0'
        }
      },
      splitLine: {    //网格线
        lineStyle: {
          type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
        },
        show: true //隐藏或显示
      },
      axisLabel: {//文字的配置
        show: true,
        textStyle: {
          color: '#a8aab0',
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 12,
        }
      },
      data: ['5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月']
    }],
    yAxis: [{
      type: 'value',
      splitLine: {    //网格线
        lineStyle: {
          type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
        },
        show: true //隐藏或显示
      },
      axisLine: {
        lineStyle: {
          color: '#00c7ff'
        }
      },
      axisLabel: {//文字的配置
        show: true,
        textStyle: {
          color: '#a8aab0',
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 12,
        }
      },
    }],
    series: [{
      name: '增长数',
      type: 'line',
      symbol: 'circle',
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1,
          color: 'rgb(58,132,255)'
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: 'rgba(58,132,255,0.1)'
          }, {
            offset: 1,
            color: 'rgba(58,132,255,0.65)'
          }]),
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(137,189,27)',
          borderColor: 'rgba(137,189,2,0.27)',
          borderWidth: 12
        }
      },
      data: [0, 3, 1, 1, 0, 4, 0, 0, 0, 1, 0, 2]
    }],
  };
};