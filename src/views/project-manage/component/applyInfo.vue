<template>
  <div>
    <ZgbTitle titleName="申请变更的描述"></ZgbTitle>
    <avue-form ref="plan" :option="planOption" v-model="planForm"></avue-form>
    <ZgbTitle titleName='影响分析（如没有，请填写"无"）'></ZgbTitle>
    <avue-form
      ref="refuse"
      :option="refuseOption"
      v-model="refuseForm"
    ></avue-form>
    <ZgbTitle titleName="签字"></ZgbTitle>
    <div class="qian">
      <div class="hang1">
        请使用手机扫描二维码：
        <!-- <el-button type="primary" @click="goSign" size="small">签字</el-button> -->
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
  </div>
</template>

<script>
import ZgbTitle from "../../../components/ZgbTitle.vue";
import { planOption, refuseOption } from "@/const/project-manage/planChange.js";
import { getPic, getSign } from "../../../api/project-manage/list";
import { getUpdatePlan } from "@/api/project-manage/planList";
export default {
  components: {
    ZgbTitle,
  },
  data() {
    return {
      planOption,
      refuseOption,
      planForm: {},
      refuseForm: {},
      startUid: Math.floor(Math.random() * 100), //进入页面随机生成一个数字
      previousRandom: null,
      currentRandom: null,
      imgSrc: "",
      imgSrc1: "",
      imgShow: false,
    };
  },
  created() {
    this.getPic();
    const { type } = this.$route.query;
    // 判断如果是编辑状态，调取详情接口
    if (type == "edit") {
      this.getUpdatePlan();
    }
  },

  methods: {
    goSign() {
      let routeData = this.$router.resolve({
        name: "sign",
        query: {
          uuid: this.startUid,
        },
      });
      window.open(routeData.href, "_blank");
    },
    // 获取计划变更的详情
    getUpdatePlan() {
      const { id } = this.$route.query;
      getUpdatePlan({
        id,
      }).then((res) => {
        this.planForm.changeContant = res.data.changeContant;
        this.planForm.changeNotes = res.data.changeNotes;
        this.planForm.changeNotesBefore = res.data.changeNotesBefore;
        this.planForm.status = res.data.status;
        this.planForm.id = res.data.id;
        this.refuseForm.progressEffect = res.data.progressEffect;
        this.refuseForm.costEffect = res.data.costEffect;
        this.refuseForm.resourceEffect = res.data.resourceEffect;
        this.refuseForm.otherEffort = res.data.otherEffort;
        this.$emit("plan", this.planForm);
      });
    },
    // 获取二维码
    getPic() {
      getPic({
        uuid: this.startUid,
      }).then((res) => {
        this.imgSrc = res.data;
        this.imgShow = false;
      });
    },
    // 刷新二维码
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
    // 我已签字接口
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
  },
};
</script>

<style lang="scss" scoped>
.qian {
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hang1 {
    margin-top: 20px;
    font-weight: bold;
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
    margin-right: 15px;
    color: #27a2d8;
    font-size: 15px;
    cursor: pointer;
  }
}
</style>