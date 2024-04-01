<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-01 10:20:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-09-18 18:35:42
-->
<template>
  <div class="titleName" :style="{ background: bgColor, ...styleObj }">
    <div class="left">
      <span v-if="showTitle"><i class="icon">▍</i>{{ titleName }}</span>
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZgbTitle',
  props: {
    // 是否展示titleName
    showTitle: {
      type: Boolean,
      default: true
    },
    // titleName 名称
    titleName: {
      type: String,
      default: () => ''
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: () => '#f7f7f7'
    },
    // 其他样式
    styleObj: {}
  }
}
</script> 

<style scoped lang="scss">
  .titleName {
    width: 100%;
    height: 36px;
    line-height: 36px;
    margin: 5px 0;
    padding: 0 10px;
    box-sizing: border-box;
    padding-right: 30px;
    // background: #f7f7f7;
    color: #333333;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      color: #169bd5;
      margin-right: 4px;
    }
    i {
      font-style: normal;
    }
    .left {
      display: flex;
      align-items: center;
    }
  }
</style>
