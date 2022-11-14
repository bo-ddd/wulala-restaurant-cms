<template>
    <div class="box">
        <div class="box-content">
            <div class="content">
                <div class="add-role">
                    <div action="" class="role-name">
                        <div class="role-title"><span>*</span>权限名称</div>
                        <el-input v-model="input1" placeholder="请输入新增角色名称"></el-input>
                    </div>
                    <el-button class="btn" type="primary" plain @click="foundRole">新增权限</el-button>
                </div>
                <!-- 全选 -->
                <div class="power-list">
                    <!-- <el-button class="btn yes" type="primary" plain @click="addToPower">添加权限</el-button> -->
                    <el-tree :data="array" node-key="id" 
                        :default-expand-all="false"
                        @check-change="getCheck"
                        :expand-on-click-node="false">
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
// roleAddPermission
import {  deletePermissionApi,permissionAddApi, permissionListApi } from '@/api/api';
import { showLoading, hideLoading } from "@/api/loading";
export default {
    data() {
        return {
            input1: '',
            isIndeterminate: true,
            array: [],
            permissionId: [],
        }
    },
    created() {
        showLoading();
        setTimeout(function () {
            hideLoading();
        }, 1000);
        permissionListApi({}).then(res => {
            let dataList = this.formatePermissionList(res.data.data);
            this.array = dataList;
        })
        .catch(err => {
            console.log(err);
        })
    },
    methods: {
        foundRole: function () {
            if (this.input1 == '') {
                this.$message({
                    message: '请输入要创建的权限名称',
                    type: 'warning'
                });
            }else{
                permissionAddApi({
                    permissionName: this.input1,
                }).then(res=>{
                    console.log(res.data.status);
                    if (res.data.status == 1) {
                        this.$message({
                        message: '权限添加成功',
                        type: 'success'
                        });
                        permissionListApi({}).then(res => {
                            let dataList = this.formatePermissionList(res.data.data);
                            this.array = dataList;
                        })
                        this.$router.push({name:'rolemg'})
                    }else{
                        this.$message({
                        message: res.data.msg,
                        type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        getCheck(data,thisNode,){
            if (thisNode) {
                this.permissionId.push(data.id);
            }else{
                this.permissionId.forEach((e)=>{
                    if (data.id == e) {
                        this.permissionId.splice(this.permissionId.indexOf(e),1)
                    }
                })
            }
             return [... new Set(this.permissionId)];
        },
        formatePermissionList(data) {
            // 深拷贝
            let res = JSON.parse(JSON.stringify(data));
            res.forEach(item => {
                if (!item.children) item.children = [];
                if (item.pid != 0) {
                    let pItem = res.find(pItem => pItem.id == item.pid);
                    if (pItem && !pItem.children) pItem.children = []
                    pItem.children.push(item)
                }
            });
            return res.filter(item => item.pid == 0);
        },
        remove(node, data) {
            deletePermissionApi({
                id:data.id,
            }).then(res => {
                if (res.data.status == 8901) {
                    this.$message({
                    message: res.data.msg,
                    type: 'warning'
                    });
                }else{
                    this.$message({
                    message: res.data.msg,
                    type: 'success'
                    });
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);
                }
            }).catch(err => {
                console.log(err);
            })
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
    background-color: #fff;
    border-radius: 20px;
}

.power-list {
    width: 95%;
    margin: 10px auto;
    height: calc(100vh - 15rem);
    overflow-y: scroll;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

::v-deep .el-tree-node__content {
    height: 40px;
}

.box-content {
    background-color: #cce0e7;
}

.bodys {
    background-color: #cce0e7;
    overflow: hidden;
}
</style>