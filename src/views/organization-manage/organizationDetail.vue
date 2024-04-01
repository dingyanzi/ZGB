<template>
    <basic-container>
      <ZgbTitle titleName="承接单位信息"></ZgbTitle>
      <avue-form class="form2" ref="form1" v-model="form" :option="detailOption">
      </avue-form>
      <div style="font-weight: bold; margin-left: 10px">执行过的同类项目:</div>
      <viewTable :listData="listData"></viewTable>
      
    </basic-container>
  </template>
  
  <script>
  import {getOrganization} from '@/api/organization'
  import {
    detailOption,
  } from "@/const/organization-manage/projectOrganization.js";
  import ZgbTitle from "../../components/ZgbTitle.vue";
  import viewTable from "./component/viewTable.vue";
  export default {
    components: {
      ZgbTitle,
      viewTable,
    },
    data() {
      return {
        detailOption,
        form: {},
        id: '',
        listData : [],
      };
    },
    created(){
      this.getList();
    },
    methods: {
      //初始化数据
      getList(){
        console.log(this.$route.query.id)
        getOrganization(this.$route.query.id).then(res=>{
          //console.log(res)
          this.form = {...res.data}
          this.listData = [...res.data.ctSimilarProjectsOrganList]
          console.log(this.listData)
        })
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
  .form2 {
    /deep/.avue-form__row:nth-child(3) {
      .el-form-item__label {
        line-height: 18px !important;
      }
    }
  }
  </style>