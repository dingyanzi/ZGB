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
      <template #menuLeft="{}">
        <el-button type="primary" size="medium" @click="rowAdd"  v-if="(roleCodes.includes('CT_QJBR') || roleCodes.includes( 'CT_QSHR'))">新增</el-button>
      </template>
        <template slot-scope="{ row, index }" slot="menu">
          <el-button
            type="text"
            size="medium"
            @click="rowDetail(row,index)"
            style="margin-left: 10px"
            >详情</el-button>
            <el-button
            type="text"
            size="medium"
            @click="rowEdit(row,index)"
            style="margin-left: 10px"
            >编辑</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </template>
  
  <script>
    import { mapGetters } from "vuex";
   import {getOrganizationList} from '@/api/organization'
  import { tableOption } from "@/const/organization-manage/projectOrganization.js";
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
        searchValue:{},
      };
    },
    created(){
      this.getList(this.page);
    },
    methods: {
      //初始化数据
      getList(page,params){
        getOrganizationList({
          current:page.currentPage,
          size:page.pageSize,
          total:page.total,
          undertakingUnit:params
        }).then(res=>{
          console.log(res)
          this.tableData = [...res.data.records]
          this.page.total = res.data.total
        })
      },
      //详情按钮
      rowDetail(row,index) {
        //console.log("123",row,index)
        this.$router.push({
          path:'/organization-manage/organizationDetail',
          query:{id: row.id}
        });
      },
      //新增按钮
      rowAdd(){
        this.$router.push({
          path: "/organization-manage/addOrganization",
        });
      },
      //编辑按钮
      rowEdit(row,index) {
        this.$router.push({
          path: "/organization-manage/updateOrganization",
          query:{id: row.id}
        });
      },
      //分页
      refreshChange() {
        this.getList(this.page,this.searchValue.serverTitleSearch)
      },
      sizeChange(val) {
        this.page.currentPage = 1
        this.page.pageSize = val
        console.log(this.page)
        this.refreshChange()
      },
      currentChange(val) {
        this.page.currentPage = val
        console.log(this.page)
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