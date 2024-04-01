<template>
  <div>
    <avue-form ref="detail" :option="detailOption" v-model="detailForm">
      <template slot="mubiaoLabel" slot-scope="{ column }">
        <span style="color: red">*</span>{{ (column || {}).label }}:
      </template>
      <template slot="mubiao" slot-scope="{}">
        <div v-for="(form, index) in formBlocks" :key="index">
          <div class="demo-ruleForm">
            <div
              v-if="disabled == false && formBlocks.length > 1"
              style="width: 100%; text-align: right"
            >
              <i
                @click="delct(index)"
                class="el-icon-delete"
                style="margin-right: 10px; color: #409eff"
              ></i>
            </div>
            <el-form
              :model="form"
              :rules="rules"
              ref="ctForm"
              label-width="100px"
            >
              <el-form-item label="绩效目标" prop="performance">
                <el-input
                  v-model="form.performance"
                  :disabled="disabled"
                  placeholder="请输入绩效目标"
                ></el-input>
              </el-form-item>
              <el-form-item
                style="width: 30%; margin-top: 20px"
                label="量化指标"
                prop="indexZb"
              >
                <div style="display: flex">
                  <el-input
                    :disabled="disabled"
                    style="width: 100px"
                    v-model="form.indexZb"
                    placeholder="量化指标"
                  ></el-input>
                  <el-select
                    :disabled="disabled"
                    style="width: 90px !important"
                    v-model="form.unit"
                  >
                    <el-option
                      v-for="item in unitOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                style="width: 100%; margin-top: 20px"
                label="实施时间"
                prop="effectTime"
              >
                <div style="display: flex">
                  <div style="width: 40%">
                    <el-radio
                      @change="changeTime('1', form)"
                      :disabled="disabled"
                      v-model="form.effectTime"
                      label="1"
                      >按月</el-radio
                    >
                    <el-radio
                      @change="changeTime('2', form)"
                      :disabled="disabled"
                      v-model="form.effectTime"
                      label="2"
                      >按周</el-radio
                    >
                    <el-radio
                      @change="changeTime('3', form)"
                      :disabled="disabled"
                      v-model="form.effectTime"
                      label="3"
                      >按日</el-radio
                    >
                    <el-radio
                      :disabled="disabled"
                      v-model="form.effectTime"
                      label="4"
                      >全周期</el-radio
                    >
                  </div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="form.effectTimeMonth"
                    placement="bottom"
                  >
                    <SelectMonths
                      v-if="form.effectTime === '1'"
                      ref="selectMonths"
                      :disabled="disabled"
                      v-model="form.effectTimeMonth"
                      :effectTime="form.effectTimeMonth"
                      placeholder="请选择月份"
                      @submitBtn="(val) => submitBtn(val, index)"
                      @resetBtn="resetBtn"
                    />
                  </el-tooltip>
                  <div class="zong" v-if="form.effectTime === '2'">
                    <div
                      class="weeks1"
                      v-if="type == 'detail' || type == 'audit'"
                    >
                      <div class="kuang">
                        <el-tag
                          v-for="(tag, cindex) in form.effectTimeWeekList || []"
                          :key="cindex"
                          style="margin-left: 5px"
                        >
                          {{ tag }}
                        </el-tag>
                      </div>
                    </div>
                    <div
                      class="weeks"
                      v-else-if="
                        (form.effectTime === '2' && type == 'add') ||
                        (form.effectTime === '2' && type == 'edit')
                      "
                    >
                      <div class="kuang">
                        <el-tag
                          v-for="(tag, cindex) in form.effectTimeWeekList || []"
                          :key="cindex"
                          style="margin-left: 5px"
                          closable
                          @close="handleClose(tag, index)"
                        >
                          {{ tag }}
                        </el-tag>
                      </div>
                      <el-date-picker
                        class="time"
                        style="width: 220px !important"
                        v-model="form.weekValue"
                        type="week"
                        format="yyyy 第 WW 周"
                        @change="(e) => handleDateChange(e, index)"
                        :picker-options="{ firstDayOfWeek: 1 }"
                        placeholder="选择周"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="timeDayFn(form.effectTimeDay)"
                    placement="bottom"
                  >
                    <el-date-picker
                      :disabled="disabled"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      style="width: 250px !important; margin-left: 20px"
                      v-if="form.effectTime === '3'"
                      type="dates"
                      v-model="form.effectTimeDay"
                      placeholder="选择一个或多个日期"
                    >
                    </el-date-picker>
                  </el-tooltip>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button
          @click="addTable"
          v-if="disabled == false"
          style="width: 100%; border: 1px solid #409eff; color: #409eff"
          >添加</el-button
        >
      </template>
    </avue-form>
  </div>
