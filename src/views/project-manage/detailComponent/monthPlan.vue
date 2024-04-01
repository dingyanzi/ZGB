<template>
  <div>
    <ZgbTitle titleName="计划内容"></ZgbTitle>
    <avue-crud
      style="margin-top: 20px"
      :option="contentOption1"
      :data="tableData"
      :page.sync="page"
      :search.sync="query"
      @search-change="searchChange"
      @search-reset="resetChange"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </avue-crud>
  </div>
</template>

<script>
import { getCtMonthPlan } from "@/api/plan-project/plan-month";
import ZgbTitle from "../../../components/ZgbTitle.vue";
import { contentOption1 } from "@/const/project-plan/month-plan.js";
export default {
  components: {
    ZgbTitle,
  },
  data() {
    return {
      value2: "",
      contentOption1,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      query: {
        planMonth: this.time(),
      },
    };
  },
  created() {
    this.getCtMonthPlan();
  },
  methods: {
    time() {
      let date = new Date();
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1);
      month = month.length === 2 ? month : 0 + month;
      return `${year}-${month}`;
    },
    getCtMonthPlan() {
      const { id } = this.$route.query;
      getCtMonthPlan({
        id,
        size: this.page.pageSize,
        current: this.page.currentPage,
        planMonth: this.query.planMonth,
      }).then((res) => {
        this.tableData = res.data.records;
        this.tableData.forEach((item) => {
          if (item.roleDivisionDetailWeek) {
            item.serverDate = item.roleDivisionDetailWeekName;
          } else if (item.roleDivisionDetailDay) {
            item.serverDate = item.roleDivisionDetailDay;
          } else if (item.roleDivisionDetailMonth) {
            item.serverDate = item.roleDivisionDetailMonth;
          }
        });
        this.page.total = res.data.total;
      });
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.query.planMonth = params.planMonth;
      this.getCtMonthPlan();
      done();
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getCtMonthPlan();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getCtMonthPlan();
    },
    resetChange() {
      this.getCtMonthPlan();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
  height: 30px;
  line-height: 30px;
}
/deep/.el-input__icon {
  line-height: 30px;
}
/deep/.avue-crud__header {
  min-height: 0px;
}
.top {
  margin-left: 40px;
  margin-bottom: 10px;
}
</style>