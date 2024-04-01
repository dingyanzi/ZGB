<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
  <div class="executio">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        @search-change="handleFilter"
        @on-load="getList"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-del="handleDelete"
      >
        <template slot="roleIdList" slot-scope="scope">
          <span v-for="(role, index) in scope.row.roleList" :key="index">
            <el-tag>{{ role.roleName }} </el-tag>&nbsp;&nbsp;
          </span>
        </template>
        <template slot="roleIdListForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.roleIdList"
            :dic="rolesOptions"
            :props="roleProps"
            multiple
            placeholder="请选择角色"
          />
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, putObj } from "@/api/user";
import { roleList } from "@/api/role";
import { tableOption } from "@/const/crud/admin/user";
import { mapGetters } from "vuex";

export default {
  name: "User",
  data() {
    return {
      role: [],
      roleProps: {
        label: "roleName",
        value: "roleId",
      },
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      rolesOptions: [],
    };
  },
  created() {
    // this.roles();
  },
  mounted: function () {},
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.sys_user_add, false),
        delBtn: this.vaildData(this.permission.sys_user_del, false),
        editBtn: this.vaildData(this.permission.sys_user_edit, false),
      };
    },
  },
  methods: {
    roles() {
      roleList().then((response) => {
        this.rolesOptions = response.data;
      });
    },
    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            appId: this.systemAppIds,
          },
          params
        )
      ).then((response) => {
        this.tableData = response.data.records;
        this.page.total = response.data.total;
        this.tableLoading = false;
      });
    },
    handleDelete: function (row) {
      var _this = this;
      this.$confirm("是否确认删除ID为" + row.userId, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.userId);
        })
        .then(() => {
          _this.$message.success("删除成功");
          this.refreshChange();
        })
        .catch(function () {});
    },
    handleUpdate: function (row, index, done, loading) {
      row.roleIds = row.roleIdList.join(",");
      row.roleList = null;
      putObj(row)
        .then(() => {
          this.$message.success("修改成功");
          this.refreshChange();
          done();
        })
        .catch((e) => {
          setTimeout(() => {
            loading();
          }, 1000);
          console.log(e);
        });
    },
    handleSave: function (row, done, loading) {
      row.roleIds = row.roleIdList.join(",");
      row.roleList = null;
      addObj(row)
        .then(() => {
          this.$message.success("添加成功");
          this.refreshChange();
          done();
        })
        .catch((e) => {
          setTimeout(() => {
            loading();
          }, 1000);
          console.log(e);
        });
    },
    refreshChange() {
      this.getList(this.page);
    },
    handleFilter(form, done) {
      done();
      this.getList(this.page, form);
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

<style lang="scss">
.avue-upload__icon,
.avue-upload__avatar {
  font-size: 20px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px !important;
  text-align: center;
}
</style>

