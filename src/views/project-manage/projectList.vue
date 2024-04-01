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
          type="primary"
          size="medium"
          v-if="roleCodes.includes('CT_JGFZR')"
          @click="rowAdd"
          >新增</el-button
        >
      </template>
      <template #menu="{ row }">
        <el-button
          type="text"
          size="medium"
          @click="rowDetail(row)"
          style="margin-left: 10px"
          >详情</el-button
        >
        <el-popover placement="bottom" trigger="click" width="auto">
          <div>
            <el-button
              v-if="
                roleCodes.includes('CT_JGFZR') ||
                row.createUser == userInfo.userId ||
                row.currentStatus == '2'
              "
              plain
              type="warning"
              size="mini"
              @click="changePlan(row)"
              >计划变更</el-button
            >
            <el-button plain type="primary" size="mini" @click="upload(row)"
              >材料上传</el-button
            >
            <el-button
              plain
              v-if="row.managerStatus != '2'"
              type="success"
              size="mini"
              @click="result(row)"
              >项目结项</el-button
            >
          </div>
          <!-- @click="rowMore" -->
          <el-button
            style="margin-left: 10px"
            type="text"
            slot="reference"
            size="medium"
            >更多 <i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
        </el-popover>
      </template>
    </avue-crud>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
      <span style="font-size: 16px; font-weight: bold"
        >请确认项目是否结项，结项后，机构不可再编辑操作本项目相关信息</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOption } from "@/const/project-manage/projectList.js";
import { selectProject } from "../../api/project-manage/list";
import { planClosure } from "../../api/project-manage/planList";
export default {
  data() {
    return {
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableData: [],
      tableLoading: false,
      tableOption,
      dialogVisible: false,
      projectId: "",
      searchForm: {}
    };
  },
  created() {
    this.selectProject();
  },
  methods: {
    result(_row) {
      this.projectId = _row.projectId;
      this.dialogVisible = true;
    },
    initParams() {
      let params = {}
      const {
        projectType,
        managerStatus,
        time
      } = this.searchForm
      params = {
        ...this.searchForm,
        projectType: projectType? projectType.join():'',
        managerStatus: managerStatus?managerStatus.join(): '',
        time: (time&&Array.isArray(time))?time.join('/'):''
      }
      return params
    },
    // 项目管理的分页接口查询
    selectProject() {
      this.tableLoading = true;
      selectProject({
        queryType: "2",
        size: this.page.pageSize,
        current: this.page.currentPage,
        ...this.initParams(),
        queryOrgan: this.userInfo.orgId,
        queryUserId: this.userInfo.userId,
      }).then((res) => {
        this.tableLoading = false;
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    // 新增项目跳转
    rowAdd() {
      this.$router.push({
        path: "/project-manage/newProject",
        query: {
          type: "add",
        },
      });
    },
    // 项目详情跳转
    rowDetail(_row) {
      this.$router.push({
        path: "/project-manage/projectDetail",
        query: {
          type: "detail",
          id: _row.projectId,
          projectName: _row.projectName,
        },
      });
    },
    // rowMore() {},
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
    // 计划变更跳转
    changePlan(_row) {
      this.$router.push({
        path: "/project-manage/planChange",
        query: {
          type: "add",
          projectId: _row.projectId,
          projectName: _row.projectName,
        },
      });
    },
    // 材料上传跳转
    upload(_row) {
      this.$router.push({
        path: "/project-manage/uploadMaterials",
        query: {
          projectId: _row.projectId,
          projectName: _row.projectName,
          projectNo: _row.projectNo,
        },
      });
    },
    // 根据条件查询
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.selectProject();
      done();
    },
    // 确定项目结项的接口
    confirmFn() {
      planClosure({
        id: this.projectId,
      }).then((res) => {
        if (res.code == "0") {
          this.dialogVisible = false;
          this.selectProject();
        }
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "roleCodes"]),
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
/deep/.el-popover {
  margin-top: 0px !important;
  padding: 6px !important;
}
</style>