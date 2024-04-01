<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-12-25 17:32:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-12-25 18:20:47
-->
<template>
  <basic-container>
    <div style="height: 100vh; width: 100%" v-loading="loading">
      <signName
        ref="canvasChild"
        @isEmptyCanvas="isEmptyCanvas"
        @createData="createData"
      />
      <div class="sign-c-but">
        <div @click="resetSign" class="button b1" style="margin-top: 10vh">
          <span class="text">重写</span>
        </div>
        <div class="button b2" @click="next">
          <span class="text">提交</span>
        </div>
      </div>
    </div>
  </basic-container>
</template>
<script>
import signName from "@/components/signName/signName1";
import { uploadImg, catchSign } from "@/api/material1.js";
import { preventSavePhoto } from '@/util/util'
export default {
  components: {
    signName,
  },
  data() {
    return {
      show: true,
      loading: false
    };
  },
  methods: {
    //上传服务器
    createData(d) {
      let data = new FormData();
      console.log(d);
      data.append("file", d);
      this.loading = true
      console.log(data);
      uploadImg(data)
        .then((res) => {
          console.log(res);
          // if (preventSavePhoto(res.data.url)) {
          //   return this.loading = false
          // }
          let str = "";
          console.log('1111catchSign1', res.code);
          if (res.code == '0') {
            // this.back();
            str = res.data.url;
            let query = this.$route.query;
            console.log('1111catchSign', query, str);
            catchSign({
              url: str,
              uuid: query.uuid,
            })
              .then((resp) => {
                if (resp.code == "0") {
                  // this.$toast.success({
                  //   duration: 1000,
                  //   message: "签名上传成功",
                  //   forbidClick: true,
                  // });
                  this.loading = false
                  this.$message.success('签名上传成功')
                  // this.$router.push({
                  //   path: "/welSuccess",
                  // });
                } else {
                  this.loading = false
                  this.$message.error('签名上传失败')
                  // this.$toast.clear();
                  // this.$toast.error({
                  //   duration: 1000,
                  //   message: "签名上传失败",
                  //   forbidClick: true,
                  // });
                }
              })
              .catch((err) => {
                  this.loading = false
                  this.$message.error('签名上传失败')
                // this.$toast.clear();
                // this.$toast.error({
                //   duration: 1000,
                //   message: "签名上传失败",
                //   forbidClick: true,
                // });
              });
          } else {
            this.loading = false
            // this.$toast.fail(res.msg);
          }
        })
        .catch((err) => {
          this.loading = false
          // this.$toast.clear();
        });
    },
    back() {
      this.show = false;
    },
    resetSign() {
      this.$refs.canvasChild.overwrite();
    },
    next() {
      this.$refs.canvasChild.isEmptyCanvas();
    },
    isEmptyCanvas(type) {
      type ? this.$message.error('请签字') : this.$refs.canvasChild.save();
    },
  },
};
</script>
<style lang="scss">
.sign-c-but {
  position: fixed;
  bottom: 0px;
  height: 100vh;
  display: flex;
  left: 10px;
  flex-direction: column;
  width: 44px;
  .button {
    width: 100%;
    // height: 60%;
    color: #3e7bf7;
    position: relative;
    .text {
      height: 40vh;
      line-height: 40vh;
      margin-left: 0.6vh;
      display: inline-block;
      transform: rotate(90deg);
    }
  }
  .b1 {
    border: 1px solid #3e7bf7;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
  }
  .b2 {
    background: #ebf1fe;
    border-left: 1px solid #3e7bf7;
    border-right: 1px solid #3e7bf7;
    border-bottom: 1px solid #3e7bf7;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
  }
}
.r-write {
  .comfire-but {
    & > div {
      width: 50%;
      font-size: 17px;
      height: 40px;
      line-height: 40px;
    }
  }
  .sign-img {
    height: 180px;
    img {
      height: 100%;
    }
  }
  .title {
    margin: 0 12px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
