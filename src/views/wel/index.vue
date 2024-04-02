<template>
  <div class="home" style="width: 100%">
    <div>
      <div class="topCon">
        年份：
        <el-select v-model="yearValue" multiple placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-row :gutter="10">
        <el-col :span="14">
          <projectSta></projectSta>
        </el-col>
        <el-col :span="10">
          <projectMon></projectMon>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="14">
          <div class="scheduleCon">
            <div class="topTitle"><img src="../../styles/images/index_a.png">项目进度</div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="projectType">
            <div class="topTitles">
              <div class="left">
                <img src="../../styles/images/index_a.png">项目类型统计
              </div>
              <div class="right">
                <div :class="[selectTab == 0 ? 'active' : 'normal']" @click="tabItem(0)">按项目数量</div>
                <div :class="[selectTab == 1 ? 'active' : 'normal']" @click="tabItem(1)">按项目资金</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <serviceCon></serviceCon>
        </el-col>
        <el-col :span="12">
          <moneyCon></moneyCon>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import projectSta from "./components/projectSta.vue";
import projectMon from "./components/projectMon.vue";
import serviceCon from "./components/serviceCon.vue";
import moneyCon from "./components/moneyCon.vue";
export default {
  components: {
    projectSta,
    projectMon,
    serviceCon,
    moneyCon
  },
  name: "wel",
  data() {
    return {
      loading: true,
      selectTab: 0,
      yearValue: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }]
    };
  },
  computed: {},
  created() { },
  methods: {
    tabItem(index) {
      this.selectTab = index
    }
  },
};
</script>

<style lang="scss">
.home {
  padding: 10px;
  background: linear-gradient(180deg, #ECF4FF 0%, #F2FDF8 100%);
  height: calc(100vh);
}

.topCon {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.topTitle {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin: 0 10px 10px 10px;

  img {
    padding-right: 10px;
    width: 20px;
  }
}

//项目进度
.scheduleCon,
.projectType {
  background: #fff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  padding: 15px 0;
  border-radius: 10px;
}

//项目类型统计
.topTitles {
  display: flex;
  align-items: center;
  font-size: 14px;

  color: #333333;
  margin: 0 10px 10px 10px;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    font-weight: 600;

    img {
      padding-right: 10px;
      width: 20px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    div {
      cursor: pointer;

      &:first-child {
        margin-right: 10px;
      }
    }

    .normal {
      padding: 5px;
      background: linear-gradient(140deg, #DEEBFA 0%, #8CDCE3 100%);
      border-radius: 2px;
      font-size: 12px;
      color: #999999;


    }

    .active {
      padding: 4px 5px;
      background: linear-gradient(140deg, #6EADFD 0%, #8CDCE3 100%);
      border-radius: 2px;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
