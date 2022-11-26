<template>
  <div class="box">
    <div class="back" @click="jump">
        <i class="el-icon-back"></i>
        <h3>返回</h3>
    </div>
    <div class="box-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userId" label="id" width="100"></el-table-column>
        <el-table-column prop="avatarName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="hobby" label="爱好" width="140"></el-table-column>
        <el-table-column prop="birthday" label="生日" width="180"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="180"></el-table-column>
        <el-table-column prop="personalSignature" label="个人签名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" width="180"></el-table-column>
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