<template>
  <div class="box">
    <h3 class="title">属性列表</h3>
    <div class="box-content">
      <el-table :data="tableData" style="width: 100%" height="550">
        <el-table-column label="id" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类目id" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.categoryId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.attrName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类名" width="180">
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
      tableData: [],
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
      console.log(index, row);
      this.form = row;
      this.dialogFormVisible = true;
      this.attributeUpdate();
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
      console.log(res);
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
      console.log(this.form);
      let res = await attributeUpdateApi({
        id: this.form.id,
        categoryId: this.form.categoryId,
        name: this.form.attrName,
        type: this.form.type,
      });
      // let res = await attributeUpdateApi(this.form);
      console.log(res);
      console.log(this.form.id);
      console.log(this.form.categoryId);
      console.log(this.form.type);
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
  },
};
</script>

<style scoped>
.el-pagination {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>