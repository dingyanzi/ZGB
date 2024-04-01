<template>
  <div>
    <avue-crud
      :option="memberOption"
      :data="tableData"
      :table-loading="tableLoading"
      :page.sync="page"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </avue-crud>
  </div>
</template>

<script>
import { memberOption } from "@/const/activity-manage/activityPreview";
import { getExecutionTeam } from "../../../api/project-manage/planList";
export default {
  data() {
    return {
      memberOption,
      tableData: [],
      tableLoading: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
    };
  },
  created() {
    this.getExecutionTeam();
  },
  methods: {
    rowDetail() {},
    getExecutionTeam() {
      const { id } = this.$route.query;
      getExecutionTeam({
        projectId: id,
        size: this.page.pageSize,
        current: this.page.currentPage,
      }).then((res) => {
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getExecutionTeam();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getExecutionTeam();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
</style>