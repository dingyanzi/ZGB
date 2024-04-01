<template>
  <div>
    <div style="width: 95%; margin: 0 auto; margin-top: 10px">
      <avue-crud :option="materialOption" :data="impleData">
        <template slot="fileUrl" slot-scope="{ row }">
          <div
            class="fileStyle"
            @click="viewHandel(item)"
            v-for="(item, i) in getfileName(row)"
            :key="i"
          >
            {{ item.fileName }}
          </div>
        </template>
        <template #menu="{ size, row, index }">
          <el-button type="text" :size="size" @click="handle(row)"
            >上传文件</el-button
          >
          <el-button
            type="text"
            :size="size"
            v-if="row.fileType == '8'"
            @click="rowDel(row, index)"
            >删除</el-button
          >
        </template>
      </avue-crud>
      <el-button
        style="
          width: 100%;
          margin-top: 10px;
          color: #409eff;
          border: 1px solid #409eff;
        "
        @click="rowAdd"
        plain
        >添加</el-button
      >
      <el-dialog title="上传" :visible.sync="dialogVisible1" width="26%">
        <el-upload
          class="upload-demo"
          :action="action"
          size="medium"
          :on-success="onSuccess"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :file-list="fileList"
        >
          <el-button type="primary" size="medium" style="width: 100%"
            >点击上传</el-button
          >
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible1 = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="sumUpload"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        v-if="dialogVisible"
        title="添加材料名称"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="材料名称：" prop="name">
            <el-input
              v-model="form.name"
              autocomplete="off"
              style="width: 300px"
              placeholder="请输入材料名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="subfirmFn('forms')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="预览图片" :visible.sync="viewBigimg" width="40%">
        <div style="width: 100%; height: 500px">
          <el-image
            style="width: 100%; height: 100%"
            :src="imgUrl"
            :preview-src-list="[imgUrl]"
          >
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
    <div class="bottom">
      <el-button
        type="primary"
        :loading="impLoad"
        style="margin-left: 20px"
        @click="submitFn"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { addCtFile, getCtFile } from "@/api/project-manage/planList";
import { baseUrl } from "@/config/env";
import { materialOption } from "@/const/project-manage/planChange.js";
export default {
  props: {
    tableData6: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      materialOption,
      impleData: [],
      shanShow: false,
      dialogVisible: false,
      form: {},
      rules: {
        name: [{ required: true, message: "请输入材料名称", trigger: "blur" }],
      },
      viewBigimg: false,
      impLoad: false,
      currenttab: {},
      imgUrl: "",
      dialogVisible1: false,
      fileList: [],
      action: "",
    };
  },
  created() {
    this.action = baseUrl + "/os/file/upload?bucketName=image";
  },
  methods: {
    // 保存事件
    submitFn() {
      this.impLoad = true;
      let ctFile = this.impleData.map((item) => {
        if (item.url) {
          let arr = [];
          item.url.forEach((citem) => {
            arr.push(citem.fileUrl);
          });
          let str = arr.join();
          return {
            ...item,
            fileUrl: str,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      const { projectId } = this.$route.query;
      addCtFile(ctFile).then((res) => {
        if (res.code == "0") {
          this.impLoad = false;
          this.$message({
            message: "保存成功",
            type: "success",
          });
          getCtFile({
            projectId,
            bigType: "6",
          }).then((res) => {
            let arr = res.data.map((item) => {
              let url = [];
              if (item.fileUrl) {
                let arr = item.fileUrl.split(",");
                if (arr.length > 0) {
                  arr.forEach((citem) => {
                    let obj = {
                      fileName: citem.slice(citem.lastIndexOf("/") + 1),
                      fileUrl: citem,
                    };
                    url.push(obj);
                  });
                }
              }
              return {
                ...item,
                url,
              };
            });
            this.impleData = arr;
          });
        }
      });
    },
    rowAdd() {
      this.dialogVisible = true;
      this.form = {};
    },
    // 添加材料时的确定事件
    subfirmFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { name } = this.form;
          const { projectId, projectNo } = this.$route.query;
          this.impleData.push({
            fileName: name,
            fileType: "8",
            bigType: "6",
            fileUrl: "",
            projectId,
            no: projectNo,
          });
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除事件
    rowDel(_row, _index) {
      this.impleData.splice(_index, 1);
    },
    handle(row) {
      this.currenttab = row;
      const { url } = row;
      let fileList = [];
      if (url && url.length > 0) {
        fileList = url.map((item) => {
          return {
            url: item.fileUrl,
            name: item.fileName,
          };
        });
      }
      this.fileList = fileList;
      this.dialogVisible1 = true;
    },
    // 文件的预览
    viewHandel(item) {
      const { fileUrl } = item;
      if (
        fileUrl.indexOf(".png") != -1 ||
        fileUrl.indexOf(".jpeg") != -1 ||
        fileUrl.indexOf(".jpg") != -1
      ) {
        this.imgUrl = item.fileUrl;
        this.imgName = item.fileName;
        this.viewBigimg = true;
      } else {
        window.open(fileUrl);
      }
    },
    sumUpload() {
      this.dialogVisible1 = false;
      let list = [],
        fileName = "";
      if (this.fileList.length > 0) {
        list = this.fileList.map((item) => {
          if (item.response) {
            const { data } = item.response;
            return {
              fileName: data.name + "." + data.fileSuffix,
              fileUrl: data.url,
            };
          } else {
            return {
              fileName: item.name,
              fileUrl: item.url,
            };
          }
        });
        fileName = list.map((item) => item.fileName).join(",");
      }
      this.impleData = this.impleData.map((item) => {
        const { fileType, id, fileName } = this.currenttab;
        if (item.fileName == fileName) {
          return {
            ...item,
            url: list,
            // fileName: fileName,
          };
        } else {
          return item;
        }
      });
      this.fileList = [];
    },
    onSuccess(response, file, fileList) {
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  computed: {
    // 格式化文件名称
    getfileName() {
      return (row) => {
        if (row) {
          const { url } = row;
          if (typeof url == "string") {
            if (url.length > 0) {
              return [
                {
                  // fileName: url.slice(url.lastIndexOf("/") + 1),
                  fileUrl: url,
                },
              ];
            } else {
              return [];
            }
          } else if (Array.isArray(url)) {
            if (url.length > 0) {
              return url;
            } else {
              return [];
            }
          }
        }
      };
    },
  },
  watch: {
    tableData6: {
      handler(val) {
        if (val) {
          let arr = val.map((item) => {
            let url = [];
            if (item.fileUrl) {
              let arr = item.fileUrl.split(",");
              if (arr.length > 0) {
                arr.forEach((citem) => {
                  let obj = {
                    fileName: citem.slice(citem.lastIndexOf("/") + 1),
                    fileUrl: citem,
                  };
                  url.push(obj);
                });
              }
            }
            return {
              ...item,
              url,
            };
          });
          this.impleData = arr;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.avue-crud__header {
  min-height: 0px;
}
.mater {
  border: 1px solid #95c9ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fileStyle {
  color: dodgerblue;
  cursor: pointer;
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
</style>