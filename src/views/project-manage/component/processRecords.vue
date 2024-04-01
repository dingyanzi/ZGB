<template>
  <div>
    <ZgbTitle titleName="数据信息"></ZgbTitle>
    <div class="xinxi">
      <div class="status" v-if="type != 'add'">
        当前状态：<span style="font-weight: 500">审核不通过</span>
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
import { resultOption } from "@/const/project-manage/planChange.js";
import { selectHistory } from "@/api/project-manage/planList";
export default {
  components: {
    ZgbTitle,
  },
  data() {
    return {
      tableData: [],
      resultOption,
      type: "",
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
    };
  },
  created() {
    this.selectHistory();
  },
  methods: {
    // 审核记录
    selectHistory() {
      const { type, id } = this.$route.query;
      this.type = type;
      selectHistory({
        size: this.page.pageSize,
        current: this.page.currentPage,
        type: "4",
        id,
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