<template>
  <div class="cotentCon">
    <div class="topTitle"><img src="../../../styles/images/index_b.png">项目资金</div>
    <el-row class="conBox">
      <el-col class="con">
        <img src="../../../styles/images/index_b_1.png">
        <div class="desc">
          <div class="numbers"><b>{{ dataObj.totalPrice==null?0:dataObj.totalPrice }}</b>万元</div>
          <div class="name">项目总金额</div>
        </div>
      </el-col>
      <el-col class="con">
        <img src="../../../styles/images/index_b_2.png">
        <div class="desc">
          <div class="numbers"><b>{{ dataObj.expenditureAmount==null?0:dataObj.expenditureAmount }}</b>万元</div>
          <div class="name">已支金额总计</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'projectSta',
  props: {
    dataObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
//项目资金
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
    width: 46%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    border-radius: 5px;
    background: linear-gradient(to bottom, #FEF1D7 2%, transparent 100%);

    img {
      padding-right: 20px;
      width: 18%;
    }
  }

  .desc {
   

    .numbers {
      font-size: 20px;
      color: #666666;
    }

    b {
      color: #000;
      font-size: 28px;
      padding-right: 5px;
    }

    .name {
      font-size: 20px;
      color: #666666;
    }
  }
}
</style>
