<template>
  <basic-container>
    <avue-form ref="form" v-model="form" :option="serverOption"> </avue-form>
    <ZgbTitle titleName="活动/服务基础信息"></ZgbTitle>
    <avue-form ref="form1" v-model="form" :option="infoOption"> 
      <template slot-scope="{ }" slot="serverTime">

        <div style="display: flex;">
          <el-time-select
          placeholder="起始时间"
          style="width: 48%;"
          v-model="startTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
            maxTime: endTime
          }">
        </el-time-select>
        <div style="width: 5%;"></div>
        <el-time-select
          placeholder="结束时间"
          style="width: 48%;"
          v-model="endTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
            minTime: startTime
          }">
        </el-time-select>
        </div>
        
      </template>
    </avue-form>
    <ZgbTitle titleName="活动/服务目标"></ZgbTitle>
    <avue-form ref="form2" v-model="form" :option="targetOption"></avue-form>
    <ZgbTitle titleName="活动/服务实施情况"></ZgbTitle>
    <avue-form ref="form3" v-model="form" :option="situationOption"></avue-form>
    <ZgbTitle titleName="活动/服务反思与自我评估"></ZgbTitle>
    <avue-form ref="form4" v-model="form" :option="assessOption"></avue-form>
    <ZgbTitle titleName="活动/服务资金使用"></ZgbTitle>
    <useActMoney ref="form5" :listdata="listdata"></useActMoney>
    <ZgbTitle titleName="附件材料"></ZgbTitle>
    <uploadfile ref="form6" :listdatas="listdatas" @upload="checkFile"></uploadfile>
    <div style="display: flex; align-items: center;justify-content: center;">
      <el-button type="success"  @click="save(form)" style="display:block;">
      提交
    </el-button>
    <el-button type="primary"  @click="zancun(form)" style="display:block;margin-left: 20px;">
      暂存
    </el-button>
    </div>
    
  </basic-container>
</template>
  
