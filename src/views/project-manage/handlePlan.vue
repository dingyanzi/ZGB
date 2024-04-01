<template>
  <basic-container>
    <div class="box">
      <div style="margin-bottom: 15px; padding-left: 20px">
        <span style="color: #7f7f7f">项目名称：</span>
        <span>{{ projectName }}</span>
      </div>
      <avue-tabs :option="option" @change="handleChange"></avue-tabs>
      <span v-if="type.prop === 'tab1'">
        <applyInfo @plan="plan"></applyInfo>
      </span>
      <span v-if="type.prop === 'tab2'">
        <applayFile></applayFile>
      </span>
      <span v-else-if="type.prop === 'tab3'">
        <processRecords :changeStatus="changeStatus"></processRecords>
      </span>
      <div class="bottom" v-if="handleShow && handleType == 'handle'">
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="dialogVisible1 = true"
          >通过</el-button
        >
        <el-button
          type="danger"
          style="margin-left: 20px"
          @click="dialogVisible = true"
          >退回</el-button
        >
      </div>
    </div>
    <el-dialog
      v-if="dialogVisible1"
      title="通过"
      :visible.sync="dialogVisible1"
      width="35%"
    >
      <div class="qian">
        <div class="hang1">
          请使用手机扫描二维码：
          <!-- <el-button type="primary" @click="goSign" size="small"
            >签字</el-button
          > -->
        </div>
        <div class="tu1" v-if="imgShow == true">
          <img :src="imgSrc1" alt="" />
        </div>
        <div class="tu" v-else>
          <img :src="imgSrc" alt="" />
        </div>
        <div class="hang2" @click="linkFn">
          <i class="el-icon-refresh"></i>刷新二维码
        </div>
        <el-button type="primary" style="margin-right: 14px" @click="qianFn"
          >我已签字</el-button
        >
      </div>
      <div class="yi">
        <span>意见：</span>
        <el-input
          v-model="form1.yi"
          style="width: 300px"
          placeholder="请输入意见"
          type="textarea"
          :rows="2"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" :loading="subLoading" @click="passFn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-if="dialogVisible"
      title="退回原因"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="returnform" :rules="rules" ref="forms">
        <el-form-item label="退回原因：" prop="name">
          <el-input
            v-model="returnform.name"
            autocomplete="off"
            type="textarea"
            :rows="3"
            style="width: 300px"
            placeholder="请输入退回原因"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="exitLoad"
          @click="subfirmFn('forms')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import applyInfo from "./applycomponent/applyInfo.vue";
