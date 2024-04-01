<template>
  <div
    style="
      width: 95%;
      margin: 0 auto;
      margin-top: 10px;
      margin-bottom: 50px;
      overflow-y: scroll;
      height: 100%;
    "
  >
    <avue-crud :option="option" :data="materialData" :span-method="spanMethod">
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
    </avue-crud>
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
        <!-- <el-button size="small" type="primary" @click="download"
          >下 载</el-button
        > -->
        <el-button size="small" @click="viewBigimg = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCtFile } from "@/api/project-manage/planList";
export default {
  data() {
    return {
      option: {
        border: true,
        index: false,
        indexLabel: "序号",
        stripe: true,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        menuAlign: "center",
        align: "center",
        refreshBtn: false,
        columnBtn: false,
        searchShowBtn: false,
        menuWidth: 140,
        showClomnuBtn: false,
        searchBtnText: "查询",
        searchSize: "small",
        searchMenuPosition: "right",
        searchMenuSpan: 6,
        menu: false,
        column: [
          {
            label: "项目阶段",
            prop: "bigTypeName",
          },
          {
            label: "材料名称",
            prop: "fileName",
          },
          {
            label: "文件名称",
            prop: "fileUrl",
            slot: true,
          },
        ],
      },
      materialData: [],
      shanShow: false,
      dialogVisible: false,
      form: {},
      viewBigimg: false,
      imgUrl: "",
      imgName: "",
      spanArr: [
        {
          prop: "bigTypeName",
          span: [],
        },
      ],
    };
  },
  created() {
    this.getCtFile();
    this.rowSort();
    this.rowCalc();
  },
  computed: {
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
              // let fileNameArr = url.map(img => img.fileName)
              // return fileNameArr
              return url;
            } else {
              return [];
            }
          }
        }
      };
    },
  },
  methods: {
    getCtFile() {
      const { id } = this.$route.query;
      getCtFile({
        projectId: id,
      }).then((res) => {
        if (res.data) {
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
          this.materialData = arr;
          this.rowCalc();
        }
      });
    },
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
    rowCalc() {
      this.spanArr.forEach((ele, index) => {
        let parent;
        if (index !== 0) parent = this.spanArr[ele.parent || index - 1].span;
        ele.span = this.rowSpan(ele.prop, parent);
      });
    },
    rowSort(list) {
      let propList = this.spanArr.map((ele) => ele.prop);
      this.spanArr.forEach((ele, index) => {
        let key = ele.prop;
        this.materialData = this.materialData.sort((a, b) => {
          let flag = true;
          for (let i = 0; i < index; i++) {
            let prop = this.spanArr[i].prop;
            flag = flag && a[prop] == b[prop];
          }
          if (flag) {
            if (a[key] < b[key]) {
              return 1;
            } else if (a[key] > b[key]) {
              return -1;
            }
            return 0;
          }
          return 0;
        });
      });
    },
    rowSpan(key, parent) {
      let list = [];
      let position = 0;
      this.materialData.forEach((item, index) => {
        if (index === 0) {
          list.push(1);
          let position = 0;
        } else {
          if (
            this.materialData[index][key] === this.materialData[index - 1][key]
          ) {
            if (parent && parent[index] !== 0) {
              list.push(1);
              position = index;
            } else {
              list[position] += 1;
              list.push(0);
            }
          } else {
            list.push(1);
            position = index;
          }
        }
      });
      return list;
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.spanArr.length; i++) {
        const ele = this.spanArr[i];
        if (column.property == ele.prop) {
          const _row = ele.span[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      }
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
</style>