<script>
import { addActivity, getIdAndName,zcActivity } from '@/api/activity'
import { serverOption, infoOption, targetOption, situationOption, assessOption } from "@/const/activity-manage/projectActivity.js";
import ZgbTitle from "../../components/ZgbTitle.vue";
import useActMoney from "./component/useActMoney.vue";
import uploadfile from './component/uploadfile.vue';
export default {
  components: {
    ZgbTitle,
    useActMoney,
    uploadfile,
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      serverOption,
      infoOption,
      targetOption,
      situationOption,
      assessOption,
      form: {
        $projectId: '',
        projectId: null,
      },
      listdata: [],
      listdatas: {},
      idAndNames: [],
      showUpload:true
    };
  },
  created() {
    //获取项目id和name
    getIdAndName().then(res => {
      console.log(res)
      if(res.data.length>0){
        this.form.projectId = res.data[0].project_id
        this.idAndNames = res.data
        // console.log(this.form)
        // console.log(this.form.projectId)
      }
    })
  },
  methods: {
    //附件材料上传
    checkFile(e){
      this.showUpload = e
      //console.log("e",this.showUpload)
    },
    //保存按钮
    save(form) {
      // console.log(this.endTime)
      // console.log(this.startTime)
      //附件是否上传成功
      if(!this.showUpload){
        this.$message.warning("附件材料正在上传中..")
        return;
      }
      //校验必填数据项
      if(this.startTime =='' || this.startTime == null){
        this.$message.error("还存在未填写的数据项，请完善！")
        return;
      }
      if(this.endTime =='' || this.endTime == null){
        this.$message.error("还存在未填写的数据项，请完善！")
        return;
      }
      if (this.$refs.form6._data.fileList.length <= 0 || this.$refs.form6._data.fileListImg.length <= 0) {
        this.$message.error("还存在未填写的数据项，请完善！")
        return;
      }
      if (this.$refs.form._data.form.$projectId == "" || this.$refs.form._data.form.assess == "" || this.$refs.form._data.form.executeTeam == "" || this.$refs.form._data.form.objectNumber == undefined || this.$refs.form._data.form.objectType == "" || this.$refs.form._data.form.projectId == null || this.$refs.form._data.form.serverAddress == "" || this.$refs.form._data.form.serverDate == "" || this.$refs.form._data.form.serverTime == null || this.$refs.form._data.form.serverTitle == "" || this.$refs.form._data.form.situation == "" || this.$refs.form._data.form.target == "") {
        this.$message.error("还存在未填写的数据项，请完善！")
        return;
      }
      if (this.$refs.form5._data.moneyData) {
        this.$refs.form5._data.moneyData.forEach(item => {
          if (item.costIllustrate == "" || item.costIllustrate == null || item.expenditureType.length <= 0 || item.number == "" || item.number == null || item.price == "" || item.price == null) {
            this.$message.error("还存在未填写的数据项，请完善！")
            throw '还存在未填写的数据项，请完善！'
          }
        })
      }
      let ctActivityFuntList = this.$refs["form5"].moneyData.map(item => {
        return {
          expenditureType: item.$expenditureType,
          costIllustrate: item.costIllustrate,
          number: item.number,
          price: item.price,
          subtotal: item.subtotal
        }
      })
      let commonFilesList = this.$refs["form6"].allFiles.map(item => {
        return {
          dictId: item.dictId,
          fileUrl: item.fileUrl,
          filename: item.filename
        }
      })
      const form1 = this.$refs["form4"].form
      //form赋值 去除无用信息
      const form2 = {
        activityReport: form1.activityReport,
        assess: form1.assess,
        CommonFilesList: commonFilesList,
        ctActivityFuntList: ctActivityFuntList,
        executeTeam: form1.executeTeam,
        objectNumber: form1.objectNumber,
        objectType: form1.objectType,
        serverAddress: form1.serverAddress,
        serverDate: form1.serverDate,
        serverTime: this.startTime&&this.endTime ? this.startTime + "-" + this.endTime : null,
        serverTitle: form1.serverTitle,
        situation: form1.situation,
        target: form1.target,
        projectId: form1.projectId
      }
      //console.log("add", form2)
      addActivity(form2).then(res => {
        if (res.code == '0') {
          this.$message.success('新增成功！')
          this.$router.push({
            path: "/activity-manage/projectActivity",
          });
          //this.clearValidate();
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //暂存按钮
    zancun(){
      if(!this.showUpload){
        this.$message.warning("附件材料正在上传中..")
        return;
      }
      let ctActivityFuntList = this.$refs["form5"].moneyData.map(item => {
        return {
          expenditureType: item.$expenditureType,
          costIllustrate: item.costIllustrate,
          number: item.number,
          price: item.price,
          subtotal: item.subtotal
        }
      })
      let commonFilesList = this.$refs["form6"].allFiles.map(item => {
        return {
          dictId: item.dictId,
          fileUrl: item.fileUrl,
          filename: item.filename
        }
      })
      const form1 = this.$refs["form4"].form
      //form赋值 去除无用信息
      const form2 = {
        activityReport: form1.activityReport,
        assess: form1.assess,
        CommonFilesList: commonFilesList,
        ctActivityFuntList: ctActivityFuntList,
        executeTeam: form1.executeTeam,
        objectNumber: form1.objectNumber,
        objectType: form1.objectType,
        serverAddress: form1.serverAddress,
        serverDate: form1.serverDate,
        serverTime: this.startTime + "-" + this.endTime,
        serverTitle: form1.serverTitle,
        situation: form1.situation,
        target: form1.target,
        projectId: form1.projectId
      }
      // console.log("add", form2)
      zcActivity(form2).then(res => {
        if (res.code == '0') {
          this.$message.success('暂存成功！')
          this.$router.push({
            path: "/activity-manage/projectActivity",
          });
          //this.clearValidate();
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //清除校验
    clearValidate() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.form.clearValidate();
        })
      })
    }
  },
  watch: {
    form: {
      handler(val) {
        //console.log("val",val)
        if (this.idAndNames) {
          this.idAndNames.map(item => {
            if (item.project_id == val.projectId) {
              this.form.executeTeam = item.undertaking_unit
            }
          })
        }
      },
      immediate: true,
      deep: true
    },
    startTime:{
      handler(val){
        if(val){
          this.form.serverTime = val
        }
      }
    },
    endTime:{
      handler(val){
        if(val){
          this.form.serverTime = val
        }
      }
    }
  }
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