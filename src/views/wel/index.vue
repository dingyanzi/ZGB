<template>
  <div
    class="home"
    v-loading="loading"
    element-loading-text="欢迎使用购买社会组织服务管理系统~"
    element-loading-spinner="el-icon-loading"
    style="width: 100%"
  >
    <div class="home-loading flex">
      <!-- <div v-for='(item,index) in data' :style='{"background":index==0?"#db2f00":index==1?"#ff6d37":index==2?"#ffa489":"#99d3d4"}' :key='index' class="text-center">{{item}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "wel",
  data() {
    return {
      loading: true,
      data: ["欢", "迎", "使", "用"],
    };
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style scoped="scoped" lang="scss">
.home {
  background: #fff;
  height: calc(100vh - 116px);
  /deep/.el-icon-loading {
    display: none;
  }
  .home-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -140px;
    margin-top: -55px;
    padding: 60px 0;
    overflow: hidden;
    & > div {
      font-size: 21px;
      width: 70px;
      height: 70px;
      color: #fff;
      border-radius: 100%;
      line-height: 70px;
      margin: 0 5px;
      /* &:after{
        content: '';
    position: absolute;
    bottom: -20px;
    left: 18px;
    width: 37px;
    height: 11px;
    background: #322b27;
    border-radius: 100%;
      } */
      &:first-child {
        animation: bounce 1.5s infinite ease-in-out;
        animation-delay: 0ms;
      }
      &:nth-child(2) {
        animation: bounce 1.5s infinite ease-in-out;
        animation-delay: 50ms;
      }
      &:nth-child(3) {
        animation: bounce 1.5s infinite ease-in-out;
        animation-delay: 100ms;
      }
      &:last-child {
        animation: bounce 1.5s infinite ease-in-out;
        animation-delay: 150ms;
      }
    }
  }
}
/* @keyframes bouncefirst{
  0% {
    transform: translateX(0px);
}
20% {
    transform: translateX(-50px);
}
25% {
    transform: translateX(-50px);
}
50% {
    transform: translateX(100px);
}
80%, 100% {
    transform: translateX(0px);
}
} */
@keyframes bounce {
  0% {
    transform: translateY(-150px);
  }
  20% {
    transform: translateY(30px);
  }
  30% {
    transform: translateY(-10px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(150px);
  }
}
</style>

<style lang="scss">
.home {
  .el-icon-loading {
    font-size: 40px;
  }
  .el-loading-text {
    font-size: 30px;
  }
}
</style>
