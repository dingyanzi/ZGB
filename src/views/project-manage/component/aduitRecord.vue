<template>
  <div>
    <ZgbTitle titleName="数据信息"></ZgbTitle>
    <div class="xinxi">
      <div class="status">
        <span style="width: 12%; display: inline-block; text-align: left"
          >创建人：</span
        >
        <span style="font-weight: 300; width: 85%">{{ createUserName }}</span>
      </div>
      <div class="status">
        <span style="width: 15%; display: inline-block; text-align: left">
          创建时间：</span
        >
        <span style="font-weight: 300; width: 80%">{{ createTime }}</span>
      </div>
    </div>
    <div class="result">
      <div style="font-weight: 600; width: 7%; text-align: left">
        变更记录：
      </div>
      <avue-crud
        style="width: 90%"
        :option="resultOption"
        :data="tableData"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page.sync="page"
      >
        <template slot="beforeTableq" slot-scope="{ row }">
          <span
            v-if="row.beforeTableq"
            style="color: #169bd5; font-weight: 600; cursor: pointer"
            @click="viewHandle(row)"
            >下载变更前计划书</span
          >
        </template>
      </avue-crud>
    </div>
    <div class="result">
      <div style="font-weight: 600; width: 7%; text-align: left">
        审核记录：
      </div>
      <avue-crud
        style="width: 90%"
        :option="aduitOption"
        :data="aduitData"
        @size-change="sizeChange1"
        @current-change="currentChange1"
        :page.sync="page1"
      >
      </avue-crud>
    </div>
  </div>
</template>

<script>
import { resultOption, aduitOption } from "@/const/project-plan/index.js";
import ZgbTitle from "../../../components/ZgbTitle.vue";
import {
  getUpdatePlanProjectId,
  selectHistory,
} from "@/api/project-manage/planList";
export default {
  props: {},
  components: {
    ZgbTitle,
  },
  props: {},
  data() {
    return {
      resultOption,
      aduitOption,
      tableData: [],
      aduitData: [],
      createUserName: "",
      createTime: "",
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      page1: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
    };
  },
  created() {
    this.getUpdatePlanProjectId();
    this.selectHistory();
  },
  methods: {
    // 变更记录
    getUpdatePlanProjectId() {
      const { id, createTime, createUserName } = this.$route.query;
      this.createUserName = createUserName;
      this.createTime = createTime;
      getUpdatePlanProjectId({
        id,
        size: this.page.pageSize,
        current: this.page.currentPage,
      }).then((res) => {
        this.tableData = res.data.records;
        this.page.total = res.data.total;
      });
    },
    viewHandle(item) {
      const { beforeTableq } = item;
      window.open(beforeTableq);
    },
    // 审核记录
    selectHistory() {
      const { id } = this.$route.query;
      selectHistory({
        id,
        size: this.page1.pageSize,
        current: this.page1.currentPage,
        type: "1",
      }).then((res) => {
        this.aduitData = res.data.records;
        this.page1.total = res.data.total;
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getUpdatePlanProjectId();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getUpdatePlanProjectId();
    },
    sizeChange1(val) {
      this.page1.currentPage = 1;
      this.page1.pageSize = val;
      this.selectHistory();
    },
    currentChange1(val) {
      this.page1.currentPage = val;
      this.selectHistory();
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.xinxi {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  .status {
    font-weight: 600;
    margin-bottom: 30px;
    width: 50%;
  }
}
.result {
  width: 95%;
  margin: 0 auto;
  display: flex;
  /deep/.avue-crud__header {
    min-height: 0px;
  }
}
</style>