<template>
  <basic-container>
    <div class="xinxi1">
      <div class="status">
        项目名称：
        <span style="font-weight: 300"> {{ detailForm.projectName }}</span>
      </div>
      <div class="status">
        创建时间：
        <span style="font-weight: 300">{{ detailForm.createTime }}</span>
      </div>
    </div>
    <ZgbTitle titleName="计划内容"></ZgbTitle>
    <avue-crud :option="contentOption" :data="tableData"> </avue-crud>
    <ZgbTitle titleName="数据信息"></ZgbTitle>
    <div class="xinxi">
      <div class="status">
        当前状态：<span style="font-weight: 500">{{ detailForm.status }}</span>
      </div>
      <div class="result">
        <div style="font-weight: 600; width: 6%">审核记录：</div>
        <avue-crud
          :option="resultOption"
          @size-change="sizeChange"
          @current-change="currentChange"
          :page.sync="page"
          :data="resultData"
        ></avue-crud>
      </div>
    </div>
    <div class="bottom" v-if="type == 'aduit'">
      <el-button
        type="primary"
        style="margin-left: 20px"
        @click="dialogVisible1 = true"
        >通过</el-button
      >
      <el-button
        type="danger"
        style="margin-left: 20px"
        @click="dialogVisible = true"
        >退回</el-button
      >
    </div>
    <el-dialog
      v-if="dialogVisible1"
      title="通过"
      :visible.sync="dialogVisible1"
      width="35%"
    >
      <span>请核实确认信息无误！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" :loading="suLoading" @click="passFn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-if="dialogVisible"
      title="退回原因"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="returnform" :rules="rules" ref="forms">
        <el-form-item label="退回原因：" prop="name">
          <el-input
            v-model="returnform.name"
            autocomplete="off"
            type="textarea"
            :rows="3"
            style="width: 300px"
            placeholder="请输入退回原因"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="tuiLoading"
          @click="subfirmFn('forms')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import ZgbTitle from "../../components/ZgbTitle.vue";
import { selectHistory } from "@/api/project-manage/planList";
import { contentOption } from "@/const/project-plan/month-plan.js";
import { resultOption } from "@/const/project-manage/index.js";
import {
  getCtMonthPlanById,
  updateMonthPlanStatus,
} from "../../api/plan-project/plan-month";
export default {
  components: {
    ZgbTitle,
  },
  data() {
    return {
      contentOption,
      tableData: [],
      resultData: [],
      resultOption,
      dialogVisible1: false,
      dialogVisible: false,
      suLoading: false,
      tuiLoading: false,
      detailForm: {},
      returnform: {},
      rules: {
        name: [{ required: true, message: "请输入退回原因", trigger: "blur" }],
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      type: "",
    };
  },
  created() {
    this.getCtMonthPlanById();
    this.selectHistory();
  },
  methods: {
    subfirmFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { id } = this.$route.query;
          this.tuiLoading = true;
          updateMonthPlanStatus({
            status: "3",
            id,
            notes: this.returnform.name,
          })
            .then((res) => {
              if (res.code == "0") {
                this.$message({
                  message: "退回成功",
                  type: "success",
                });
                this.dialogVisible = false;
                this.tuiLoading = false;
                this.$router.push({
                  path: "/plan-manage/month-plan",
                });
              }
            })
            .catch(() => {
              this.tuiLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    passFn() {
      const { id } = this.$route.query;
      this.suLoading = true;
      updateMonthPlanStatus({
        status: "2",
        id,
      })
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              message: "处理成功",
              type: "success",
            });
            this.dialogVisible1 = false;
            this.suLoading = false;
            this.$router.push({
              path: "/plan-manage/month-plan",
            });
          }
        })
        .catch(() => {
          this.suLoading = false;
        });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.selectHistory();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.selectHistory();
    },
    getCtMonthPlanById() {
      const { id, type } = this.$route.query;
      this.type = type;
      getCtMonthPlanById({
        id,
      }).then((res) => {
        this.detailForm = res.data;
        this.tableData = res.data.ctMonthPlanDetailList;
        this.tableData.forEach((item) => {
          if (item.roleDivisionDetailWeek) {
            item.serverDate = item.roleDivisionDetailWeekName;
          } else if (item.roleDivisionDetailDay) {
            item.serverDate = item.roleDivisionDetailDay;
          } else if (item.roleDivisionDetailMonth) {
            item.serverDate = item.roleDivisionDetailMonth;
          } else if (item.roleDivisionType == "4") {
            item.serverDate = "全周期";
          }
        });
        let dicData = [
          {
            label: "待审核",
            value: "1",
          },
          {
            label: "审核通过",
            value: "2",
          },
          {
            label: "待修改",
            value: "3",
          },
        ];
        dicData.forEach((item) => {
          if (item.value == res.data.status) {
            this.detailForm.status = item.label;
          }
        });
      });
    },
    selectHistory() {
      const { id } = this.$route.query;
      selectHistory({
        id,
        size: this.page.pageSize,
        current: this.page.currentPage,
        type: "3",
      }).then((res) => {
        this.resultData = res.data.records;
        this.page.total = res.data.total;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.xinxi1 {
  width: 95%;
  margin: 0 auto;
  display: flex;
  .status {
    font-weight: 600;
    margin-bottom: 30px;
    width: 50%;
  }
}
/deep/.avue-crud__header {
  min-height: 0px;
}
.xinxi {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  .status {
    font-weight: 600;
    margin-bottom: 30px;
  }
  .result {
    display: flex;
  }
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