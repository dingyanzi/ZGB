<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <el-table
      :data="tableData"
      border
      ref="table"
      show-summary
      :span-method="spanMethod"
      :summary-method="getSummaries"
      style="width: 100%"
    >
      <el-table-column prop="id" label="资金种类" width="250">
      </el-table-column>
      <el-table-column prop="name" label=""> </el-table-column>
      <el-table-column prop="expectReceiveFund" label="金额(万元)">
        <template #header>
          <span style="color: red">*</span>金额(万元)
        </template>
        <template slot-scope="{ row }">
          <el-input
            :disabled="disabled"
            placeholder="请输入内容"
            v-model="row.expectReceiveFund"
            onkeyup="value=value.replace(/[^0-9]{0,1}(\d*(?:\.\d{0,2})?).*$/g, '$1')"
          >
            <template slot="append">万元</template>
          </el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    disabled: "",
    expectArr: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableData: [
        {
          id: "财政补助资金预算",
          name: "",
          expectReceiveFund: "",
        },
        {
          id: "社会配套资金预算（提供证明材料）",
          name: "自有资金",
          expectReceiveFund: 0,
        },
        {
          id: "社会配套资金预算（提供证明材料）",
          name: "已接受社会捐赠资金",
          expectReceiveFund: 0,
        },
        {
          id: "社会配套资金预算（提供证明材料）",
          name: "预期能接受社会捐赠资金",
          expectReceiveFund: 0,
        },
      ],
    };
  },
  methods: {
    spanMethod({ row, column, rowIndex, columnIndex }) {
      let _row = 0;
      let _col = 0;
      // 前三列
      if (columnIndex == 0) {
        if (rowIndex == 0) {
          _row = 1; // 偶数行 两行
          _col = 1;
        } else if (rowIndex == 1) {
          _row = 3; // 偶数行 两行
          _col = 1;
        } else {
          _row = 0; // 奇数行 0行
          _col = 0;
        }
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 2) {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2) + "    万元";
          } else {
            sums[index] = "";
          }
        }
      });
      return sums;
    },
  },
  watch: {
    expectArr: {
      handler(val) {
        if (
          val.subsidySund &&
          val.ownFund &&
          val.donateFund &&
          val.expectReceiveFund
        ) {
          this.tableData.forEach((item) => {
            if (item.id == "财政补助资金预算") {
              item.expectReceiveFund = val.subsidySund;
            } else if (item.name == "自有资金") {
              item.expectReceiveFund = val.ownFund;
            } else if (item.name == "已接受社会捐赠资金") {
              item.expectReceiveFund = val.donateFund;
            } else if (item.name == "预期能接受社会捐赠资金") {
              item.expectReceiveFund = val.expectReceiveFund;
            }
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table {
  border: 1px solid #7abbff;
}
/deep/ .el-table--border td {
  border-right: 1px solid #7abbff !important;
  border-top: 1px solid #7abbff !important;
}
/deep/.el-table th {
  word-break: break-word;
  background-color: #e9f2ff;
  color: #333;
}
</style>