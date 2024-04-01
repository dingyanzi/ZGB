<template>
    <basic-container>
      <!-- <avue-form ref="form" v-model="form" :option="serverOption1"> </avue-form> -->
      <div style="margin-left: 3rem;margin-bottom: 1rem; display: flex;">
        <div style="font-weight: 600;">项目名称：</div>
        <div>{{ projectName }}</div>
      </div>
      <ZgbTitle titleName="活动/服务基础信息"></ZgbTitle>
      <avue-form ref="form1" v-model="form" :option="infoOption1"> </avue-form>
      <ZgbTitle titleName="活动/服务目标"></ZgbTitle>
      <avue-form ref="form2" v-model="form" :option="targetOption1"></avue-form>
      <ZgbTitle titleName="活动/服务实施情况"></ZgbTitle>
      <avue-form ref="form3" v-model="form" :option="situationOption1"></avue-form>
      <ZgbTitle titleName="活动/服务反思与自我评估"></ZgbTitle>
      <avue-form ref="form4" v-model="form" :option="assessOption1"></avue-form>
      <ZgbTitle titleName="活动/服务资金使用"></ZgbTitle>
      <useDetail ref="form5" :listdata="listdata" :money="money"></useDetail>
      <ZgbTitle titleName="附件材料"></ZgbTitle>
      <uploadfileView ref="form6" :listdatas="listdatas"></uploadfileView>
      <ZgbTitle titleName="数据信息"></ZgbTitle>
      <div style="display: flex;margin-top: 15px; padding-left: 20px">
        <div style="font-weight: 600;">当前状态：</div>
        <div>{{label}}</div>
      </div>
      <div style="display: flex;align-items:center; margin-bottom: 15px; padding-left: 20px">
        <div style="font-weight: 600;">审核记录：</div>
        <div style="width: 80%;">
          <avue-crud 
            ref="form7" 
            v-model="form" 
            :option="sjOption1"
            :page.sync="page"
            :data="tableData"
            :table-loading="tableLoading"
            @size-change="sizeChange"
            @current-change="currentChange"
            @refresh-change="refreshChange"></avue-crud>
          </div>
        </div>
        
      <div class="bottom">
        <el-button  type="primary" @click="tg" style="margin-left: 20px"
        >通过</el-button>
      <el-button  type="danger" style="margin-left: 20px" @click="tc"
        >退回</el-button>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>请核实确认信息无误！</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="tgTrue">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="退回"
        :visible.sync="dialogVisibleReturn"
        width="30%"
        :closeOnClickModal = "false" 
        :closeOnPressEscape = "false"
        :showClose = "false">
        <div style="display: flex; align-items: center;">
          <div style="color: red;">*</div>
          <div style="width: 100px; font-size: 16px;"> 退回原因 :</div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入原因描述"
            v-model="textarea">
          </el-input>
        </div>
       
        <span slot="footer" class="dialog-footer">
          <el-button @click="tcReturn">取 消</el-button>
          <el-button type="primary" @click="tcTrue">确 定</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </template>
  
  <script>
  import {getActivity,checkActivity,ctApplyDetailList,dictQuery } from '@/api/activity'
  import { serverOption1, infoOption1, targetOption1, situationOption1, assessOption1,sjOption1} from "@/const/activity-manage/projectActivity.js";
  import ZgbTitle from "../../components/ZgbTitle.vue";
  import useDetail from "./component/useDetail.vue";
  import uploadfileView from './component/uploadfileView.vue';
  export default {
    components: {
      ZgbTitle,
      useDetail,
      uploadfileView
    },
    data() {
      return {
        dialogVisible:false,
        dialogVisibleReturn:false,
        serverOption1,
        infoOption1,
        targetOption1,
        situationOption1,
        assessOption1,
        sjOption1,
        tableData: [],
        tableLoading: false,
        form: {},
        form1: {},
        listdata:[],
        listdatas:{},
        money:'',
        disabled:false,
        textarea:'',
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        label:'',
        projectName:'',
      };
    },
    created(){
      this.getList()
      this.getSjxx(this.page)
      this.disabled = this.$route.query.disabled
      //console.log(this.disabled)
    },
    methods: {
      //初始化数据
      getSjxx(page){
        ctApplyDetailList({
          current:page.currentPage,
          size:page.pageSize,
          total:page.total,
          planId:this.$route.query.id
        }).then(res=>{
          console.log(res)
          this.tableData = [...res.data.records]
          this.page.total = res.data.total
        })
      },
      //分页
      refreshChange() {
        this.getSjxx(this.page)
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
      getList(){
        getActivity(this.$route.query.id).then(res=>{
          console.log("view",res)
          if(res.code == '0'){
          this.form = {
            ...res.data,
            objectNumber:res.data.objectNumber+"人"
          }
          this.projectName = res.data.projectName
          let status = res.data.status
          console.log("status",status)
          dictQuery("ct_activity_manager_status").then(e=>{
            console.log("res",e)
            e.data.forEach(element => {
              if(element.value === status){
                console.log("111000")
                this.label = element.label
              }
            });
            
          })
          this.money = res.data.funtSubtotalSum
          this.listdata = res.data.ctActivityFuntList
          this.listdatas= res.data.commonFilesListMap
          //console.log(this.listdata)
          }else{
            this.$message.error(res.msg)
          }
          
        })
      },
      //通过
      tg(){
        this.dialogVisible = true
      },
      //退出
      tc(){
        this.dialogVisibleReturn = true
      },
      //通过确认
      tgTrue(){
        const tgForm ={
          notes: this.textarea,
          planId : this.form.id+"",
          planNo : this.form.projectNo,
          status : '3'
        }
        // console.log(tgForm)
        checkActivity(tgForm).then(res=>{
          //.log(res)
          if(res.code == '0'){
            this.$message.success('审核成功！')
              this.$router.push({
                path: "/activity-manage/projectActivity",
              });
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      //退出驳回
      tcReturn(){
        this.dialogVisibleReturn = false
        this.textarea = ''
      },
      //退出确认
      tcTrue(){
        console.log(this.textarea)
        if(this.textarea){
          const tcForm ={
          notes: this.textarea,
          planId : this.form.id+"",
          planNo : this.form.projectNo,
          status : '2'
        }
        console.log(tcForm)
        checkActivity(tcForm).then(res=>{
          //console.log(res)
          if(res.code == '0'){
            this.$message.success('退回成功！')
              this.$router.push({
                path: "/activity-manage/projectActivity",
              });
          }else{
            this.$message.error(res.msg)
          }
        })
        }else{
          this.$message.error("退回原因不能为空！")
          return;
        }
      }
    },
    
  };
  </script>
  
  <style lang="scss" scoped>
  /deep/.el-input.is-disabled .el-input__inner {
  color: #333;
}
/deep/.el-range-editor.is-disabled input {
  color: #333;
}
/deep/.el-radio__input.is-disabled + span.el-radio__label {
  color: #333;
}
/deep/.el-textarea.is-disabled .el-textarea__inner {
  color: #333;
}
/deep/.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #333;
}
  /deep/.avue-crud__header {
    min-height: 10px;
  }
  .form2 {
    /deep/.avue-form__row:nth-child(3) {
      .el-form-item__label {
        line-height: 18px !important;
      }
    }
  }
  .bottom {
  //background: pink;
  width: 89%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 99;
  text-align: center;
  .el-button {
    padding: 9px 20px;
  }
}
  </style>