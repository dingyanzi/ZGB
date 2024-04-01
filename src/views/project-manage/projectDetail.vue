<template>
  <basic-container>
    <div class="title">
      {{ projectName }}
    </div>
    <div class="list">
      <div class="status">
        项目编号: <span>{{ detailForm.projectNo }}</span>
      </div>
      <div class="status">
        项目类别: <span>{{ projectTypeName }}</span>
      </div>
      <div class="status">
        项目实施所在地: <span>{{ detailForm.effectArea }}</span>
      </div>
    </div>
    <avue-tabs :option="option" @change="handleChange"></avue-tabs>
    <span v-if="type.prop === 'tab1'">
      <projectText :detailForm="detailForm"></projectText>
    </span>
    <span v-else-if="type.prop === 'tab2'">
      <projectPlan :detailForm="detailForm"></projectPlan>
    </span>
    <span v-else-if="type.prop === 'tab3'">
      <monthPlan></monthPlan>
    </span>
    <span v-else-if="type.prop === 'tab4'">
      <projectActive></projectActive>
    </span>
    <span v-else-if="type.prop === 'tab5'">
      <projectMember></projectMember>
    </span>
    <span v-else-if="type.prop === 'tab6'">
      <projectFile></projectFile>
    </span>
    <span v-else-if="type.prop === 'tab7'">
      <projectChange></projectChange>
    </span>
  </basic-container>
</template>

<script>
import projectText from "./detailComponent/projectText.vue";
import projectPlan from "./detailComponent/projectPlan.vue";
import monthPlan from "./detailComponent/monthPlan.vue";
import projectActive from "./detailComponent/projectActive.vue";
import projectMember from "./detailComponent/projectMember.vue";
import projectFile from "./detailComponent/projectFile.vue";
import projectChange from "./detailComponent/projectChange.vue";
import {
  getProjectPlanDetail,
  ctProject,
} from "../../api/project-manage/planList";

export default {
  components: {
    projectText,
    projectPlan,
    monthPlan,
    projectActive,
    projectMember,
    projectFile,
    projectChange,
  },
  data() {
    return {
      type: {},
      option: {
        column: [
          {
            label: "项目信息",
            prop: "tab1",
          },
          {
            label: "项目计划",
            prop: "tab2",
          },
          {
            label: "月度计划",
            prop: "tab3",
          },
          {
            label: "项目活动",
            prop: "tab4",
          },
          {
            label: "项目成员",
            prop: "tab5",
          },
          {
            label: "项目文件",
            prop: "tab6",
          },
          {
            label: "项目变更",
            prop: "tab7",
          },
        ],
      },
      projectName: "",
      detailForm: {},
      ctProjectList: [],
      projectTypeName: "",
    };
  },
  created() {
    this.type = this.option.column[0];
    this.getProjectPlanDetail();
  },
  methods: {
    // 获取项目管理详情信息
    getProjectPlanDetail() {
      const { id, projectName } = this.$route.query;
      this.projectName = projectName;
      getProjectPlanDetail({ id }).then((res) => {
        this.detailForm = res.data;
        this.ctProject();
      });
    },
    handleChange(column) {
      this.type = column;
    },
    ctProject() {
      ctProject().then((res) => {
        this.ctProjectList = res.data;
        this.ctProjectList.map((item) => {
          if (item.value == this.detailForm.projectType) {
            this.projectTypeName = item.label;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  margin-left: 8px;
  font-weight: 600;
  color: #666666;
}
.list {
  display: flex;
  margin-left: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  .status {
    width: 20%;
  }
}
</style>