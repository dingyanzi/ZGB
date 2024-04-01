<template>
  <basic-container>
    <ZgbTitle titleName="项目详细信息"></ZgbTitle>
    <tableDetail
      :tableform="tableform"
      :ctTargets="ctTargets"
      :disabled="disabled"
    ></tableDetail>
    <ZgbTitle titleName="项目固定服务对象"></ZgbTitle>
    <avue-form :option="regularOption" v-model="form2"></avue-form>
    <regular :form1="form1" :disabled="disabled"></regular>
  </basic-container>
</template>

<script>
import { regularOption } from "@/const/project-manage/projectList.js";
import ZgbTitle from "../../../components/ZgbTitle.vue";
import tableDetail from "../component/tableDetail.vue";
import regular from "../component/regular.vue";
export default {
  props: {
    detailForm: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ZgbTitle,
    tableDetail,
    regular,
  },
  data() {
    return {
      regularOption,
      tableform: {},
      form1: [],
      form2: {},
      ctTargets: [],
      value: "",
      regularData: [],
      disabled: false,
      show: true,
      auditShow: false,
    };
  },
  created() {
    this.refreFn();
  },
  methods: {
    refreFn() {
      const { type } = this.$route.query;
      if (type == "detail") {
        this.disabled = true;
        this.regularOption.disabled = true;
      }
      if (type == "audit") {
        this.disabled = true;
        this.auditShow = true;
        this.show = false;
        this.regularOption.disabled = true;
      } else {
        this.auditShow = false;
        this.show = true;
      }
    },
  },
  watch: {
    detailForm: {
      handler(val) {
        this.tableform.overview = val.overview;
        this.tableform.characteristic = val.characteristic;
        this.tableform.analysis = val.analysis;
        this.tableform.plan = val.plan;
        this.tableform.riskEstimation = val.riskEstimation;
        this.tableform.projectTarget = val.projectTarget;
        this.ctTargets = val.ctProjectTargets;
        this.form1 = val.ctFixedServerObjects;
        this.form2 = val;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-input.is-disabled .el-input__inner {
  color: #333;
}
/deep/.el-range-editor.is-disabled input {
  color: #333;
}
/deep/.el-radio__input.is-disabled + span.el-radio__label {
  color: #333;
}
/deep/.el-textarea.is-disabled .el-textarea__inner {
  color: #333;
}
/deep/.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #333;
}
</style>