</template>

<script>
import { dateFormat } from "@/util/date";
import { detailOption } from "@/const/project-manage/projectList.js";
import SelectMonths from "@/components/SelectMonths";
import { unit } from "../../../api/project-manage/list";
export default {
  props: {
    disabled: "",
    tableform: {
      type: Object,
      default: () => {},
    },
    ctTargets: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SelectMonths,
  },
  data() {
    return {
      tags: [],
      textarea: "",
      detailOption,
      formBlocks: [
        {
          performance: "",
          indexZb: "",
          effectTime: "1",
          effectTimeMonth: "",
          effectTimeWeekList: [],
          effectTimeDay: "",
          weekValue: "",
          unit: "1",
        },
      ],
      detailForm: {},
      FormData: [],
      rules: {
        performance: [
          { required: true, message: "请输入绩效目标", trigger: "blur" },
        ],
        // programme: [
        //   { required: true, message: "请输入实施方案", trigger: "blur" },
        // ],
        indexZb: [
          { required: true, message: "请输入量化指标", trigger: "blur" },
        ],
        effectTime: [
          { required: true, message: "请选择实施时间", trigger: "blur" },
        ],
      },
      options: [
        {
          label: "第一周",
          value: "1",
        },
        {
          label: "第二周",
          value: "2",
        },
        {
          label: "第三周",
          value: "3",
        },
        {
          label: "第四周",
          value: "4",
        },
        {
          label: "第五周",
          value: "5",
        },
      ],
      unitOptions: [],
      monthShow: true,
      weekShow: false,
      dayShow: false,
      monthsValue: "",
      weekStr: "",
      type: "",
      weeks: "",
      detailShow: false,
    };
  },
  created() {
    this.unit();
    const { type } = this.$route.query;
    this.type = type;
  },
  methods: {
    handleDateChange(value, _index) {
      // 处理选中日期的操作
      let correctedDate = new Date(value.getTime() + 24 * 60 * 60 * 1000);
      let date = dateFormat(correctedDate);
      let time = date.split(" ");
      let time1 = time[0].split("-");
      let year = time1[0];
      let month = time1[1];
      let day = time1[2];
      let weekString = this.getMonthWeekString(year, month, day);
      this.formBlocks.forEach((item, index) => {
        if (item.effectTime == "2" && index == _index) {
          if (item.effectTimeWeekList.includes(weekString) == true) {
            this.$message({
              message: "当前周已选过！",
              type: "warning",
            });
          } else {
            item.effectTimeWeekList.push(weekString);
          }
        }
      });
    },
    handleClose(tag, _index) {
      this.formBlocks.forEach((item, index) => {
        if (item.effectTime == "2" && index == _index) {
          item.effectTimeWeekList.splice(
            item.effectTimeWeekList.indexOf(tag),
            1
          );
          if (item.effectTimeWeekList.length == 0) {
            item.weekValue = "";
          }
        }
      });
    },
    delct(_index) {
      if (this.formBlocks.length > 1) {
        this.formBlocks.splice(_index, 1);
      } else {
        this.$message({
          message: "当前数据不可删除！",
          type: "warning",
        });
      }
    },
    handleChange(value, form) {
      if (value) {
        this.weekStr = value.toString();
      }
    },
    // 格式化第几月第几周
    getMonthWeekString(year, month, day) {
      var targetDate = new Date(year, month - 1, day);
      // 获取目标日期所在月份的第一天
      var firstDayOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1
      );
      // 获取目标日期所在月份的第一天是星期几 (0-6, 0代表星期日)
      var firstDayOfWeek = firstDayOfMonth.getDay();
      // 计算第一周的起始日期 (如果第一天不是星期日)
      if (firstDayOfWeek > 0) {
        firstDayOfMonth.setDate(1 - firstDayOfWeek);
      }
      // 计算目标日期与第一周起始日期之间的天数差
      var daysDiff = Math.floor(
        (targetDate - firstDayOfMonth) / (24 * 60 * 60 * 1000)
      );
      // 计算周数 (向上取整)
      var weekNumber = Math.ceil((daysDiff + 1) / 7);
      return year + "年" + month + "月第" + weekNumber + "周";
    },
    // 表单验证
    changeTime(newV, form) {
      if (newV == "1") {
        form.effectTimeMonth = form.effectTimeMonth;
      } else {
        form.effectTimeMonth = "";
      }
      if (newV == "2") {
        form.effectTimeWeekList = form.effectTimeWeekList;
        form.weekValue = "";
      } else {
        form.effectTimeWeekList = [];
        form.weekValue = "";
      }
      if (newV == "3") {
        form.effectTimeDay = form.effectTimeDay;
      } else {
        form.effectTimeDay = "";
      }
    },
    unit() {
      unit().then((res) => {
        console.log(res.data);
        this.unitOptions = res.data;
      });
    },
    submitBtn(val, i) {
      const months = JSON.parse(JSON.stringify(val));
      const monthsArr = months.map((item) => {
        // return item.concat("-01");
        return item;
      });
      this.formBlocks.forEach((item, index) => {
        if (index == i) {
          item.effectTimeMonth = monthsArr.join(",");
        }
      });
    },
    resetBtn() {
      this.monthsValue = null;
    },
    addTable() {
      this.formBlocks.push({
        performance: "",
        indexZb: "",
        effectTime: "1",
        effectTimeMonth: "",
        effectTimeWeekList: [],
        effectTimeDay: "",
        weekValue: "",
        unit: "1",
      });
    },
  },
  watch: {
    disabled: {
      handler(val) {
        if (val == true) {
          this.detailOption.disabled = true;
        } else {
          this.detailOption.disabled = false;
        }
      },
      immediate: true,
      deep: true,
    },
    ctTargets: {
      handler(val) {
        if (val) {
          let arr = val;
          let newArray = arr.map((obj) => {
            return {
              ...obj,
              effectTimeMonth:
                obj.effectTime == "1" ? obj.effectTimeMonth : null,
              effectTimeWeekList:
                obj.effectTime == "2" ? obj.effectTimeWeekList : [],
              effectTimeDay:
                obj.effectTime == "3"
                  ? obj.effectTimeDay.split(",").map((item) => item.trim())
                  : null,
              weekValue: "",
            };
          });
          this.formBlocks = newArray;
        }
      },
      immediate: true,
      deep: true,
    },
    tableform: {
      handler(val) {
        if (val && Object.keys(val).length > 0) {
          this.detailForm = {
            ...val,
          };
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    timeDayFn() {
      return (_day) => {
        if (_day) {
          let day = _day.join();
          return day;
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  border: 1px solid #97caff;
  padding: 5px 20px 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.el-tag.el-tag--info {
  color: #333;
}
.zong {
  width: 60%;
  .weeks {
    // margin-left: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    .kuang {
      width: 280px;
      height: 40px;
      line-height: 40px;
      overflow-y: scroll;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      /deep/.el-tag {
        height: 30px;
        padding: 0 2px;
      }
    }
  }
  .weeks1 {
    margin-left: 20px;
    .kuang {
      width: 280px;
      height: 40px;
      line-height: 40px;
      overflow-y: scroll;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      /deep/.el-tag {
        height: 30px;
        padding: 0 2px;
      }
    }
  }
}
</style>