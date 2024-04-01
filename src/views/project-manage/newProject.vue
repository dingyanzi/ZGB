<template>
  <div class="examineContainer">
    <div
      v-show="loadData"
      v-loading="loadData"
      :element-loading-text="elementLoadingText"
      class="loading-div"
    ></div>
    <basic-container>
      <div style="margin-bottom: 60px">
        <ZgbTitle titleName="项目基本信息"></ZgbTitle>
        <avue-form class="form" ref="form" v-model="form" :option="baseOption">
          <template slot="department" slot-scope="{}">
            <el-radio v-model="form.department" :disabled="disabled" label="1"
              >相关业务科室</el-radio
            >
            <el-radio v-model="form.department" :disabled="disabled" label="2"
              >街道</el-radio
            >
            <el-radio v-model="form.department" :disabled="disabled" label="3"
              >社区</el-radio
            >
            <el-select
              v-show="yeShow"
              style="width: 200px !important"
              v-model="departmentDetail"
              placeholder="请选择"
              :disabled="disabled"
              @change="handleChange2"
            >
              <el-option
                v-for="item in options"
                :key="item.businessType"
                :label="item.businessName"
                :value="item.businessType"
              >
              </el-option>
            </el-select>
            <el-select
              v-show="streetShow"
              style="width: 200px !important"
              v-model="departmentDetail2"
              placeholder="请选择"
              :disabled="disabled"
              @change="handleChange1"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-cascader
              v-show="sheShow"
              v-model="departmentDetail3"
              :options="options"
              style="width: 200px !important"
              placeholder="请选择"
              :disabled="disabled"
              @change="handleChange"
            ></el-cascader>
          </template>
        </avue-form>
        <ZgbTitle titleName="承接单位信息"></ZgbTitle>
        <avue-form
          class="form2"
          ref="form1"
          v-model="form1"
          :option="baseOption1"
        >
        </avue-form>
        <div style="font-weight: bold; margin-left: 10px">
          执行过的同类项目:
        </div>
        <addTable
          :ctSimilar="ctSimilar"
          ref="table"
          :disabled="disabled"
        ></addTable>
        <ZgbTitle titleName="项目详细信息"></ZgbTitle>
        <tableDetail
          v-if="isDataLoad"
          :tableform="tableform"
          :ctTargets="ctTargets"
          ref="form2"
          :disabled="disabled"
        ></tableDetail>
        <ZgbTitle titleName="项目固定服务对象"></ZgbTitle>
        <avue-form
          ref="form3"
          :option="regularOption"
          v-model="regularData"
        ></avue-form>
        <regular :form1="form2" ref="regular" :disabled="disabled"></regular>
        <ZgbTitle titleName="项目预算"></ZgbTitle>
        <div style="font-weight: bold; margin-top: 20px; margin-left: 10px">
          资金来源:
        </div>
        <sourceFund
          :expectArr="expectArr"
          ref="sourceFund"
          :disabled="disabled"
        ></sourceFund>
        <div style="font-weight: bold; margin-top: 20px; margin-left: 10px">
          资金预算支出明细<span style="font-weight: 300; margin-left: 10px"
            >(请严格按照项目资金使用要求编制预算) :</span
          >
        </div>
        <capitalBudget
          :capitalObj="capitalObj"
          ref="Budget"
          :disabled="disabled"
        ></capitalBudget>
        <ZgbTitle titleName="项目执行团队介绍"></ZgbTitle>
        <fundExecution
          :ctProjectTeamObj="ctProjectTeamObj"
          :ctExecutionTeam="ctExecutionTeam"
          ref="form4"
          :disabled="disabled"
        ></fundExecution>
        <aduitRecord v-if="recordShow == true"></aduitRecord>
      </div>
      <div class="bottom">
        <el-button
          v-if="aduitType == 'add' || aduitType == 'edit'"
          type="primary"
          :loading="subLoading"
          @click="submitFn()"
          style="margin-left: 20px"
          >提交</el-button
        >
        <el-button
          v-if="aduitType == 'add' || aduitType == 'edit'"
          type="success"
          :loading="staLoading"
          @click="stagingFn"
          style="margin-left: 20px"
          >暂存</el-button
        >
        <el-button
          v-show="auditShow"
          type="primary"
          style="margin-left: 20px"
          @click="dialogVisible1 = true"
          >通过</el-button
        >
        <el-button
          v-show="auditShow"
          type="danger"
          style="margin-left: 20px"
          @click="dialogVisible = true"
          >退回</el-button
        >
      </div>
      <el-dialog
        v-if="dialogVisible1"
        title="提示"
        :visible.sync="dialogVisible1"
        width="35%"
      >
        <span>请核实确认信息无误！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" :loading="subLoading" @click="passFn"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        v-if="dialogVisible"
        title="退回原因"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form :model="returnform" :rules="rules" ref="forms">
          <el-form-item label="退回原因：" prop="name">
            <el-input
              v-model="returnform.name"
              autocomplete="off"
              type="textarea"
              :rows="3"
              style="width: 300px"
              placeholder="请输入退回原因"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            :loading="exitLoad"
            @click="subfirmFn('forms')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import {
  baseOption,
  baseOption1,
  regularOption,
} from "@/const/project-manage/projectList.js";
import ZgbTitle from "../../components/ZgbTitle.vue";
import addTable from "./component/addTable.vue";
import tableDetail from "./component/tableDetail.vue";
import regular from "./component/regular.vue";
import sourceFund from "./component/sourceFund.vue";
import capitalBudget from "./component/capitalBudget.vue";
import fundExecution from "./component/fundExecution.vue";
import aduitRecord from "./component/aduitRecord.vue";
import {
  addPlan,
  selectOrgan,
  getBusinessType,
  updatePlan,
  stagingPlan,
} from "@/api/project-manage/list";
import {
  getProjectPlanDetail,
  updateProjectPlanStatus,
} from "@/api/project-manage/planList";
import { streetAndCommunity } from "@/api/plan-project/plan-month";
import { mapGetters } from "vuex";
export default {
  name: "newProject",
  components: {
    ZgbTitle,
    addTable,
    tableDetail,
    regular,
    sourceFund,
    capitalBudget,
    fundExecution,
    aduitRecord,
  },
  data() {
    return {
      baseOption,
      elementLoadingText: "加载数据中！请稍等...",
      baseOption1,
      regularOption,
      subLoading: false,
      loadData: false,
      staLoading: false,
      exitLoad: false,
      dialogVisible1: false,
      dialogVisible: false,
      departmentDetail: "",
      departmentDetail2: "",
      departmentDetail3: [],
      form: {},
      form2: [],
      returnform: {},
      tableform: {},
      ctSimilar: [],
      expectArr: {},
      form1: {},
      options: [],
      isDataLoad: false,
      recordShow: false,
      value: "",
      regularData: {},
      capitalObj: {},
      disabled: false,
      show: true,
      auditShow: false,
      streetShow: false,
      sheShow: false,
      yeShow: true,
      susobj: {
        subsidySund: "",
        ownFund: "",
        donateFund: "",
        expectReceiveFund: "",
      },
      rules: {
        name: [{ required: true, message: "请输入退回原因", trigger: "blur" }],
      },
      aduitType: "",
      ctProjectTeamObj: {},
      // 项目成员默认展示一个
      ctExecutionTeam: [
        {
          name: "",
          phone: "",
          isSocial: "",
          education: "",
          speciality: "",
          duties: "",
          role: "",
          professionalQualifications: "",
          projectTime: "",
        },
      ],
      // 项目成员默认展示一个
      ctTargets: [
        {
          performance: "",
          indexZb: "",
          effectTime: "1",
          effectTimeMonth: "",
          effectTimeWeekList: [],
          effectTimeDay: "",
          weekValue: "",
          unit: "1",
        },
      ],
      undertakingUnitId: "",
      streetType: "",
      stagingId: "",
    };
  },
  mounted() {
    this.selectOrgan();
  },
  created() {
    this.refreFn();
    if (
      this.aduitType == "audit" ||
      this.aduitType == "detail" ||
      this.aduitType == "exitEdit" ||
      this.aduitType == "edit"
    ) {
      const { id } = this.$route.query;
      this.getProjectPlanDetail(id);
    } else {
      this.isDataLoad = true;
    }
  },
  methods: {
    // 对不同状态的控制显隐
    refreFn() {
      const { type } = this.$route.query;
      this.aduitType = type;
      if (type == "detail") {
        this.disabled = true;
        this.baseOption.disabled = true;
        this.baseOption1.disabled = true;
        this.regularOption.disabled = true;
        this.recordShow = true;
      }
      if (type == "audit") {
        this.disabled = true;
        this.auditShow = true;
        this.recordShow = true;
        this.show = false;
        this.baseOption.disabled = true;
        this.baseOption1.disabled = true;
        this.regularOption.disabled = true;
      } else {
        this.auditShow = false;
        this.show = true;
      }
      if (type == "add" || type == "exitEdit" || type == "edit") {
        this.disabled = false;
        this.baseOption.disabled = false;
        this.baseOption1.disabled = false;
        this.regularOption.disabled = false;
      }
    },
    // 对子组件进行校验
    formRulesValidate(fName, sName) {
      return new Promise((resolve) => {
        this.$refs[fName].$refs[sName].validate((valid, done) => {
          if (valid) {
            resolve(valid);
            done();
          }
        });
      });
    },
    // 校验循环遍历一个数组中多个表单的方法
    formRulesValidateId(fName, sName) {
      return new Promise((resolve, reject) => {
        const promises = this.$refs[fName].$refs[sName].map((formRef) => {
          return new Promise((innerResolve, innerReject) => {
            formRef.validate((valid, done) => {
              if (valid) {
                innerResolve(valid);
                done();
              }
            });
          });
        });

        Promise.all(promises)
          .then((results) => {
            resolve(results);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 对组件进行校验
    formValidate(fName) {
      return new Promise((resolve) => {
        this.$refs[fName].validate((valid, done) => {
          if (valid) {
            resolve(valid);
            done();
          }
        });
      });
    },
    // 提交并校验
    submitFn() {
      let formValid = this.formValidate("form");
      let form1Valid = this.formValidate("form1");
      let form2Valid = this.formValidate("form3");
      let formRulesRes1 = this.formRulesValidate("form2", "detail");
      let formRulesRes2 = this.formRulesValidateId("form2", "ctForm");
      let formRulesRes3 = this.formRulesValidateId("form4", "ctForm1");
      Promise.all([
        formValid,
        form1Valid,
        form2Valid,
        formRulesRes1,
        formRulesRes2,
        formRulesRes3,
      ]).then((res) => {
        if (this.form.department) {
          if (!this.form.departmentDetail) {
            this.$message({
              message: "请选择需求方！",
              type: "error",
            });
            throw "请选择需求方！";
          }
        }
        let expectArr = this.$refs.sourceFund._data.tableData;
        let ctProjectTargets = this.$refs.form2._data.formBlocks;
        if (ctProjectTargets) {
          ctProjectTargets.forEach((item) => {
            if (item.effectTime == "2") {
              if (item.effectTimeWeekList.length == 0) {
                this.$message({
                  message: "请选择活动/服务日期！",
                  type: "error",
                });
                throw "请选择活动/服务日期！";
              }
            }
            if (item.effectTime == "1") {
              if (!item.effectTimeMonth) {
                this.$message({
                  message: "请选择活动/服务日期！",
                  type: "error",
                });
                throw "请选择活动/服务日期！";
              }
            }
            if (item.effectTime == "3") {
              if (item.effectTimeDay.length == 0) {
                this.$message({
                  message: "请选择活动/服务日期！",
                  type: "error",
                });
                throw "请选择活动/服务日期！";
              }
            }
          });
        }
        expectArr.forEach((item) => {
          if (item.id == "财政补助资金预算") {
            this.susobj.subsidySund = item.expectReceiveFund;
          }
          if (item.name == "自有资金") {
            this.susobj.ownFund = item.expectReceiveFund;
          } else if (item.name == "已接受社会捐赠资金") {
            this.susobj.donateFund = item.expectReceiveFund;
          } else if (item.name == "预期能接受社会捐赠资金") {
            this.susobj.expectReceiveFund = item.expectReceiveFund;
          }
        });
        for (var key in this.susobj) {
          if (this.susobj[key] === 0 || this.susobj[key]) {
            // 值为 0 或非空时执行代码逻辑
            // console.log("通过校验");
          } else {
            this.$message({
              message: "请完善资金来源表格！",
              type: "error",
            });
            throw "请完善资金来源表格！";
          }
        }
        let ctBudget = this.$refs.Budget._data.ctBudgetExpenditures;
        if (!ctBudget.price) {
          this.$message({
            message: "请填写项目金额！",
            type: "error",
          });
          throw "请填写项目金额！";
        }
        let ctArr = ctBudget.ctBudgetExpendituresCz.map((item) => {
          return {
            content: item.content,
            subject: item.subject,
            price: item.price,
            number: item.number,
            subtotal: item.subtotal,
          };
        });
        if (ctArr) {
          ctArr.forEach((obj) => {
            for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (
                  key != "$index" &&
                  key != "updateTime" &&
                  key != "createUser" &&
                  key != "updateUser"
                ) {
                  if (!obj[key]) {
                    // 这里是空值的处理逻辑
                    this.$message({
                      message: "请完善财政补助资金预算支出明细表格！",
                      type: "error",
                    });
                    throw "请完善财政补助资金预算支出明细表格！";
                  } else {
                  }
                }
              }
            }
          });
        }
        let ctBArr = ctBudget.ctBudgetExpendituresSh.map((item) => {
          return {
            content: item.content,
            subject: item.subject,
            price: item.price,
            number: item.number,
            subtotal: item.subtotal,
          };
        });
        if (ctBArr) {
          ctBArr.forEach((obj) => {
            for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (
                  key != "$index" &&
                  key != "updateTime" &&
                  key != "updateUser"
                ) {
                  if (!obj[key]) {
                    // 这里是空值的处理逻辑
                    this.$message({
                      message: "请完善社会配套资金预算支出明细表格！",
                      type: "error",
                    });
                    throw "请完善社会配套资金预算支出明细表格！";
                  }
                }
              }
            }
          });
        }
        let projectTeam = this.$refs.form4._data.ctProjectTeam[0];
        for (let key in projectTeam) {
          if (key != "$index" && key != "$cellEdit" && key != "email") {
            if (!projectTeam[key]) {
              // 这里是空值的处理逻辑
              this.$message({
                message: "请完善项目负责人表格！",
                type: "error",
              });
              throw "请完善项目负责人表格！";
            }
          }
        }
        // 统一提交表单
        let ctSimilarArr = this.$refs.table._data.ctSimilarProjects;
        let ctSimilarProjects = [];
        if (ctSimilarProjects) {
          ctSimilarArr = ctSimilarArr.map((item) => {
            let str = [];
            if (Array.isArray(item.time)) {
              str = item.time;
            } else {
              str = item.time.split(",");
            }
            return {
              projectName: item.projectName,
              startTime: str[0],
              endTime: str[1],
              fundResource: item.fundResource,
              totalNum: item.totalNum,
            };
          });
          const modifiedArr = ctSimilarArr.map((obj) => {
            for (let key in obj) {
              if (obj[key] === "" || obj[key] === undefined) {
                obj[key] = null;
              }
            }
            return obj;
          });
          const isAllNull = modifiedArr.every((obj) =>
            Object.values(obj).every((val) => val === null)
          );
          const result = isAllNull ? null : modifiedArr;
          ctSimilarProjects = result;
        }
        let detailForm = this.$refs.form2._data.detailForm;
        let newCtProjectTargets = [];
        if (ctProjectTargets) {
          newCtProjectTargets = ctProjectTargets.map((item) => {
            if (item.effectTime == "2" && item.effectTimeWeekList) {
              item.effectTimeWeekList = item.effectTimeWeekList;
            } else {
              item.effectTimeWeekList = [];
            }
            if (item.effectTime == "1" && item.effectTimeMonth) {
              let str = item.effectTimeMonth.toString();
              item.effectTimeMonth = str;
            } else {
              item.effectTimeMonth = null;
            }
            if (item.effectTime == "3" && item.effectTimeDay) {
              let str = item.effectTimeDay.toString();
              item.effectTimeDay = str;
            } else {
              item.effectTimeDay = null;
            }
            return item;
          });
        }
        let ctFixedServer = this.$refs.regular._data.ctFixedServerObjects;
        let ctFixedServerObjects = [];
        if (ctFixedServer) {
          ctFixedServer = ctFixedServer.map((item) => {
            return {
              type: item.type,
              number: item.number,
              notes: item.notes,
            };
          });
          const ctFixed = ctFixedServer.map((obj) => {
            for (let key in obj) {
              if (obj[key] === "") {
                obj[key] = null;
              }
            }
            return obj;
          });
          const isAllNull = ctFixed.every((obj) =>
            Object.values(obj).every((val) => val === null)
          );
          const result = isAllNull ? null : ctFixed;
          ctFixedServerObjects = result;
        }
        let ctBudgetExpenditures = this.$refs.Budget._data.ctBudgetExpenditures;
        let price = ctBudgetExpenditures.price;
        let ctBudgetExpendituresCz =
          ctBudgetExpenditures.ctBudgetExpendituresCz;
        let ctBudgetExpendituresSh =
          ctBudgetExpenditures.ctBudgetExpendituresSh;
        let ctProjectTeam = JSON.parse(
          JSON.stringify(this.$refs.form4._data.ctProjectTeam[0])
        );
        let ctExecutionTeamDetails =
          this.$refs.form4._data.ctExecutionTeamDetails;
        let cycleStartTime,
          cycleEndTime = "";
        if (this.form.StartTime) {
          cycleStartTime = this.form.StartTime[0];
          cycleEndTime = this.form.StartTime[1];
        }
        if (this.form.supervision) {
          let arr = this.form.supervision.join("/");
          this.form.supervisionDetail = arr;
        }
        let params = {
          ...this.form1,
          ...this.form,
          ...this.regularData,
          ctSimilarProjects,
          ...detailForm,
          ctProjectTargets: newCtProjectTargets,
          ctFixedServerObjects,
          cycleEndTime,
          cycleStartTime,
          ...this.susobj,
          price,
          ctBudgetExpendituresCz,
          ctBudgetExpendituresSh,
          ctProjectTeam,
          ctExecutionTeamDetails,
          projectId: this.stagingId ? this.stagingId : null,
        };
        console.log(params);
        if (this.aduitType == "add") {
          this.subLoading = true;
          addPlan(params)
            .then((res) => {
              if (res.code == "0") {
                this.subLoading = false;
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.$router.push({
                  path: "/project-manage/projectList",
                });
              }
            })
            .catch((err) => {
              this.subLoading = false;
            });
        } else {
          this.subLoading = true;
          const { id } = this.$route.query;
          params.projectId = id;
          updatePlan(params)
            .then((res) => {
              if (res.code == "0") {
                this.subLoading = false;
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                this.$router.push({
                  path: "/plan-manage/planTable",
                });
              }
            })
            .catch((err) => {
              this.subLoading = false;
            });
        }
      });
    },
    // 退回时的方法
    subfirmFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { id } = this.$route.query;
          this.exitLoad = true;
          updateProjectPlanStatus({
            status: "3",
            id,
            notes: this.returnform.name,
          })
            .then((res) => {
              if (res.code == "0") {
                this.$message({
                  message: "退回成功",
                  type: "success",
                });
                this.dialogVisible = false;
                this.exitLoad = false;
                this.$router.push({
                  path: "/plan-manage/planTable",
                });
              }
            })
            .catch(() => {
              this.exitLoad = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 通过按钮的方法
    passFn() {
      const { id } = this.$route.query;
      this.subLoading = true;
      updateProjectPlanStatus({
        status: "2",
        id,
      })
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              message: "处理成功",
              type: "success",
            });
            this.dialogVisible1 = false;
            this.subLoading = false;
            this.$router.push({
              path: "/plan-manage/planTable",
            });
          }
        })
        .catch(() => {
          this.subLoading = false;
        });
    },
    // 获取详情以及转换数据格式
    getProjectPlanDetail(_id) {
      this.loadData = true;
      getProjectPlanDetail({ id: _id }).then((res) => {
        if (res.code == "0") {
          this.loadData = false;
          let arr = [];
          if (res.data.cycleStartTime && res.data.cycleEndTime) {
            arr.push(res.data.cycleStartTime);
            arr.push(res.data.cycleEndTime);
          }
          this.form.projectName = res.data.projectName;
          this.form.projectType = res.data.projectType;
          this.form.subpackage = res.data.subpackage;
          this.form.projectNo = res.data.projectNo;
          this.form.annual = res.data.annual;
          this.form.StartTime = arr;
          this.form.effectArea = res.data.effectArea;
          this.form.numberBeneficiaries = res.data.numberBeneficiaries;
          if (res.data.supervisionDetail) {
            this.form.supervision = res.data.supervisionDetail.split("/");
          }
          this.form.department = res.data.department;
          this.form.departmentDetail = res.data.departmentDetail;
          this.form2 = res.data.ctFixedServerObjects;
          this.tableform.overview = res.data.overview;
          this.tableform.characteristic = res.data.characteristic;
          this.tableform.analysis = res.data.analysis;
          this.tableform.projectTarget = res.data.projectTarget;
          this.tableform.plan = res.data.plan;
          this.tableform.riskEstimation = res.data.riskEstimation;
          this.isDataLoad = true;
          this.ctTargets = res.data.ctProjectTargets;
          let str = [];
          let str1 = [];
          let str2 = "";
          if (this.form.departmentDetail) {
            if (this.form.departmentDetail.indexOf("/") !== -1) {
              str = this.form.departmentDetail.split("/");
              str1 = str;
            } else {
              str2 = this.form.departmentDetail;
            }
          }
          if (this.form.department == "1") {
            this.departmentDetail = str2;
          } else if (this.form.department == "2") {
            this.departmentDetail2 = str2;
          } else if (this.form.department == "3") {
            this.departmentDetail3 = str1;
          }
          this.form1 = res.data;
          this.regularData.beneficiaryGroups = res.data.beneficiaryGroups;
          this.ctSimilar = res.data.ctSimilarProjects;
          let obj = {};
          obj.subsidySund = res.data.subsidySund;
          obj.ownFund = res.data.ownFund;
          obj.donateFund = res.data.donateFund;
          obj.expectReceiveFund = res.data.expectReceiveFund;
          this.expectArr = obj;
          let capitalObj = {};
          capitalObj.price = res.data.price;
          capitalObj.ctBudgetExpendituresCz = res.data.ctBudgetExpendituresCz;
          capitalObj.ctBudgetExpendituresSh = res.data.ctBudgetExpendituresSh;
          this.capitalObj = capitalObj;
          this.ctProjectTeamObj = res.data.ctProjectTeam;
          this.ctExecutionTeam = res.data.ctExecutionTeamDetails;
        }
      });
    },
    // 获取承接单位信息
    selectOrgan() {
      const { type, id, undertakingUnitId } = this.$route.query;
      let orgId = "";
      if (type == "add" || type == "edit") {
        orgId = this.userInfo.orgId;
      } else if (type == "detail" || type == "audit") {
        orgId = undertakingUnitId;
      }
      selectOrgan({
        undertakingUnitId: orgId,
      }).then((res) => {
        this.form1 = res.data;
        this.form1.undertakingUnitId = res.data.organId;
        this.ctSimilar = res.data.ctSimilarProjectsOrganList;
      });
    },
    // 获取社区和街道
    streetAndCommunity() {
      streetAndCommunity({
        type: this.streetType,
      }).then((res) => {
        this.options = res.data;
      });
    },
    // 需求方选择区相关业务科室后的下拉
    handleChange(value) {
      let str = "";
      let str1 = "";
      this.options.forEach((item) => {
        if (value[0] == item.value) {
          str = item.label;
          item.children.forEach((citem) => {
            if (value[1] == citem.value) {
              str1 = citem.label;
            }
          });
        }
      });
      this.form.departmentDetailName = str + "/" + str1;
      this.form.departmentDetail = value[0] + "/" + value[1];
    },
    //  需求方选择街道后的下拉
    handleChange1(value) {
      let str = "";
      this.options.forEach((item) => {
        if (value == item.value) {
          str = item.label;
        }
      });
      this.form.departmentDetailName = str;
      this.form.departmentDetail = value;
    },
    //  需求方选择社区后的下拉
    handleChange2(value) {
      let str = "";
      this.options.forEach((item) => {
        if (value == item.businessType) {
          str = item.businessName;
        }
      });
      this.form.departmentDetailName = str;
      this.form.departmentDetail = value;
    },
    getBusinessType() {
      getBusinessType().then((res) => {
        this.options = res.data;
      });
    },
    // 暂存
    stagingFn() {
      // 统一提交表单
      let ctSimilarArr = this.$refs.table._data.ctSimilarProjects;
      // 资金来源
      let expectArr = this.$refs.sourceFund._data.tableData;
      expectArr.forEach((item) => {
        if (item.id == "财政补助资金预算") {
          this.susobj.subsidySund = item.expectReceiveFund;
        }
        if (item.name == "自有资金") {
          this.susobj.ownFund = item.expectReceiveFund;
        } else if (item.name == "已接受社会捐赠资金") {
          this.susobj.donateFund = item.expectReceiveFund;
        } else if (item.name == "预期能接受社会捐赠资金") {
          this.susobj.expectReceiveFund = item.expectReceiveFund;
        }
      });
      let ctSimilarProjects = [];
      if (ctSimilarProjects) {
        ctSimilarArr = ctSimilarArr.map((item) => {
          let str = [];
          if (Array.isArray(item.time)) {
            str = item.time;
          } else {
            str = item.time.split(",");
          }
          return {
            projectName: item.projectName,
            startTime: str[0],
            endTime: str[1],
            fundResource: item.fundResource,
            totalNum: item.totalNum,
          };
        });
        const modifiedArr = ctSimilarArr.map((obj) => {
          for (let key in obj) {
            if (obj[key] === "" || obj[key] === undefined) {
              obj[key] = null;
            }
          }
          return obj;
        });
        const isAllNull = modifiedArr.every((obj) =>
          Object.values(obj).every((val) => val === null)
        );
        const result = isAllNull ? null : modifiedArr;
        ctSimilarProjects = result;
      }
      let detailForm = this.$refs.form2._data.detailForm;
      let ctProjectTargets = this.$refs.form2._data.formBlocks,
        newCtProjectTargets = [];
      if (ctProjectTargets) {
        newCtProjectTargets = ctProjectTargets.map((item) => {
          if (item.effectTime == "2" && item.effectTimeWeekList) {
            item.effectTimeWeekList = item.effectTimeWeekList;
          } else {
            item.effectTimeWeekList = [];
          }
          if (item.effectTime == "1" && item.effectTimeMonth) {
            let str = item.effectTimeMonth.toString();
            item.effectTimeMonth = str;
          } else {
            item.effectTimeMonth = null;
          }
          if (item.effectTime == "3" && item.effectTimeDay) {
            let str = item.effectTimeDay.toString();
            item.effectTimeDay = str;
          } else {
            item.effectTimeDay = null;
          }
          return item;
        });
      }
      let ctFixedServer = this.$refs.regular._data.ctFixedServerObjects;
      let ctFixedServerObjects = [];
      if (ctFixedServer) {
        ctFixedServer = ctFixedServer.map((item) => {
          return {
            type: item.type,
            number: item.number,
            notes: item.notes,
          };
        });
        const ctFixed = ctFixedServer.map((obj) => {
          for (let key in obj) {
            if (obj[key] === "") {
              obj[key] = null;
            }
          }
          return obj;
        });
        const isAllNull = ctFixed.every((obj) =>
          Object.values(obj).every((val) => val === null)
        );
        const result = isAllNull ? null : ctFixed;
        ctFixedServerObjects = result;
      }
      let ctBudgetExpenditures = this.$refs.Budget._data.ctBudgetExpenditures;
      let price = ctBudgetExpenditures.price;
      let ctBudgetExpendituresCz = ctBudgetExpenditures.ctBudgetExpendituresCz;
      let ctBudgetExpendituresSh = ctBudgetExpenditures.ctBudgetExpendituresSh;
      let ctProjectTeam = JSON.parse(
        JSON.stringify(this.$refs.form4._data.ctProjectTeam[0])
      );
      if (!ctProjectTeam.name) {
        ctProjectTeam = null;
      }
      let ctExecutionTeamDetails =
        this.$refs.form4._data.ctExecutionTeamDetails;
      let cycleStartTime,
        cycleEndTime = "";
      if (this.form.StartTime) {
        cycleStartTime = this.form.StartTime[0];
        cycleEndTime = this.form.StartTime[1];
      }
      if (this.form.supervision) {
        let arr = this.form.supervision.join("/");
        this.form.supervisionDetail = arr;
      }
      let params = {
        ...this.form1,
        ...this.form,
        ...this.regularData,
        ctSimilarProjects,
        ...detailForm,
        ctProjectTargets: newCtProjectTargets,
        ctFixedServerObjects,
        cycleEndTime,
        cycleStartTime,
        ...this.susobj,
        price,
        ctBudgetExpendituresCz,
        ctBudgetExpendituresSh,
        ctProjectTeam,
        ctExecutionTeamDetails,
      };
      console.log(params);
      this.staLoading = true;
      stagingPlan(params)
        .then((res) => {
          if (res.code == "0") {
            this.staLoading = false;
            this.$message({
              message: "暂存成功",
              type: "success",
            });
            this.stagingId = res.data;
            this.getProjectPlanDetail(this.stagingId);
          }
        })
        .catch((err) => {
          this.staLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "roleCodes"]),
  },
  watch: {
    "form.department": {
      handler(val) {
        if (val == "2") {
          this.streetType = "2";
          this.streetShow = true;
          this.departmentDetail = "";
          this.departmentDetail3 = "";
          this.yeShow = false;
          this.sheShow = false;
          this.streetAndCommunity();
        } else if (val == "3") {
          this.streetType = "1";
          this.streetShow = false;
          this.sheShow = true;
          this.departmentDetail = "";
          this.departmentDetail2 = "";
          this.yeShow = false;
          this.streetAndCommunity();
        } else if (val == "1") {
          this.streetShow = false;
          this.sheShow = false;
          this.yeShow = true;
          this.departmentDetail3 = "";
          this.departmentDetail2 = "";
          this.getBusinessType();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.examineContainer {
  height: 100%;
  overflow: hidden scroll;
  .loading-div {
    width: 100%;
    min-height: calc(100vh - 90px);
    position: absolute;
  }
  .form2 {
    /deep/.avue-form__row:nth-child(3) {
      .el-form-item__label {
        line-height: 18px !important;
      }
    }
  }
  .bottom {
    background: pink;
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
}
</style>