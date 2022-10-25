<script>
import { roleListApi , getPermission ,addRoleApi } from "@/api/api"
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

        roleListApi({

        }).then(res => {
            this.roleList = res.data.data
            console.log(this.roleList);
        })
    },
    methods: {

        upload: function () {
            addRoleApi({
                userId: this.userId,
                roleId: this.form.roleId
            })
            console.log(this.form);
        },
        getUserPermission: function () {
            getPermission({
                userId: this.userId,
            }).then(res =>{
                console.log(res);
            })
        }
    }
}
</script>
<template>
    <div class="box-contont">
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
</template>
<style scoped>
.box-contont {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    height: 100%;
    padding: 15px;
}
</style>