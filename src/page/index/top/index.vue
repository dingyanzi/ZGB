<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <span class="title">购买社会组织服务管理系统</span>
    </div>
    <div class="top-bar__right">
      <img class="top-bar__img" :src="userInfo.avatar" />
      <el-dropdown>
        <span class="el-dropdown-link" style="color: #fff">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">{{ $t("navbar.dashboard") }}</router-link>
          </el-dropdown-item>
          <!-- <el-dropdown-item>
            <router-link to="/info/index">{{
              $t("navbar.userinfo")
            }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/setting">{{
              $t("navbar.setting")
            }}</router-link>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="logout" divided>{{
            $t("navbar.logOut")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { resetRouter } from "@/router/router";
import { mapGetters, mapState } from "vuex";
import {
  fullscreenToggel,
  listenfullscreen,
  redirectProtalLoginPage,
} from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from "./top-search";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topColor from "./top-color";
import topNotice from "./top-notice";
import topLang from "./top-lang";
export default {
  components: {
    topLock,
    topMenu,
    topSearch,
    topTheme,
    topLogs,
    topColor,
    topNotice,
    topLang,
  },
  name: "top",
  data() {
    return {};
  },
  filters: {},
  created() {},
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showDebug: (state) => state.common.showDebug,
      showTheme: (state) => state.common.showTheme,
      showLock: (state) => state.common.showLock,
      showFullScren: (state) => state.common.showFullScren,
      showCollapse: (state) => state.common.showCollapse,
      showSearch: (state) => state.common.showSearch,
      showMenu: (state) => state.common.showMenu,
      showColor: (state) => state.common.showColor,
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
    ]),
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          resetRouter();
          process.env.NODE_ENV == "development"
            ? this.$router.push({ path: "/login" })
            : redirectProtalLoginPage();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
