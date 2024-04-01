<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @search-change="searchChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="handleRefreshChange"
        @row-del="rowDel">
        <template
          slot-scope="scope"
          slot="menu">
          <el-button
            v-if="permission.sys_dict_add"
            type="text"
            size="mini"
            icon="el-icon-menu"
            @click="handleItem(scope.row,scope.index)">插件参数
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :table-loading="tableLoading"
      title="字典项管理"
      width="90%"
      @close="dialogFormVisible=false">
      <avue-crud
        ref="crudItem"
        :data="tableDictItemData"
        :permission="permissionList"
        v-model="form"
        :before-open="handleBeforeOpen"
        :option="tablePluginsItemOption"
        :table-loading="tableLoading"
        @row-update="handleItemUpdate"
        @row-save="handleItemSave"
        @row-del="rowItemDel"/>
    </el-dialog>
  </div>
</template>

<script>
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj } from '@/api/plugins'
import { tablePluginsItemOption, tableOption } from '@/const/crud/admin/plugins'
import { mapGetters } from 'vuex'

export default {
  name: 'Dict',
  data() {
    return {
      searchForm: {},
      form: {
        type: undefined,
        pluginsId: undefined
      },
      dictType: undefined,
      pluginsId: undefined,
      dialogFormVisible: false,
      tableData: [],
      tableDictItemData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      tablePluginsItemOption: tablePluginsItemOption
    }
  },
  created() {
  },
  mounted: function() {
  },
  computed: {
    ...mapGetters(['permission']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.sys_plugins_add, false),
        delBtn: this.vaildData(this.permission.sys_plugins_del, false),
        editBtn: this.vaildData(this.permission.sys_plugins_edit, false)
      }
    }
  },
  methods: {
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params, this.searchForm)).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false
      })
    },

    getDictItemList(pluginsId) {
      this.pluginsId = pluginsId
      this.dialogFormVisible = true
      this.tableLoading = true
      fetchItemList({ pluginsId: pluginsId }).then(response => {
        this.tableDictItemData = response.data
        this.tableLoading = false
      })
    },
    handleBeforeOpen(done) {
      this.form.pluginsId = this.pluginsId
      done()
    },
    rowDel: function(row) {
      var _this = this
      this.$confirm('是否确认删除数据类型为"' + row.pluginsName + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row)
      }).then(() => {
        this.getList(this.page)
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }).catch(function() {
      })
    },
    handleUpdate: function(row, index, done,loading) {
      putObj(row).then(() => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        done()
        this.getList(this.page)
      }).catch(e=>{
        setTimeout(()=>{
          loading()
        },1000)
        console.log(e)
      })
    },
    handleSave: function(row, done,loading) {
      addObj(row).then(() => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        this.getList(this.page)
        done()
      }).catch(e=>{
        setTimeout(()=>{
          loading()
        },1000)
        console.log(e)
      })
    },
    handleItemSave: function(row, done,loading) {
      addItemObj(row).then(() => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        this.getDictItemList(row.pluginsId)
        done()
      }).catch(e=>{
        setTimeout(()=>{
          loading()
        },1000)
        console.log(e)
      })
    },
    handleItemUpdate: function(row, index, done,loading) {
      putItemObj(row).then(() => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        this.getDictItemList(row.pluginsId)
        done()
      }).catch(e=>{
        setTimeout(()=>{
          loading()
        },1000)
        console.log(e)
      })
    },
    searchChange(form,done) {
      this.searchForm = form
      this.getList(this.page, form)
      done()
    },
    handleItem: function(row) {
      this.getDictItemList(row.id)
    },
    rowItemDel: function(row) {
      var _this = this
      this.$confirm('是否确认删除数据为"' + row.pluginsKey + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delItemObj(row.id)
      }).then(() => {
        this.getDictItemList(row.pluginsId)
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }).catch(function() {
      })
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getList()
    },
    currentChange(val) {
      this.page.currentPage = val
      this.getList()
    },
    handleRefreshChange() {
      this.getList(this.page)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>

