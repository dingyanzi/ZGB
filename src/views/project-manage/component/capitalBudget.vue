<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <div class="top">
      <div class="left">
        <div class="yuan"></div>
        <div class="wen">项目金额</div>
      </div>
      <div class="right">
        <div style="font-weight: 600; font-size: 15px">
          <span style="color: red">*</span>金额：
        </div>
        <div class="input">
          <el-input
            :disabled="disabled"
            style="width: 100px; margin-right: 10px"
            v-model="ctBudgetExpenditures.price"
          ></el-input
          >万元
        </div>
      </div>
    </div>
    <div class="top2">
      <div class="left">
        <div class="yuan"></div>
        <div class="wen">财政补助资金预算支出明细</div>
      </div>
      <div class="right">
        <div style="font-weight: 600; font-size: 15px">合计：</div>
        <div>
          <span
            style="
              display: inline-block;
              width: 100px;
              margin-right: 10px;
              text-align: center;
              font-weight: 600;
              font-size: 15px;
            "
            >{{ czMoney }}</span
          >
          元
        </div>
      </div>
    </div>
    <div style="width: 100%; margin: 0 auto; margin-bottom: 20px">
      <avue-crud
        ref="crud"
        :option="option"
        :data="ctBudgetExpenditures.ctBudgetExpendituresCz"
        :row-style="rowStyle"
      >
        <template #menu="{ row, index, size }">
          <el-button
            @click="rowDel(row, index)"
            :size="size"
            type="text"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
        <template #subjectHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #contentHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #priceHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #numberHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #subtotalHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
      </avue-crud>
      <el-button
        style="
          width: 100%;
          margin-top: 10px;
          color: #409eff;
          border: 1px solid #409eff;
        "
        @click="rowAdd"
        v-if="disabled == false"
        plain
        >添加</el-button
      >
    </div>
    <div class="top2">
      <div class="left">
        <div class="yuan"></div>
        <div class="wen">社会配套资金预算支出明细</div>
      </div>
      <div class="right">
        <div style="font-weight: 600; font-size: 15px">合计：</div>
        <div>
          <span
            style="
              display: inline-block;
              width: 100px;
              margin-right: 10px;
              text-align: center;
              font-weight: 600;
              font-size: 15px;
            "
            >{{ shMoney }}</span
          >
          元
        </div>
      </div>
    </div>
    <div style="width: 100%; margin: 0 auto; margin-bottom: 20px">
      <avue-crud
        ref="crud1"
        :option="options"
        :data="ctBudgetExpenditures.ctBudgetExpendituresSh"
        :row-style="rowStyle"
      >
        <template #menu="{ row, index, size }">
          <el-button
            @click="rowDel1(row, index)"
            :size="size"
            type="text"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
        <template #subjectHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #contentHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #priceHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #numberHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #subtotalHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
      </avue-crud>
      <el-button
        style="
          width: 100%;
          margin-top: 10px;
          color: #409eff;
          border: 1px solid #409eff;
        "
        @click="rowAdd1"
        v-if="disabled == false"
        plain
        >添加</el-button
      >
    </div>
  </div>
</template>

