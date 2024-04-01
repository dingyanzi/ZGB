<template>
    <div class="app-container calendar-list-container">
        <basic-container>
            <avue-crud
                    ref="crud"
                    :option="tableOption"
                    :data="list"
                    :page.sync="page"
                    :table-loading="listLoading"
                    @on-load="getList"
                    @size-change="sizeChange"
                    :permission="permissionList"
                    @current-change="currentChange"
                    @search-change="handleFilter"
                    @refresh-change="handleRefreshChange"
                    @row-save="handleSave"
            >
                <template slot-scope="scope" slot="menu">
                    <el-button v-if="permission['flow_model_del']" type="text"
                               icon="el-icon-delete"
                               size="small"
                               @click.stop="rowDel(scope.row)">删除
                    </el-button>
                    <el-button v-if="permission['flow_model_config']" type="text"
                               icon="el-icon-edit"
                               size="small"
                               @click.stop="handleEdit(scope.row)">模型
                    </el-button>
                    <el-button v-if="permission['flow_model_deploy']" type="text"
                               icon="el-icon-edit"
                               size="small"
                               @click.stop="deploy(scope.row)">发布
                    </el-button>
                </template>
            </avue-crud>
        </basic-container>
    </div>
</template>
<script>
    import {fetchList, delObj, addObj, deploy} from '@/api/models'
    import {tableOption} from '@/const/crud/admin/models'
    import {mapGetters} from 'vuex'
    import { baseUrl } from '@/config/env';

    export default {
        name: 'TableRole',
        data() {
            return {
                searchForm: {},
                tableOption: tableOption,
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 10 // 每页显示多少条
                },
                listLoading: true,
                list: [],
                dialogflag: false,
                formOptions: {},
                editId: ''
            }
        },
        created() {
        },
        computed: {
            ...mapGetters(['permission']),
            permissionList() {
                return {
                    addBtn: this.vaildData(this.permission.flow_model_add, false),
                }
            }
        },
        methods: {
            getList(page, params) {
                this.listLoading = true
                fetchList(Object.assign({
                    current: page.currentPage,
                    size: page.pageSize
                }, params, this.searchForm)).then(response => {
                    this.list = response.data.records
                    this.page.total = response.data.total
                    this.listLoading = false
                }).catch(() => {
                    this.listLoading = false
                })
            },
            handleRefreshChange() {
                this.getList(this.page)
            },
            handleFilter(form, done) {
                done()
                this.getList(this.page, form)
            },
            handleUpdate(row, index) {
                this.$refs.crud.rowEdit(row, index)
            },
            rowDel: function (row) {
                var _this = this
                this.$confirm('是否确认删除流程模型型为"' + row.name + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    return delObj(row.id)
                }).then(() => {
                    this.getList(this.page)
                    _this.$notify({
                        title: '成功',
                        message: '删除数据成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(function () {
                })
            },
            sizeChange(val) {
                this.page.currentPage = 1
                this.page.pageSize = val
                this.getList(this.page)
            },
            currentChange(val) {
                this.page.currentPage = val
                this.getList(this.page)
            },
            handleSave: function (row, done, loading) {
                addObj(row).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '添加数据成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getList(this.page)
                    done()
                }).catch(e => {
                    setTimeout(() => {
                        loading()
                    }, 1000)
                    console.log(e)
                })
            },
            handleEdit(row) {
                window.open(`${baseUrl}/workflow/modeler.html?modelId=${row.id}`);
            },
            deploy(row) {
                var _this = this
                this.$confirm('是否确认发布流程模型型为"' + row.name + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    return deploy(row.id)
                }).then(() => {
                    this.getList(this.page)
                    _this.$notify({
                        title: '成功',
                        message: '发布流程成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(function () {

                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
<style>
    .form-design .el-dialog__header {
        display: none;
    }

    .form-design .el-dialog__body {
        padding: 0;
    }
</style>
