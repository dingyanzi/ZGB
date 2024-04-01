<template>
  <div
    id="boxArea"
    ref="selectMonths"
    style="width: 200px !important; float: left; margin-left: 20px"
    class="selectMonthBoxSquare rel clearFixed"
  >
    <el-popover
      v-model="visible"
      placement="bottom"
      width="250"
      trigger="click"
    >
      <el-input
        slot="reference"
        v-model="inputValue"
        class="inputStyle"
        type="text"
        :disabled="disabled"
        size="small"
        :placeholder="placeholder"
        readonly
        @focus="showBox = true"
      >
        <i slot="prefix" class="el-input__icon el-icon-date"></i>
        <i
          v-if="showClear"
          slot="suffix"
          class="el-input__icon el-icon-circle-close clearIconStyle"
          @click="resetMonth"
        ></i>
      </el-input>

      <div class="selectContentBox">
        <div class="contentArea">
          <div
            class="flex flex-wrap flex-around"
            style="padding: 15px 0; border-bottom: 1px solid #e5e5e5"
          >
            <div
              v-if="curIndex == DateList.length - 1"
              class="cursor el-icon-d-arrow-left"
              style="width: 15%; color: gray"
            />
            <div
              v-else
              class="cursor el-icon-d-arrow-left"
              style="width: 15%"
              @click="reduceYear"
            />
            <div>{{ OneY }}年</div>
            <div
              v-if="curIndex == 0"
              class="cursor t-r el-icon-d-arrow-right"
              style="width: 15%; color: gray"
            />
            <div
              v-else
              class="cursor t-r el-icon-d-arrow-right"
              style="width: 15%"
              @click="addYear"
            />
          </div>

          <div class="conterList">
            <el-checkbox-group
              v-model="optTime[curIndex].queryTime"
              class="flex flex-wrap"
              @change="onChange"
            >
              <el-row class="monthRow">
                <el-col
                  v-for="(item, index) in DateList[curIndex].queryTime"
                  :key="index"
                  :span="6"
                  class="monthCol"
                >
                  <el-checkbox
                    :class="[
                      {
                        today:
                          item === currentM &&
                          curIndex === (DateList.length - 1) / 2,
                      },
                      'onSelect flex-x-center',
                    ]"
                    :label="`${DateList[curIndex].TimeYear}-${
                      item <= 9 ? `0${item}` : item
                    }`"
                  >
                    {{ monthMap[item] }}月
                  </el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
        </div>

        <div class="buttonBox t-r">
          <el-button
            class="buttonStyle"
            size="mini"
            plain
            @click.stop="resetMonth"
            >重置</el-button
          >
          <el-button
            class="buttonStyle"
            size="mini"
            type="primary"
            plain
            @click.stop="handleSubmit"
            >确定</el-button
          >
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "SelectMonths",
  props: {
    placeholder: {
      type: String,
      default: "请选择查询月份",
    },
    disabled: "",
    effectTime: "",
  },
  data() {
    return {
      DateList: [], // 年份月份数组
      optTime: [], // 月份选中结果数组
      OneY: "", // 当前年份
      currentM: "", // 当前月份
      curIndex: 0, // 当前年份下标值
      optTimes: [], // 点击月份时的所有选中结果
      resultTimes: [], // 点击“确定”按钮后的选择结果
      showBox: false, // 是否显示月份选择弹框
      visible: false,
      inputValue: "", // 输入框的绑定值
      showClear: false, // 是否显示输入框右边的“清空”小图标
      monthMap: {
        // 月份显示为中文
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
        10: "十",
        11: "十一",
        12: "十二",
      },
    };
  },
  created() {
    this.init();
  },
  mounted() {
    // 点击弹框外的任意位置关闭区域弹窗
    document.addEventListener("click", (e) => {
      // 获取弹窗对象
      const boxArea = document.getElementById("boxArea");
      // 判断弹窗对象中是否包含点击对象
      if (boxArea && !boxArea.contains(e.target)) {
        // 判断当前选中月份与上次点击“确定”按钮时的选择结果是否一致
        const equalArr =
          this.resultTimes.sort().toString() ===
          this.optTimes.sort().toString();
        if (!equalArr) {
          // 如果不一致（因为是多选，所以必须是点击了“确定”按钮后才能进行查询）：
          // 将选择结果恢复到上次点击“确定”按钮时的结果
          this.optTimes = this.resultTimes;
          // 将输入框的值恢复到上次点击“确定”按钮时的值
          this.inputValue = this.optTimes.join(",");
          // 根据输入框是否有值来判断清空图标是否渲染
          this.showClear = !!this.inputValue !== "";
          // 将月份选中结果恢复到上次点击“确定”按钮时的选中月份
          const _opt = this.resultTimes.map((v) => {
            return v.substring(0, 4);
          });
          for (const item in this.optTime) {
            this.optTime[item].queryTime = [];
            _opt.map((items, indexs) => {
              if (items === this.optTime[item].TimeYear) {
                this.optTime[item].queryTime.push(this.resultTimes[indexs]);
              }
            });
          }
        }
        // 关闭弹框
        this.showBox = false;
      }
    });
  },
  methods: {
    // 初始化数据，获取前20年，然后循环 每一年里面都有12个月的 得到数组 opTime 和 DateList
    init() {
      const _this = this;
      const _opt = [];
      const _optTime = [];
      const arr = new Array(12);
      const optDate = this.getDateList();
      optDate.map((item, index) => {
        // 月份选择时el-checkbox-group绑定的值
        _optTime[index] = {
          TimeYear: item.value,
          queryTime: [],
        };
        // 给每一年份设置12个月份，el-checkbox初始化显示时使用
        _opt[index] = {
          TimeYear: item.value,
          queryTime: [],
        };
        for (let i = 1; i <= arr.length; i++) {
          _opt[index].queryTime.push(i);
        }
      });
      _this.optTime = _optTime;
      _this.DateList = _opt;
      _this.curIndex = (_this.DateList.length - 1) / 2;
      // console.log('_this.curIndex', _this.curIndex)
    },
    // 获取近20年年份列表，倒序排列，最新一年在最前面
    getDateList() {
      const Dates = new Date();
      const year = Dates.getFullYear();
      this.OneY = year;
      this.currentM = Dates.getMonth() + 1;
      const startyear = Dates.getFullYear() - 20;
      const endyear = Dates.getFullYear() + 20;
      const Years = [];
      for (let i = startyear; i <= endyear; i++) {
        const currentYear = { key: i, value: i };
        Years.push(currentYear);
      }
      return Years.reverse();
    },
    // 确定
    handleSubmit() {
      const _this = this;
      // 更新输入框的值
      _this.inputValue = _this.optTimes.join(",");
      // 根据输入框是否有值来判断清空图标是否渲染
      _this.showClear = !!_this.inputValue !== "";
      // 将点击“确定”按钮的选择结果保存起来（该值将在哪里使用：在点击弹框以外区域关闭弹框时使用，mounted中）
      _this.resultTimes = _this.optTimes;
      // 关闭弹框
      _this.showBox = false;
      _this.visible = false;
      _this.$emit("submitBtn", _this.resultTimes);
    },
    // 重置
    resetMonth() {
      const _this = this;
      // 将年份重置到当前年份
      const Dates = new Date();
      const year = Dates.getFullYear();
      _this.OneY = year;
      _this.curIndex = (_this.DateList.length - 1) / 2;
      // 将已选择的月份清空
      _this.optTimes = [];
      for (const i in _this.optTime) {
        _this.optTime[i].queryTime = [];
      }
      // 将输入框清空
      _this.inputValue = "";
      // 根据输入框是否有值来判断清空图标是否渲染，此处必然不渲染
      this.showClear = false;
      // 将点击“确定”按钮的选择结果清空
      _this.resultTimes = [];
      // 关闭月份选择弹框
      _this.showBox = false;
      _this.visible = false;
      _this.$emit("resetBtn", _this.resultTimes);
    },
    // 左上角年份减少
    reduceYear() {
      const _this = this;
      // 如果已经是最后一年了，则年份不能再减少了
      if (_this.curIndex === _this.DateList.length - 1) return;
      // 当前下标值+1，根据下标值获取年份值
      _this.curIndex = _this.curIndex + 1;
      _this.OneY = _this.DateList[_this.curIndex].TimeYear;
    },
    // 左上角年份增加
    addYear() {
      const _this = this;
      // 如果已经是当前年份了，则年份不能再增加了
      if (_this.curIndex === 0) return;
      // 当前下标值-1，根据下标值获取年份值
      _this.curIndex = _this.curIndex - 1;
      _this.OneY = _this.DateList[_this.curIndex].TimeYear;
    },
    // 选择月份
    onChange() {
      const _this = this;
      // 遍历optTime中已选择的月份，将已选结果塞到optTimes数组中
      const _opt = _this.optTime;
      const arr = [];
      for (const item in _opt) {
        if (_opt[item].queryTime.length > 0)
          _opt[item].queryTime.filter((v) => {
            arr.push(v);
          });
      }
      _this.optTimes = arr;
      // 更新输入框的值
      _this.inputValue = _this.optTimes.join(",");
      // 根据输入框是否有值来判断清空图标是否渲染
      _this.showClear = !!_this.inputValue !== "";
    },
  },
  watch: {
    effectTime: {
      handler(val) {
        if (val) {
          this.inputValue = val;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-around {
  justify-content: space-around;
}
.flex-x-center {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.selectMonthBoxSquare {
  // width: 250px;
  width: 100%;
  .selectContentBox {
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 2021;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    .contentArea {
      width: 330px;
    }
  }
}

.inputStyle {
  width: 100%;
}
.clearIconStyle {
  display: none;
}
.inputStyle:hover .clearIconStyle {
  display: block;
}
.conterList {
  .monthCol {
    .today {
      color: #1890ff;
    }
  }
  .onSelect {
    // width: 25% !important;
    padding: 3px 0;
    margin: 20px 0 !important;
  }
}
::v-deep .el-checkbox__input {
  display: none !important;
}
::v-deep .el-checkbox__label {
  padding-left: 0px !important;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fff;
}
label.el-checkbox.onSelect.flex-x-center.is-checked {
  background: #409eff;
  width: 50px;
  border-radius: 15px;
}
.lableStyle {
  font-size: 14px;
}
.el-button--mini {
  padding: 5px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.buttonBox {
  border-top: 1px solid #e5e5e5;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>