<script>
import { roleListApi , getPermission ,addRoleApi } from "@/api/api"
import { showLoading, hideLoading } from "@/api/loading";
export default {
    data() {
        return {
            form: {
                roleId: ''
            },
            roleList: [],
            userId: ''
        }
    },
    created() {
        this.userId = this.$route.query.userId
        console.log(this.$route.query.userId);
 //获取角色列表
        roleListApi({}).then(res => {
            this.roleList = res.data.data
            console.log(this.roleList);
        })
        showLoading();
        setTimeout(function () {
            hideLoading();
        }, 1000);
    },
    methods: {

        upload: function () {
            //给用户添加角色接口
            addRoleApi({
                userId: this.userId,
                roleId: this.form.roleId
            })
            console.log(this.form);
        },
        getUserPermission: function () {
            // 查询用户权限
            getPermission({
                userId: this.userId,
            }).then(res =>{
                console.log(res);   
            })
        },
        goBack() {
            this.$router.back(-1)
        },
    }
}
</script>
<template>
  <div class="box">
    <el-page-header @back="goBack">
        </el-page-header>
    <div class="box-content">
        
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="添加角色">
                <el-select v-model="form.roleId" placeholder="请选择想添加的角色">
                    <el-option v-for="(item, i) in roleList" :key="i" :label=item.roleName :value=item.id></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="upload()">添加</el-button>
                <el-button @click="getUserPermission()" >查询</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<style scoped>
.el-page-header{
    margin: 15px 0 -20px 35px;
}
</style>