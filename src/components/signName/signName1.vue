<template>
  <!-- 签名模板-->
  <div class="singBox">
    <!-- <img class="img" src="./images/signBg.png" alt="" srcset="" /> -->
    <div class="img">请在此区域内横屏签字</div>
    <canvas
      class="myCanvas"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      style="background: #f2f5fa !important"
      ref="canvasF"
    ></canvas>
  </div>
</template>
<script>
import { dataURLtoFile, isCanvasBlank, showCanvasImg } from "@/util/util";
export default {
  data() {
    return {
      canvasTxt: null,
      startX: 0,
      startY: 0,
      isDown: false,
      fixedWidth: 0,
    };
  },
  methods: {
    touchStart(ev) {
      // this.writeHandel(this.canvasTxt, '')
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - 60,
          y: ev.targetTouches[0].clientY - 40,
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.fillStyle = "#fff";
        this.canvasTxt.lineWidth = 3;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.isDown = true;
      }
    },
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - 60,
          y: ev.targetTouches[0].clientY - 40,
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - 60,
          y: ev.targetTouches[0].clientY - 40,
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.isDown = false;
      }
    },
    //清空画布
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      // this.writeHandel(this.canvasTxt, '请在此区域内横屏签字')
    },
    //更改背景色
    setBackground() {
      var imageData = this.canvasTxt.getImageData(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      for (var i = 0; i < imageData.data.length; i += 4) {
        // 当该像素是透明的，则设置成白色
        if (imageData.data[i + 3] == 0) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 255;
        }
      }
      this.canvasTxt.putImageData(imageData, 0, 0);
    },
    // 生成图片
    save() {
      this.setBackground();
      var that = this;
      let imgBase64 = this.$refs.canvasF.toDataURL("image/png");
      var p3 = new Image();
      p3.src = imgBase64;
      p3.onload = function () {
        var w = p3.width;
        var h = p3.height;
        that.canvas2 = document.createElement("canvas");
        that.canvas2.setAttribute(
          "style",
          "width:" + h + "px;" + "height:" + w + "px"
        );
        that.canvas2.width = h;
        that.canvas2.height = w;
        that.canvasTxt2 = that.canvas2.getContext("2d");
        that.canvasTxt2.rotate((3 * 90 * Math.PI) / 180);
        that.canvasTxt2.drawImage(p3, -w, 0); //绘制原始大小图
        let imgBase65 = that.canvas2.toDataURL("image/png");
        let data = dataURLtoFile(imgBase65, "sign_img.png");
        that.$emit("createData", data);
        // this.writeHandel(this.canvasTxt, '请在此区域内横屏签字')
      };
    },
    //是否为空画布
    isEmptyCanvas() {
      this.$emit("isEmptyCanvas", isCanvasBlank(this.$refs.canvasF));
    },
    //回显图片
    showCanvasImg() {
      showCanvasImg(
        this.canvasTxt,
        // "http://59.83.223.48:28090/lottery/43084b65d7904a31a82f08dc77086083.png",
        this.fixedWidth
      );
    },
    // 绘制提示文字
    writeHandel(ctx, str) {
      /*3.确定画布的中心*/
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      ctx.save();
      /*5.绘制文本*/
      ctx.beginPath();
      // ctx.strokeStyle = '#fff';
      var x0 = w / 2;
      var y0 = h / 2;
      /*注意：起点位置在文字的左下角*/
      /*有文本的属性  尺寸 字体  左右对齐方式  垂直对齐的方式*/
      ctx.font = "36px Microsoft YaHei";
      /*左右对齐方式 (center left right start end) 基准起始坐标*/
      ctx.textAlign = "center";
      /*垂直对齐的方式 基线 baseline(top,bottom,middle) 基准起始坐标*/
      ctx.textBaseline = "middle";
      // ctx.fillStyle = 'transform: rotate(90deg);'
      // ctx.direction = 'rtl';
      ctx.translate(x0, y0 - 20);
      ctx.rotate(0.5 * Math.PI);

      ctx.fillStyle = "#ccc";
      ctx.fillText(str, 0, 0);
      ctx.restore();
    },
  },
  mounted() {
    let canvas = this.$refs.canvasF;
    let w = window.innerWidth - 80;
    this.fixedWidth = w;
    let h = window.innerHeight - 80;
    canvas.setAttribute(
      "style",
      "width:" +
        w +
        "px;" +
        "height:" +
        h +
        "px;" +
        "margin-left:60px;background:rgba(204,204,204,0.2);"
    );
    canvas.width = w;
    canvas.height = h;
    this.canvasTxt = canvas.getContext("2d");
    this.showCanvasImg();
    // this.writeHandel(this.canvasTxt, '请在此区域内横屏签字')
  },
};
</script>
<style lang="scss" scoped>
.singBox {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
  background-size: 100% 100%;
  position: relative;
  .img {
    position: absolute;
    font-size: 30px;
    color: #cbcbcb;
    transform: rotate(90deg) translateY(-20px);
    // transform: rotate(90deg) translate(27%, 70%);
  }
  .myCanvas {
    height: 100%;
    width: 100%;
    position: absolute;
    border: 1px solid #9ebdf8;
    border-radius: 10px;
    // background: red;
    // padding: 40px 10px;
  }
}
div,
canvas {
  box-sizing: border-box;
}
</style>
