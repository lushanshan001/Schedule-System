import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

//接口
import { getOneSchedule } from "@/api/schedule/schedule";
import { getSkill, getPosts } from "@/api/posts";

//组件
import { Search } from "@/components/common/Search.vue";

export default {
  components: {
    FullCalendar,
    Search,
  },
  data() {
    return {
      todayDate: "",
      chooseItemValue: "请选择查找条件",
      detailList: [],
      chooseItemDetail: "请选择",
      theme: true,
      choose: {
        positionName: null,
        skill: null,
      },
      calendarOptions: {
        plugins: [resourceTimelinePlugin],
        //设置初始时间
        initialDate: this.todayDate,
        //设置开始时间
        slotMinTime: "10:00:00",
        //设置结束时间
        slotMaxTime: "23:00:00",
        headerToolbar: false,
        weekends: true,
        height: "550px",
        handleWindowResize: true,
        events: this.getData,
        eventClick: this.editEvent,
        eventOrderStrict: true,
      },
    };
  },
  methods: {
    //获得排班表的数据
    async getData(fetchInfo, successCallback, failureCallback) {
      //得到要排班的日期;
      let date = new Date(fetchInfo.start.valueOf());
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      date = y + "-" + m + "-" + d;
      this.todayDate = date;
      console.log(this.choose)
      console.log(this.choose, "获得要排班的时间");
      const data = {
        date: date,
        positionName: this.choose.positionName,
        skill: this.choose.skill
      };
      const res = await getOneSchedule(data);
      if (res.data.code === 200) {
        const data = res.data.data;
        let calendarEvents = [];
        data.forEach((element) => {
          calendarEvents.push({
            id: element.scheduleId,
            title:
              element.staffName === null
                ? "开放班次"
                : element.staffName + "：" + element.positionName,
            start: element.date + " " + element.startTime + ":00:00",
            end: element.date + " " + element.endTime + ":00:00",
            textColor: "black",
            color: element.color,
            backgroundColor: element.color,
          });
        });
        console.log(calendarEvents, "排班表数据");
        successCallback(calendarEvents);
      } else {
        ElMessage.error(res.data.msg);
      }
    },

    /**
     *切换日期
     */
    getLastDay() {
      this.changeDate(-1);
      this.$refs.calendar.getApi().prev();
    },
    getNextDay() {
      this.changeDate(1);
      this.$refs.calendar.getApi().next();
    },
    // 修改日期
    changeDate(day) {
      var dd = new Date(this.todayDate);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      this.todayDate = y + "-" + m + "-" + d;
    },
    //修改表格信息
    editEvent(eventClickInfo) {
      console.log(eventClickInfo.event, "Info");
    },
    checkViewNew(data) {
      this.$emit("checkViewNew", data);
    },
    //选择查看
    async checkChooseForDeatil() {
      var detailSelect = document.getElementById("showChooseDetail");
      this.detailList = [];
      this.chooseItemDetail = "请选择";
      this.choose.positionName = null;
      this.choose.skill = null;
      detailSelect.style.visibility = "visible";
      var res;
      if (this.chooseItemValue === "按职位查找") {
        res = await getPosts();
        const list = res.data.data;
        list.forEach((element) => {
          this.detailList.push(element.positionName);
        });
      } else if (this.chooseItemValue === "按技能查找") {
        res = await getSkill();
        this.detailList = res.data.data;
      } else if (this.chooseItemValue === "按员工分组查找") {
        res = null;
      }
    },
    chooseDetailForSchedule() {
      if(this.chooseItemValue === "按职位查找"){
        this.choose.positionName = this.chooseItemDetail;
      }else if(this.chooseItemValue === "按技能查找"){
        this.choose.skill = this.chooseItemDetail;
      }
      this.$refs.calendar.getApi().prev();
      this.$refs.calendar.getApi().next();
    },
  },
};
