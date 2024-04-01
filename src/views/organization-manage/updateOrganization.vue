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

import { addOrganization, updateOrganization, getOrganization } from '@/api/organization'
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
      listData: []
    };
  },
  created() {
    this.getList()
  },
  watch: {
    form: {
      handler(val) {
        console.log("val", val)
        if (val) {
          this.form = val
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    //初始化数据
    getList() {
      //console.log(this.$route.query.id)
      getOrganization(this.$route.query.id).then(res => {
        //console.log(res)
        this.form = { ...res.data }
        this.listData = [...res.data.ctSimilarProjectsOrganList]
        // console.log("初始化this.data", this.listData)
        // console.log("初始化this.form", this.form)
      })
    },
    //保存按钮
    save(e) {
      this.$refs.form.validate((valid, done) => {
        done();
        if (!valid) return;
        // console.log(this.$refs["addTable"])
        //取addTable里的值
        let ctSimilarProjectsOrganList = this.$refs["addTable"]._data.data.map(item => {
          //如果为数组则转为字符串
          if (Array.isArray(item.startAndEndTime)) {
            item.startAndEndTime = item.startAndEndTime.join(",")
          }
          return {
            id: item.id,
            projectName: item.projectName,
            fundResource: item.fundResource,
            totalNum: item.totalNum,
            startTime: item.startAndEndTime == "" || item.startAndEndTime == null ? item.startAndEndTime : item.startAndEndTime.split(",")[0],
            endTime: item.startAndEndTime == "" || item.startAndEndTime == null ? item.startAndEndTime : item.startAndEndTime.split(",")[1]
          }
        })
        //form赋值 去除无用信息
        this.form = {
          accountName: e.accountName,
          accountNumber: e.accountNumber,
          address: e.address,
          assessLevel: e.assessLevel,
          bank: e.bank,
          basicSituation: e.basicSituation,
          ctSimilarProjectsOrganList,
          experience: e.experience,
          head: e.head,
          headDutis: e.headDutis,
          headEmail: e.headEmail,
          headPhone: e.headPhone,
          registAuthority: e.registAuthority,
          registNo: e.registNo,
          registTime: e.registTime,
          undertakingUnit: e.undertakingUnit,
          welfareProject: e.welfareProject
        }
        //id存在则为修改 否则为新增
        if (this.$route.query.id) {
          //id塞进去
          const formdata = {
            ...this.form,
            id: this.$route.query.id
          }
          console.log(formdata)
          //修改
          updateOrganization(formdata).then(res => {
            console.log(res)
            if (res.code == 0) {
              this.$message.success('修改成功！')
              this.$router.push({
                path: "/organization-manage/projectOrganization",
              });
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.$message.warning("请选择机构！")
        }
      })


    }
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