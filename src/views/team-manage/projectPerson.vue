<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2024-02-19 11:39:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2024-02-20 14:50:17
-->
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
      </avue-crud>
    </basic-container>
  </template>
  
  <script>
  import {getTeamList} from '@/api/team'
  import { tableOption } from "@/const/team-manage/projectPerson.js";
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
        searchValue:{
          NameOrPhone:'',
          projectNameSearch:''
        },
      };
    },
    created(){
      this.getList(this.page,this.searchValue);
    },
    methods: {
      //初始化数据
      getList(page,params){
        getTeamList({
          current:page.currentPage,
          size:page.pageSize,
          total:page.total,
          NameOrPhone:params.NameOrPhone,
          projectName:params.projectNameSearch
        }).then(res=>{
          console.log(res)
          this.tableData = [...res.data.records]
          this.page.total = res.data.total
        })
      },
      //分页
      refreshChange() {
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