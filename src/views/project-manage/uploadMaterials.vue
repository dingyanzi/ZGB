<template>
  <basic-container>
    <div style="margin-bottom: 15px; padding-left: 20px">
      <span style="color: #7f7f7f">项目名称：</span>
      <span>{{ projectName }}</span>
    </div>
    <div class="bigbox">
      <div class="left">
        <div class="jie">项目阶段</div>
        <div
          :class="getStyle(item)"
          v-for="(item, index) in leftOrder"
          :key="index"
          @click="changeShow(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="right">
        <div class="zhu">
          注：材料格式支持：.doc/.docx/.pdf/.xls/.xlsx/.jpg/.jpeg
        </div>
        <prepare :tableData1="tableData1" v-show="show1"></prepare>
        <approval :tableData2="tableData2" v-show="show2"></approval>
        <tenders :tableData3="tableData3" v-show="show3"></tenders>
        <procure :tableData4="tableData4" v-show="show4"></procure>
        <conclude :tableData5="tableData5" v-show="show5"></conclude>
        <implement :tableData6="tableData6" v-show="show6"></implement>
        <acceptance :tableData7="tableData7" v-show="show7"></acceptance>
      </div>
    </div>
  </basic-container>
</template>

<script>
import prepare from "./material/prepare.vue";
import approval from "./material/approval.vue";
import tenders from "./material/tenders.vue";
import procure from "./material/procure.vue";
import conclude from "./material/conclude.vue";
import implement from "./material/implement.vue";
import acceptance from "./material/acceptance.vue";
import { getCtFile } from "@/api/project-manage/planList";
export default {
  components: {
    prepare,
    approval,
    tenders,
    procure,
    conclude,
    implement,
    acceptance,
  },
  data() {
    return {
      // 左边7个表单
      leftOrder: [
        {
          label: "项目筹备",
          value: "1",
          changeshow: true,
        },
        {
          label: "项目立项",
          value: "2",
          changeshow: false,
        },
        {
          label: "项目招标",
          value: "3",
          changeshow: false,
        },
        {
          label: "项目采购",
          value: "4",
          changeshow: false,
        },
        {
          label: "合同签订",
          value: "5",
          changeshow: false,
        },
        {
          label: "项目实施",
          value: "6",
          changeshow: false,
        },
        {
          label: "项目验收",
          value: "7",
          changeshow: false,
        },
      ],
      // 下面的1-7是点击7个表单控制右边上传不同材料的显隐
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      projectName: "",
      bigType: "1",
      // 1-7指的是右面起个表格的值
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
    };
  },
  created() {
    this.getCtFile();
    this.projectName = this.$route.query.projectName;
  },
  methods: {
    // 根据选择不同的类，获取右边的值
    getCtFile() {
      const { projectId } = this.$route.query;
      getCtFile({
        projectId,
        bigType: this.bigType,
      }).then((res) => {
        if (this.bigType == "1") {
          this.tableData1 = res.data;
        } else if (this.bigType == "2") {
          this.tableData2 = res.data;
        } else if (this.bigType == "3") {
          this.tableData3 = res.data;
        } else if (this.bigType == "4") {
          this.tableData4 = res.data;
        } else if (this.bigType == "5") {
          this.tableData5 = res.data;
        } else if (this.bigType == "6") {
          this.tableData6 = res.data;
        } else if (this.bigType == "7") {
          this.tableData7 = res.data;
        }
      });
    },
    // 选择菜单的时候控制方法
    changeShow(_item) {
      this.leftOrder = this.leftOrder.map((it) => {
        if (_item.value == it.value) {
          this.$set(it, "changeshow", true);
          this.bigType = it.value;
          this.getCtFile();
          if (it.label == "项目筹备") {
            this.show1 = true;
          } else {
            this.show1 = false;
          }
          if (it.label == "项目立项") {
            this.show2 = true;
          } else {
            this.show2 = false;
          }
          if (it.label == "项目招标") {
            this.show3 = true;
          } else {
            this.show3 = false;
          }
          if (it.label == "项目采购") {
            this.show4 = true;
          } else {
            this.show4 = false;
          }
          if (it.label == "合同签订") {
            this.show5 = true;
          } else {
            this.show5 = false;
          }
          if (it.label == "项目实施") {
            this.show6 = true;
          } else {
            this.show6 = false;
          }
          if (it.label == "项目验收") {
            this.show7 = true;
          } else {
            this.show7 = false;
          }
        } else {
          this.$set(it, "changeshow", false);
        }
        return it;
      });
    },
  },
  computed: {
    getStyle() {
      return (item) => {
        if (item.changeshow == true) {
          return "selectActive";
        } else {
          return "select";
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.bigbox {
  display: flex;
  height: 100vh;
  width: 100%;
  .left {
    width: 14%;
    border: 2px solid #f0f2f5;
    .jie {
      width: 88%;
      font-weight: 600;
      font-size: 16px;
      float: right;
      height: 45px;
      line-height: 45px;
      padding-left: 20px;
    }
    .select {
      width: 88%;
      float: right;
      font-weight: 600;
      font-size: 16px;
      height: 45px;
      line-height: 45px;
      padding-left: 20px;
      &:hover {
        border-top: 1px solid #e9e9e9;
        border-left: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        color: #409eff;
      }
    }
    .selectActive {
      width: 88%;
      float: right;
      font-weight: 600;
      font-size: 16px;
      height: 45px;
      line-height: 45px;
      padding-left: 20px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      color: #fff;
      background: #66b1ff;
    }
  }
  .right {
    flex: 1;
    border-top: 2px solid #f0f2f5;
    border-right: 2px solid #f0f2f5;
    border-bottom: 2px solid #f0f2f5;
    .zhu {
      margin-top: 20px;
      margin-left: 20px;
      font-size: 15px;
      color: red;
    }
  }
}
</style>