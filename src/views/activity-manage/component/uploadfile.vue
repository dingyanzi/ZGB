<template>
  <div style="width: 95%; margin: 0 auto; margin-bottom: 20px">
    <avue-form :option="fileOption" v-model="form">
      <template slot-scope="{}" slot="signUrl">
        <div>
          <el-upload
            :action= "baseUrl + '/os/file/walfareUpload?bucketName=walfare'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change="handleChangeFile"
            :file-list="fileList"
            :on-success="fileSuccess"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">支持格式：.doc/.docx/.pdf/.jpg/.jpeg/.png，单个文件不能超过20MB</div>
          </el-upload>
        </div>
      </template>
      <template slot-scope="{}" slot="imgUrl">
        <div>
          <el-upload
            :action= "baseUrl + '/os/file/walfareUpload?bucketName=walfare'"
            :on-preview="handlePreviewImg"
            :on-remove="handleRemoveImg"
            :before-remove="beforeRemove"
            :on-change="handleChangeFileImg"
            :file-list="fileListImg"
            :on-success="fileSuccessImg"
            accept=".jpg,.jpeg,.png">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">支持格式：.jpg/.jpeg/.png，单个文件不能超过20MB</div>
          </el-upload>
        </div>
      </template>
      <template slot-scope="{}" slot="videoUrl">
        <div>
          <el-upload
            :action= "baseUrl + '/os/file/walfareUpload?bucketName=walfare'"
            :on-preview="handlePreviewMp4"
            :on-remove="handleRemoveMp4"
            :before-remove="beforeRemove"
            :file-list="fileListMp4"
            :on-change="handleChangeFileMp4"
            :on-success="fileSuccessMp4"
            accept=".mp4">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">支持格式：.mp4，单个文件不能超过500MB</div>
          </el-upload>
        </div>
      </template>
        <!-- <template  #signUrlLabel="{column}">
            <span style="color: red">*</span>{{ (column || {}).label }}:
        </template>
        <template #imgUrlLabel="{ column }">
            <span style="color: red">*</span>{{ (column || {}).label }}:
        </template> -->
    </avue-form>
    <!-- <div style="display: flex;">
      <div style="color: red;">*</div>
    </div> -->
   
  </div>
 
</template>

