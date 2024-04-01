<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      :search.sync="searchForm"
      @search-change="searchChange"
      @search-reset="resetChange"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <template #menu="{ row }">
        <el-button
          type="text"
          size="medium"
          @click="rowDetail(row)"
          style="margin-left: 10px"
          >详情</el-button
        >
        <el-button
          type="text"
          size="medium"
          v-if="handleShow(row)"
          @click="handleRow(row)"
          style="margin-left: 10px"
          >处理</el-button
        >
        <el-button
          type="text"
          size="medium"
          v-if="row.status == '3' && this.roleCodes.includes('CT_JGFZR')"
          @click="EditRow(row)"
          style="margin-left: 10px"
          >编辑</el-button
        >
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { tableOption } from "@/const/project-manage/index.js";
import { selectPlanUpdate } from "../../api/project-manage/planList";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableOption,
      tableLoading: false,
      searchForm: {}
    };
  },
  created() {
    this.selectPlanUpdate();
  },
  methods: {
    EditRow(_row) {
      this.$router.push({
        path: "/project-manage/planChange",
        query: {
          type: "edit",
          projectId: _row.projectId,
          id: _row.id,
          projectName: _row.projectName,
        },
      });
    },
    selectPlanUpdate() {
      this.tableLoading = true;
      selectPlanUpdate({
        size: this.page.pageSize,
        current: this.page.currentPage,
        ...this.searchForm,
        queryOrgan: this.userInfo.orgId,
        queryUserId: this.userInfo.userId,
      }).then((res) => {
        this.tableLoading = false;
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.selectPlanUpdate();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.selectPlanUpdate();
    },
    resetChange() {
      this.selectPlanUpdate();
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.selectPlanUpdate();
      done();
    },
    rowDetail(_row) {
      this.$router.push({
        path: "/project-manage/handlePlan",
        query: {
          type: "detail",
          id: _row.id,
          projectName: _row.projectName,
          projectId: _row.projectId,
        },
      });
    },
    handleRow(_row) {
      this.$router.push({
        path: "/project-manage/handlePlan",
        query: {
          type: "handle",
          id: _row.id,
          projectName: _row.projectName,
          status: _row.status,
          projectId: _row.projectId,
          projectNo: _row.projectNo,
        },
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "roleCodes"]),
    handleShow() {
      return (row) => {
        if (row) {
          if (
            (this.roleCodes.includes("CT_XQF") && row.status == "1") ||
            (this.roleCodes.includes("CT_QSHR") && row.status == "2")
          ) {
            return true;
          } else {
            return false;
          }
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
</style>