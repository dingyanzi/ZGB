<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <div class="top2">
      <div class="right">
        <div style=" font-size: 15px">资金使用总计:</div>
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
      <avue-crud ref="crud" :option="option" :data="moneyData" :row-style="rowStyle">
        <template #menu="{ row, index, size }">
          <el-button
            @click="rowDel(row, index)"
            :size="size"
            type="text"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
        <template #expenditureTypeHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #costIllustrateHeader="{ column }">
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
        plain
        >添加</el-button
      >
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/config/env";
export default {
  props:{
    listdata:{
      type: Array,
      default: ()=>{ [] }
    },
  },
  data() {
    return {
      moneyData: [
        {
          expenditureType: null,
          costIllustrate: null,
          price: null,
          number: null,
          subtotal: null,
          $cellEdit: true,
        },
      ],
      option: {
        addBtn: false,
        editBtn: false,
        addRowBtn: false,
        cellBtn: false,
        stripe: true,
        columnBtn: false,
        refreshBtn: false,
        menuWidth: 100,
        column: [
          {
            label: "支出类别",
            prop: "expenditureType",
            type: "cascader",
            props:{
              label:"label",
              value:'label',
              children: 'children'
            },
            dicUrl: baseUrl+'/common/dict/dictAndChildrenInfoByType?type=ct_walfare_zclb',
            cell: true,
            width: 300,
          },
          {
            label: "费用具体说明",
            prop: "costIllustrate",
            placeholder: "请输入费用具体说明",
            cell: true,
          },
          {
            label: "单价(元)",
            prop: "price",
            // type: "number",
            // controls:false,
            cell: true,
          },
          {
            label: "数量",
            prop: "number",
            // type: "number",
            cell: true,
          },
          {
            label: "小计",
            prop: "subtotal",
            disabled: true,
            formatter: (row, value, label, column) => {
                return row.subtotal = Number(row.price) * Number(row.number)
            },
            cell: true,
          },
        ],
      },
    };
  },
  methods: {
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
        expenditureType: null,
        costIllustrate: null,
        price: null,
        number: null,
        subtotal: null,
        $cellEdit: true,
      });
    },
    
    rowDel(_row, _index) {
      if (this.moneyData.length > 1) {
        this.moneyData.splice(_index,1);
      } else {
        this.$message({
          message: "当前数据不可删除！",
          type: "warning",
        });
      }
    },
    
  },
  watch:{
    listdata:{
      handler(val){
        
        if(val){
          this.moneyData = val.map(item=>{
            return{
              ...item,
              $cellEdit:true,
              $expenditureType:item.expenditureType.split(" | "),
              expenditureType:item.expenditureType.split(" | ")
            }
          })
          console.log("moneyData",this.moneyData)
        }
      }
    },
    moneyData: {
      handler(val) {
        if(val){
          //console.log(val)
       this.moneyData = val
        }
       
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    shMoney() {
      if (this.moneyData) {
        let arr = [];
        let i,sum = 0;
        this.moneyData.forEach((item) => {
          if (item.subtotal) {
            arr.push(item.subtotal);
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
.top2 {
  width: 100%;
  height: 40px;
  margin-top: 14px;
  position: relative;
  .right {
    position: absolute;
    right: 0;
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