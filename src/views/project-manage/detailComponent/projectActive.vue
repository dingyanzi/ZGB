<template>
  <div>
    <avue-crud
      :option="projectOption"
      :page.sync="page"
      :data="tableData"
      :search.sync="query"
      :table-loading="tableLoading"
      @search-change="searchChange"
      @search-reset="resetChange"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <template #menu="{ row, size }">
        <el-button type="text" :size="size" @click="rowDetail(row)"
          >详情</el-button
        >
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { projectOption } from "@/const/activity-manage/activityPreview";
import { getActivityManager } from "../../../api/project-manage/planList";
export default {
  data() {
    return {
      projectOption,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableLoading: false,
      query: {
        cardNoAndUserName: this.time(),
      },
    };
  },
  created() {
    this.getActivityManager();
  },
  methods: {
    time() {
      let date = new Date();
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1);
      month = month.length === 2 ? month : 0 + month;
      return `${year}-${month}`;
    },
    rowDetail(_row) {
      this.$router.push({
        path: "/activity-manage/viewActivity",
        query: {
          id: _row.id,
        },
      });
    },
    getActivityManager() {
      const { id } = this.$route.query;
      getActivityManager({
        size: this.page.pageSize,
        current: this.page.currentPage,
        projectId: id,
        startMonth: this.query.cardNoAndUserName,
      }).then((res) => {
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.tableData.planMonth = params.planMonth;
      this.getActivityManager();
      done();
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getActivityManager();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getActivityManager();
    },
    resetChange() {
      this.getActivityManager();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
</style>