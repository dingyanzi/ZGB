<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-30 11:23:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-08 15:23:08
-->
<template>
  <div class="iframBox">
    <template v-if="filesList.length > 0">
      <div class="iframItem">
        <iframe class="ifram" :src="filesList" frameborder="0"></iframe>
      </div>
    </template>
    <template v-else>
      <div class="empty">
        <i
          class="el-icon-document"
          size="60"
          style="margin-bottom: 20px; font-size: 40px"
        ></i>
        暂无审批表
      </div>
    </template>
  </div>
</template>

<script>
import { selectFile } from "@/api/project-manage/list";
export default {
  name: "applayFile",
  props: {},
  // 侦听器
  watch: {},
  // 组件
  components: {},
  created() {
    this.selectFile();
  },
  data() {
    return {
      params: {},
      filesList: "",
    };
  },
  // 方法
  methods: {
    setFile(file) {
      this.filesList = file;
    },
    selectFile() {
      const { id } = this.$route.query;
      selectFile({
        confId: this.$aesEncrypt(11),
        dictId: this.$aesEncrypt(60010211),
        cusId: this.$aesEncrypt(id),
      }).then((res) => {
        this.filesList = res.data.fileUrl;
      });
    },
  },
  // 计算属性
  computed: {},
};
</script> 

<style scoped lang="scss">
.iframBox {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100vh;
  overflow: hidden;
  .iframItem {
    flex: 1;
    height: 100%;
    .ifram {
      width: 100%;
      height: 100%;
    }
  }
  .empty {
    display: flex;
    flex-direction: column;
    width: 50%;
    min-height: 200px;
    align-items: center;
    justify-content: center;
  }
}
</style>
