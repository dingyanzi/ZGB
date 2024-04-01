<template>
    <basic-container>
      <ZgbTitle titleName="承接单位信息"></ZgbTitle>
      <avue-form class="form2" ref="form" v-model="form" :option="infoOption">
      </avue-form>
      <div style="font-weight: bold; margin-left: 10px">执行过的同类项目:</div>
      <addTable ref="addTable" :listData="listData"></addTable>
      <el-button type="primary" @click="save(form)" style="display:block;margin:0 auto">
        提交
      </el-button>
    </basic-container>
  </template>
  
  <script>

  import {addOrganization,updateOrganization,getOrganization} from '@/api/organization'
  import {
    infoOption,
  } from "@/const/organization-manage/projectOrganization.js";
  import ZgbTitle from "../../components/ZgbTitle.vue";
  import addTable from "./component/addTable.vue";
  export default {
    components: {
      ZgbTitle,
      addTable,
    },
    data() {
      return {
        infoOption,
        form: {},
        listData:[]
      };
    },
    created(){
      
    },
    methods: {
      //提交
      save(e){
        this.$refs.form.validate((valid, done) => {
        done();
        if (!valid) return;
        console.log(this.$refs["addTable"].data)
        //取addTable里的值
        let ctSimilarProjectsOrganList =  this.$refs["addTable"].data.map(item=>{
          //如果为数组则转为字符串
          if(Array.isArray(item.startAndEndTime)){
            item.startAndEndTime = item.startAndEndTime.join(",")
          }
          return{
            projectName : item.projectName,
            fundResource : item.fundResource,
            totalNum : item.totalNum,
            startTime : item.startAndEndTime == "" || item.startAndEndTime == null ? item.startAndEndTime : item.startAndEndTime.split(",")[0],
            endTime : item.startAndEndTime == "" || item.startAndEndTime == null ? item.startAndEndTime : item.startAndEndTime.split(",")[1]
          }
        })
        //form赋值 去除无用信息
        this.form = {
          accountName : e.accountName,
          accountNumber : e.accountNumber,
          address : e.address,
          assessLevel : e.assessLevel,
          bank : e.bank,
          basicSituation : e.basicSituation,
          ctSimilarProjectsOrganList,
          experience : e.experience,
          head : e.head,
          headDutis : e.headDutis,
          headEmail : e.headEmail,
          headPhone : e.headPhone,
          registAuthority : e.registAuthority,
          registNo : e.registNo,
          registTime : e.registTime,
          undertakingUnit : e.undertakingUnit,
          welfareProject :e.welfareProject
        }
        //console.log(this.form)
        //console.log("11111111",this.$refs)
          //新增
          addOrganization(this.form).then(res=>{
            //console.log(res)
            if(res.code == 0){
              this.$message.success('新增成功！')
              this.$router.push({
                path: "/organization-manage/projectOrganization",
              });
              this.$nextTick(()=>{
                this.$refs.form.clearValidate();
              })
            }else{
              this.$message.error(res.msg)
            }
          })
        })
        
        
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .form2 {
    /deep/.avue-form__row:nth-child(3) {
      .el-form-item__label {
        line-height: 18px !important;
      }
    }
  }
  </style>