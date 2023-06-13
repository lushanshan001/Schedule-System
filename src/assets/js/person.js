import { getPersonInfo } from "@/api/company/person";
import { changePersonInfo } from "@/api/company/person";
import { ElMessageBox } from "element-plus";
import { ElMessage} from 'element-plus';

export default {
  data() {
    return {
      avatar: require('../imges/personalOne.png'),
      form: {
        id: '001',
        id_number: '23',
        name: 'lushan',
        email: '954691927@qq.com',
        staffEmail: 's.fxkvc@qq.com',
        companyName: '吉首科技',
        shopName: '小卖部',
        gender: '女',
        createTime: '2001-02-12 00:00:00',
        lastTime: '2001-10-12 00:00:00',
        hourWage: '100',
        position: 'CEO',
      },
      personVisible: false,
    }
  },
  methods: {
    getPersonInfo() {
      const user = sessionStorage.getItem("user");
      // const res = getPersonInfo(user.id);
      // if(res.data.code == this.$store.state.globel.success){
      //   this.form = res.data.data;
      // }
    },
    changePersonInfo() {
      this.personVisible = true;
    },
    confirmEdit() {
      this.personVisible = false;
      const res = changePersonInfo(this.form);
      if(res.data.code == this.$store.state.globel.success){
        ElMessage({
          type: 'success',
          message: '修改成功',
        });
      }
    },
  },
  created() {
    this.getPersonInfo();
  }
}