// 员工每周工作时长echarts配置项
import * as echarts from "echarts";
var xData = function(weekData) {
  var data = [];
  for (var i = 0; i < weekData.length; i++) {
    data.push(weekData[i].staffName);
  }
  return data;
}; // 将 weekData 作为参数传递给 xData 函数

var yData = function(weekData) {
  var data = [];
  for (var i = 0; i < weekData.length; i++) {
    data.push(weekData[i].worktime);
  }
  return data;
}; // 将 weekData 作为参数传递给 yData 函数

export const getWeekWorkHourOptions = (data) => {
  return {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      data: xData(data),
      boundaryGap: true,
      axisLabel: { //坐标轴刻度标签的相关设置。
        interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
        textStyle: {
          color: '#a8aab0',
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 12,
        },
        rotate: -40,
      },
      axisTick: {//坐标轴刻度相关设置。
        show: false,
      },
      axisLine: {//坐标轴轴线相关设置
        lineStyle: {
          color: '#E5E9ED',
        }
      },
      splitLine: { //坐标轴在 grid 区域中的分隔线。
        show: false,
        lineStyle: {
          color: '#f7f7f7',
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#a8aab0',
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 12,
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e6e6e6',
        }
      }
    },
    series: [{
      name: '总工时',
      type: 'bar',
      barWidth: 30,
      yAxisIndex: 0,
      itemStyle: {
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
      data: yData(data)
    }]
  };
};
