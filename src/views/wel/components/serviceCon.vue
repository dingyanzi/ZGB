<template>
  <div class="cotentCon">
    <div class="topTitles">
      <div class="left">
        <img src="../../../styles/images/index_c.png">服务对象人数统计(人)
      </div>
      <div class="right">
        <div class="desc"><span class="round rounda"></span>目标服务:<span><b>{{ dataObj.personNumTotal }}</b>人</span></div>
        <div class="desc"><span class="round roundb"></span>已服务:<span><b>{{ dataObj.numberBeneficiariesTotal
              }}</b>人</span></div>
      </div>
    </div>
    <div class="conBox">
     
      <el-table class="tableS" stripe :data="tableData" height="240" :border="false" :cell-style="{ border: 0 + 'px' }">
        <el-table-column prop="name" label="名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="personNum" label="目标数">
        </el-table-column>
        <el-table-column prop="numberBeneficiaries" label="已服务人数">
        </el-table-column>
        <el-table-column prop="percentage" label="进度">
          <template slot-scope="scope">
            <el-progress :percentage="Number(scope.row.percentage)" class="gradient-progress"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'serviceCon',
  props: {
    dataArr: {
      type: Array,
      default: () => { [] }
    },
    dataObj: {
      type: Object,
      default: () => { { } }
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  watch: {
    dataArr: {
      handler(val) {
        if (val) {
          this.tableData = val;
        }
      }
    },
    // dataObj: {
    //   handler(val) {
    //     if (val) {
    //       this.dataObj = val;
    //     }
    //   }
    // }
  },
  mounted() {
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      }
      return '';
    }
  }
}
</script>

<style lang="scss" scoped>
//服务对象统计
.topTitles {
  display: flex;
  align-items: center;
  font-size: 14px;

  color: #333333;
  margin: 0 10px 10px 10px;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    font-weight: 600;

    img {
      padding-right: 10px;
      width: 20px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .desc {
      display: flex;
      align-items: center;
      color: #666;

      &:first-child {
        margin-right: 20px;
      }

      b {
        font-size: 18px;
      }
    }

    .round {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      display: block;
      margin-right: 5px;
    }

    .rounda {
      background: #81C1FE;
    }

    .roundb {
      background: #7CDC31;
    }
  }
}

.cotentCon {
  background: #fff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  padding: 15px 0;
  // margin-bottom: 20px;
  border-radius: 10px;

  .conBox {
    width: 95%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
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

.tableS {
  width: 100%;
}

/deep/ .el-table th {
  padding: 8px 0;
  color: #333;
}

/deep/ .gradient-progress .el-progress-bar__inner {
  background-image: linear-gradient(to right, #6EADFD, #B3F9FF);
}

/deep/ .el-progress-bar__outer {
  background: #E4F3FF;
}

/deep/ .has-gutter th {
  background: #E4F3FF;
}

/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgba(228, 243, 255, 0.30)
}

/deep/ .el-table::before {
  background: none;
}
</style>
