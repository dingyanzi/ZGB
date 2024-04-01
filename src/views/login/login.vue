<template>
  <!--    免登陆页面-->
  <div class=""></div>
</template>
<script>
import { removeToken, setToken } from "@/util/auth";
export default {
  data() {
    return {};
  },
  created() {
    removeToken();
    let route = this.$route;
    let token = route.query.token;
    let url = route.query.url;
    let queryForm = {};
    this.$store.commit("DEL_ALL_TAG");
    this.$store.commit("SET_TOKEN", token);
    for (let k in route.query) {
      if (k != "url" && k != "token") {
        queryForm[k] = route.query[k];
      }
    }
    let queryParams = JSON.stringify({ url: url, query: queryForm });
    sessionStorage.setItem("sessionToken", queryParams);
    this.$store
      .dispatch("GetUserInfo")
      .then((res) => {
        console.log(12121);
        this.$router.replace("/");
      })
      .catch(() => {
        console.log(34343);
        this.$store.dispatch("FedLogOut").then(() => {
          this.$router.replace("/login");
        });
      });
  },
  methods: {
    getUrlParam(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      console.log(window.location.search);
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>