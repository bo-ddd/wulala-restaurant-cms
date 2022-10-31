<template>
  <div class="box">
    <h3 class="title">属性列表</h3>
    <div class="box-content">
      <div class="select">
        <div class="demo-input-suffix">
          查找属性：
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input1"
          >
          </el-input>
          <!-- <el-button class="button" type="primary" @click="findName"
            >查找属性</el-button
          > -->
        </div>

        <div class="demo-input-suffixs">
          查找分类：
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
          <el-button class="button" type="primary" @click="findCategory"
            >查找分类</el-button
          >
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" height="550">
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
      input1: "",
      input2: "",
      search: "",
      tableData: [],
      tempData: [],
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
      // this.total = res.data.data.total;
      // this.pageSize = res.data.data.pageSize;
      // this.pageNum = res.data.data.pageNum;
      this.tableData = res.data.data;
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
    async findName() {
      let res = await attributeListApi();
      let findName = res.data.data;
      if (this.input1 === "") {
        this.tableData = findName;
      } else {
        let arr = findName.filter((item) => {
          return item.attrName.indexOf(this.input1) != -1;
        });
        this.tableData = arr;
      }
      this.input1 = "";
    },
    async findCategory() {
      let res = await attributeListApi();
      let findName = res.data.data;
      // if (this.input1 && this.input2 == "") {
      //   this.tableData = findName;
      //   console.log('cnm');
      // } else {
      //   let arr = findName.filter((item) => {
      //     return item.categoryName.indexOf(this.input2) != -1;
      //   }) && findName.filter((item) => {
      //     return item.attrName.indexOf(this.input1) != -1;
      //   });
      //   console.log('nmlgb');
      //   this.tableData = arr;
      // }
      // this.input1 = "";
      // this.input2 = "";
      console.log(findName);
      if (this.input1 === "" && this.input2 === "") {
        this.tableData = findName;
      } else if (this.input1 === "" && this.input2 !== "") {
        let arr = findName.filter((item) =>{
          return item.categoryName.indexOf(this.input2) != -1;
        })
        this.tableData = arr;
      } else if(this.input1 !=="" && this.input2 === ""){
        let arr = findName.filter((item) =>{
          return item.attrName.indexOf(this.input1) != -1;
        })
        this.tableData = arr;
      } else {
        let arr = findName.filter((item) =>{
          return item.attrName.indexOf(this.input1) != -1 && item.categoryName.indexOf(this.input2)!=-1;
        })
        this.tableData = arr; 
      }
    },
  },
};
</script>

<style scoped>
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