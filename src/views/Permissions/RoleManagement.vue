<template>
    <div class="box">
        <h3 class="title">角色管理</h3>
        <div class="box-content">
            <div class="content">
                <el-button class="btn" type="primary" plain @click="toAddRole()">+添加新角色</el-button>
                <el-button type="primary" @click="toSetRolePower">设置角色权限</el-button>
                <el-button class="btn" type="primary" plain @click="toDeleteRolePower()">删除角色权限</el-button>
                <el-table
                    :data="obtainRoleList.filter(data => !search || data.roleName.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                    <el-table-column
                    label="角色ID"
                    width="">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    width="">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.roleName }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.roleName }}</el-tag>
                        </div>
                        </el-popover>
                    </template>
                    </el-table-column>
                    <el-table-column
                        align="right">
                        <template slot="header" slot-scope="scope">
                            {{scope.row}}
                            <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入角色关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                        <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { roleListApi , roleDelete} from '@/api/api';
import { showLoading,hideLoading } from "@/api/loading";
export default {
    data() {
        return {
            tabPosition: 'top',
            tabPositions: 'top',
            obtainRoleList:[],//角色
            search:'',
        }
    },
    created() {
        this.rolelist()
        showLoading();
        setTimeout(function () {
            hideLoading();
        },1000)
    },
    methods: {
        rolelist:function(){
            roleListApi({}).then(res=>{
                this.obtainRoleList = res.data.data;
            }).catch(err => {
                console.log(err);
            })
        },
        toDeleteRolePower : function(){
            this.$router.push({path:'deleterolepower'})
        },
        toAddRole: function () {
            this.$router.push({ path: '/addrole' })
        },
        toSetRolePower : function(){
            this.$router.push({path:'setrolepower'})
        },
        handleDelete(ids) {
            // console.log(ids);
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                roleDelete({
                    id:ids,
                }).then(res => {
                    if (res.data.status == 1) {
                        this.rolelist()
                    }
                })
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
    },
}
</script>

<style scoped>
.content {
    background-color: #fff;
    overflow-y: scroll;
    height: calc(100vh - 9.8rem);
}
::v-deep .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
}

.subject {
    padding: 10px;
}

.subjext-title span {
    color: #ccc;
    font-size: 12px;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav span {
    color: #bbb;
    font-size: 14px;
}

.delete p {
    display: flex;
    align-items: center;
    color: #fff;
}

.delete :hover {
    cursor: pointer;
}

.delete img {
    width: 18px;
    font-size: 12px;
    color: #fff;
}
.bodys{
    height: calc(100vh - 60px);
    overflow-y: scroll;
    background: rebeccapurple;
}
.title{
    color: #fff;
}
::v-deep .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
    border-bottom: 1px solid #EBEEF5;
    text-align: center;
}
::v-deep .el-table th.el-table__cell>.cell{
    text-align: center;
}
</style>