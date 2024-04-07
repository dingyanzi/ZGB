<template>
  <div class="home" style="width: 100%">
    <div>
      <div class="topCon">
        年份：
        <el-select filterable collapse-tags class="autoWidth" v-model="yearValue" multiple placeholder=""
          @change="selectChange">
          <template slot="prefix">
            <span class="iconRi">
              <img src="../../styles//images/index_rili.png" />
            </span>
          </template>
          <el-option v-for="item in annualsArr" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <el-row :gutter="10">
        <el-col :span="14">
          <projectSta :dataObj="objectStatistic"></projectSta>
        </el-col>
        <el-col :span="10">
          <projectMon :dataObj="objectPrice"></projectMon>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="14">
          <div class="scheduleCon">
            <div class="topTitle">
              <img src="../../styles/images/index_a.png" />项目进度
            </div>
            <div id="echartsA" class="charts"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="projectType">
            <div class="topTitles">
              <div class="left">
                <img src="../../styles/images/index_a.png" />项目类型统计
              </div>
              <div class="right">
                <div :class="[selectTab == 0 ? 'active' : 'normal']" @click="tabItem(0)">
                  按项目数量
                </div>
                <div :class="[selectTab == 1 ? 'active' : 'normal']" @click="tabItem(1)">
                  按项目资金
                </div>
              </div>
            </div>
            <div id="echartsB" class="charts"></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <serviceCon :dataArr="projectPersonNumList" :dataObj="projectPersonObj"></serviceCon>
        </el-col>
        <el-col :span="12">
          <moneyCon :dataArr="sumProjectSubtotalByProjectIdPrice"></moneyCon>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAnnuals, getIndex } from '@/api/index'
import * as echarts from "echarts";
import projectSta from "./components/projectSta.vue";
import projectMon from "./components/projectMon.vue";
import serviceCon from "./components/serviceCon.vue";
import moneyCon from "./components/moneyCon.vue";
export default {
  components: {
    projectSta,
    projectMon,
    serviceCon,
    moneyCon,
  },
  name: "wel",
  data() {
    return {
      selectTab: 0,
      yearValue: [],
      annualsArr: [],
      objectStatistic: {},//项目统计
      objectPrice: {},//项目资金
      projectPersonNumList: [],//服务对象人数统计
      projectPersonObj: { numberBeneficiariesTotal: 0, personNumTotal: 0 },//服务对象总数
      sumProjectSubtotalByProjectIdPrice: [],//资金使用情况
      objectProgress: [],//项目进度统计
      projectTypeNum: [],//项目类型数量统计
      projectTypePrice: [],//项目类型金额统计
      value: [],
      a: []
    };
  },
  mounted() {
    this.getAnnualsList();
  },
  methods: {
    //查询年度
    getAnnualsList() {
      getAnnuals({
        queryUserId: this.userInfo.userId,
        queryOrgan: this.userInfo.orgId
      }).then(res => {
        this.annualsArr = res.data;
        this.yearValue.push(res.data[0]);
        this.getIndexFun()
      })
    },
    selectChange() {
      this.getIndexFun();
    },
    //查询首页数据
    getIndexFun() {
      getIndex({
        queryUserId: this.userInfo.userId,
        queryOrgan: this.userInfo.orgId,
        annuals: this.yearValue.length == 0 ? this.annualsArr[0] : this.yearValue.join(',')
      }).then(res => {
        if (res.code == '0') {
          this.objectStatistic = res.data.objectStatistic;
          this.objectPrice = res.data.objectPrice;
          this.projectPersonNumList = res.data.projectPersonNumList;
          this.projectPersonObj.numberBeneficiariesTotal = res.data.numberBeneficiariesTotal;
          this.projectPersonObj.personNumTotal = res.data.personNumTotal;
          this.sumProjectSubtotalByProjectIdPrice = res.data.sumProjectSubtotalByProjectIdPrice;
          this.objectProgress = res.data.objectProgress;
          this.projectTypePrice = res.data.projectTypePrice;
          this.projectTypeNum = res.data.projectTypeNum;
          if (res.data.objectProgress) {
            this.echartsInitA(res.data.objectProgress.objectProgressKey, res.data.objectProgress.objectProgressValue);
          }
          if (this.projectTypePrice.length > 0) {
            this.echartsInitB(0);
          }
        }
      })
    },
    tabItem(index) {
      this.selectTab = index;
      this.echartsInitB(index);
    },
    echartsInitA(dataAxis, data) {
      const myChart = echarts.init(document.getElementById('echartsA'));
      const option = {
        xAxis: {
          data: dataAxis,
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#999'
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %',
            color: '#999'
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#6EADFD",
                  },
                  {
                    offset: 1,
                    color: "#B3F9FF",
                  }
                ])
              },
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%',
              color: '#2C81FF',
            },
            data: data
          }
        ]
      };
      myChart.setOption(option);
    },
    echartsInitB(index) {
      const str = index == 0 ? '个' : '万元';
      let data = index === 0 ? this.projectTypePrice : this.projectTypeNum;
      const myChart = echarts.init(document.getElementById('echartsB'));
      const option = {
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            data: data,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return '{a|' + params.name + '} {b|' + params.value + '} {str|' + str + '}';
                },
                rich: {
                  a: {
                    color: '#333',
                    fontSize: 12
                  },
                  b: {
                    fontSize: 16
                  },
                  str: {
                    fontSize: 12
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                color: function (colors) {
                  var colorList = [
                    '#83D0EF',
                    '#73A0FA',
                    '#73DEB3',
                    '#94A7C8',
                    '#FFCD3B',
                    '#00C6FF'
                  ];
                  return colorList[colors.dataIndex];
                }
              },
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="scss">
.home {
  padding: 10px;
  background: linear-gradient(180deg, #ecf4ff 0%, #f2fdf8 100%);
  padding-bottom: 40px;
  // height: calc(100vh);
}

.topCon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.autoWidth .iconRi {
  color: #fff;
  display: block;
  padding-left: 5px;
}

.autoWidth {
  background-image: linear-gradient(to right, #6eadfd, #b3f9ff);
  border-radius: 5px;
}

.autoWidth .el-input .el-input__inner {
  background: none;
  border: none;
  // padding-right: 0px;
}

.autoWidth .el-input__prefix {
  display: flex;
  align-items: center;
}

.autoWidth .el-select__tags {
  padding-left: 30px;
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
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
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
      background: linear-gradient(90deg, rgba(110, 173, 253, 0.20), rgba(140, 220, 227, 0));
      border-radius: 4px;
      font-size: 12px;
      color: #999999;
    }

    .active {
      padding: 4px 5px;
      background: linear-gradient(90deg, #6eadfd 0%, #8cdce3 100%);
      border-radius: 4px;
      font-size: 12px;
      color: #fff;
    }
  }
}

.charts {
  width: 100%;
  height: 40vh;
}
</style>
