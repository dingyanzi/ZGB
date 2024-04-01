<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="filter-container">
        <el-button-group>
          <el-button
            v-if="menuManager_btn_add"
            type="primary"
            icon="plus"
            @click="handlerAdd"
          >
            {{ $t("add") }}
          </el-button>
          <el-button
            v-if="menuManager_btn_edit"
            type="primary"
            icon="edit"
            @click="handlerEdit"
            >{{ $t("edit") }}
          </el-button>
          <el-button
            v-if="menuManager_btn_del"
            type="primary"
            icon="delete"
            @click="handleDelete"
            >{{ $t("delete") }}
          </el-button>
        </el-button-group>
      </div>

      <el-row>
        <el-col :span="8" style="margin-top: 15px">
          <el-tree
            :data="treeData"
            :default-expanded-keys="aExpandedKeys"
            :filter-node-method="filterNode"
            :props="defaultProps"
            class="filter-tree"
            node-key="id"
            highlight-current
            @node-click="getNodeData"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
          />
        </el-col>
        <el-col :span="16" style="margin-top: 15px">
          <el-card class="box-card">
            <el-form
              ref="form"
              :label-position="labelPosition"
              :model="form"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item
                :label="$t('menuManager.parentNode')"
                prop="parentId"
              >
                <el-input
                  v-model="form.parentId"
                  :disabled="true"
                  :placeholder="$t('menuManager.parentNodeMsg')"
                />
              </el-form-item>
              <el-form-item
                v-if="form.menuId"
                :label="$t('menuManager.nodeId')"
                prop="menuId"
              >
                <el-input
                  v-model="form.menuId"
                  :disabled="formEdit || formStatus === 'update'"
                  type="number"
                  :placeholder="$t('menuManager.nodeIdMsg')"
                />
              </el-form-item>
              <el-form-item :label="$t('menuManager.menuName')" prop="name">
                <el-input
                  v-model="form.name"
                  :disabled="formEdit"
                  :placeholder="$t('menuManager.menuNameMsg')"
                />
              </el-form-item>
              <el-form-item :label="$t('menuManager.menuType')" prop="type">
                <el-radio v-model="form.type" :disabled="formEdit" label="0">
                  {{ $t("menuManager.typeMenu") }}
                </el-radio>
                <el-radio v-model="form.type" :disabled="formEdit" label="1">
                  {{ $t("menuManager.typeButton") }}
                </el-radio>
              </el-form-item>

              <el-form-item
                v-if="form.type === '1'"
                :label="$t('menuManager.menuPermission')"
                prop="permission"
              >
                <el-input
                  v-model="form.permission"
                  :disabled="formEdit"
                  :placeholder="$t('menuManager.menuPermissionMsg')"
                />
              </el-form-item>
              <el-form-item
                v-if="form.type === '0'"
                :label="$t('menuManager.menuUrl')"
                prop="path"
              >
                <el-input
                  v-model="form.path"
                  :disabled="formEdit"
                  placeholder="/xx/xxx || http://"
                />
              </el-form-item>
              <el-form-item
                v-if="form.type === '0'"
                :label="$t('menuManager.menuIcon')"
                prop="icon"
              >
                <avue-input-icon
                  v-model="form.icon"
                  :placeholder="$t('menuManager.menuIconMsg')"
                  :disabled="formEdit"
                  :icon-list="iconList"
                />
              </el-form-item>
              <el-form-item
                v-if="form.type === '0'"
                :label="$t('menuManager.menuSort')"
                prop="sort"
              >
                <el-input
                  v-model="form.sort"
                  :disabled="formEdit"
                  type="number"
                  :placeholder="$t('menuManager.menuSortMsg')"
                />
              </el-form-item>

              <el-form-item v-if="formStatus === 'update'">
                <el-button type="primary" @click="update"
                  >{{ $t("update") }}
                </el-button>
                <el-button @click="onCancel">{{ $t("cancelText") }}</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus === 'create'">
                <el-button type="primary" @click="create"
                  >{{ $t("save") }}
                </el-button>
                <el-button @click="onCancel">{{ $t("cancelText") }}</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { addObj, delObj, fetchMenuTree, getObj, putObj } from "@/api/menu";
