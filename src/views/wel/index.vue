<template>
  <div class="home" style="width: 100%">
    <div>
      <div class="topCon">
        年份：
        <el-select filterable class="el-select" v-model="yearValue" multiple placeholder="">
          <template slot="prefix">
            <span class="iconRi">
              <img src="../../styles//images/index_rili.png" />
            </span>
          </template>
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
import * as echarts from "echarts";
import projectSta from "./components/projectSta.vue";
import projectMon from "./components/projectMon.vue";
import serviceCon from "./components/serviceCon.vue";
import moneyCon from "./components/moneyCon.vue";
let dataAxis = ['项目一', '项目二', '项目三', '项目四', '项目五', '项目六', '项目七'];
let data = [70, 82, 92, 100, 77, 93, 55];
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
      loading: true,
      selectTab: 0,
      yearValue: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "黄金糕",
        },
        {
          value: "选项4",
          label: "双皮奶",
        },
        {
          value: "选项5",
          label: "黄金糕",
        },
        {
          value: "选项6",
          label: "双皮奶",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.echartsInitA();
    this.echartsInitB(0);
  },
  methods: {
    tabItem(index) {
      this.selectTab = index;
      this.echartsInitB(index);
    },
    echartsInitA() {
      const myChart = echarts.init(document.getElementById('echartsA')); //初始化容器
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
      const myChart = echarts.init(document.getElementById('echartsB')); //初始化容器
      const option = {
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 100, name: '政府购买' },
              { value: 580, name: '青少年服务' },
              { value: 484, name: '福利慈善' },
              { value: 300, name: '社会组织发展' },
              { value: 300, name: '其它' },
              { value: 300, name: '助残服务' }
            ],
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                        // 这里定义特殊文本的样式
                        return '{a|' + params.name + '} {b|' + params.value + '} {str|' + str + '}';
                    },
                    rich: {
                        // 在这里定义具体的样式
                        a: {
                            color: '#333',
                            fontSize: 12
                        },
                        b: {
                            fontSize: 16
                        },
                        str:{
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
};
</script>

<style lang="scss">
.home {
  padding: 10px;
  background: linear-gradient(180deg, #ecf4ff 0%, #f2fdf8 100%);
  // height: calc(100vh);
  padding-bottom: 40px;
}

.topCon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.el-select .iconRi {
  color: #fff;
  display: block;
  // padding: 13px 0 0 5px;
  padding-left:5px ;
}

.el-select {
  background-image: linear-gradient(to right, #6eadfd, #b3f9ff);
  border-radius: 5px;
}

.el-select .el-input .el-input__inner {
  background: none;
  border: none;
  // padding-right: 0px;
}
.el-select .el-input__prefix{
  display: flex;
  align-items: center;
}

.el-select .el-select__input {
  color: #fff;
}

.el-select .el-select__tags {
  padding-left: 30px;
  max-width: none !important;
}

.el-select .el-tag.el-tag--info {
  // background: none;
  // border: none;
  // color: #fff;
  // margin: 0;
  // height: auto;
  // padding-right: 0px;
  // padding-left: 0;
  font-size: 14px;
}

// .el-tag.el-tag--info .el-tag__close {
//   display: none;
// }

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
      background: linear-gradient(90deg, rgba(110, 173, 253, 0.20) , rgba(140, 220, 227, 0) );
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
