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
      <template #menuLeft="{}">
        <el-button
          class="but"
          v-if="roleCodes.includes('CT_JGFZR')"
          type="primary"
          size="medium"
          @click="rowAdd"
          >新增</el-button
        >
      </template>
      <template #menu="{ row }">
        <el-button type="text" @click="rowDetail(row)">详情</el-button>
        <el-button
          type="text"
          @click="rowAduit(row)"
          style="margin-left: 10px"
          v-if="aduitFn(row)"
          >审核</el-button
        >
        <el-button
          type="text"
          @click="rowEdit(row)"
          style="margin-left: 10px"
          v-if="row.status == '3' && roleCodes.includes('CT_JGFZR')"
          >编辑</el-button
        >
        <el-button type="text" @click="exitEdit(row)" v-if="exitFn(row)"
          >退回编辑</el-button
        >
        <el-button
          type="text"
          size="medium"
          v-if="roleCodes.includes('CT_JGFZR') && row.status == '3'"
          @click="delEdit(row)"
          style="margin-left: 10px"
          >删除</el-button
        >
      </template>
    </avue-crud>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请确认退回给机构负责人编辑？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
      <span style="font-size: 16px">请确认删除"{{ proName }}"？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" :loading="shanLoading" @click="confirmFn1"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import { selectMonthPlan, delMonthPlan } from "@/api/project-manage/planList";
import { returnMonthUpdate } from "@/api/project-manage/list";
import { tableOption } from "@/const/project-plan/month-plan.js";
export default {
  data() {
    return {
      tableOption,
      tableData: [],
      searchForm: {},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableLoading: false,
      dialogVisible: false,
      planId: "",
      proName: "",
      proId: "",
      dialogVisible1: false,
      shanLoading: false,
    };
  },
  created() {
    this.selectMonthPlan();
  },
  methods: {
    delEdit(_row) {
      this.dialogVisible1 = true;
      this.proName = _row.projectName;
      this.proId = _row.planId;
    },
    confirmFn1() {
      this.shanLoading = true;
      delMonthPlan({
        id: this.proId,
      })
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.dialogVisible1 = false;
            this.shanLoading = false;
            this.selectMonthPlan();
          }
        })
        .catch(() => {
          this.shanLoading = false;
        });
    },
    initParams() {
      let params = {}
      const { planMonth } = this.searchForm
      params = {
        ...this.searchForm,
        planMonth: (planMonth&&Array.isArray(planMonth))?planMonth.join('/'):null
      }
      return params
    },
    selectMonthPlan() {
      this.tableLoading = true;
      selectMonthPlan({
        size: this.page.pageSize,
        current: this.page.currentPage,
        ...this.initParams(),
        // projectNameOrNo: this.tableData.projectNameOrNo,
        // undertakingUnit: this.tableData.undertakingUnit,
        // projectNo: this.tableData.projectNo,
        // status: this.tableData.status,
        // planMonth: this.tableData.planMonth,
        queryOrgan: this.userInfo.orgId,
        queryUserId: this.userInfo.userId,
      }).then((res) => {
        this.tableLoading = false;
        this.tableData = res.data.records;
        this.tableData.forEach((item) => {
          item.month = item.planMonth;
        });
        this.page.total = res.data.total;
      });
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      // this.tableData.projectNameOrNo = params.projectNameOrNo;
      // this.tableData.undertakingUnit = params.undertakingUnit;
      // this.tableData.status = params.status;
      // if (params.planMonth) {
      //   this.tableData.planMonth =
      //     params.planMonth[0] + "/" + params.planMonth[1];
      // }
      // if(params.projectNo) {
      //   this.tableData.projectNo = params.projectNo
      // }
      this.selectMonthPlan();
      done();
    },
    rowDetail(_row) {
      this.$router.push({
        path: "/plan-manage/aduitPlan",
        query: {
          type: "detail",
          id: _row.planId,
          projectName: _row.projectName,
        },
      });
    },
    exitEdit(_row) {
      this.dialogVisible = true;
      this.planId = _row.planId;
    },
    rowAdd() {
      this.$router.push({
        path: "/plan-manage/addPlan",
        query: {
          type: "add",
        },
      });
    },
    rowEdit(_row) {
      this.$router.push({
        path: "/plan-manage/addPlan",
        query: {
          type: "edit",
          id: _row.planId,
        },
      });
    },
    rowAduit(_row) {
      this.$router.push({
        path: "/plan-manage/aduitPlan",
        query: {
          type: "aduit",
          id: _row.planId,
          projectName: _row.projectName,
        },
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.selectMonthPlan();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.selectMonthPlan();
    },
    resetChange() {
      this.selectMonthPlan();
    },
    confirmFn() {
      returnMonthUpdate({
        id: this.planId,
      }).then((res) => {
        if (res.code == "0") {
          this.$message({
            message: "退回编辑成功",
            type: "success",
          });
          this.dialogVisible = false;
          this.selectMonthPlan();
        }
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "roleCodes"]),
    aduitFn() {
      return (row) => {
        if (row) {
          if (row.supervisionDetail) {
            let arr = row.supervisionDetail.split("/");
            let lastString = arr[arr.length - 1];
            if (
              this.userInfo.orgId == lastString &&
              this.roleCodes.includes("CT_QJBR") &&
              row.status == "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      };
    },
    exitFn() {
      return (row) => {
        if (row) {
          if (row.supervisionDetail) {
            let arr = row.supervisionDetail.split("/");
            let lastString = arr[arr.length - 1];
            if (
              this.userInfo.orgId == lastString &&
              this.roleCodes.includes("CT_QJBR") &&
              row.status == "2"
            ) {
              return true;
            } else {
              return false;
            }
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
.but {
  padding: 8px 20px;
}
</style>