<template>
    <div class="box">
        <h3 class="title">删除角色权限</h3>
        <div class="box-content">
            <div class="content">
                <div class="add-role">
                    <div action="" class="role-name">
                        <div class="role-title"><span>*</span>角色名称</div>
                        <el-select v-model="input2" placeholder="请选择角色" @change="foundRole">
                            <el-option v-for="item in options" :key="item.roleName" :label="item.roleName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 全选 -->
                <div class="power-list" v-if="ifs == ''">
                    <div class="erroy">{{content}}</div>
                </div>
                <div class="power-list" v-else>
                    <el-tree :data="array" :show-checkbox="true"
                    node-key="permissionId"
                    :default-checked-keys="defaultPower" 
                    :default-expanded-keys="defaultPower"
                    :default-expand-all="false" @check="getId" :expand-on-click-node="false">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ data.permissionName }}</span>
                            <span>
                                <el-button type="text" size="mini" @click="() => remove(node, data)">
                                    Delete
                                </el-button>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { permissionListApi, roleListApi , rolePermissionList , roleDeletePermission} from '@/api/api';
import {  roleListApi , rolePermissionList , roleDeletePermission} from '@/api/api';
import { showLoading,hideLoading } from "@/api/loading";
import { ref } from 'vue';
export default {
    data() {
        return {
            input1: '',
            input2: '',
            isIndeterminate: true,
            options: [],
            array: [],
            ifs:'',
            permissionId:[],
            defaultPower : [],
            content:ref('请先选择角色名称'),
        }
    },
    created() {
        showLoading();
        setTimeout(function () {
            hideLoading();
        },1000);
        this.permissionList();
    },
    methods: {
        permissionList : function(){
            // permissionListApi({}).then(res => {
            // let dataList = this.formatePermissionList(res.data.data);
            // this.array = dataList;
            // }).catch(err => {
            //     console.log(err);
            // }),
            roleListApi({}).then(res=>{
                this.options = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
        getId(data) {
            this.permissionId.push(data.id);
        },
        foundRole: function () { 
            // 用户ID
            // console.log(this.input2);
            if (this.input2 == '') {
                this.$message({
                    message: '请选择角色',
                    type: 'warning'
                });
            }else{
                this.ifs = 1;
                rolePermissionList({
                    roleId:this.input2,
                }).then(res => {
                    this.defaultPower=[];
                    // console.log(res);
                    this.array = res.data.data
                    if (res.data.data == '') {
                        this.ifs = '';
                        this.content = '该角色还没有权限'
                    }else{
                        res.data.data.forEach(el => {
                            this.defaultPower.push(el.permissionId);
                        });
                    }
                    // console.log(this.defaultPower);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        formatePermissionList : function(data) {
            let res = JSON.parse(JSON.stringify(data));
            res.forEach(item => {
                if (!item.children) item.children = [];
                if (item.pid != 0) {
                    let pItem = res.find(pItem => pItem.id == item.pid);
                    if (pItem && !pItem.children) pItem.children = [];
                    pItem.children.push(item);
                }
            });
            return res.filter(item => item.pid == 0);
        },
        remove(node, data ) {
            this.$confirm('此操作该用户将删除该权限, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                roleDeletePermission({
                    roleId:this.input2,
                    permissionId:data.permissionId
                }).then(res => {
                    if (res.data.msg == "成功") {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.permissionId === data.permissionId);
                        children.splice(index, 1);
                    }else{
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                    }
                })
                this.foundRole
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            // console.log(data);
            // console.log(node);
        },
    }
}
</script>

<style scoped>
.add-role {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.role-name {
    display: flex;
    align-items: center;
}

.role-title {
    width: 124px;
}

.role-name span {
    color: red;
}

.content {
    height: calc(100vh - 14.8rem);
}

.power-list {
    width: 95%;
    margin: 10px auto;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
::v-deep .el-tree-node__content{
    height: 40px;
}
.box-contont{
    background-color: #cce0e7;
}
.bodys{
    background-color: #cce0e7;
    overflow: hidden;
}
.erroy{
    color: #ccc;
    font-size: 1.6rem;
    margin: 50px auto;
    text-align: center;
}
::-webkit-scrollbar{
    display:none;
}
</style>