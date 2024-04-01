<template>
    <basic-container>
      <div style="margin-bottom: 15px; padding-left: 20px">
        <span style="color: #7f7f7f">项目名称：</span>
        <span>{{projectName}}</span>
      </div>
      <ZgbTitle titleName="项目预算"></ZgbTitle>
      <div class="budget">
        <div class="money">财政补助资金预算: <span style="font-weight: 400;padding-left: 1rem;">{{subsidySund || 0}}万元</span> </div>
        <div class="money">社会配套资金预算:  <span style="font-weight: 400;padding-left: 1rem;">{{sumMoneyPublic || 0}}万元</span> </div>
        <div class="money">项目总预算:  <span style="font-weight: 400;padding-left: 1rem;">{{price || 0}}万元</span> </div>
      </div>
      
      <ZgbTitle titleName="活动使用资金明细"></ZgbTitle>
      <div style="width: 95%; margin: 0 auto;">
        <div class="top2">
            <div class="right">
            <div style=" font-size: 15px">资金使用总计:</div>
            <span
                style="
                display: inline-block;
                width: 100px;
                margin-right: 10px;
                text-align: center;
                font-weight: 600;
                font-size: 15px;
                "
                >{{sum || 0}}</span>
                元
            </div>
        </div>
      </div>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="moneyOption"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="refreshChange"
      >
      </avue-crud>
    </basic-container>
  </template>
  
  <script>
   import {getFundsXxS,getFundsXxZ,getFundsXxX} from '@/api/funds'
   import ZgbTitle from "../../components/ZgbTitle.vue";
   import { moneyOption } from "@/const/money-manage/projectFunds.js";
  export default {
    components: {
        ZgbTitle
    },
    data() {
      return {
        moneyOption,
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        tableLoading: false,
        tableData: [],
        projectName:'',
        subsidySund:'',
        sumMoneyPublic:'',
        price:'',
        sum:'',
      };
    },
    created() {
      console.log(this.$route.query.id)
      this.getList(this.page,this.$route.query.id);
    },
    methods: {
      //初始化数据
      getList(page,id){
        getFundsXxS(this.$route.query.id).then(res=>{
          //console.log(res)
          this.projectName = res.data.projectName
          this.subsidySund = res.data.subsidySund
          this.sumMoneyPublic = parseFloat(res.data.expectReceiveFund)+parseFloat(res.data.donateFund)+parseFloat(res.data.ownFund),
          this.price = res.data.price
        })
        getFundsXxZ(this.$route.query.id).then(res=>{
          //console.log(res)
          this.sum = res.data
        })
        getFundsXxX({
          projectId : id,
          current:page.currentPage,
          size:page.pageSize,
          total:page.total,
        }).then(res=>{
          console.log(res)
          this.tableData = [...res.data.records]
          this.page.total = res.data.total
        })
      },
      //分页
      refreshChange() {
        this.getList(this.page,this.$route.query.id)
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
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /deep/.avue-crud__header {
    min-height: 0px;
  }
  /deep/.el-tabs__nav-scroll {
    background: #ecf6fa;
  }
  .budget{
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    margin: 2rem 5rem 2rem 0.6rem;
    .money{
        font-weight: 600;
        font-size: 16px;
    }
  }
  .top2 {
        width: 100%;
        height: 40px;
        margin-top: 14px;
        position: relative;
        .right {
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;
            margin-right: 30px;
        }
    }
  </style>