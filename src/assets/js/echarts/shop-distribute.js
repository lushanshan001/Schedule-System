// 店铺全国分布echarts图配置项
var geoCoordMap = {
  '台湾': [121.5135, 25.0308],
  '黑龙江': [127.9688, 45.368],
  '内蒙古': [110.3467, 41.4899],
  "吉林": [125.8154, 44.2584],
  '北京市': [116.4551, 40.2539],
  "辽宁": [123.1238, 42.1216],
  "河北": [114.4995, 38.1006],
  "天津": [117.4219, 39.4189],
  "山西": [112.3352, 37.9413],
  "陕西": [109.1162, 34.2004],
  "甘肃": [103.5901, 36.3043],
  "宁夏": [106.3586, 38.1775],
  "青海": [101.4038, 36.8207],
  "新疆": [87.9236, 43.5883],
  "西藏": [91.11, 29.97],
  "四川": [103.9526, 30.7617],
  "重庆": [108.384366, 30.439702],
  "山东": [117.1582, 36.8701],
  "河南": [113.4668, 34.6234],
  "江苏": [118.8062, 31.9208],
  "安徽": [117.29, 32.0581],
  "湖北": [114.3896, 30.6628],
  "浙江": [119.5313, 29.8773],
  "福建": [119.4543, 25.9222],
  "江西": [116.0046, 28.6633],
  "湖南": [113.0823, 28.2568],
  "贵州": [106.6992, 26.7682],
  "云南": [102.9199, 25.4663],
  "广东": [113.12244, 23.009505],
  "广西": [108.479, 23.1152],
  "海南": [110.3893, 19.8516],
  '上海': [121.4648, 31.2891],
};
var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord && data[i].value > 0) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
export const getShopDistributionChartOptions = (data) => {
  return {
    backgroundColor: 'white',
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (typeof (params.value)[2] == "undefined") {
          return params.name + ' : ' + params.value;
        } else {
          return params.name + ' : ' + params.value[2];
        }
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {}
    },
    geo: {
      map: 'china',
      show: true,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false,
        }
      },
      scaleLimit: {
        //滚轮缩放的极限控制
        min: 1, //缩放最小大小
        max: 2, //缩放最大大小
      },
      itemStyle: {
        normal: {
          areaColor: '#3a7fd5',
          borderColor: '#0a53e9',//线
          shadowColor: '#092f8f',//外发光
          shadowBlur: 20
        },
        emphasis: {
          areaColor: '#0a2dae',//悬浮区背景
        }
      }
    },
    series: [
      {
        symbolSize: 5,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#D8BC37'
          }
        },
        name: 'light',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#FFFFFF',
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        animation: false,
        data: data
      },
      {
        name: 'Top 5',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [50, 50],
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 9,
            },
            formatter(value) {
              return value.data.value[2]
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#D8BC37', //标志颜色
          }
        },
        data: convertData(data),
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        zlevel: 1
      },
    ]
  };
};
