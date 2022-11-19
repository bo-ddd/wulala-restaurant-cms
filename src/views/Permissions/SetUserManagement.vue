<script>
import { roleListApi, userInfoApi, addRoleApi ,userDeleteRole} from "@/api/api"
import { showLoading, hideLoading } from "@/api/loading";
export default {
    data() {
        return {
            form: {
                roleId: '',
                roleIds: ''
            },
            roleLists: [],
            roleList: [],
            userId: '',
            userData: [],
            sex:''
        }
    },
    created() {
        this.userId = this.$route.query.userId
        // console.log(this.$route.query.userId);
        //获取角色列表
        roleListApi({}).then(res => {
            this.roleList = res.data.data
            userInfoApi({
                userId: this.userId,
            }).then(res => {
                this.userData = res.data.data
                console.log(this.roleList);
                this.sex = this.userData.sex == 0 ? "女" : "男"
          this.roleLists = this.roleList
            })
        
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
         depUserRole: function () {
            // 删除用户角色
            userDeleteRole({
                id: this.form.roleIds
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
            <el-descriptions title="用户信息">
                <el-descriptions-item label="用户名">{{this.userData.avatarName}}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{this.userData.placeholder}}</el-descriptions-item>
                <el-descriptions-item label="性别">{{this.sex}}</el-descriptions-item>
                <el-descriptions-item label="备注">
                    <el-tag size="small" v-for="el in this.userData.roles" :key="el.id">{{el.roleName}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">{{this.userData.address}}</el-descriptions-item>
            </el-descriptions>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="添加角色">
                    <el-select v-model="form.roleId" placeholder="请选择想添加的角色">
                        <el-option v-for="(item, i) in roleLists" :key="i" :label=item.roleName :value=item.id>
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="mini" @click="upload()">添加</el-button>
                </el-form-item>
                <el-form-item label="删除角色">
                    <el-select v-model="form.roleIds" placeholder="请选择想删除的角色">
                        <el-option v-for="(item, i) in userData.roles" :key="i" :label=item.roleName :value=item.id>
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="mini" @click="depUserRole()">删除</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style scoped>
.el-page-header {
    margin: 15px 0 -20px 35px;
}
.el-descriptions{
    padding: 20px;
}
.el-form{
    padding-left: 10px;
}
.el-button{
    margin-left: 20px;
}
</style>