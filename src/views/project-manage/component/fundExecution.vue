<template>
  <div>
    <div style="font-weight: bold; margin-top: 20px; margin-left: 10px">
      项目负责人:
    </div>
    <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
      <avue-crud ref="crud" :option="option" :data="ctProjectTeam">
        <template #nameHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #postHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
        <template #phoneHeader="{ column }">
          <span style="color: red">*</span>{{ (column || {}).label }}
        </template>
      </avue-crud>
    </div>
    <div style="font-weight: bold; margin-top: 20px; margin-left: 10px">
      项目执行团队:
    </div>
    <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
      <div v-for="(form, index) in ctExecutionTeamDetails" :key="index">
        <div class="form">
          <div
            v-if="disabled == false && ctExecutionTeamDetails.length > 1"
            style="width: 100%; text-align: right"
          >
            <i
              @click="delct(index)"
              class="el-icon-delete"
              style="margin-right: 10px; color: #409eff"
            ></i>
          </div>
          <el-form :model="form" ref="ctForm1" label-width="140px">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="姓名"
                  prop="name"
                  :rules="[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                  ]"
                >
                  <el-input
                    v-model="form.name"
                    :disabled="disabled"
                    placeholder="请输入姓名"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item
                  label="联系电话"
                  prop="phone"
                  :rules="[
                    {
                      required: true,
                      message: '请输入联系电话',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model="form.phone"
                    :disabled="disabled"
                    placeholder="请输入联系电话"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="是否缴纳社保"
                  prop="isSocial"
                  :rules="[
                    {
                      required: true,
                      message: '请选择是否缴纳社保',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-radio
                    :disabled="disabled"
                    v-model="form.isSocial"
                    label="1"
                    >是</el-radio
                  >
                  <el-radio
                    :disabled="disabled"
                    v-model="form.isSocial"
                    label="0"
                    >否</el-radio
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="学历" prop="education">
                  <el-select
                    style="width: 100% !important"
                    :disabled="disabled"
                    v-model="form.education"
                  >
                    <el-option
                      v-for="item in eduOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="专业" prop="speciality">
                  <el-input
                    v-model="form.speciality"
                    :disabled="disabled"
                    placeholder="请输入专业"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职务" prop="duties">
                  <el-input
                    v-model="form.duties"
                    :disabled="disabled"
                    placeholder="请输入职务"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目角色分工"
                  prop="role"
                  :rules="[
                    {
                      required: true,
                      message: '请输入项目角色分工',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model="form.role"
                    :disabled="disabled"
                    placeholder="请输入项目角色分工"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="社会工作职业资格"
                  prop="professionalQualifications"
                  :rules="[
                    {
                      required: true,
                      message: '请输入社会工作职业资格',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model="form.professionalQualifications"
                    :disabled="disabled"
                    placeholder="请输入社会工作职业资格"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="参与项目时间"
                  prop="projectTime"
                  :rules="[
                    {
                      required: true,
                      message: '请选择参与项目时间',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-date-picker
                    style="width: 100% !important"
                    v-model="form.projectTime"
                    type="date"
                    :disabled="disabled"
                    format="yyyy-MM-dd"
                    valueFormat="yyyy-MM-dd"
                    placeholder="请选择参与项目时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <!--  style="width: 250px !important" -->
          </el-form>
        </div>
      </div>
      <el-button
        style="
          width: 100%;
          margin-top: 10px;
          color: #409eff;
          border: 1px solid #409eff;
        "
        @click="addTable"
        v-if="disabled == false"
        plain
        >添加</el-button
      >
    </div>
  </div>
</template>

<script>
import { rule } from "@/util/validateRules";
import { fundOption } from "@/const/project-manage/projectList.js";
import { edulevel } from "../../../api/project-manage/list";
export default {
  props: {
    disabled: "",
    ctProjectTeamObj: {},
    ctExecutionTeam: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ctProjectTeam: [
        {
          name: "",
          post: "",
          phone: "",
          email: "",
          $cellEdit: true,
        },
      ],
      option: {
        addBtn: false,
        editBtn: false,
        addRowBtn: false,
        cellBtn: false,
        stripe: true,
        columnBtn: false,
        refreshBtn: false,
        menuWidth: 100,
        menu: false,
        column: [
          {
            label: "姓名",
            prop: "name",
            cell: true,
          },
          {
            label: "在该社会组织职务",
            prop: "post",
            placeholder: "请输入职务",
            cell: true,
          },
          {
            label: "手机",
            prop: "phone",
            cell: true,
            rules: [
              {
                validator: rule.validatorPhone,
                trigger: "blur",
              },
            ],
          },
          {
            label: "邮箱",
            prop: "email",
            cell: true,
          },
        ],
      },
      fundOption,
      ctExecutionTeamDetails: [
        {
          name: "",
          phone: "",
          isSocial: "",
          education: "",
          speciality: "",
          duties: "",
          role: "",
          professionalQualifications: "",
          projectTime: "",
        },
      ],
      TeamDetails: {},
      eduOptions: [],
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        isSocial: [
          { required: true, message: "请选择是否缴纳社保", trigger: "blur" },
        ],
        role: [
          { required: true, message: "请输入项目角色分工", trigger: "blur" },
        ],
        professionalQualifications: [
          {
            required: true,
            message: "请输入社会工作职业资格",
            trigger: "blur",
          },
        ],
        projectTime: [
          { required: true, message: "请选择参与项目时间", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.edulevel();
  },
  methods: {
    edulevel() {
      edulevel().then((res) => {
        this.eduOptions = res.data;
      });
    },
    addTable() {
      this.ctExecutionTeamDetails.push({
        name: "",
        phone: "",
        isSocial: "",
        education: "",
        speciality: "",
        duties: "",
        role: "",
        professionalQualifications: "",
        projectTime: "",
      });
    },
    delct(_index) {
      if (this.ctExecutionTeamDetails.length > 1) {
        this.ctExecutionTeamDetails.splice(_index, 1);
      } else {
        this.$message({
          message: "当前数据不可删除！",
          type: "warning",
        });
      }
    },
  },
  watch: {
    disabled: {
      handler(val) {
        if (val == true) {
          this.option.disabled = true;
          this.fundOption.disabled = true;
        }
      },
      immediate: true,
      deep: true,
    },
    ctProjectTeamObj: {
      handler(val) {
        if (val) {
          if (this.disabled == false) {
            let obj = {};
            obj.name = val.name;
            obj.post = val.post;
            obj.phone = val.phone;
            obj.email = val.email;
            obj.$cellEdit = true;
            let arr = [];
            arr.push(obj);
            this.ctProjectTeam = arr;
          } else {
            let obj = {};
            obj.name = val.name;
            obj.post = val.post;
            obj.phone = val.phone;
            obj.email = val.email;
            let arr = [];
            arr.push(obj);
            this.ctProjectTeam = arr;
          }
        }
      },
      immediate: true,
      deep: true,
    },
    ctExecutionTeam: {
      handler(val) {
        if (val) {
          this.ctExecutionTeamDetails = val;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
/deep/.avue-crud .el-table th {
  word-break: break-word;
  background-color: #e9f2ff;
}
.form {
  margin-top: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #7abbff;
  /deep/.el-input__inner {
    height: 30px;
    line-height: 30px;
  }
}
</style>