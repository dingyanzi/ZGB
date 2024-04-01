<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <avue-crud
      ref="crud"
      :option="option"
      :data="ctFixedServerObjects"
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
        border: 1px solid #409eff;
        color: #409eff;
      "
      v-if="disabled == false"
      @click="rowAdd"
      >添加</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    disabled: "",
    form1: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ctFixedServerObjects: [
        {
          type: "",
          number: "",
          notes: "",
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
            label: "固定服务对象类型",
            prop: "type",
            cell: true,
            width: 300,
          },
          {
            label: "人数",
            prop: "number",
            cell: true,
          },
          {
            label: "备注",
            prop: "notes",
            width: 300,
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
        type: "",
        number: "",
        notes: "",
        $cellEdit: true,
      });
    },
    rowDel(_row, _index) {
      this.ctFixedServerObjects.splice(_index, 1);
    },
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
    form1: {
      handler(val) {
        if (val) {
          if (this.disabled == false) {
            this.ctFixedServerObjects = val.map((item) => {
              return {
                ...item,
                $cellEdit: true,
              };
            });
          } else {
            this.ctFixedServerObjects = val.map((item) => {
              return {
                ...item,
              };
            });
          }
        }
      },
      immediate: true,
      deep: true,
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