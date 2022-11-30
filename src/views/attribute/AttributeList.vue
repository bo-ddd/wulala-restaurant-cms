<template>
  <div class="box">
    <!-- <h3 class="title">属性列表</h3> -->
    <div class="box-content">
      <div class="select">
        <div class="demo-input-suffix">
          查找属性：
          <el-select v-model="input1" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>

        <div class="demo-input-suffixs">
          查找分类：
          <el-select v-model="input2" placeholder="请选择" clearable>
            <el-option
              v-for="item in options1"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>

          <el-button class="button" type="primary" @click="findCategory"
            >查找分类</el-button
          >
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" height="500">
        <el-table-column label="id" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性名" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.attrName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </div>
    <el-dialog title="修改属性" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类目名称" :label-width="formLabelWidth">
          <el-select v-model="form.categoryId" placeholder="请选择类目名称">
            <el-option
              v-for="(item, index) in categoryIds"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性名" :label-width="formLabelWidth">
          <el-input v-model="form.attrName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">属性</el-radio>
            <el-radio :label="1">规格</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  attributeListApi,
  attributeDeleteApi,
  categoryListApi,
  attributeUpdateApi,
} from "@/api/api";
export default {
  data() {
    return {
      flag: true,
      options: [],
      options1: [],
      input1: null,
      input2: null,
      tableData: [],
      tableDatas: [],
      currentPage4: 1,
      total: 0,
      pageSize: 5,
      pageNum: 1,
      dialogFormVisible: false,
      form: {
        id: "",
        categoryId: "",
        attrName: "",
        type: "",
      },
      categoryIds: "",
      formLabelWidth: "120px",
    };
  },
  created() {
    this.applytable();
  },

  methods: {
    handleEdit(index, row) {
      this.form = row;
      this.dialogFormVisible = true;
      this.attributeUpdate();
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.attributeDelete(row);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.applytable();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.applytable();
    },

    async applytable() {
      let res = await attributeListApi({
        // pageNum: this.pageNum,
        // pageSize: this.pageSize,
      });
      // console.log(res);
      // this.total = res.data.data.total;
      // this.pageSize = res.data.data.pageSize;
      // this.pageNum = res.data.data.pageNum;
      this.tableDatas = res.data.data;
      // console.log("------------------");
      this.tableData = this.tableDatas
// console.log(this.tableDatas);
      this.options = this.tableDatas.map((item) => {
        return item.attrName;
      });
      this.options = [...new Set(this.options)];
      // console.log(this.options);

      this.options1 = this.tableDatas.map((item) => {
        return item.categoryName;
      });
      this.options1 = [...new Set(this.options1)];
      // console.log(this.options1);
    },
    async attributeDelete(row) {
      let res = await attributeDeleteApi({
        id: row.id,
      });
      console.log(res);
      this.applytable();
    },
    async attributeUpdate() {
      let res = await categoryListApi({});
      this.categoryIds = res.data.data;
    },
    async submit() {
      let res = await attributeUpdateApi({
        id: this.form.id,
        categoryId: this.form.categoryId,
        name: this.form.attrName,
        type: this.form.type,
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.dialogFormVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    findCategory() {
      console.log(this.tableDatas);
        this.tableData = this.tableDatas;
        console.log(this.flag);
      if (this.flag) {
        console.log(this.tableData);
        // console.log(this.input1);
        // console.log(this.input2);
        let arr = [];
        let is = false;
        this.tableData = this.tableDatas;

        if (this.input1 && this.input2) {
          is = true;
          console.log('truesssssssssssss');
        }
        this.tableData.forEach((item) => {
          if (is) {
            if (
              item.attrName.indexOf(this.input1) != -1 &&
              item.categoryName.indexOf(this.input2) != -1
            ) {
              arr.push(item);
            }
          } else {
            if (
              item.attrName.indexOf(this.input1) != -1 ||
              item.categoryName.indexOf(this.input2) != -1
            ) {
              arr.push(item);
            }
          }
        });
        // console.log(arr);
        this.tableData = arr;
        this.flag = false;
      } else {
        console.log('false');
        // console.log(this.input1);
        console.log(this.tableData);
        // console.log(this.input2);
        let arr = [];
        let is = false;
        if (this.input1 && this.input2) {
          is = true;
        }
        this.tableData.forEach((item) => {
          if (is) {
            if (
              item.attrName.indexOf(this.input1) != -1 &&
              item.categoryName.indexOf(this.input2) != -1
            ) {
              arr.push(item);
            }
          } else {
            if (
              item.attrName.indexOf(this.input1) != -1 ||
              item.categoryName.indexOf(this.input2) != -1
            ) {
              arr.push(item);
            }
          }
        });
        // console.log(arr);
        this.tableData = arr;
        this.flag = true;
      }
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
.box-content{
  height: 75vh;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.demo-input-suffix {
  display: flex;
  align-items: center;
}
.demo-input-suffixs {
  display: flex;
  align-items: center;
  margin: 0 50px;
}
.el-input {
  width: 200px;
}
.button {
  margin: 0 10px;
  background: #86bcd6;
  border-color: #86bcd6;
}
.select {
  display: flex;
}
</style>