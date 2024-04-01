<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :data="tableData"
      :search.sync="query"
      :table-loading="tableLoading"
      :option="tableOption"
      @search-change="searchChange"
      @search-reset="resetChange"
      :span-method="spanMethod"
    >
      <template slot="searchMenu" slot-scope="{ row, size }">
        <el-button
          icon="el-icon-download"
          :size="size"
          @click="menuHandel(row, 'export')"
          >导出</el-button
        >
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { baseUrl } from "@/config/env";
import { mapGetters } from "vuex";
import { trueUrl } from "@/util/util";
import { tableOption } from "@/const/activity-manage/activityPreview";
import { selectActivityNotice } from "../../api/activePreview";
export default {
  data() {
    return {
      tableOption,
      tableData: [],
      tableLoading: false,
      spanArr: [
        {
          prop: "num",
          span: [],
        },
        {
          prop: "undertakingUnit",
          span: [],
        },
        {
          prop: "projectName",
          span: [],
        },
      ],
      query: {
        serverDate: this.time(),
      },
    };
  },
  created() {
    this.routerFn();
    this.selectActivityNotice();
    this.rowSort();
    this.rowCalc();
  },
  methods: {
    time() {
      let date = new Date();
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1);
      month = month.length === 2 ? month : 0 + month;
      return `${year}-${month}`;
    },
    resetChange() {
      this.query.serverDate = this.time();
      this.selectActivityNotice();
    },
    searchChange(params, done) {
      this.query = params;
      this.selectActivityNotice();
      done();
    },
    menuHandel(_row, type) {
      window.location.href =
        baseUrl +
        trueUrl("/ctProjectPlan/applyxport", {
          ...this.query,
          queryOrgan: this.userInfo.orgId,
          queryUserId: this.userInfo.userId,
        });
    },
    routerFn() {
      let str = this.query.serverDate.split("-");
      this.tableOption.column.forEach((item) => {
        item.label =
          "江北新区购买社会组织服务和公益创投项目" +
          str[0] +
          "年" +
          str[1] +
          "月活动预告";
      });
    },
    selectActivityNotice() {
      selectActivityNotice({
        // projectNameOrNo: this.query.projectNameOrNo,
        // undertakingUnit: this.query.undertakingUnit,
        // serverDate: this.query.serverDate1,
        ...this.query,
        queryOrgan: this.userInfo.orgId,
        queryUserId: this.userInfo.userId,
      }).then((res) => {
        this.tableData = res.data;
        this.rowCalc();
        this.routerFn();
      });
    },
    rowCalc() {
      this.spanArr.forEach((ele, index) => {
        let parent;
        if (index !== 0) parent = this.spanArr[ele.parent || index - 1].span;
        ele.span = this.rowSpan(ele.prop, parent);
      });
    },
    rowSort(list) {
      let propList = this.spanArr.map((ele) => ele.prop);
      this.spanArr.forEach((ele, index) => {
        let key = ele.prop;
        this.tableData = this.tableData.sort((a, b) => {
          let flag = true;
          for (let i = 0; i < index; i++) {
            let prop = this.spanArr[i].prop;
            flag = flag && a[prop] == b[prop];
          }
          if (flag) {
            if (a[key] < b[key]) {
              return 1;
            } else if (a[key] > b[key]) {
              return -1;
            }
            return 0;
          }
          return 0;
        });
      });
    },
    rowSpan(key, parent) {
      let list = [];
      let position = 0;
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          list.push(1);
          let position = 0;
        } else {
          if (this.tableData[index][key] === this.tableData[index - 1][key]) {
            if (parent && parent[index] !== 0) {
              list.push(1);
              position = index;
            } else {
              list[position] += 1;
              list.push(0);
            }
          } else {
            list.push(1);
            position = index;
          }
        }
      });
      return list;
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.spanArr.length; i++) {
        const ele = this.spanArr[i];
        if (column.property == ele.prop) {
          const _row = ele.span[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo", "roleCodes"]),
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
</style>