<script>
import { baseUrl } from "@/config/env";
import { fileOption } from "@/const/activity-manage/projectActivity.js";
export default {
  props:{
    listdatas:{
      type: Object,
      default: ()=>{ {} }
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
      showUpload:true,
    }
  },
  created(){

  },
  methods:{
    handleRemove(file, fileList) {
      // console.log("file",file);
      // console.log("allFiles",this.allFiles)
       // 1.获取将要删除图片的临时路径
       const filePath = file.url;
      //  console.log("filePath",filePath)
      //  console.log("fileList",this.fileList)
      // 2.从pics数组中，找到图片对应的索引值
      //const i = this.fileList.findIndex((x) => x.url === filePath);
      const i1 = this.allFiles.findIndex((x) => x.fileUrl === filePath);
      //console.log(i1)
      // 3.调用splice方法，移除图片信息
      this.fileList = fileList
      this.allFiles.splice(i1, 1)
      //console.log("allFiles",this.allFiles)
      
    },
    handleRemoveImg(file, fileList) {
      console.log(file);
       // 1.获取将要删除图片的临时路径
       const filePath = file.url;
      // 2.从pics数组中，找到图片对应的索引值
      //const i = this.fileListImg.findIndex((x) => x.url === filePath);
      const i1 = this.allFiles.findIndex((x) => x.fileUrl === filePath);
      this.allFiles.splice(i1, 1)
      //console.log(i)
      // 3.调用splice方法，移除图片信息
      //this.fileListImg.splice(i, 1)
      this.fileListImg = fileList
      //console.log("fileList",this.fileListImg)
    },
    handleRemoveMp4(file, fileList) {
      //console.log(file);
       // 1.获取将要删除图片的临时路径
       const filePath = file.url;
      // 2.从pics数组中，找到图片对应的索引值
      //const i = this.fileListMp4.findIndex((x) => x.url === filePath);
      const i1 = this.allFiles.findIndex((x) => x.fileUrl === filePath);
      this.allFiles.splice(i1, 1)
     // console.log(i)
      // 3.调用splice方法，移除图片信息
      //this.fileListMp4.splice(i, 1)
      this.fileListMp4 = fileList
      //console.log("fileList",this.fileListMp4)
    },
    handlePreview(file) {
      window.open(file.url)
      //console.log(file);
    },
    handlePreviewImg(file) {
      window.open(file.url)
      //console.log(file);
    },
    handlePreviewMp4(file) {
      window.open(file.url)
      //console.log(file);
    },
    //限制文件大小
    handleChangeFile (file, fileList) {
      //限制上传文件大小
      if (!file) return
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        const currIdx = fileList.indexOf(file)
        fileList.splice(currIdx, 1)
        this.$message.warning('上传文件大小不能超过 20MB!')
        return false
      }
    },
    //限制文件大小
    handleChangeFileImg (file, fileList) {
      //限制上传文件大小
      if (!file) return
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        const currIdx = fileList.indexOf(file)
        fileList.splice(currIdx, 1)
        this.$message.warning('上传文件大小不能超过 20MB!')
        return false
      }
    },
    //限制文件大小
    handleChangeFileMp4 (file, fileList) {
      //限制上传文件大小
      if (!file) return
      const isLt2M = file.size / 1024 / 1024 < 500
      if (!isLt2M) {
        const currIdx = fileList.indexOf(file)
        fileList.splice(currIdx, 1)
        this.$message.warning('上传文件大小不能超过 500MB!')
        return false
      }
      console.log(file,fileList)
      if(file.status != 'success'){
        //this.$message.warning('正在上传中...')
        this.showUpload = false
        this.$emit("upload",this.showUpload)
      }
      if(file.status == 'success'){
        //this.$message.success('上传成功！')
        this.showUpload = true
        this.$emit("upload",this.showUpload)
      }
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    fileSuccess(response){
      console.log(response)
      const list1 = {
        filename: response.data.name,
        fileUrl:response.data.url,
        dictId: 60010110
      }
      this.fileList.push(response.data)
      this.allFiles.push(list1)
      //console.log(this.allFiles)
    },
    fileSuccessImg(response){
      const list2 = {
        filename: response.data.name,
        fileUrl:response.data.url,
        dictId: 60010111
      }
      this.fileListImg.push(response.data)
      this.allFiles.push(list2)
      //console.log(this.allFiles)
    },
    fileSuccessMp4(response){
      console.log(response)
      if(response.code == "0"){
        const list3 = {
          filename: response.data.name,
          fileUrl:response.data.url,
          dictId: 60010112,
          status: "success"
        }
        this.fileListMp4.push(response.data)
        this.allFiles.push(list3)
      }else{
        this.$message.error("上传失败！")
      }
      
      //console.log(this.allFiles)
    }

  },
  watch:{
    listdatas:{
      handler(val){
        //console.log("val",val)
        if(val){
          this.fileList = val.register.map(item=>{
            return{
              name: item.filename,
              url: item.fileUrl,
              dictId: 60010110
            }
          }),
          this.fileListImg = val.photo.map(item=>{
            return{
              name: item.filename,
              url: item.fileUrl,
              dictId: 60010111
            }
          }),
          this.fileListMp4 = val.video.map(item=>{
            return{
              name: item.filename,
              url: item.fileUrl,
              dictId: 60010112
            }
          })
          this.allFiles = [
            ...val.register,
            ...val.photo,
            ...val.video
          ]
          
        }
      }
    },
    allFiles:{
      handler(val){
        if(val){
          this.allFiles = this.allFiles
         // console.log("all",this.allFiles)
        }
      }
    },
    showUpload:{
      handler(val){
        if(val){
          console.log("val",val)
          this.$emit("upfile",val)
        }
      },
      immediate:true,
      deep:true
    }
  }
}
</script>

<style>

</style>