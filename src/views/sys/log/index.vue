<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud
              ref="crud"
              :option="tableOption"
              :data="list"
              :page="page"
              :table-loading="listLoading"
              @on-load="getList"
              @size-change="sizeChange"
              :cell-style="cellStyle"
              @current-change="currentChange"
              @search-change="handleFilter"
              @refresh-change="handleRefreshChange"
             >
        <template slot="menuLeft">
          <el-button
                  v-if="permission.sys_log_del"
                  class="filter-item"
                  type="primary"
                  size="mini"
                  icon="el-icon-del"
                  @click="deleteAll">清除日志
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>
<script>
  import {  fetchList,delObj } from '@/api/log'
  import { tableOption} from '@/const/crud/admin/log'
  import { mapGetters } from 'vuex'

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
        list:[],
      }
    },
    created() {
      this.sys_log_del = this.permission['sys_log_del']
    },
    computed: {
      ...mapGetters(['permission'])
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
      handleFilter(form,done) {
        done()
        this.getList(this.page, form)
      },
      handleUpdate(row, index) {
        this.$refs.crud.rowEdit(row, index)
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
      deleteAll() {
        var _this = this
        this.$confirm('是否确认清除所有日志', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
           return delObj()
        }).then(() => {
          _this.$message.success('删除成功')
          this.getList(this.page)
        }).catch(function () {

        })
      },
      cellStyle({row,columnIndex}){
        if(columnIndex===2){
          if(row.type==='0'){
            return {
              color:'green',
              fontWeight:'bold',
              fontSize:'20'
            }
          }else{
            return {
              color:'red',
              fontWeight:'bold',
              fontSize:'20'
            }
          }
        }
      }
    }
  }
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
