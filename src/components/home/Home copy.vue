<template>
  <div class="header">欢迎回来，</div>
  <div class="home">
    <div class="left" v-if="type === '公司'">
      <div class="distribution">
        <div class="small-div-header">
          <h3>店铺分布</h3>
        </div>
        <div class="content">
          <div id="shop" style="width: 100%; height: 400px"></div>
        </div>
      </div>
      <div class="increase">
        <div class="small-div-header">
          <h3>员工增长</h3>
        </div>
        <div class="content">
          <div id="staff" style="width: 100%; height: 400px"></div>
        </div>
      </div>
    </div>
    <div class="left" v-if="type === '门店经理'">
      <div class="week">
        <div class="small-div-header">
          <h3>最近一周员工总工时</h3>
        </div>
        <div class="content">
          <div id="week" style="width: 100%; height: 400px"></div>
        </div>
      </div>
      <div class="arrange">
        <div class="small-div-header">
          <h3>人员安排分析</h3>
        </div>
        <div class="alert">
          <el-icon><QuestionFilled /></el-icon>
          标黄色的行代表平均工作时长过长，而标蓝色的行则代表平均工作时长过短。请在查看数据时多加留意这些行。
        </div>
        <div class="content">
          <div class="left-content">
            <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" height="400"
              :data="employeeWorkData" style="width: 85%" border :row-class-name="employeeWorkTableRow">
              <el-table-column prop="staffName" label="姓名" width="100"></el-table-column>
              <el-table-column prop="phone" label="电话号码" width="120"></el-table-column>
              <el-table-column prop="positionName" label="职位"></el-table-column>
              <el-table-column prop="workTime" label="平均工时" width="160"></el-table-column>
            </el-table>
          </div>
          <div class="right-content">
              <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="positionAverageData" style="width: 100%" border :row-class-name="positionAverageTableRow">
                <el-table-column prop="positionName" label="职位"></el-table-column>
                <el-table-column prop="averageWork" label="平均工时"></el-table-column>
              </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="header">
      </div>
      <div class="right-middle">
        <div class="small-div-header">
          <h3>快捷管理入口</h3>
        </div>
        <div class="content">
          <div class="out">
            <div class="in">
              <img class="in_img" src="@/assets/imges/in.png"/>
              <span>批量导入员工数据</span>
            </div>
            <div class="in">
              <img class="in_img" src="@/assets/imges/employee.png"/>
              <span>核心人事</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-middle ">
        <div class="small-div-header">
          <h3>基础数据</h3>
        </div>
        <div class="content">
          <div class="left" id="sex" style="width: 0px; height: 400px">
          </div>
          <div class="right" id="position" style="width: 0px; height: 400px">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { weekWorkHour } from "@/api/employee";
