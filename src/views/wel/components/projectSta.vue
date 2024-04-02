<template>
  <div class="cotentCon">
    <div class="topTitle"><img src="../../../styles/images/index_a.png">项目统计</div>
    <el-row class="conBox">
      <el-col class="con">
        <img src="../../../styles/images/index_a_1.png">
        <div class="desc">
          <div class="numbers"><b>10</b>个</div>
          <div class="name">项目数</div>
        </div>
      </el-col>
      <el-col class="con">
        <img src="../../../styles/images/index_a_2.png">
        <div class="desc">
          <div class="numbers"><b>10</b>个</div>
          <div class="name">项目数</div>
        </div>
      </el-col>
      <el-col class="con">
        <img src="../../../styles/images/index_a_3.png">
        <div class="desc">
          <div class="numbers"><b>10</b>个</div>
          <div class="name">项目数</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'projectSta',
  props: {
    icon: {
      type: String,
    },
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
//项目统计
.cotentCon {
  background: #fff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  padding: 15px 0;
  border-radius: 10px;

  .conBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .con {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    border-radius: 5px;
    background: linear-gradient(to bottom, #E1FCFF 2%, transparent 100%);

    img {
      padding-right: 10%;
      width: 40px;
    }
  }

  .desc {
   

    .numbers {
      font-size: 12px;
      color: #666666;
    }

    b {
      color: #000;
      font-size: 18px;
      padding-right: 5px;
    }

    .name {
      font-size: 12px;
      color: #666666;
    }
  }
}
</style>
