<template>
  <basic-container>
    <avue-crud ref="crud" :page.sync="page" :search.sync="searchValue" :data="tableData" :table-loading="tableLoading"
      :option="tableOption" @search-change="searchChange" @search-reset="resetList" @size-change="sizeChange"
      @current-change="currentChange" @refresh-change="refreshChange">
      <template slot="searchMenu" slot-scope="{ }">
        <el-button icon="el-icon-download" @click="rowExport">导出</el-button>
      </template>
      <template #menuLeft="{ }">
        <el-button type="primary" size="medium" @click="rowAdd" style="margin-right: 20px;"
          v-if="roleCodes.includes('CT_JGFZR')">新增</el-button>
        <!-- <el-button  size="medium" @click="rowExport">导出</el-button> -->
      </template>
      <template slot-scope="{ row, index }" slot="menu">
        <el-button type="text" size="medium" @click="rowDetail(row, index)" style="margin-left: 10px">详情</el-button>
        <el-button type="text" size="medium" @click="rowEdit(row, index)" style="margin-left: 10px"
          v-if="roleCodes.includes('CT_JGFZR')">编辑</el-button>
        <el-button type="text" size="medium" v-if="roleCodes.includes('CT_JGFZR') && row.status == '4'"
          @click="delEdit(row)" style="margin-left: 10px">删除</el-button>
        <!-- && row.status == '4' -->
        <!-- <el-button
            type="text"
            size="medium"
            @click="rowReturnEdit(row,index)"
            style="margin-left: 10px"
            v-if="row.status == '3' && (roleCodes.includes('CT_QJBR') || roleCodes.includes( 'CT_QSHR'))"
            >退回编辑</el-button> -->
        <!-- <el-button
            type="text"
            size="medium"
            @click="rowSh(row,index)"
            style="margin-left: 10px"
            v-if="row.status == '1' && roleCodes.includes('CT_QJBR') "
            >审核</el-button> -->
      </template>
    </avue-crud>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请确认退回给机构负责人编辑？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="thbjTrue">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
      <span style="font-size: 16px">请确认删除"{{ actName }}"？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" :loading="shanLoading" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>
  
<script>
import { mapGetters } from "vuex";
import { getActivityList, getActivity, returnUpdateActivity, exportActivity,delActivity } from '@/api/activity'
import { tableOption } from "@/const/activity-manage/projectActivity.js";
export default {
  data() {
    return {
      actId: '',
      dialogVisible: false,
      disabled: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableData: [],
      tableLoading: false,
      tableOption,
      searchValue: {
        endMonth: '',
        nameOrNoOrTeam: '',
        serverTitle: '',
        startMonth: ''
      },
      dialogVisible1:false,
      actName:'',
      actId:'',
      shanLoading:false
    };
  },
  created() {
    this.getList(this.page, this.searchValue);
  },
  methods: {
    getList(page, params) {
      getActivityList({
        current: page.currentPage,
        size: page.pageSize,
        total: page.total,
        nameOrNoOrTeam: params.nameOrNoOrTeam,
        serverTitle: params.serverTitleSearch,
        startMonth: params.startAndEndTime ? params.startAndEndTime[0] : params.startAndEndTime,
        endMonth: params.startAndEndTime ? params.startAndEndTime[1] : params.startAndEndTime,
        projectNo: params.projectNo,
      }).then(res => {
        // console.log(res)
        this.tableData = [...res.data.records]
        this.page.total = res.data.total
      })
    },
    //新增
    rowAdd() {
      this.$router.push({
        path: "/activity-manage/addActivity",
      });
    },
    //详情
    rowDetail(row, index) {
      // console.log("eow111", row)
      this.$router.push({
        path: "/activity-manage/viewActivity",
        query: { id: row.id }
      });
    },
    //编辑
    rowEdit(row, index) {
      this.$router.push({
        path: "/activity-manage/updateActivity",
        query: { id: row.id }
      });
    },
    //删除
    delEdit(row){
      this.dialogVisible1 = true;
      this.actName = row.serverTitle;
      this.actId = row.id;
    },
    //删除确认
    confirmFn(){
      this.shanLoading = true;
      delActivity({
        id: this.actId,
      })
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.dialogVisible1 = false;
            this.shanLoading = false;
            this.getList(this.page, this.searchValue);
          }
        })
        .catch(() => {
          this.shanLoading = false;
        });
    },
    //审核
    rowSh(row, index) {
      this.disabled = true
      this.$router.push({
        path: "/activity-manage/checkActivity",
        query: { id: row.id },
      });
    },
    //分页
    refreshChange() {
      //console.log(this.searchValue)
      this.getList(this.page, this.searchValue)
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      //console.log(this.page)
      this.refreshChange()
    },
    currentChange(val) {
      this.page.currentPage = val
      this.refreshChange()
    },
    searchChange(params, done) {
      done()
      this.page.currentPage = 1
      this.refreshChange()
    },
    resetList() {
      this.page.currentPage = 1
      this.refreshChange()
    },
    //退回编辑
    rowReturnEdit(row, index) {
      this.dialogVisible = true
      this.actId = row.id
    },
    //导出
    rowExport() {
      let arr = []
      this.tableData.forEach(item => {
        arr.push(item.id)
      })
      // console.log(arr)
      exportActivity(arr).then(res => {
        // console.log(res)
        if (res.code == '0') {
          window.open(res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //退回编辑确认
    thbjTrue() {
      getActivity(this.actId).then(res => {
        //.log(res)
        returnUpdateActivity(res.data).then(r => {
          //console.log(r)
          if (r.code == '0') {
            this.dialogVisible = false
            this.$message.success("退回编辑成功！")
            this.getList(this.page, this.searchValue);
          } else {
            this.$message.error(r.msg)
            this.dialogVisible = false
          }
        })
      })
    }
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