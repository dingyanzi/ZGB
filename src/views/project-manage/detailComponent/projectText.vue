<template>
  <basic-container>
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
        ></el-cascader>
      </template>
    </avue-form>
    <ZgbTitle titleName="承接单位信息"></ZgbTitle>
    <avue-form class="form2" ref="form1" v-model="form1" :option="baseOption1">
    </avue-form>
    <div style="font-weight: bold; margin-left: 10px">执行过的同类项目:</div>
    <addTable :ctSimilar="ctSimilar" :disabled="disabled"></addTable>
    <ZgbTitle titleName="项目预算"></ZgbTitle>
    <div style="font-weight: bold; margin-top: 20px; margin-left: 10px">
      资金来源:
    </div>
    <sourceFund :expectArr="expectArr" :disabled="disabled"></sourceFund>
    <div style="font-weight: bold; margin-top: 20px; margin-left: 10px">
      资金预算支出明细<span style="font-weight: 300; margin-left: 10px"
        >(请严格按照项目资金使用要求编制预算) :</span
      >
    </div>
    <capitalBudget
      :capitalObj="capitalObj"
      :disabled="disabled"
    ></capitalBudget>
  </basic-container>
</template>

<script>
import { baseOption, baseOption1 } from "@/const/project-manage/projectList.js";
import ZgbTitle from "../../../components/ZgbTitle.vue";
import addTable from "../component/addTable.vue";
import sourceFund from "../component/sourceFund.vue";
import capitalBudget from "../component/capitalBudget.vue";
import { streetAndCommunity } from "@/api/plan-project/plan-month";
import { getBusinessType } from "@/api/project-manage/list";
export default {
  props: {
    detailForm: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ZgbTitle,
    addTable,
    sourceFund,
    capitalBudget,
  },
  data() {
    return {
      baseOption,
      baseOption1,
      form: {},
      departmentDetail: "",
      departmentDetail2: "",
      departmentDetail3: [],
      streetShow: false,
      sheShow: false,
      yeShow: true,
      form1: {},
      options: [],
      value: "",
      disabled: false,
      ctSimilar: [],
      expectArr: {},
      capitalObj: {},
      streetType: "",
    };
  },
  created() {
    this.refreFn();
  },
  methods: {
    refreFn() {
      const { type } = this.$route.query;
      if (type == "detail") {
        this.disabled = true;
        this.baseOption.disabled = true;
        this.baseOption1.disabled = true;
      }
      if (type == "audit") {
        this.disabled = true;
        this.baseOption.disabled = true;
        this.baseOption1.disabled = true;
      }
    },
    streetAndCommunity() {
      streetAndCommunity({
        type: this.streetType,
      }).then((res) => {
        this.options = res.data;
      });
    },
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
    getBusinessType() {
      getBusinessType().then((res) => {
        this.options = res.data;
      });
    },
  },
  watch: {
    detailForm: {
      handler(val) {
        console.log(val);
        this.form = val;
        if (val.supervisionDetail) {
          this.form.supervision = val.supervisionDetail.split("/");
        }
        if (val.cycleStartTime && val.cycleEndTime) {
          let arr = [];
          arr.push(val.cycleStartTime);
          arr.push(val.cycleEndTime);
          this.form.StartTime = arr;
        }
        this.form1 = val;
        let capitalObj = {};
        capitalObj.price = val.price;
        capitalObj.ctBudgetExpendituresCz = val.ctBudgetExpendituresCz;
        capitalObj.ctBudgetExpendituresSh = val.ctBudgetExpendituresSh;
        this.capitalObj = capitalObj;
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
          this.streetShow = false;
          this.sheShow = false;
          this.yeShow = true;
          this.getBusinessType();
        } else if (this.form.department == "2") {
          this.departmentDetail2 = str2;
          this.streetShow = true;
          this.yeShow = false;
          this.sheShow = false;
          this.streetType = "2";
          this.streetAndCommunity();
        } else if (this.form.department == "3") {
          this.departmentDetail3 = str1;
          this.streetType = "1";
          this.streetShow = false;
          this.sheShow = true;
          this.yeShow = false;
          this.streetAndCommunity();
        }
        this.ctSimilar = val.ctSimilarProjects;
        let obj = {};
        obj.subsidySund = val.subsidySund;
        obj.ownFund = val.ownFund;
        obj.donateFund = val.donateFund;
        obj.expectReceiveFund = val.expectReceiveFund;
        this.expectArr = obj;
      },
      immediate: true,
      deep: true,
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
.form {
  /deep/.avue-form__row:nth-child(5) {
    .el-input__inner {
      padding: 0 5px;
    }
  }
  /deep/.avue-form__row:nth-child(6) {
    .el-input__inner {
      padding: 0 5px;
    }
  }
}
</style>