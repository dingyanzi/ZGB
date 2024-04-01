<template>
  <basic-container>
    <div style="margin-bottom: 50px">
      <div style="margin-bottom: 15px; padding-left: 20px">
        <span style="color: #7f7f7f">项目名称：</span>
        <span>{{ projectName }}</span>
      </div>
      <avue-tabs :option="option" @change="handleChange"></avue-tabs>
      <span v-if="type.prop === 'tab1'">
        <applyInfo @imgSrc="imgSrc" ref="applyInfo"></applyInfo>
      </span>
      <span v-else-if="type.prop === 'tab2'">
        <processRecords></processRecords>
      </span>
    </div>
    <div class="bottom">
      <el-button
        type="primary"
        :loading="subLoad"
        style="margin-left: 20px"
        @click="submitFn"
        >提交</el-button
      >
    </div>
  </basic-container>
</template>

<script>
import applyInfo from "./component/applyInfo.vue";
import processRecords from "./component/processRecords.vue";
import { addUpdateInfo, updateUpdateInfo } from "../../api/project-manage/list";
export default {
  components: {
    applyInfo,
    processRecords,
  },
  data() {
    return {
      type: {},
      option: {
        column: [
          {
            label: "申请信息",
            prop: "tab1",
          },
          {
            label: "流程记录",
            prop: "tab2",
          },
        ],
      },
      projectName: "",
      head: "",
      subLoad: false,
    };
  },
  created() {
    this.type = this.option.column[0];
    this.projectName = this.$route.query.projectName;
  },
  methods: {
    handleChange(column) {
      this.type = column;
    },
    imgSrc(data) {
      this.head = data;
    },
    // 对表单的校验
    formRulesValidate(fName, sName) {
      return new Promise((resolve) => {
        this.$refs[fName].$refs[sName].validate((valid, done) => {
          if (valid) {
            resolve(valid);
            done();
          }
        });
      });
    },
    // 提交的时候方法(要先判断是否先签字再提交)
    submitFn() {
      let formRulesRes1 = this.formRulesValidate("applyInfo", "plan");
      let formRulesRes2 = this.formRulesValidate("applyInfo", "refuse");
      Promise.all([formRulesRes1, formRulesRes2]).then(() => {
        if (this.head) {
          let planForm = this.$refs.applyInfo._data.planForm;
          let refuseForm = this.$refs.applyInfo._data.refuseForm;
          let projectId = this.$route.query.projectId;
          let params = {
            ...planForm,
            ...refuseForm,
            projectId,
            headSign: this.head,
          };
          const { type } = this.$route.query;
          // 新增时候方法
          if (type == "add") {
            this.subLoad = true;
            addUpdateInfo(params).then((res) => {
              if (res.code == "0") {
                this.$message({
                  message: "提交成功",
                  type: "success",
                });
                this.subLoad = false;
                this.$router.push({
                  path: "/project-manage/projectList",
                });
              }
            });
          } else if (type == "edit") {
            // 编辑时候方法
            this.subLoad = true;
            updateUpdateInfo(params).then((res) => {
              if (res.code == "0") {
                this.$message({
                  message: "提交成功",
                  type: "success",
                });
                this.subLoad = false;
                this.$router.push({
                  path: "/project-manage/planList",
                });
              }
            });
          }
        } else {
          this.$message({
            message: "请先签字再提交!",
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-tabs__nav-scroll {
  background: #ecf6fa;
}
.bottom {
  background: pink;
  width: 89%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 99;
  text-align: center;
  .el-button {
    padding: 9px 20px;
  }
}
</style>