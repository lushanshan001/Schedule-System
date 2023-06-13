<template>
  <body class="error-page-wrapper">
    <div class="content-container">
      <div class="head-line">
        <img
          src="@/assets/imges/error.png"
          width="150"
        />
      </div>
      <div class="subheader">
        {{ errorNews }}
      </div>
      <div class="hr"></div>
      <div class="context">
        <p>您可以返回首页，或者尝试刷新</p>
      </div>
      <div class="buttons-container">
        <router-link to="Home">去首页</router-link>
      </div>
    </div>
  </body>
</template>
  
  <script>
export default {
  data() {
    return {
      errorNews:"",
    };
  },
  mounted(){
      const num = this.$route.query.errorNum;
      const text = this.$route.query.errorText;
      if( num !== null && num !== undefined ){
        this.errorNews = num +'-'+ text;
      }else{
        this.errorNews = "界面出错了!!!";
      }
      console.log(this.errorNews)
  }
}
</script>
  
  <style src="@/assets/css/error.css">
</style>