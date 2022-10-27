<template>
  <div>
    <h4 class="mg-rl_20 title">属性列表</h4>
    <div class="box-content">
      <el-table :data="tableData" style="width: 100%">
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
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { attributeListApi,attributeDeleteApi } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      currentPage4: 1,
      total: 0,
      pageSize: 5,
      pageNum: 1,
    };
  },
  created() {
    this.applytable();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.attributeDelete(row);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.total = res.data.data.total;
      this.pageSize = res.data.data.pageSize;
      this.pageNum = res.data.data.pageNum;
      this.tableData = res.data.data.list;
    },
    async attributeDelete(row){
      let res = await attributeDeleteApi({
        id: row.id
      })
      console.log(res);
      this.applytable();
    }
  },
};
</script>

<style scoped>
.title {
  color: #fff;
}
.box-content {
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  min-height: 700px;
  padding: 15px 0;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>