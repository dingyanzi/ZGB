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
          @click="auditRow(row)"
          style="margin-left: 10px"
          v-if="auditFn(row)"
          >审核</el-button
        >
        <el-button
          type="text"
          size="medium"
          @click="EditRow(row)"
          v-if="
            (roleCodes.includes('CT_JGFZR') && row.planStatus == '3') ||
            (roleCodes.includes('CT_JGFZR') && row.planStatus == '4')
          "
          style="margin-left: 10px"
          >编辑</el-button
        >
        <el-button
          type="text"
          size="medium"
          v-if="row.planStatus == '2'"
          @click="handleRow(row)"
          style="margin-left: 10px"
          >导出</el-button
        >

        <el-button
          type="text"
          size="medium"
          @click="exitEdit(row)"
          style="margin-left: 10px"
          v-if="exitFn(row)"
          >退回编辑</el-button
        >
        <el-button
          type="text"
          size="medium"
          v-if="
            roleCodes.includes('CT_JGFZR') &&
            (row.planStatus == '3' || row.planStatus == '4')
          "
          @click="delEdit(row)"
          style="margin-left: 10px"
          >删除</el-button
        >
      </template>
    </avue-crud>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="font-size: 16px">请确认退回给机构负责人编辑？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="editLoading" @click="confirmFn"
          >确 定</el-button
        >
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
import {
  selectProject,
  selectFile,
  retuanUpdate,
  delProjectPlan,
} from "../../api/project-manage/list";
import { mapGetters } from "vuex";
import { tableOption } from "@/const/project-plan/index.js";
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
      tableOption,
      tableLoading: false,
      dialogVisible: false,
      dialogVisible1: false,
      editLoading: false,
      shanLoading: false,
      projectId: "",
      proName: "",
      proId: "",
    };
  },
  created() {
    this.selectProject();
  },
  methods: {
    // 项目计划管理的分页管理
    selectProject() {
      this.tableLoading = true;
      selectProject({
        queryType: "1",
        size: this.page.pageSize,
        current: this.page.currentPage,
        ...this.searchForm,
        undertakingUnit: this.searchForm.undertakingUnitId,
        // projectNameOrNo: this.tableData.projectNameOrNo,
        // undertakingUnit: this.tableData.undertakingUnitId,
        // status: this.tableData.status,
        // projectNo: this.tableData.projectNo,
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
      this.selectProject();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.selectProject();
    },
    resetChange() {
      this.selectProject();
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      // this.tableData.projectNameOrNo = params.projectNameOrNo;
      // this.tableData.undertakingUnitId = params.undertakingUnitId;
      // this.tableData.status = params.status;
      // if(params.projectNo) {
      //   this.tableData.projectNo = params.projectNo
      // }
      this.selectProject();
      done();
    },
    rowDetail(_row) {
      this.$router.push({
        path: "/project-manage/newProject",
        query: {
          type: "detail",
          id: _row.projectId,
          projectName: _row.projectName,
          createTime: _row.createTime,
          createUserName: _row.createUserName,
          undertakingUnitId: _row.undertakingUnitId,
        },
      });
    },
    // 编辑事件
    EditRow(_row) {
      this.$router.push({
        path: "/project-manage/newProject",
        query: {
          type: "edit",
          id: _row.projectId,
          projectName: _row.projectName,
        },
      });
    },
    // 审核事件
    auditRow(_row) {
      this.$router.push({
        path: "/project-manage/newProject",
        query: {
          type: "audit",
          id: _row.projectId,
          projectName: _row.projectName,
          createTime: _row.createTime,
          createUserName: _row.createUserName,
          undertakingUnitId: _row.undertakingUnitId,
        },
      });
    },
    // 导出事件
    handleRow(_row) {
      selectFile({
        confId: this.$aesEncrypt(11),
        dictId: this.$aesEncrypt(60010212),
        cusId: this.$aesEncrypt(_row.projectId),
      }).then((res) => {
        window.open(res.data.fileUrl);
      });
    },
    // 退回编辑事件
    exitEdit(_row) {
      this.dialogVisible = true;
      this.projectId = _row.projectId;
    },
    // 删除事件
    delEdit(_row) {
      this.dialogVisible1 = true;
      this.proName = _row.projectName;
      this.proId = _row.projectId;
    },
    // 退回编辑的事件
    confirmFn() {
      this.editLoading = true;
      retuanUpdate({
        id: this.projectId,
      })
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              message: "退回编辑成功",
              type: "success",
            });
            this.dialogVisible = false;
            this.editLoading = false;
            this.selectProject();
          }
        })
        .catch(() => {
          this.editLoading = false;
        });
    },
    confirmFn1() {
      this.shanLoading = true;
      delProjectPlan({
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
            this.selectProject();
          }
        })
        .catch(() => {
          this.shanLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "roleCodes"]),
    auditFn() {
      return (row) => {
        if (row) {
          if (row.supervisionDetail) {
            let arr = row.supervisionDetail.split("/");
            let lastString = arr[arr.length - 1];
            if (
              this.userInfo.orgId == lastString &&
              this.roleCodes.includes("CT_QJBR") &&
              row.planStatus == "1"
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
              row.planStatus == "2"
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
</style>