// import { getShopDistribution } from "@/api/shop";
// import { staffIncrease } from "@/api/employee"
import { ElMessage } from "element-plus";
// import { weekOption } from "@/assets/js/weekOption"
import * as echarts from "echarts";
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
export default {
  data(){
    return{
      type: '',
      weekOption: null,
      shopOption: null,
      staffOption: null,
      employeeWorkData:[
        { staffName: '杜莉', phone: '19813404813', positionName: '店长', workTime: 6.3,},
        { staffName: '沈磊', phone: '18240238764', positionName: '库房', workTime: 5.1, },
        { staffName: '许磊', phone: '17346955655', positionName: '经理', workTime: 5.6, },
        { staffName: '赖刚', phone: '17346955656', positionName: '保洁', workTime: 7.1, },
        { staffName: '康佳', phone: '17346955657', positionName: '收营员', workTime: 5.2, },
        { staffName: '宋丽', phone: '17346955658', positionName: '导购', workTime: 7.6, },
        { staffName: '谭洋', phone: '17346955659', positionName: '库房', workTime: 4.3, },
        { staffName: '郝静', phone: '17346955660', positionName: '导购', workTime: 6.8, },
        { staffName: '叶娜', phone: '17346955661', positionName: '保洁', workTime: 6.9, },
        { staffName: '曹刚', phone: '17346955662', positionName: '导购', workTime: 5.8, },
        { staffName: '黎敏', phone: '17346955663', positionName: '收营员', workTime: 5.5, },
        { staffName: '曾美', phone: '17346955664', positionName: '导购', workTime: 7.1, },
        ],
      positionAverageData:[
        { positionName: '店长', averageWork: 6.3, }, 
        { positionName: '库房', averageWork: 4.7, }, 
        { positionName: '经理', averageWork: 5.6, }, 
        { positionName: '保洁', averageWork: 7, }, 
        { positionName: '导购', averageWork: 7.1, }, 
        { positionName: '收营员', averageWork: 5.3, }, 
      ],
    }
  },
  created(){
    this.type = sessionStorage.getItem("user");
    this.getWeekWorkHour();
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.drawLine();
    // })
    // if(this.type == '公司'){
    //   this.drawLine();
    // }
    this.drawLine();
  },
  methods: {
    employeeWorkTableRow({row, rowIndex}) {
      if(row.workTime > 7) {
        return "warning-row"
      }else if(row.workTime < 5) {
        return "success-row"
      }
      return "";   // 返回值为空
    },
    positionAverageTableRow({row, rowIndex}) {
      if(row.averageWork > 7) {
        return "warning-row"
      }else if(row.averageWork < 5) {
        return "success-row"
      }
      return "";   // 返回值为空
    },
    getWeekWorkHour() {
      // const res = weekWorkHour("1643602322133131266");
      weekWorkHour("1643602322133131266").then(res =>{
        if(res.data.code === this.$store.state.globel.success){
          var xData = function() {
            var data = [];
            for (var i = 0; i < res.data.data.length; i++) {
              data.push(res.data.data[i].staffName);
            }
            return data;
          }();
          var yData = function() {
            var data = [];
            for (var i = 0; i < res.data.data.length; i++) {
              data.push(res.data.data[i].worktime);
            }
            return data;
          }();
          this.weekOption = {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:{
          data: xData,
          boundaryGap: true,
          axisLabel: { //坐标轴刻度标签的相关设置。
              interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          textStyle: {
              color: '#a8aab0',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12,
          },
          //rotate:50,
          },
          axisTick:{//坐标轴刻度相关设置。
              show: false,
          },
          axisLine:{//坐标轴轴线相关设置
              lineStyle:{
                  color:'#E5E9ED',
                  // opacity:0.2
              }
          },
          splitLine: { //坐标轴在 grid 区域中的分隔线。
              show: false,
              lineStyle: {
                  color: '#f7f7f7',
              // 	opacity:0.1
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
              axisLine:{
                  show: false
              },
              axisTick:{
                  show: false
              },
              splitLine: {
                  show: true,
                  lineStyle: {
                      color: '#e6e6e6',
                  // 	opacity:0.1
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
                  //柱状图圆角
                  // barBorderRadius: [30,30,0,0],
              }
          },

          data: yData
      }]
          };

        }
      });
    },
    async getDistributionAndIncrease() {
      // const res = await getShopDistribution("1643301658781827073");
      // console.log(res.data.data);
      // if (res.data.code === this.$store.state.globel.success) {
        var geoCoordMap = {
          '台湾': [121.5135,25.0308],
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
        var province = [
          {name:"北京",value:0},
          {name:"天津",value:0},
          {name:"河北",value:0},
          {name:"山西",value:0},
          {name:"内蒙古",value:0},
          {name:"辽宁",value:0},
          {name:"吉林",value:0},
          {name:"黑龙江",value:0},
          {name:"上海",value:0},
          {name:"江苏",value:1},
          {name:"浙江",value:0},
          {name:"安徽",value:0},
          {name:"福建",value:2},
          {name:"江西",value:3},
          {name:"山东",value:0},
          {name:"河南",value:0},
          {name:"湖北",value:0},
          {name:"湖南",value:7},
          {name:"重庆",value:0},
          {name:"四川",value:4},
          {name:"贵州",value:1},
          {name:"云南",value:0},
          {name:"西藏",value:0},
          {name:"陕西",value:0},
          {name:"甘肃",value:0},
          {name:"青海",value:0},
          {name:"宁夏",value:0},
          {name:"新疆",value:0},
          {name:"广东",value:5},
          {name:"广西",value:2},
          {name:"海南",value:0},
          ];
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
        this.shopOption ={
          backgroundColor: 'white',
          title: {
              top:20,
              text: '全国门店分布',
              subtext: '',
              x: 'center',
              textStyle: {
                  color: 'black'
              }
          },
          tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if(typeof(params.value)[2] == "undefined"){
                  return params.name + ' : ' + params.value;
                }else{
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
              inRange: {

              }
          },
          geo: {
              map: 'china',
              show: true,
              roam: true,
              label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
          }
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
          series : [
          {
            symbolSize: 5,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                    textStyle:{
                      fontSize:12,
                      color:'#fff'
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
            data: convertData(province),
          },
          {
              type: 'map',
              map: 'china',
              geoIndex: 0,
              aspectscalee: 0.75, //长宽比
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
              data: province
          },
          {
              name: 'Top 5',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin',
              symbolSize: [50,50],
              label: {
                  normal: {
                      show: true,
                      textStyle: {
                          color: '#fff',
                          fontSize: 9,
                      },
                      formatter (value){
                          return value.data.value[2]
                      }
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#D8BC37', //标志颜色
                  }
              },
              data: convertData(province),
              showEffectOn: 'render',
              rippleEffect: {
                  brushType: 'stroke'
              },
              hoverAnimation: true,
              zlevel: 1
          },
        ]
        };

      // const staffRes = await staffIncrease("1643301658781827073");
      // console.log(staffRes);
      var staffs = [2,9,1,0,12,3,0,0,1,4,1,1];
      // staffRes.data.data = staffs;
      // if (staffRes.data.code === this.$store.state.globel.success) {
        var xData = function() {
          var data = [];
          // for (var i = 0; i < staffRes.data.data.length; i++) {
          //   data.push(staffRes.data.data[i].monthId);
          // }
          for (var i = 1; i <= 12; i++) {
            data.push(i + "月");
          }
          return data;
        }();
        var yData = function() {
          var data = [];
          // for (var i = 0; i < staffRes.data.data.length; i++) {
          //   data.push(staffRes.data.data[i].number);
          // }
          for (var i = 0; i < staffs.length; i++) {
            data.push(staffs[i]);
          }
          console.log(data);
          return data;
        }();
        this.staffOption = {
          backgroundColor: '',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          title: {
              top:20,
              text: '公司员工增长数',
              subtext: '',
              x: 'center',
              textStyle: {
                  // color: '#ccc'
                  color: 'black',
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
                // color: '#00c7ff'
                color: 'black'
              }
            },
            data: xData,
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                // color: '#00c7ff'
                color: 'black'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              show: false
            }
          }],
          series: [{
            name: '增长数',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5ff6e9'
                }, {
                  offset: 0.8,
                  color: '#7370fd'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
              }
            },
            data: yData,
          }],
        };
      this.drawLine();
    },
    drawLine() {
      if(this.type === '公司'){
          // 基于准备好的dom，初始化echarts实例
        var shopChart = echarts.init(document.getElementById("shop"));
        //监听页面的resize事件获得游览器的大小改变的事件。
        window.addEventListener("resize", function () {
          shopChart.resize();
        });
        var geoCoordMap = {
          '台湾': [121.5135,25.0308],
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
        var data = [
          {name:"北京",value:0},
          {name:"天津",value:0},
          {name:"河北",value:0},
          {name:"山西",value:0},
          {name:"内蒙古",value:0},
          {name:"辽宁",value:0},
          {name:"吉林",value:0},
          {name:"黑龙江",value:0},
          {name:"上海",value:0},
          {name:"江苏",value:1},
          {name:"浙江",value:0},
          {name:"安徽",value:0},
          {name:"福建",value:2},
          {name:"江西",value:3},
          {name:"山东",value:0},
          {name:"河南",value:0},
          {name:"湖北",value:0},
          {name:"湖南",value:7},
          {name:"重庆",value:0},
          {name:"四川",value:4},
          {name:"贵州",value:1},
          {name:"云南",value:0},
          {name:"西藏",value:0},
          {name:"陕西",value:0},
          {name:"甘肃",value:0},
          {name:"青海",value:0},
          {name:"宁夏",value:0},
          {name:"新疆",value:0},
          {name:"广东",value:5},
          {name:"广西",value:2},
          {name:"海南",value:0},
        ];
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
        var shopOption ={
        backgroundColor: 'white',
        tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if(typeof(params.value)[2] == "undefined"){
                  return params.name + ' : ' + params.value;
                }else{
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
              inRange: {

              }
          },
          geo: {
              map: 'china',
              show: true,
              // roam: true,
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
          series : [
            {
          
              symbolSize: 5,
              label: {
                  normal: {
                      formatter: '{b}',
                      position: 'right',
                      show: true,
                      textStyle:{
                        fontSize:12,
                        color:'#fff'
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
              symbolSize: [50,50],
              label: {
                  normal: {
                      show: true,
                      textStyle: {
                          color: '#fff',
                          fontSize: 9,
                      },
                      formatter (value){
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
          ]};
        shopChart.setOption(shopOption);
        var staffChart = echarts.init(document.getElementById("staff"));
        //监听页面的resize事件获得游览器的大小改变的事件。
        window.addEventListener("resize", function () {
          staffChart.resize();
        });
        var staffOption = {
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
            splitLine :{    //网格线
              lineStyle:{
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
              },
              show:true //隐藏或显示
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
            splitLine :{    //网格线
                lineStyle:{
                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                },
                show:true //隐藏或显示
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
        staffChart.setOption(staffOption);
      }else{
        var weekChart = echarts.init(document.getElementById("week"));
        var weekData = [
        { staffName: '杜莉', id: 1001, positionName: '店长', workTime: 6.3,},
        { staffName: '沈磊', id: 1002, positionName: '库房', workTime: 5.1, },
        { staffName: '许磊', id: 1003, positionName: '经理', workTime: 5.6, },
        { staffName: '赖刚', id: 1004, positionName: '保洁', workTime: 7.1, },
        { staffName: '康佳', id: 1006, positionName: '收营员', workTime: 5.2, },
        { staffName: '宋丽', id: 1005, positionName: '导购', workTime: 7.6, },
        { staffName: '谭洋', id: 1007, positionName: '库房', workTime: 4.3, },
        { staffName: '郝静', id: 1009, positionName: '导购', workTime: 6.8, },
        { staffName: '叶娜', id: 1010, positionName: '保洁', workTime: 6.9, },
        { staffName: '曹刚', id: 1011, positionName: '导购', workTime: 5.8, },
        { staffName: '黎敏', id: 1012, positionName: '收营员', workTime: 5.5, },
        { staffName: '曾美', id: 1015, positionName: '导购', workTime: 7.1, },
        ];
        var xData = function() {
          var data = [];
          for (var i = 0; i < weekData.length; i++) {
            data.push(weekData[i].staffName);
          }
          return data;
        }();
        var yData = function() {
          var data = [];
          for (var i = 0; i < weekData.length; i++) {
            data.push(weekData[i].workTime);
          }
          return data;
        }();
        var weekOption = {
          tooltip: {
              trigger: 'axis',
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis:{
              data: xData,
              boundaryGap: true,
              axisLabel: { //坐标轴刻度标签的相关设置。
                  interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                  textStyle: {
                      color: '#a8aab0',
                      fontStyle: 'normal',
                      fontFamily: '微软雅黑',
                      fontSize: 12,
                  },
                  rotate:-40,
              //rotate:50,
              },
              axisTick:{//坐标轴刻度相关设置。
                  show: false,
              },
              axisLine:{//坐标轴轴线相关设置
                  lineStyle:{
                      color:'#E5E9ED',
                      // opacity:0.2
                  }
              },
              splitLine: { //坐标轴在 grid 区域中的分隔线。
                  show: false,
                  lineStyle: {
                      color: '#f7f7f7',
                  // 	opacity:0.1
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
            axisLine:{
                show: false
            },
            axisTick:{
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e6e6e6',
                // 	opacity:0.1
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
                //柱状图圆角
                // barBorderRadius: [30,30,0,0],
              }
            },
            data: yData
        }]
        };
        weekChart.setOption(weekOption);
      }
      var sexChart = echarts.init(document.getElementById("sex"));
      const man = 'data:image/png;base64,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'
      const woman = 'data:image/png;base64,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'
      const womannum = 67
      const mannum = 100 - womannum  
      var sexOption = {
          graphic: {
              elements: [
                  {
                      type: 'group',
                      left: '4%',
                      top: '20%',
                      width: 100,
                      height: 280,
                      children: [{
                              type: 'image',
                              z: 3,
                              style: {
                                  image: man,
                              },
                          },
                          {
                              type: 'text',
                              top: 200,
                              style: {
                                  fill: 'rgba(0, 252, 253, 1)',
                                  text: mannum + '%',
                                  font: 'bold 20px Microsoft YaHei',
                              }
                          },
                          {
                              type: 'text',
                              bottom: 0,
                              style: {
                                  fill: 'rgba(134, 157, 229, 1)',
                                  text: '男员工',
                                  font: 'bold 20px Microsoft YaHei',
                              }
                          },
                      ]

                  },
                  {
                      type: 'group',
                      right: '1%',
                      top: '20%',
                      width: 100,
                      height: 280,
                      children: [{
                              type: 'image',
                              z: 3,
                              style: {
                                  image: woman,
                              },
                          },
                          {
                              type: 'text',
                              top: 200,
                              style: {
                                  fill: 'rgba(0, 252, 253, 1)',
                                  text: womannum + '%',
                                  font: 'bold 20px Microsoft YaHei',
                              }
                          },
                          {
                              type: 'text',
                              bottom: 0,
                              style: {
                                  fill: 'rgba(134, 157, 229, 1)',
                                  text: '女员工',
                                  font: 'bold 20px Microsoft YaHei',
                              }
                          },
                      ]
                  },
              ]
          },
          tooltip: {
              show: false
          }, 
          series: [{
                  name: 'bg',
                  type: 'pie',
                  startAngle: 90,
                  radius: ['30%', '35%'],
                  hoverAnimation: false,
                  // center: ['50%', '50%'],
                  itemStyle: {
                      normal: {
                          labelLine: {
                              show: false
                          },
                          color: 'rgba(62, 109, 255, .2)',
                      }
                  },
                  data: [{
                      value: 100,

                  }]
              },
              {
                  name: 'bgman',
                  type: 'pie',
                  startAngle: 90,
                  radius: ['30%', '40%'],
                  hoverAnimation: false,
                  // center: ['50%', '50%'],
                  itemStyle: {
                      normal: {
                          labelLine: {
                              show: false
                          },
                          color: 'rgba(62, 109, 255, 1)',
                      }
                  },
                  data: [{
                      value: 100,

                  }]
              },
              {
                  name: '',
                  type: 'pie',
                  startAngle: 90,
                  radius: ['35%', '55%'],
                  hoverAnimation: false,
                  center: ['50%', '50%'],
                  itemStyle: {
                      normal: {
                          labelLine: {
                              show: false
                          },
                      }
                  },
                  data: [{
                      value: womannum,
                      itemStyle: {
                          normal: {
                              labelLine: {
                                  show: false
                              },
                              color: 'rgba(0, 252, 253, 1)',
                          }
                      },
                  }, {
                      value: mannum,
                      itemStyle: {
                          normal: {
                              labelLine: {
                                  show: false
                              },
                              color: 'transparent',
                          }
                      },
                  }]
              },
          ]
      };
      sexChart.setOption(sexOption);

      var positionChart = echarts.init(document.getElementById("position"));
      var scale = 1;
      var echartData = [{
          value: 1,
          name: '经理'
      }, {
          value: 2,
          name: '保洁'
      }, {
          value: 4,
          name: '导购'
      }, {
          value: 2,
          name: '收营员'
      }, {
          value: 2,
          name: '库房'
      }, {
          value: 1,
          name: '店长'
      }]
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
      var employeeOption = {
          backgroundColor: '#fff',
          title: {
              text:'职位分布',
              left:'center',
              top:'48%',
              padding:[24,0],
              textStyle:{
                  color:'black',
                  fontSize:16*scale,
                  align:'center'
              }
          },
          legend: {
              selectedMode:false,
              formatter: function(name) {
                  var total = 0; //各科正确率总和
                  var averagePercent; //综合正确率
                  echartData.forEach(function(value, index, array) {
                      total += value.value;
                  });
                  return '{total|' + total + '人' + '}';
              },
              data: [echartData[0].name],
              // data: ['高等教育学'],
              // itemGap: 50,
              left: 'center',
              top: 'center',
              icon: 'none',
              align:'center',
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
                      formatter: function(params, ticket, callback) {
                          var total = 0; //考生总数量
                          var percent = 0; //考生占比
                          echartData.forEach(function(value, index, array) {
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
              data: echartData
          }]
      };
      positionChart.setOption(employeeOption);
    },
  },
};
</script>
<style src="@/assets/css/home.css" scoped></style>
<style>
.el-table .warning-row {
  background: rgb(241, 215, 166);
}

.el-table .success-row {
  background: #96b9ee;
}
</style>