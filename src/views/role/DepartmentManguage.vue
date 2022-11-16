<template>
  <div class="box">
    <h3 class="title">部门管理</h3>
    <div class="box-content">
      <div class="select">
        <span>新增部门：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button class="button" type="primary" @click="submit">新增部门</el-button>
      </div>

      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="id"
      width="400">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="400">
      <template slot-scope="scope">
        <el-popover>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="seeUser(scope.$index, scope.row)">查看用户</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    </div>

    <el-dialog title="修改部门" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="部门id" :label-width="formLabelWidth">
      <el-input v-model="form.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false,update()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
// deptDeleteApi
import { deptCreateApi, deptListApi, deptUpdateApi, deptDeleteApi } from "@/api/api";
export default {
  data() {
    return {
      input: "",
      tableData:[],
      dialogFormVisible: false,
      form: {
          id:'',
          name: '',
        },
        formLabelWidth: '120px'
    };
  },
  created(){
    this.apply();
  },
  methods: {
    async submit() {
      let res = await deptCreateApi({
        name: this.input,
      });
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
      } else {
        this.$message({
          message: res.data.msg,
          type: 'warning'
        });
      }
    },
    async apply(){
      let res = await deptListApi()
      this.tableData = res.data.data;
    },
    seeUser(index,row){
      console.log(index,row);
      this.$router.push({name:'seeuser'})
    },  
    handleEdit(index, row) {
        this.form.id = row.id;
        this.form.name = row.name
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete(row);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.apply();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      async update(){
        let res = await deptUpdateApi({
          id:this.form.id,
          name:this.form.name
        })
        console.log(res);
        if(res.data.status == 1){
          this.$message({
          message: "修改成功",
          type: "success",
        });
        } else {
          this.$message({
          message: res.data.msg,
          type: 'warning'
        });
        }
        this.apply();
      },
      async delete(row){
        let res = await deptDeleteApi({
          id:row.id
        });
        console.log(res);
      }
  },
};
</script>

<style scoped>
.select {
  display: flex;
  align-items: center;
}
.el-input {
  width: 200px;
}
.button {
  margin: 0 10px;
  background: #86bcd6;
  border-color: #86bcd6;
}
</style>