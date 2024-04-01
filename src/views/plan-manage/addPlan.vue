<template>
  <basic-container>
    <div style="margin-bottom: 50px">
      <avue-form ref="form" :option="addOption" v-model="addForm"></avue-form>
      <ZgbTitle titleName="计划内容"></ZgbTitle>
      <div v-for="(form, index) in ctMonthPlanDetails" :key="index">
        <div class="form">
          <div style="width: 100%; text-align: right; margin-bottom: 10px">
            <i
              @click="delct(index)"
              class="el-icon-delete"
              style="margin-right: 10px; color: #409eff"
            ></i>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="ctForm"
            label-width="140px"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="活动/服务主题" prop="serverTheam">
                  <el-input
                    v-model="form.serverTheam"
                    :disabled="disabled"
                    placeholder="请输入活动/服务主题"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="服务对象类型" prop="serverType">
                  <el-input
                    v-model="form.serverType"
                    :disabled="disabled"
                    placeholder="请输入服务对象类型"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务人数" prop="serverNumber">
                  <el-input
                    v-model="form.serverNumber"
                    :disabled="disabled"
                    placeholder="请输入服务人数"
                  >
                    <template slot="append">人</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="活动/服务内容" prop="serverContant">
                  <el-input
                    type="textarea"
                    v-model="form.serverContant"
                    :rows="3"
                    :disabled="disabled"
                    placeholder="请输入活动/服务内容"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="活动/服务形式" prop="serverForm">
                  <el-input
                    v-model="form.serverForm"
                    :disabled="disabled"
                    placeholder="请输入活动/服务形式"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="具体地址" prop="address">
                  <el-input
                    v-model="form.address"
                    :disabled="disabled"
                    placeholder="请输入具体地址"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="负责人姓名" prop="headName">
                  <el-input
                    v-model="form.headName"
                    :disabled="disabled"
                    placeholder="请输入负责人姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="负责人联系方式" prop="headPhone">
                  <el-input
                    v-model="form.headPhone"
                    :disabled="disabled"
                    placeholder="请输入负责人联系方式"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="活动/服务日期" prop="roleDivisionType">
                  <div style="display: flex">
                    <div>
                      <el-radio
                        @change="changeTime(1, form)"
                        :disabled="disabled"
                        v-model="form.roleDivisionType"
                        label="1"
                        >按月</el-radio
                      >
                      <el-radio
                        @change="changeTime(2, form)"
                        :disabled="disabled"
                        v-model="form.roleDivisionType"
                        label="2"
                        >按周</el-radio
                      >
                      <el-radio
                        @change="changeTime(3, form)"
                        :disabled="disabled"
                        v-model="form.roleDivisionType"
                        label="3"
                        >按日</el-radio
                      >
                      <el-radio
                        @change="changeTime(4, form)"
                        :disabled="disabled"
                        v-model="form.roleDivisionType"
                        label="4"
                        >全周期</el-radio
                      >
                    </div>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="form.roleDivisionDetailMonth"
                      placement="bottom"
                    >
                      <SelectMonths
                        v-if="form.roleDivisionType === '1'"
                        ref="selectMonths"
                        :disabled="disabled"
                        :effectTime="form.roleDivisionDetailMonth"
                        v-model="form.roleDivisionDetailMonth"
                        placeholder="请选择月份"
                        @submitBtn="(val) => submitBtn(val, index)"
                        @resetBtn="resetBtn"
                      />
                    </el-tooltip>
                    <el-select
                      v-if="form.roleDivisionType === '2'"
                      :disabled="disabled"
                      multiple
                      @change="(e) => handleChange1(e, index)"
                      style="width: 250px !important; margin-left: 20px"
                      v-model="form.roleDivisionDetailWeek"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="timeDayFn(form.roleDivisionDetailDay)"
                      placement="bottom"
                    >
                      <el-date-picker
                        :disabled="disabled"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 250px !important; margin-left: 20px"
                        v-if="form.roleDivisionType === '3'"
                        type="dates"
                        v-model="form.roleDivisionDetailDay"
                        placeholder="选择一个或多个日期"
                      >
                      </el-date-picker>
                    </el-tooltip>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开始时间" prop="startTime">
                  <el-time-select
                    v-model="form.startTime"
                    type="time"
                    format="HH:mm"
                    valueFormat="HH:mm"
                    :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '24:00',
                    }"
                    placeholder="请选择时间"
                  >
                  </el-time-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="是否与项目书设计一致"
                  prop="projectProposal"
                >
                  <el-radio
                    :disabled="disabled"
                    v-model="form.projectProposal"
                    label="1"
                    >是</el-radio
                  >
                  <el-radio
                    :disabled="disabled"
                    v-model="form.projectProposal"
                    label="0"
                    >否</el-radio
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-button
        style="
          width: 100%;
          margin-top: 10px;
          color: #409eff;
          border: 1px solid #409eff;
        "
        @click="addTable"
        plain
        >添加</el-button
      >
    </div>
    <div class="bottom">
      <el-button
        type="primary"
        :loading="subLoading"
        style="margin-left: 20px"
        @click="submitFn"
        >提交</el-button
      >
    </div>
  </basic-container>
