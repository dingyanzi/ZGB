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
    <div class="execution">
        <basic-container>
            <avue-crud
                    ref="crud"
                    :page.sync="page"
                    :data="tableData"
                    :table-loading="tableLoading"
                    :option="tableOption"
                    @on-load="getList"
                    @search-change="searchChange"
                    @refresh-change="refreshChange"
                    @row-del="rowDel"
            >
                <template
                        slot="suspend"
                        slot-scope="scope">
              <span v-if="scope.row.suspend !== true">
                <el-tag type="success">激活</el-tag>&nbsp;&nbsp;
              </span>
                    <span v-else>
                         <el-tag type="warning">暂停</el-tag>&nbsp;&nbsp;
                    </span>
                </template>


                <template slot-scope="scope" slot="menuBtn">

                    <el-dropdown-item
                            v-if="permission.flow_ins_suspend && !scope.row.suspend"
                            divided
                            @click.native="handleStatus(scope.row,'suspend')"
                    >暂停
                    </el-dropdown-item>

                    <el-dropdown-item
                            v-if="permission.flow_ins_update && scope.row.suspend"
                            divided
                            @click.native="handleStatus(scope.row,'active')"
                    >激活
                    </el-dropdown-item>

                    <el-dropdown-item
                            v-if="permission.flow_ins_update"
                            divided
                            @click.native="handleDel(scope.row,'suspend')"
                    >删除
                    </el-dropdown-item>
                    <el-dropdown-item
                            v-if="permission.flow_ins_file"
                            divided
                            @click.native="handleXml(scope.row,scope.index)"
                    >XML
                    </el-dropdown-item>
                    <el-dropdown-item
                            v-if="permission.flow_ins_file"
                            divided
                            @click.native="handlePic(scope.row,scope.index)"
                    >流程图
                    </el-dropdown-item>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>

<script>
    import {delObj, fetchList, status} from '@/api/process'
    import {tableOption} from '@/const/crud/admin/process'
    import {mapGetters} from 'vuex'
    import { baseUrl } from '@/config/env';

    export default {
        name: 'Process',
        data() {
            return {
                searchForm: {},
                tableData: [],
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20 // 每页显示多少条
                },
                tableLoading: false,
                tableOption: tableOption
            }
        },
        created() {
        },
        mounted: function () {
        },
        computed: {
            ...mapGetters(['permission',"token"])
        },
        methods: {
            getList(page, params) {
                this.tableLoading = true
                fetchList(
                    Object.assign(
                        {
                            descs: 'create_time',
                            current: page.currentPage,
                            size: page.pageSize
                        },
                        params,
                        this.searchForm
                    )
                ).then(response => {
                    this.tableData = response.data.records
                    this.page.total = response.data.total
                    this.tableLoading = false
                })
            },
            handlePic(row) {
                window.open(`${baseUrl}/workflow/process/resourceRead?procDefId=${row.processonDefinitionId}&proInsId=${row.deploymentId}&resType=image&Authorization=${this.token}`)
            },
            handleXml(row) {
                window.open(`${baseUrl}/workflow/process/resourceRead?procDefId=${row.processonDefinitionId}&proInsId=${row.deploymentId}&resType=xml&Authorization=${this.token}`)
            },
            handleStatus(row, type) {
                var _this = this
                this.$confirm(
                    '是否确认操作ID为"' + row.processonDefinitionId + '"的流程?',
                    '警告',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(function () {
                    return status(row.processonDefinitionId, type)
                }).then(() => {
                    this.getList(this.page)
                    _this.$notify({
                        title: '成功',
                        message: '更新流程状态成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getList(this.page)
                })
            },
            handleDel(row, index) {
                this.$refs.crud.rowDel(row, index)
            },
            rowDel: function (row) {
                var _this = this
                this.$confirm(
                    '是否确认删除ID为"' + row.deploymentId + '"的模型?',
                    '警告',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(function () {
                    return delObj(row.deploymentId)
                }).then(() => {
                    this.getList(this.page)
                    _this.$notify({
                        title: '成功',
                        message: '删除数据成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getList(this.page)
                }).catch(function () {
                })
            },
            /**
             * 搜索回调
             */
            searchChange(form, done) {
                this.searchForm = form
                this.getList(this.page, form)
                done()
            },
            /**
             * 刷新回调
             */
            refreshChange() {
                this.getList(this.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>

