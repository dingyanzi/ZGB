<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOption"
        :data="list"
        :page="page"
        v-model="form"
        :table-loading="listLoading"
        :before-open="handleOpenBefore"
        @on-load="getList"
        @search-change="handleFilter"
        @refresh-change="handleRefreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-update="update"
        @row-save="create"
      >
        <template slot="menuLeft">
          <el-button
            v-if="roleManager_btn_add"
            class="filter-item"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
            >添加
          </el-button>
        </template>
        <template slot="dsScopeForm" slot-scope="scope">
          <div v-if="form.dsType == 1">
            <el-tree
              ref="scopeTree"
              :data="dsScopeData"
              :check-strictly="true"
              :props="defaultProps"
              :default-checked-keys="checkedDsScope"
              class="filter-tree"
              node-key="id"
              highlight-current
              show-checkbox
            />
          </div>
        </template>

        <template slot="menu" slot-scope="scope">
          <el-button
            v-if="roleManager_btn_edit"
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            v-if="roleManager_btn_del"
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row, scope.index)"
            >删除
          </el-button>
          <el-button
            v-if="roleManager_btn_perm"
            type="text"
            size="mini"
            icon="el-icon-plus"
            @click="handlePermission(scope.row, scope.index)"
            >权限
          </el-button>
        </template>
      </avue-crud>
    </basic-container>

    <el-dialog
      :visible.sync="dialogPermissionVisible"
      :close-on-click-modal="false"
      title="分配权限"
    >
      <div class="dialog-main-tree">
        <el-tree
          ref="menuTree"
          :data="treeData"
          :default-checked-keys="checkedKeys"
          :check-strictly="false"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          node-key="id"
          highlight-current
          show-checkbox
          default-expand-all
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="updatePermession(roleId)"
          >更 新
        </el-button>
        <el-button type="default" size="small" @click="cancal()"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchList,
  fetchRoleTree,
  permissionUpd,
  putObj,
} from "@/api/role";
import { tableOption } from "@/const/crud/admin/role";
import { fetchMenuTree } from "@/api/menu";
import { mapGetters } from "vuex";

export default {
  name: "TableRole",
  data() {
    return {
      searchForm: {},
      tableOption: tableOption,
      dsScopeData: [],
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      defaultProps: {
        label: "name",
        value: "id",
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      menuIds: "",
      list: [],
      listLoading: true,
      form: {},
      roleId: undefined,
      roleCode: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false,
      roleManager_btn_add: false,
      roleManager_btn_edit: false,
      roleManager_btn_del: false,
      roleManager_btn_perm: false,
    };
  },
  created() {
    this.roleManager_btn_add = this.permission["sys_role_add"];
    this.roleManager_btn_edit = this.permission["sys_role_edit"];
    this.roleManager_btn_del = this.permission["sys_role_del"];
    this.roleManager_btn_perm = this.permission["sys_role_perm"];
  },
  computed: {
    ...mapGetters(["elements", "permission"]),
  },
  methods: {
    getList(page, params) {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            orgId: this.$store.state.user.userInfo.orgId,
            appId: this.systemAppIds,
          },
          params,
          this.searchForm
        )
      )
        .then((response) => {
          this.list = response.data.records;
          this.page.total = response.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    handleRefreshChange() {
      this.getList(this.page);
    },
    handleFilter(form, done) {
      done();
      this.getList(this.page, form);
    },
    handleCreate() {
      this.$refs.crud.rowAdd();
    },
    handleOpenBefore(show) {
      show();
    },
    handleUpdate(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    cancal() {
      this.dialogPermissionVisible = false;
    },
    handlePermission(row) {
      fetchRoleTree(row.roleId, this.systemAppIds)
        .then((response) => {
          this.checkedKeys = response.data;
          return fetchMenuTree({
            roleIds: this.$store.getters.roles.join(),
            appId: this.systemAppIds,
          });
        })
        .then((response) => {
          this.treeData = response.data;
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(
            this.treeData,
            this.checkedKeys,
            []
          );
          this.dialogPermissionVisible = true;
          this.roleId = row.roleId;
          this.roleCode = row.roleCode;
        });
    },
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    resolveAllEunuchNodeId(json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i];
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp);
        } else {
          temp.push(idArr.filter((id) => id === item.id));
        }
      }
      return temp;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data, done) {
      done();
    },
    handleDelete(row) {
      this.$confirm(
        '是否确认删除名称为"' + row.roleName + '"' + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delObj(row.roleId);
        })
        .then(() => {
          this.getList(this.page);
          this.$notify.success("删除成功");
        });
    },
    create(row, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(",");
      }
      addObj(this.form)
        .then(() => {
          this.getList(this.page);
          done();
          this.$notify.success("创建成功");
        })
        .catch(() => {
          loading();
          done();
        });
    },
    update(row, index, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(",");
      }
      putObj(this.form)
        .then(() => {
          this.getList(this.page);
          done();
          this.$notify.success("修改成功");
        })
        .catch(() => {
          loading();
          done();
        });
    },
    updatePermession(roleId) {
      this.menuIds = "";
      this.menuIds = this.$refs.menuTree
        .getCheckedKeys()
        .join(",")
        .concat(",")
        .concat(this.$refs.menuTree.getHalfCheckedKeys().join(","));
      permissionUpd(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false;
        this.$store.dispatch("GetMenu");
        this.$store.dispatch("GetUserInfo");
        this.$notify.success("修改成功");
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getList();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  .el-dialog {
    width: 61% !important;
    .dialog-main-tree {
      max-height: 400px;
      overflow-y: auto;
    }
  }
  .el-form-item__label {
    width: 20% !important;
    padding-right: 20px;
  }
  .el-form-item__content {
    margin-left: 20% !important;
  }
}
</style>
