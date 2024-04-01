<template>
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :search.sync="searchValue"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @search-change="searchChange"
        @search-reset="resetList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="refreshChange"
      >
        <template #menu="{row}">
          <el-button
            type="text"
            size="medium"
            @click="rowDetail(row)"
            style="margin-left: 10px"
            >详情</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </template>
  
  <script>
  import {getFundsList} from '@/api/funds'
  import { tableOption } from "@/const/money-manage/projectFunds.js";
  export default {
    data() {
      return {
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        tableData: [ ],
        tableLoading: false,
        tableOption,
        searchValue:{
          projectNoOrName:'',
          undertakingUnit:''
        },
      };
    },
    created(){
      this.getList(this.page,this.searchValue);
    },
    methods: {
      //初始化数据
      getList(page,params){
        getFundsList({
          current:page.currentPage,
          size:page.pageSize,
          total:page.total,
          projectNoOrName:params.projectNoOrName,
          undertakingUnit:params.undertakingUnit,
          projectNo: params.projectNo
        }).then(res=>{
          console.log(res)
          this.tableData = [...res.data.records]
          this.page.total = res.data.total
        })
      },
      //详情按钮
      rowDetail(row) {
        console.log(row)
        this.$router.push({
          path: "/money-manage/projectFundsDetail",
          query: {id: row.projectId}
        });
      },
      //分页
      refreshChange() {
        console.log(this.searchValue)
        this.getList(this.page,this.searchValue)
      },
      sizeChange(val) {
        this.page.currentPage = 1
        this.page.pageSize = val
        console.log(this.page)
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
      resetList(){
        this.page.currentPage = 1
        this.refreshChange()
      },
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