<template>
  <div style="margin-bottom: 60px">
    <ZgbTitle titleName="申请变更的描述"></ZgbTitle>
    <avue-form :option="planOption" v-model="planForm"></avue-form>
    <ZgbTitle titleName="影响分析"></ZgbTitle>
    <avue-form :option="refuseOption" v-model="refuseForm"></avue-form>
    <ZgbTitle titleName="历史变更记录"></ZgbTitle>
    <avue-crud
      :option="changeOption"
      :data="changeData"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page.sync="page"
    ></avue-crud>
  </div>
</template>

<script>
import ZgbTitle from "../../../components/ZgbTitle.vue";
import {
  planOption,
  refuseOption,
  changeOption,
} from "@/const/project-manage/index.js";
import {
  getUpdatePlan,
  getUpdatePlanProjectId,
} from "@/api/project-manage/planList";
export default {
  components: {
    ZgbTitle,
  },
  data() {
    return {
      planOption,
      refuseOption,
      changeOption,
      planForm: {},
      refuseForm: {},
      changeData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
    };
  },
  created() {
    this.getUpdatePlan();
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
      const { projectId } = this.$route.query;
      getUpdatePlanProjectId({
        id: projectId,
        size: this.page.pageSize,
        current: this.page.currentPage,
      }).then((res) => {
        this.changeData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    selectHistory() {
      const { id } = this.$route.query;
      selectHistory({
        id,
        size: this.page.pageSize,
        current: this.page.currentPage,
        type: "4",
      }).then((res) => {
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    getUpdatePlan() {
      const { type, id, projectName } = this.$route.query;
      this.handleType = type;
      this.projectName = projectName;
      getUpdatePlan({
        id,
      }).then((res) => {
        this.planForm.changeContant = res.data.changeContant;
        this.planForm.changeNotesBefore = res.data.changeNotesBefore;
        this.planForm.changeNotes = res.data.changeNotes;
        this.planForm.status = res.data.status;
        this.refuseForm.progressEffect = res.data.progressEffect;
        this.refuseForm.costEffect = res.data.costEffect;
        this.refuseForm.resourceEffect = res.data.resourceEffect;
        this.refuseForm.otherEffort = res.data.otherEffort;
        this.$emit("plan", this.planForm);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.qian {
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hang1 {
    margin-top: 20px;
    font-weight: bold;
  }
  .tu {
    width: 150px;
    height: 150px;
    margin-top: 20px;
    margin-right: 10px;
    background: skyblue;
  }
  .hang2 {
    // font-size: 14px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 15px;
  }
}
/deep/.el-textarea.is-disabled .el-textarea__inner {
  color: #333;
}
</style>