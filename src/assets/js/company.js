import { getCompanyInfo } from "@/api/company/company";
import { changeCompanyInfo } from "@/api/company/company";
import { ElMessageBox } from "element-plus";
import { ElMessage} from 'element-plus';

export default{
  data() {
    return {
      form: {
        logo: require('../imges/company-logo.jpg'),
        id: '111111',
        name: '吉首科技',
        creator: '创新创业实验室',
        createTime: '2023/03/23',
        introduction: '吉首科技公司成立于2010年，是一家以人工智能技术为核心的高科技企业。公司总部位于中国北京市，同时在上海、深圳、杭州、成都等地设有分支机构。吉首科技公司致力于研究和开发人工智能技术，包括自然语言处理、机器学习、计算机视觉等领域。公司的主要产品包括智能客服、智能语音识别、智能推荐系统等，这些产品已经广泛应用于、金融、电商、教育医疗等行业，并取得了良好的市场反响。吉首科技公司拥有一支高素质的研发团队，其中不乏来自国内外知名高校和企业的专业人才。公司注重技术创新和人才培养，不断提升自身的核心竞争力。同时，吉首科技公司也非常重视社会责任和企业文化建设，积极参与公益事业和社会活动，为推动科技进步和社会发展贡献力量。公司的企业文化以“创新、共赢、责任、感恩”为核心价值观，倡导员工间的合作与分享，营造积极向上的工作氛围。未来，吉首科技公司将继续致力于人工智能技术的研究和应用，为客户提供更加智能化、高效化的解决方案，推动人工智能技术在各行各业的广泛应用，为社会的发展做出更大的贡献。',
        address: '湖南省张家界市永定区大庸桥街道子午路吉首大学张家界校区',
      },
      companyVisible: false,
      labelPosition: 'left',
      file: null,
      type: '',
    }
  },
  methods: {
    getCompanyInfo() {
      console.log(sessionStorage.getItem("user"))
      this.type = sessionStorage.getItem("user");
      const user = sessionStorage.getItem("user");
      // const res = getCompanyInfo(user.id);
      // if(res.data.code == this.$store.state.globel.success){
      //   this.form = res.data.data;
      // }
    },
    changeCompanyInfo() {
      this.companyVisible = true;
    },
    confirmEdit() {
      this.form.logo = this.file.raw;
      console.log(this.form);
      this.companyVisible = false;
      const res = changeCompanyInfo(this.form);
      if(res.data.code == this.$store.state.globel.success) {
        ElMessage({
          type: 'success',
          message: '修改成功',
        });
      }
    },
    handleFileChange(file) { //文件数量改变
      this.file = file;
    },
  },
  created() {
    this.getCompanyInfo();
  },
}