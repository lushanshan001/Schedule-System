<template>
  <div class="rule">
    <div>
      <h1>固定规则</h1>
      <div class="content" v-for="item in content" :key="item">
        <h4>{{ item.title }}</h4>
        <ul v-for="i in item.detail" :key="i">
          <li>{{ i.label }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: [
        {
          title: "门店营业时间规则",
          detail: [
            {
              label: "周一~周五：早9点~晚9点",
            },
            {
              label: "周末：早10点~晚10点",
            },
          ],
        },
        {
          title: "休息时间段",
          detail: [
            {
              label: "午餐时间：时间范围（如11点到14点，半小时）",
            },
            {
              label: "晚餐时间：时间范围（如17点到20点，半小时）",
            },
            {
              label: "休息时间：时间范围（不限。半小时）",
            },
          ],
        },
        {
          title: "工作时长规则",
          detail: [
            {
              label: "员工每周最多工作40小时",
            },
            {
              label: "员工每天最多工作８小时",
            },
            {
              label: "单个班次最少2小时，最多4小时。员工可以连续排多个班次",
            },
            {
              label:
                "员工最长连续工作时长：4小时。达到连续工作时长，必须安排休息时间",
            },
            {
              label:
                "必须给工作时间完全覆盖午餐、晚餐时间的员工，安排午餐或晚餐时间",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style>
.content {
  margin-left: 20px;
}
</style>