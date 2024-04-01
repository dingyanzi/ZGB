<template>
  <div style="margin-bottom: 60px">
    <ZgbTitle titleName="数据信息"></ZgbTitle>
    <div class="xinxi">
      <div class="status">
        当前状态：<span style="font-weight: 500">{{ status }}</span>
      </div>
      <div class="result">
        <div style="font-weight: 600; width: 100px">审核记录：</div>
        <avue-crud
          :option="resultOption"
          :data="tableData"
          @size-change="sizeChange"
          @current-change="currentChange"
          :page.sync="page"
        ></avue-crud>
      </div>
    </div>
  </div>
</template>

<script>
import ZgbTitle from "../../../components/ZgbTitle.vue";
import { resultOption } from "@/const/project-manage/index.js";
import { selectHistory } from "@/api/project-manage/planList";
import { ctstatus } from "../../../api/plan-project/plan-month";
export default {
  components: {
    ZgbTitle,
  },
  props: {
    changeStatus: "",
  },
  data() {
    return {
      tableData: [],
      resultOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      options: [],
      status: "",
    };
  },
  created() {
    this.selectHistory();
    this.ctstatus();
  },
  methods: {
    ctstatus() {
      ctstatus({
        type: "ct_status",
      }).then((res) => {
        this.options = res.data;
        this.options.forEach((item) => {
          if (item.value == this.changeStatus) {
            this.status = item.label;
          }
        });
      });
    },
    selectHistory() {
      const { id } = this.$route.query;
      selectHistory({
        id,
        size: this.page.pageSize,
        current: this.page.currentPage,
        type: "4",
      }).then((res) => {
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.selectHistory();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.selectHistory();
    },
  },
};
</script>

<style lang="scss" scoped>
.xinxi {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  .status {
    font-weight: 600;
    margin-bottom: 30px;
  }
  .result {
    display: flex;
  }
}
/deep/.avue-crud__header {
  min-height: 0px;
}
</style>