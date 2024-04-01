<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <avue-crud
      ref="crud"
      :option="option"
      :data="listData"
      :row-style="rowStyle"
    >
    </avue-crud>
  </div>
</template>

<script>
export default {
  props:{
    listData:{
      type: Array,
      default: ()=>{ [] }
    }
  },

  data() {
    return {
      data: [
        {
          projectName: "",
          startTime: "",
          fundResource: "",
          totalNum: "",
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
        disabled:true,
        menu: false,
        menuAlign: 'center',
        align: 'center',
        column: [
          {
            label: "项目名称",
            prop: "projectName",
            cell: true,
            width: 300,
          },
          {
            label: "起止时间",
            prop: "startAndEndTime",
            type: "monthrange",
            searchrange: true,
            format: "yyyy-MM",
            valueFormat: "yyyy-MM",
            cell: true,
          },
          {
            label: "项目资金来源",
            prop: "fundResource",
            cell: true,
          },
          {
            label: "项目资金总额(万元)",
            prop: "totalNum",
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
  }
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
/deep/.avue-crud .el-table th {
  word-break: break-word;
  background-color: #e9f2ff;
}
</style>