</template>

<script>
import { addOption } from "@/const/project-plan/month-plan.js";
import ZgbTitle from "../../components/ZgbTitle.vue";
import SelectMonths from "@/components/SelectMonths";
import {
  getCtMonthPlanById,
  updateMonthPlan,
} from "@/api/plan-project/plan-month";
import {
  addMonthPlan,
  selectProjectPlan,
  selectPlan,
} from "../../api/project-manage/list";
export default {
  components: {
    ZgbTitle,
    SelectMonths,
  },
  data() {
    return {
      addOption,
      addForm: {
        planMonth: this.time(),
      },
      planForm: {
        ri: "1",
      },
      disabled: false,
      value: "",
      monthsValue: null,
      value4: "",
      monthShow: true,
      weekShow: false,
      dayShow: false,
      subLoading: false,
      show: true,
      options: [
        {
          value: "1",
          label: "第一周",
        },
        {
          value: "2",
          label: "第二周",
        },
        {
          value: "3",
          label: "第三周",
        },
        {
          value: "4",
          label: "第四周",
        },
        {
          value: "5",
          label: "第五周",
        },
      ],
      detailForm: {},
      rules: {
        serverTheam: [
          { required: true, message: "请输入活动/服务主题", trigger: "blur" },
        ],
        serverType: [
          { required: true, message: "请输入服务对象类型", trigger: "blur" },
        ],
        serverNumber: [
          { required: true, message: "请输入服务人数", trigger: "blur" },
        ],
        serverContant: [
          { required: true, message: "请输入活动/服务内容", trigger: "blur" },
        ],
        serverForm: [
          { required: true, message: "请输入活动/服务形式", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入具体地址", trigger: "blur" },
        ],
        headName: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" },
        ],
        headPhone: [
          { required: true, message: "负责人联系方式", trigger: "blur" },
        ],
        roleDivisionType: [
          { required: true, message: "请选择活动/服务日期", trigger: "blur" },
        ],
        startTime: [{ required: true, message: "请选择时间", trigger: "blur" }],
        projectProposal: [
          {
            required: true,
            message: "请选择是否与项目书设计一致",
            trigger: "blur",
          },
        ],
      },
      ctMonthPlanDetails: [
        {
          serverTheam: "",
          serverType: "",
          serverNumber: "",
          serverContant: "",
          serverForm: "",
          address: "",
          headName: "",
          headPhone: "",
          roleDivisionType: "1",
          startTime: "",
          projectProposal: "",
          roleDivisionDetailMonth: "",
          roleDivisionDetailWeek: "",
          roleDivisionDetailDay: "",
        },
      ],
      weekStr: "",
    };
  },
  created() {
    const { type } = this.$route.query;
    if (type == "edit") {
      this.getCtMonthPlanById();
    }
    if (type == "add") {
      this.selectPlan();
    }
  },
  methods: {
    selectPlan() {
      selectPlan().then((res) => {
        this.addForm.projectName = res.data[0].projectId;
      });
    },
    time() {
      // 获取当前时间
      var currentDate = new Date();
      // 获取当前月份
      var currentMonth = currentDate.getMonth() + 1; // 月份从0开始，需要加1
      // 获取下个月的年份和月份
      var nextMonthYear = currentDate.getFullYear();
      var nextMonth = currentMonth + 1;
      // 判断月份是否超过12，如果是则年份加1，月份变为1
      if (nextMonth > 12) {
        nextMonthYear++;
        nextMonth = 1;
      }
      // 在月份前补零，判断长度是否小于两位数
      if (nextMonth.toString().length < 2) {
        nextMonth = "0" + nextMonth;
      }
      // 输出结果，格式为YYYY-MM
      var nextMonthString = nextMonthYear + "-" + nextMonth;
      return nextMonthString;
    },
    delct(_index) {
      this.ctMonthPlanDetails.splice(_index, 1);
    },
    handleChange1(value, _index) {
      let weekStr = value.toString();
      this.ctMonthPlanDetails.forEach((item, index) => {
        if (item.effectTime == "2" && index == _index) {
          item.roleDivisionDetailWeek = value;
        }
      });
    },
    getCtMonthPlanById() {
      const { id } = this.$route.query;
      getCtMonthPlanById({
        id,
      }).then((res) => {
        this.detailForm = res.data;
        this.addForm = res.data;
        this.ctMonthPlanDetails = res.data.ctMonthPlanDetailList;
        if (this.ctMonthPlanDetails) {
          this.ctMonthPlanDetails.forEach((item) => {
            if (item.roleDivisionDetailMonth) {
              item.roleDivisionDetailMonth =
                item.roleDivisionDetailMonth.split(",");
            }
            if (item.roleDivisionDetailWeek) {
              item.roleDivisionDetailWeek =
                item.roleDivisionDetailWeek.split(",");
            }
            if (item.roleDivisionDetailDay) {
              item.roleDivisionDetailDay =
                item.roleDivisionDetailDay.split(",");
            }
          });
        }
      });
    },
    changeTime(newV, form) {
      if (newV == "1") {
        form.roleDivisionDetailMonth = form.roleDivisionDetailMonth;
      } else {
        form.roleDivisionDetailMonth = "";
      }
      if (newV == "2") {
        form.roleDivisionDetailWeek = form.roleDivisionDetailWeek;
      } else {
        form.roleDivisionDetailWeek = "";
      }
      if (newV == "3") {
        form.roleDivisionDetailDay = form.roleDivisionDetailDay;
      } else {
        form.roleDivisionDetailDay = "";
      }
    },
    submitBtn(val, i) {
      const months = JSON.parse(JSON.stringify(val));
      const monthsArr = months.map((item) => {
        return item;
      });
      this.ctMonthPlanDetails.forEach((item, index) => {
        if (index == i) {
          item.roleDivisionDetailMonth = monthsArr.join(",");
        }
      });
    },
    resetBtn() {
      this.monthsValue = null;
    },
    addTable() {
      this.ctMonthPlanDetails.push({
        serverTheam: "",
        serverType: "",
        serverNumber: "",
        serverContant: "",
        serverForm: "",
        address: "",
        headName: "",
        headPhone: "",
        roleDivisionType: "1",
        startTime: "",
        projectProposal: "",
        roleDivisionDetailMonth: "",
        roleDivisionDetailWeek: "",
        roleDivisionDetailDay: "",
      });
    },
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
    formRulesValidate(fName) {
      return new Promise((resolve) => {
        this.$refs[fName][0].validate((valid, done) => {
          if (valid) {
            resolve(valid);
            done();
          }
        });
      });
    },
    // 提交
    submitFn() {
      let formValid = this.formValidate("form");
      let form1Valid = this.formRulesValidate("ctForm");
      Promise.all([formValid, form1Valid]).then(() => {
        // 统一提交表单
        if (this.ctMonthPlanDetails) {
          this.ctMonthPlanDetails.forEach((item) => {
            if (item.roleDivisionType == "2") {
              if (item.roleDivisionDetailWeek.length == 0) {
                this.$message({
                  message: "请选择活动/服务日期！",
                  type: "error",
                });
                throw "请选择活动/服务日期！";
              }
            }
            if (item.roleDivisionType == "1") {
              if (!item.roleDivisionDetailMonth) {
                this.$message({
                  message: "请选择活动/服务日期！",
                  type: "error",
                });
                throw "请选择活动/服务日期！";
              }
            }
            if (item.roleDivisionType == "3") {
              if (item.roleDivisionDetailDay.length == 0) {
                this.$message({
                  message: "请选择活动/服务日期！",
                  type: "error",
                });
                throw "请选择活动/服务日期！";
              }
            }
            if (item.roleDivisionType == "2" && item.roleDivisionDetailWeek) {
              item.roleDivisionDetailWeek =
                item.roleDivisionDetailWeek.toString();
            } else {
              item.roleDivisionDetailWeek = null;
            }
            if (item.roleDivisionType == "1" && item.roleDivisionDetailMonth) {
              let str = item.roleDivisionDetailMonth.toString();
              item.roleDivisionDetailMonth = str;
            } else {
              item.roleDivisionDetailMonth = null;
            }
            if (item.roleDivisionType == "3" && item.roleDivisionDetailDay) {
              let str = item.roleDivisionDetailDay.toString();
              item.roleDivisionDetailDay = str;
            } else {
              item.roleDivisionDetailDay = null;
            }
          });
        }
        if (this.addForm.projectId) {
          this.addForm.projectId = this.addForm.projectId;
        } else {
          this.addForm.projectId = this.addForm.projectName;
          this.addForm.projectName = null;
        }
        let ctMonthPlanDetails = this.ctMonthPlanDetails;
        let params = {
          ...this.addForm,
          ctMonthPlanDetails,
        };
        console.log(params);
        params.ctMonthPlanDetailList = null;
        const { id, type } = this.$route.query;
        if (type == "add") {
          this.subLoading = true;
          addMonthPlan(params)
            .then((res) => {
              if (res.code == "0") {
                this.$message({
                  message: "添加月度计划成功",
                  type: "success",
                });
                this.subLoading = false;
                this.$router.push({
                  path: "/plan-manage/month-plan",
                });
              }
            })
            .catch(() => {
              this.subLoading = false;
            });
        } else if (type == "edit") {
          this.subLoading = true;
          updateMonthPlan(params)
            .then((res) => {
              if (res.code == "0") {
                this.$message({
                  message: "编辑月度计划成功",
                  type: "success",
                });
                this.subLoading = false;
                this.$router.push({
                  path: "/plan-manage/month-plan",
                });
              }
            })
            .catch(() => {
              this.subLoading = false;
            });
        }
      });
    },
  },
  computed: {
    timeDayFn() {
      return (_day) => {
        if (_day) {
          let day = _day.join();
          return day;
        }
      };
    },
  },
  watch: {
    // monthsValue: {
    //   handler(val) {
    //     console.log(val);
    //     if (val) {
    //       this.ctMonthPlanDetails.forEach((item) => {
    //         item.roleDivisionDetailMonth = val;
    //       });
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #7abbff;
  /deep/.el-row:nth-child(6) {
    .el-col:nth-child(2) {
      .el-form-item__label {
        line-height: 20px !important;
      }
    }
  }
  /deep/.el-input__inner {
    height: 30px;
    line-height: 30px;
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
</style>