//界面
import ExcelExport from "@/components/excel/ExcelExport.vue";
import ExcelLeadingIn from "@/components/excel/ExcelLeadingIn.vue";
import Search from "@/components/common/Search.vue";

//异步消息处理
import { ElMessage } from "element-plus";
import { openLoading,endLoading } from '@/assets/utils/loading';

//接口
import {
  aduitCharacter,
  aduitHeader,
} from "@/assets/utils/excel/excelLeadingIn";
import { aduitSearchList } from "@/assets/utils/search";
import { getAduit, addAduit } from "@/api/aduit";
import { handleAduitData } from "../utils/excel/excelLeadingIn";
import { getShopInfoByManager } from "@/api/shop";
import * as echarts from "echarts";

export default {
  components: { Search, ExcelExport, ExcelLeadingIn },
  data() {
    return {
      //获得表单的消息
      newExcelList: [],
      aduitCharacter: [],
      aduitSearchList: [],
      //展示消息
      aduitData: [],
      adddata: [],
      //搜索日期
      searchTime: "",
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      //店铺信息
      shopNews: [],
      switchValue: true,
    };
  },
  created() {
    this.getExcelList();
    this.getShopNews();
  },
  mounted(){
    // this.$nextTick(()=>{
    //   var that = this;
    //   that.drawLine();
    //  });
  },
  methods: {
    //添加客流量信息
    async getAddData(data) {
      openLoading("请稍等一下，数据正在处理中");

      //读取file中的数据
      //把文件解析成二进制数据，把二级制数据变成excel表格式的数据
      this.addData = handleAduitData(data);

      const res = await addAduit(this.addData);
      if (res.data.code === this.$store.state.globel.success) {
        ElMessage.success(res.data.msg);
      } else {
        ElMessage.error(res.data.msg);
      }
      this.getList();
      //关闭loading
      endLoading();
    },

    //导出新输入的表
    getExcelList() {
      //导出excel表的表头
      this.newExcelList.jsonData = [{}];
      this.newExcelList.listHander = aduitHeader;
      this.newExcelList.excelName = "客流量表";
      this.newExcelList.show = "导出客流量输入表";
      this.aduitCharacter = aduitCharacter;
      this.aduitSearchList = aduitSearchList;
    },

    //得到子组件中的search
    getSearchNews(data) {
      this.searchNews = data;
      console.log(this.searchNews, "搜索值");
      this.getList();
    },

    //得到最近一天的客流量
    async getList() {
      const res = await getAduit(this.searchTime);
      console.log(res, "返回的客流量数据");
      if (res.data.code === this.$store.state.globel.success) {
        this.aduitData = res.data.data;
        this.searchTime = this.aduitData[0].date;
        console.log(this.searchTime);
        this.aduitData.forEach((element) => {
          element.shopName = this.shopNews.shopName;
        });
      } else {
        ElMessage.error(res.data.msg);
      }
    },

    async getShopNews() {
      const res = await getShopInfoByManager();
      this.shopNews = res.data.data;
      this.getList();
    },

    changeTime(){
      this.getList();
    },

    switchReceiveStatus(){
      if(this.switchValue === false){
        this.drawLine();
      }
    },
    drawLine(){
      var aduit;
      // 新建一个promise对象
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      //然后异步执行echarts的初始化函数
      newPromise.then(() => {
        //	此dom为echarts图标展示dom
        var thatAduit = echarts.init(document.getElementById("aduit"));
        window.addEventListener("resize", function () {
          thatAduit.resize();
        });
        var xData = function() {
          var data = [];
          for (var i = 8; i < 21; i++) {
              data.push(i + ":00" + "-" + (i + 1) + ":00");
          }
          return data;
        }();
        var that = this;
        var yData = function() {
          var data = [];
          for (var i = 0; i < that.aduitData.length; i++) {
              data.push(that.aduitData[i].aduit);
          }
          return data;
        }();
        thatAduit.setOption({
          // backgroundColor: "#1A1835",
          backgroundColor: "#fff",
          tooltip: {
              trigger: "axis",
              axisPointer: {
                  type: "shadow",
                  textStyle: {
                      color: "#fff"
                  }
              },
          },
          title: {
            top:20,
            text: '每日客流量',
            subtext: '',
            x: 'center',
            textStyle: {
                color: 'black'
            }
        },
          grid: {
            borderWidth: 0,
            top: 110,
            bottom: 95,
            textStyle: {
                color: "#fff"
            },
            top:"50px",
            left:"50px",
            right:"15px",
            bottom:"50px"
          },
          calculable: true,
          xAxis: [{
              type: "category",
              axisLine: {
                  lineStyle: {
                      // color: "rgba(204,187,225,0.5)",
                      color: "black"
                  }
              },
              splitLine :{    //网格线
                lineStyle:{
                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                },
                show:true //隐藏或显示
              },
              axisTick: {
                  show: false
              },
              data: xData,
              boundaryGap: false,
          }],
          yAxis: [{
              type: "value",
              splitLine :{    //网格线
                lineStyle:{
                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                },
                show:true //隐藏或显示
            },
              axisLine: {
                  lineStyle: {
                      // color: "rgba(204,187,225,0.5)",
                      color: "black"
                  }
              },
          }],
          dataZoom: [{
              show: true,
              height: 30,
              xAxisIndex: [0],
              bottom: 30,
              "start": 10,
              "end": 80,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                  color: "#5B3AAE",
              },
              textStyle:{
                  color:"rgba(204,187,225,0.5)",
              },
              fillerColor:"rgba(67,55,160,0.4)",
              borderColor: "rgba(204,187,225,0.5)",
          }, {
              type: "inside",
              show: true,
              height: 15,
              start: 1,
              end: 35
          }],
          series: [{
              name: "客流量",
              type: "line",
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                  color: "#6f7de3",
              },
              markPoint: {
                  label: {
                      normal: {
                          textStyle: {
                              color: '#fff'
                          }
                      }
                  },
                  data: [{
                      type: 'max',
                      name: '最大值',
                  }, {
                      type: 'min',
                      name: '最小值'
                  }]
              },
              // data: [
              //     509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117,2000,1455,1210,719,
              //     733,944,2285,2208,3372,3936,3693,2962,2810,3519,2455,2610,2719,2484,2078
              // ],
              data: yData,
          }]
      });
      })
    }
  },
  
};
