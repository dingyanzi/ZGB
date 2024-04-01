<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <avue-crud
      ref="crud"
      :option="option"
      :data="ctSimilarProjects"
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
      v-if="disabled == false"
      plain
      >添加</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    disabled: "",
    ctSimilar: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ctSimilarProjects: [
        {
          projectName: "",
          time: "",
          fundResource: "",
          totalNum: "",
          $cellEdit: true,
        },
      ],
      option: {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        addRowBtn: false,
        cellBtn: false,
        stripe: true,
        columnBtn: false,
        refreshBtn: false,
        menuWidth: 100,
        disabled: false,
        menu: true,
        column: [
          {
            label: "项目名称",
            prop: "projectName",
            cell: true,
            width: 300,
          },
          {
            label: "起止时间",
            prop: "time",
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
  watch: {
    disabled: {
      handler(val) {
        if (val == true) {
          this.option.disabled = true;
          this.option.menu = false;
        }
      },
      immediate: true,
      deep: true,
    },
    ctSimilar: {
      handler(val) {
        if (val) {
          if (this.disabled == true) {
            this.ctSimilarProjects = val.map((item) => {
              if (item.startTime && item.endTime) {
                let arr = [];
                arr.push(item.startTime);
                arr.push(item.endTime);
                return {
                  projectName: item.projectName,
                  time: arr,
                  fundResource: item.fundResource,
                  totalNum: item.totalNum,
                };
              }
            });
          } else {
            if (val.length != 0) {
              this.ctSimilarProjects = val.map((item) => {
                let arr = [];
                if (item.startTime && item.endTime) {
                  arr.push(item.startTime);
                  arr.push(item.endTime);
                }
                return {
                  projectName: item.projectName,
                  time: arr,
                  fundResource: item.fundResource,
                  totalNum: item.totalNum,
                  $cellEdit: true,
                };
              });
            }
          }
        }
      },
      immediate: true,
      deep: true,
    },
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
        time: "",
        fundResource: "",
        totalNum: "",
        $cellEdit: true,
      });
    },
    rowDel(_row, _index) {
      this.ctSimilarProjects.splice(_index, 1);
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