import { mapGetters } from "vuex";
import iconList from "@/const/iconList";
export default {
  name: "Menu",
  filters: {
    typeFilter(type) {
      const typeMap = {
        0: "菜单",
        1: "按钮",
      };
      return typeMap[type];
    },
  },
  data() {
    return {
      iconList: iconList,
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: "",
      showElement: false,
      typeOptions: ["0", "1"],
      listQuery: {
        name: undefined,
      },
      treeData: [],
      oExpandedKey: {
        // key (from tree id) : expandedOrNot boolean
      },
      oTreeNodeChildren: {
        // id1 : [children] (from tree node id1)
        // id2 : [children] (from tree node id2)
      },
      aExpandedKeys: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      labelPosition: "right",
      form: {
        permission: undefined,
        name: undefined,
        menuId: undefined,
        parentId: undefined,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined,
      },
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false,
    };
  },
  computed: {
    ...mapGetters(["elements", "permission"]),
    rules() {
      var checkPath = (rule, value, callback) => {
        if (this.form.type === "1") {
          callback();
        } else if (this.validatenull(value)) {
          callback(new Error(this.$t("menuManager.menuUrlMsg")));
        } else {
          callback();
        }
      };
      return {
        menuId: [
          {
            required: true,
            message: this.$t("menuManager.nodeIdMsg"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("menuManager.menuNameMsg"),
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: this.$t("menuManager.menuTypeMsg"),
            trigger: "blur",
          },
        ],
        path: [{ validator: checkPath, trigger: "blur" }],
        sort: [
          {
            required: true,
            message: this.$t("menuManager.menuSortMsg"),
            trigger: "blur",
          },
        ],
        icon: [
          {
            required: true,
            message: this.$t("menuManager.menuIconMsg"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  created() {
    this.getList();
    this.menuManager_btn_add = this.permission["sys_menu_add"];
    this.menuManager_btn_edit = this.permission["sys_menu_edit"];
    this.menuManager_btn_del = this.permission["sys_menu_del"];
  },
  methods: {
    getList() {
      fetchMenuTree(
        Object.assign({}, this.listQuery, {
          roleIds: this.$store.getters.roles.join(),
          appId: this.systemAppIds,
        })
      ).then((response) => {
        // console.log(response);
        this.treeData = response.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    nodeExpand(data) {
      const aChildren = data.children;
      if (aChildren.length > 0) {
        this.oExpandedKey[data.id] = true;
        this.oTreeNodeChildren[data.id] = aChildren;
      }
      this.setExpandedKeys();
    },
    nodeCollapse(data) {
      this.oExpandedKey[data.id] = false;
      // 如果有子节点
      this.treeRecursion(this.oTreeNodeChildren[data.id], (oNode) => {
        this.oExpandedKey[oNode.id] = false;
      });
      this.setExpandedKeys();
    },
    setExpandedKeys() {
      const oTemp = this.oExpandedKey;
      this.aExpandedKeys = [];
      for (const sKey in oTemp) {
        if (oTemp[sKey]) {
          this.aExpandedKeys.push(parseInt(sKey));
        }
      }
    },
    treeRecursion(aChildren, fnCallback) {
      if (aChildren) {
        for (let i = 0; i < aChildren.length; ++i) {
          const oNode = aChildren[i];
          fnCallback && fnCallback(oNode);
          this.treeRecursion(oNode.children, fnCallback);
        }
      }
    },

    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = "update";
      }
      getObj(data.id).then((response) => {
        this.form = response.data;
      });
      this.currentId = data.id;
      this.showElement = true;
    },
    handlerEdit() {
      if (this.form.menuId) {
        this.formEdit = false;
        this.formStatus = "update";
      }
    },
    handlerAdd() {
      this.resetForm();
      this.formEdit = false;
      this.formStatus = "create";
    },
    handleDelete() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
        });
      });
    },
    update() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          putObj(this.form).then(() => {
            this.getList();
            this.formEdit = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    create() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addObj(
            Object.assign({}, this.form, { appId: this.systemAppIds })
          ).then(() => {
            this.getList();
            this.formEdit = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = "";
      this.$refs["form"].resetFields();
    },
    resetForm() {
      this.form = {
        permission: undefined,
        name: undefined,
        menuId: undefined,
        parentId: this.currentId,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined,
      };
    },
  },
};
</script>

