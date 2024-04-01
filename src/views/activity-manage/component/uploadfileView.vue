<template>
    <div style="width: 95%; margin: 0 auto; margin-top: 10px">
      <avue-form :option="fileOption" v-model="form">
        <template slot-scope="{  }" slot="signUrl">
          <div class="pic"  v-for="(item, i) in fileList" :key="i">
            <div
              style=" margin-left: 10px;"
              class="fileStyle"
              @click="viewHandel(item)"
            >
              {{ item.name }}
            </div>
            <!-- <div>
              <el-button style="border: none; color:dodgerblue ;" size="small" @click="viewHandel(item)" v-show="item.hz == '.png' || item.hz == '.jpg' || item.hz == '.jpeg'">查 看</el-button>
              <el-button style="border: none; color:dodgerblue ;" size="small" @click="download(item)">下 载</el-button>
            </div> -->
          </div>
        </template>
        <template slot-scope="{  }" slot="imgUrl">
          <div class="pic"  v-for="(item, i) in fileListImg" :key="i">
            <div
              style=" margin-left: 10px;"
              class="fileStyle"
              @click="viewHandel(item)"
            >
              {{ item.name }}
            </div>
            <!-- <div>
              <el-button style="border: none; color:dodgerblue ;" size="small" @click="viewHandel(item)" v-show="item.hz == '.png' || item.hz == '.jpg' || item.hz == '.jpeg'">查 看</el-button>
              <el-button style="border: none; color:dodgerblue ;" size="small" @click="download(item)">下 载</el-button>
            </div> -->
          </div>
        </template>
        <template slot-scope="{  }" slot="videoUrl">
          <div class="pic"  v-for="(item, i) in fileListMp4" :key="i">
            <div
              style=" margin-left: 10px;"
              class="fileStyle"
              @click="viewHandel(item)"
            >
              {{ item.name }}
            </div>
            <!-- <div>
              <el-button style="border: none; color:dodgerblue ;" size="small" @click="viewHandel(item)" v-show="item.hz == '.png' || item.hz == '.jpg' || item.hz == '.jpeg'">查 看</el-button>
              <el-button style="border: none; color:dodgerblue ;" size="small" @click="download(item)">下 载</el-button>
            </div> -->
          </div>
        </template>
      </avue-form>

      <el-dialog title="预览" :visible.sync="viewBigimg" width="40%">
      <div style="width: 100%; height: 500px">
        <el-image style="width: 100%; height: 100%" :src="imgPic" :preview-src-list="[imgPic]">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="viewBigimg = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fileOption } from "@/const/activity-manage/projectActivity.js";

export default {
  props: {
    listdatas: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        signUrl:'',
        imgUrl:'',
        videoUrl:''
      },
      fileOption,
      allFiles:[],
      fileList:[],
      fileListImg:[],
      fileListMp4:[],
      fileHz:'',
      viewBigimg:false,
      imgPic:''
    };
  },
  created() {
    
  },
  methods: {
   
    viewHandel(item) {
      console.log(item)
        if (
          item.url.indexOf(".png") != -1 ||
          item.url.indexOf(".jpeg") != -1 ||
          item.url.indexOf(".jpg") != -1
        ) {
          this.imgPic = item.url;
          this.imgName = item.name;
          this.viewBigimg = true;
        } else {
          window.open(item.url);
        }
      },
    // download(item) {
    //   const link = document.createElement("a");
    //   link.href = item.url;
    //   link.download = item.name;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // },
  },
  
  watch: {
    listdatas: {
      handler(val) {
        console.log("val",val)
        if(val){
          this.fileList = val.register.map(item=>{
            return{
              name: item.filename+item.fileUrl.substring(item.fileUrl.lastIndexOf(".")),
              url: item.fileUrl,
              hz: item.fileUrl.substring(item.fileUrl.lastIndexOf("."))
            }
          }),
          this.fileListImg = val.photo.map(item=>{
            return{
              name: item.filename+item.fileUrl.substring(item.fileUrl.lastIndexOf(".")),
              url: item.fileUrl,
              hz: item.fileUrl.substring(item.fileUrl.lastIndexOf("."))
            }
          }),
          this.fileListMp4 = val.video.map(item=>{
            return{
              name: item.filename+item.fileUrl.substring(item.fileUrl.lastIndexOf(".")),
              url: item.fileUrl,
              hz: item.fileUrl.substring(item.fileUrl.lastIndexOf("."))
            }
          })
          console.log(this.fileList,this.fileListImg,this.fileListMp4)
        }
        // if (val) {
        //   let arr = val.map((item) => {
        //     let url = [];
        //     if (item.fileUrl) {
        //       let arr = item.fileUrl.split(",");
        //       if (arr.length > 0) {
        //         arr.forEach((citem) => {
        //           let obj = {
        //             fileName: citem.slice(citem.lastIndexOf("/") + 1),
        //             fileUrl: citem,
        //           };
        //           url.push(obj);
        //         });
        //       }
        //     }
        //     return {
        //       ...item,
        //       url,
        //     };
        //   });
        //   this.form = arr;
        // }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
.fileStyle {
  color: dodgerblue;
  cursor: pointer;
}
.mater {
  border: 1px solid #95c9ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bottom {
  width: 80%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  text-align: center;
  .el-button {
    padding: 9px 20px;
  }
}
.pic{
  display: flex; 
  justify-content: space-between;
  width: 80%; 
  // border: dodgerblue solid 1px;
  // border-radius: 5px;
  margin-bottom:5px;
}
</style>