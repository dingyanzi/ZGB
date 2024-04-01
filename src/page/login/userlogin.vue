<template>
  <el-form
    ref="loginForm"
    :rules="loginRules"
    :model="loginForm"
    class="login-form"
    status-icon
    label-width="0"
  >
    <el-form-item prop="userAccount">
      <el-input
        v-model="loginForm.userAccount"
        size="small"
        auto-complete="off"
        placeholder="请输入用户名"
        @keyup.enter.native="handleLogin"
      >
        <i slot="prefix" class="icon-yonghu" />
      </el-input>
    </el-form-item>

    <el-form-item prop="passWord">
      <el-input
        :type="passwordType"
        v-model="loginForm.passWord"
        size="small"
        auto-complete="off"
        placeholder="请输入密码"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="suffix"
          class="el-icon-view el-input__icon"
          @click="showPassword"
        />
        <!--<router-link to="/forgetlogin" slot="suffix">
          <a href="#" class="alink" style="padding-left:8px;">忘记密码？</a>
        </router-link>-->
        <i slot="prefix" class="iconfont icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="verCode">
      <el-row :span="24">
        <el-col :span="16">
          <el-input
            maxlength="4"
            v-model="loginForm.verCode"
            size="small"
            auto-complete="off"
            placeholder="请输入验证码"
            @keyup.enter.native="handleLogin"
          >
            <i slot="prefix" class="icon-yanzhengma" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img :src="code.src" class="login-code-img" @click="refreshCode" />
            <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        class="login-submit"
        @click.native.prevent="handleLogin"
        >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { randomLenNum } from "@/util/util";
import { getCode } from "@/api/login";
export default {
  name: "userlogin",
  data() {
    return {
      loginForm: {
        userAccount: "",
        passWord: "",
        verCode: "",
        uuid: "",
      },
      checked: false,
      code: {
        src: "",
        value: "",
      },
      loginRules: {
        userAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" },
        ],
        verCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      passwordType: "password",
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tagWel"]),
  },
  props: [],
  methods: {
    refreshCode() {
      this.loginForm.verCode = "";
      this.loginForm.uuid = randomLenNum(this.code.len, true);
      getCode(this.loginForm.uuid).then((response) => {
        this.code.src = response.data;
      });
    },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.tagWel.value });
            })
            .catch(() => {
              this.refreshCode();
            });
        }
      });
    },
    verifySuccess(params) {
      this.loginForm.code = params.captchaVerification;
      this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
        this.$router.push({ path: this.tagWel.value });
      });
    },
  },
};
</script>

<style>
</style>
