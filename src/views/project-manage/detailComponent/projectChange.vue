<template>
  <div>
    <avue-crud
      :option="changeOption"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page.sync="page"
      :data="changeData"
    ></avue-crud>
  </div>
</template>

<script>
import { getUpdatePlanProjectId } from "@/api/project-manage/planList";
import { changeOption } from "@/const/project-manage/index.js";
export default {
  data() {
    return {
      changeOption,
      changeData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
    };
  },
  created() {
    this.getUpdatePlanProjectId();
  },
  methods: {
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getUpdatePlanProjectId();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getUpdatePlanProjectId();
    },
    getUpdatePlanProjectId() {
      const { id } = this.$route.query;
      getUpdatePlanProjectId({
        id,
        size: this.page.pageSize,
        current: this.page.currentPage,
      }).then((res) => {
        this.changeData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getUpdatePlanProjectId();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getUpdatePlanProjectId();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
</style>