<script>
import { option, options } from "../../../const/project-manage/capital";
export default {
  props: {
    disabled: "",
    capitalObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      money: "",
      ctBudgetExpenditures: {
        price: "",
        ctBudgetExpendituresCz: [
          // {
          //   subject: "1",
          //   content: "",
          //   price: "",
          //   number: "",
          //   subtotal: "",
          //   $cellEdit: true,
          // },
        ],
        ctBudgetExpendituresSh: [
          // {
          //   subject: "1",
          //   content: "",
          //   price: "",
          //   number: "",
          //   subtotal: "",
          //   $cellEdit: true,
          // },
        ],
      },
      option,
      options,
    };
  },
  methods: {
    // 表单验证
    formCheck() {
      let flag = false;
      let flag1 = false;
      let flag2 = false;
      let flag3 = false;
      if (this.ctBudgetExpenditures.ctBudgetExpendituresCz) {
        this.ctBudgetExpenditures.ctBudgetExpendituresCz.forEach((obj) => {
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (!obj[key]) {
                // 这里是空值的处理逻辑
                flag1 = false;
                return flag1;
              } else {
                flag1 = true;
                return flag1;
              }
            }
          }
        });
        if (flag1 == false) {
          this.$message({
            message: "请完善财政补助资金预算支出明细表格！",
            type: "error",
          });
        } else {
          flag1 = true;
        }
      }
      if (this.ctBudgetExpenditures.ctBudgetExpendituresSh) {
        this.ctBudgetExpenditures.ctBudgetExpendituresSh.forEach((obj) => {
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (!obj[key]) {
                // 这里是空值的处理逻辑
                flag2 = false;
                return flag2;
              } else {
                flag2 = true;
                return flag2;
              }
            }
          }
        });
        if (flag2 == false) {
          this.$message({
            message: "请完善社会配套资金预算支出明细表格！",
            type: "error",
          });
        } else {
          flag2 = true;
        }
      }
      if (this.ctBudgetExpenditures.price) {
        flag3 = true;
      } else {
        this.$message({
          message: "请填写项目金额！",
          type: "error",
        });
        flag3 = false;
      }
      if (flag1 == true && flag2 == true && flag3 == true) {
        flag = true;
        return flag;
      }
    },
    rowStyle({ row, column, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return {
          backgroundColor: "#f7faff",
        };
      } else {
        return {
          backgroundColor: "#fff",
        };
      }
    },
    rowAdd() {
      this.$refs.crud.rowCellAdd({
        subject: "1",
        content: "",
        price: "",
        number: "",
        subtotal: "",
        $cellEdit: true,
      });
    },
    rowAdd1() {
      this.$refs.crud1.rowCellAdd({
        subject: "1",
        content: "",
        price: "",
        number: "",
        subtotal: "",
        $cellEdit: true,
      });
    },
    rowDel(_row, _index) {
      this.ctBudgetExpenditures.ctBudgetExpendituresCz.splice(_index, 1);
    },
    rowDel1(_row, _index) {
      this.ctBudgetExpenditures.ctBudgetExpendituresSh.splice(_index, 1);
    },
  },
  watch: {
    disabled: {
      handler(val) {
        if (val == true) {
          this.option.disabled = true;
          this.options.disabled = true;
          this.option.menu = false;
          this.options.menu = false;
        } else {
          this.option.disabled = false;
          this.options.disabled = false;
          this.option.menu = true;
          this.options.menu = true;
        }
      },
      immediate: true,
      deep: true,
    },
    capitalObj: {
      handler(val) {
        if (val) {
          this.ctBudgetExpenditures.price = val.price;
          if (val.ctBudgetExpendituresCz) {
            if (this.disabled == false) {
              this.ctBudgetExpenditures.ctBudgetExpendituresCz =
                val.ctBudgetExpendituresCz.map((item) => {
                  return {
                    ...item,
                    $cellEdit: true,
                  };
                });
            } else {
              this.ctBudgetExpenditures.ctBudgetExpendituresCz =
                val.ctBudgetExpendituresCz;
            }
          }
          if (val.ctBudgetExpendituresSh) {
            if (this.disabled == false) {
              this.ctBudgetExpenditures.ctBudgetExpendituresSh =
                val.ctBudgetExpendituresSh.map((item) => {
                  return {
                    ...item,
                    $cellEdit: true,
                  };
                });
            } else {
              this.ctBudgetExpenditures.ctBudgetExpendituresSh =
                val.ctBudgetExpendituresSh;
            }
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    czMoney() {
      if (this.ctBudgetExpenditures.ctBudgetExpendituresCz) {
        let arr = [];
        let i,
          sum = 0;
        this.ctBudgetExpenditures.ctBudgetExpendituresCz.forEach((item) => {
          if (item.subtotal) {
            arr.push(Number(item.subtotal));
          }
        });
        if (arr.length != 0) {
          for (i = 0; i < arr.length; i++) {
            sum += arr[i];
          }
          return sum;
        } else {
          return 0;
        }
      }
    },
    shMoney() {
      if (this.ctBudgetExpenditures.ctBudgetExpendituresSh) {
        let arr = [];
        let i,
          sum = 0;
        this.ctBudgetExpenditures.ctBudgetExpendituresSh.forEach((item) => {
          if (item.subtotal) {
            arr.push(Number(item.subtotal));
          }
        });
        if (arr.length != 0) {
          for (i = 0; i < arr.length; i++) {
            sum += arr[i];
          }
          return sum;
        } else {
          return 0;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  background: #e9f2ff;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .yuan {
      width: 13px;
      height: 13px;
      border-radius: 15px;
      background: #02a7f0;
      margin-right: 6px;
    }
    .wen {
      font-weight: 600;
      font-size: 15px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .input {
      /deep/.el-input__inner {
        height: 30px !important;
        line-height: 30px !important;
      }
    }
  }
}
.top2 {
  background: #e9f2ff;
  width: 100%;
  height: 40px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .yuan {
      width: 13px;
      height: 13px;
      border-radius: 15px;
      background: #02a7f0;
      margin-right: 6px;
    }
    .wen {
      font-weight: 600;
      font-size: 15px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
}
/deep/.avue-crud__header {
  min-height: 0px;
}
/deep/.avue-crud .el-table th {
  word-break: break-word;
  background-color: #e9f2ff;
}
</style>