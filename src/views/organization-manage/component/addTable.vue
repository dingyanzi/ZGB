<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <avue-crud
      ref="crud"
      :option="option"
      :data="data"
      :row-style="rowStyle"
      @row-del="rowDel"
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
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: [
        {
          projectName: "",
          fundResource: "",
          totalNum: "",
          startAndEndTime: "",
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
    rowAdd() {
      this.$refs.crud.rowCellAdd({
        projectName: "",
        startAndEndTime: "",
        fundResource: "",
        totalNum: "",
        $cellEdit: true,
      });
    },
    rowDel(_row, _index) {
        this.data.splice(_index, 1);
      
    },
  },
  watch: {
    listData: {
      handler(val) {
        //console.log("val", val);
        if (val.length > 0) {
          this.data = val.map((item) => {
            return {
              ...item,
              $cellEdit: true,
            };
          });
          //console.log("data", this.data);
        } else {
          this.data = [
            {
              projectName: "",
              fundResource: "",
              totalNum: "",
              startAndEndTime: "",
              $cellEdit: true,
            },
          ];
        }
      },
    },
  },
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