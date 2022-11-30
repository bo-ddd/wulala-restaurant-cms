<template>
  <div class="box">
    <div class="back" @click="jump">
        <i class="el-icon-back"></i>
        <h3>返回</h3>
    </div>
    <div class="box-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userId" label="id" width="80"></el-table-column>
        <el-table-column prop="avatarName" label="姓名" width="80"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80">
          <template slot-scope="scope">
                <span v-if="scope.row.sex === 1">男</span>
                <span  v-else-if="scope.row.sex === 0">女</span>
            </template>
        </el-table-column>
        <el-table-column prop="hobby" label="爱好" width="140"></el-table-column>
        <el-table-column prop="birthday" label="生日" width="180" :formatter="formatter"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="180"></el-table-column>
        <el-table-column prop="personalSignature" label="个人签名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" width="180"></el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { deptMembersApi } from '@/api/api'
export default {
  data() {
    return {
        tableData: []
    };
  },
  created(){
    this.apply();
  },
  methods:{
    async apply(){
        let res = await deptMembersApi({
            deptId: this.$route.query.deptId
        });
        this.tableData = res.data.data;
    },
    jump(){
        this.$router.push({
            path:'/departmentmanguage'
        })
    },
    formatter(row){
      const zoneDate = new Date(row.birthday).toJSON();
      const date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date;
    },
    handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
      }
  }
};
</script>

<style scoped>
.back{
    color: #ed4b0b;
    padding: 15px 0px 0px 38px;
    display: flex;
    width: 60px;
    align-items: center;
}
</style>