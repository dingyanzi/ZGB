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
            >{{ money }}</span
          >
          元
        </div>
      </div>
    </div>
    <div style="width: 100%; margin: 0 auto; margin-bottom: 20px">
      <avue-crud ref="crud" 
      :option="option" 
      :data="listdata" 
      :row-style="rowStyle">
       
      </avue-crud>
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
    money:{
      type: Number,
      default: ()=>{  }
    }
  },
  data() {
    return {
      
      data: [
        {
          expenditureType: 'null',
          costIllustrate: 'null',
          price: 'null',
          number: 'null',
          subtotal: 'null',
          $cellEdit: true,
        },
      ],
      option: {
        addBtn: false,
        editBtn: false,
        addRowBtn: false,
        menu: false,
        menuAlign: 'center',
        align: 'center',
        cellBtn: false,
        stripe: true,
        columnBtn: false,
        refreshBtn: false,
        menuWidth: 100,
        disabled:true,
        column: [
          {
            label: "支出类别",
            prop: "expenditureType",
           
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
            cell: true,
          },
          {
            label: "数量",
            prop: "number",
            cell: true,
          },
          {
            label: "小计",
            prop: "subtotal",
            disabled: true,
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
    
  },
  watch:{
   
  },
  computed: {
    
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