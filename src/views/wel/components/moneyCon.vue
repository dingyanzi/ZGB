<template>
  <div class="cotentCon">
    <div class="topTitles">
      <div class="left">
        <img src="../../../styles/images/index_b.png">资金使用情况统计(万元)
      </div>
    </div>
    <div class="conBox">
      <el-table class="tableS" stripe :data="tableData" height="200" :border="false" :cell-style="{ border: 0 + 'px' }">
        <el-table-column prop="projectName" label="名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="price" label="总金额">
        </el-table-column>
        <el-table-column prop="subtotal" label="已支金额">
        </el-table-column>
        <el-table-column prop="percentage" label="进度">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percentage" class="gradient-progress"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moneyCon',
  props: {
    dataArr: {
      type: Array,
      default: () => { [] }
    },
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
//资金使用情况
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
    font-size: 18px;
    img {
      padding-right: 10px;
      width: 20px;
    }
  }
}

//项目统计
.cotentCon {
  background: #fff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  padding: 15px 0;
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
      font-size: 16px;
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
  font-size: 16px;
}

/deep/ .gradient-progress .el-progress-bar__inner {
  background-image: linear-gradient(to right, #F9C694, #FFE9AE);
}

/deep/ .el-progress-bar__outer {
  background: #FFF4E4;
}

/deep/ .has-gutter th {
  background: #FFF4E4;
}
/deep/ .el-table--enable-row-transition .el-table__body td{
  font-size: 16px;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgba(228, 243, 255, 0.30)
}

/deep/ .el-table::before {
  background: none;
}
</style>