import processRecords from "./applycomponent/processRecords.vue";
import applayFile from "./applycomponent/applayFile.vue";
import { mapGetters } from "vuex";
import { getPic, getSign } from "@/api/project-manage/list";
import { applySuccess } from "@/api/project-manage/planList";
export default {
  components: {
    applyInfo,
    processRecords,
    applayFile,
  },
  data() {
    return {
      type: {},
      subLoading: false,
      exitLoad: false,
      option: {
        column: [
          {
            label: "申请信息",
            prop: "tab1",
          },
          {
            label: "申请审批表",
            prop: "tab2",
          },
          {
            label: "流程记录",
            prop: "tab3",
          },
        ],
      },
      handleType: "",
      projectName: "",
      dialogVisible: false,
      dialogVisible1: false,
      form: {},
      imgSrc: "",
      imgSrc1: "",
      imgShow: false,
      returnform: {},
      startUid: Math.floor(Math.random() * 100),
      previousRandom: null,
      currentRandom: null,
      rules: {
        name: [{ required: true, message: "请输入退回原因", trigger: "blur" }],
      },
      form1: {
        yi: "同意",
      },
      changeStatus: "",
    };
  },
  created() {
    this.type = this.option.column[0];
    const { type, id, projectName } = this.$route.query;
    this.handleType = type;
    this.projectName = projectName;
    this.getPic();
  },
  methods: {
    // pc端签字按钮的触发方法
    goSign() {
      let routeData = this.$router.resolve({
        name: "sign",
        query: {
          uuid: this.startUid,
        },
      });
      window.open(routeData.href, "_blank");
    },
    plan(data) {
      this.changeStatus = data.status;
    },
    // 获取二维码的图片
    getPic() {
      getPic({
        uuid: this.startUid,
      }).then((res) => {
        this.imgSrc = res.data;
      });
    },
    // 刷新二维码的方法
    linkFn() {
      this.previousRandom = this.currentRandom
        ? this.currentRandom
        : this.startUid;
      this.currentRandom = Math.floor(Math.random() * 100);
      getPic({
        olduuid: this.previousRandom,
        uuid: this.currentRandom,
      }).then((res) => {
        this.imgSrc = res.data;
        this.imgShow = false;
      });
    },
    // 我已签字按钮的方法
    qianFn() {
      getSign({
        uuid: this.currentRandom ? this.currentRandom : this.startUid,
      }).then((res) => {
        if (res.code == "0") {
          if (res.data) {
            this.imgShow = true;
            this.imgSrc1 = res.data;
            this.$emit("imgSrc", this.imgSrc1);
            this.$message({
              message: "签字成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "请前去扫码签字!",
              type: "error",
            });
          }
        }
      });
    },
    // 填写意见后的方法
    passFn() {
      this.subLoading = true;
      const { id, status, projectNo, projectId } = this.$route.query;
      if (this.imgSrc1) {
        let stu,
          citySign,
          areaSign,
          areaOpinion,
          cityOpinion = "";
        if (status == "1") {
          stu = "2";
          citySign = this.imgSrc1;
          cityOpinion = this.form1.yi;
        } else if (status == "2") {
          stu = "4";
          areaSign = this.imgSrc1;
          areaOpinion = this.form1.yi;
        }
        applySuccess({
          status: stu,
          projectNo,
          id,
          projectId,
          citySign,
          areaSign,
          cityOpinion,
          areaOpinion,
          uuid: this.currentRandom ? this.currentRandom : this.startUid,
        })
          .then((res) => {
            if (res.code == "0") {
              this.$message({
                message: "处理成功",
                type: "success",
              });
              this.dialogVisible1 = false;
              this.subLoading = false;
              this.$router.push({
                path: "/project-manage/planList",
              });
            }
          })
          .catch(() => {
            this.subLoading = false;
          });
      } else {
        this.subLoading = false;
        this.$message({
          message: "请先签字再通过!",
          type: "error",
        });
      }
    },
    handleChange(column) {
      this.type = column;
    },
    // 输入退回原因的校验方法
    subfirmFn(formName) {
      const { id, projectNo, projectId } = this.$route.query;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.exitLoad = true;
          applySuccess({
            status: "3",
            projectNo,
            id,
            projectId,
            notes: this.returnform.name,
          })
            .then((res) => {
              if (res.code == "0") {
                this.$message({
                  message: "退回成功",
                  type: "success",
                });
                this.dialogVisible = false;
                this.exitLoad = false;
                this.$router.push({
                  path: "/project-manage/planList",
                });
              }
            })
            .catch(() => {
              this.exitLoad = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "roleCodes"]),
    // 通过按钮和退回按钮的显隐
    handleShow() {
      return () => {
        if (row) {
          const { type, id, projectName, status } = this.$route.query;
          if (
            (this.roleCodes.includes("CT_XQF") && status == "1") ||
            (this.roleCodes.includes("CT_QSHR") && status == "2") ||
            (this.roleCodes.includes("CT_JGFZR") && status == "3")
          ) {
            return true;
          } else {
            return false;
          }
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-tabs__nav-scroll {
  background: #ecf6fa;
}
/deep/.avue-crud__header {
  min-height: 0px;
}
.box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bottom {
    background: pink;
    width: 89%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 99;
    text-align: center;
    .el-button {
      padding: 9px 20px;
    }
  }
}
.qian {
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hang1 {
    margin-top: 20px;
    font-weight: bold;
    color: #333;
  }
  .tu {
    width: 150px;
    height: 150px;
    margin-top: 20px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tu1 {
    width: 200px;
    height: 200px;
    margin-top: 20px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .hang2 {
    // font-size: 14px;
    margin-top: 15px;
    margin-bottom: 15px;
    color: #27a2d8;
    font-size: 15px;
    cursor: pointer;
  }
}
.yi {
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
</style>