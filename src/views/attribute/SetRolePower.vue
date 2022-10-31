<template>
    <div class="bodys">
        <h4 class="mg-rl_20 title">设置角色权限</h4>
        <div class="box-contont">
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
                    <!-- <el-button class="btn" type="primary" plain @click="foundRole">确定</el-button> -->
                </div>
                <!-- 全选 -->
                <div class="power-list" v-if="ifs == ''">
                    <div class="erroy">请先选择角色名称</div>
                </div>
                <div class="power-list" v-else>
                    <!-- 默认展开   :default-checked-keys="[]" 默认选中-->
                    <el-button class="btn" type="primary" plain @click="addToRole">添加权限</el-button>
                    <el-tree :data="array" :show-checkbox="true" node-key="id" :default-expand-all="false" @check="getId" :expand-on-click-node="false">
                        <span class="custom-tree-node" slot-scope="{ data }">
                            <span>{{ data.permissionName }}</span>
                        </span>
                    </el-tree>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// rolePermissionList
import { permissionListApi, roleListApi ,roleAddPermission} from '@/api/api';
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
            ifs:ref(''),
            permissionId:[],
        }
    },
    created() {
        showLoading();
        setTimeout(function () {
            hideLoading();
        },1000),
        permissionListApi({}).then(res => {
            let dataList = this.formatePermissionList(res.data.data);
            this.array = dataList;
        }).catch(err => {
            console.log(err);
        }),
        roleListApi({}).then(res=>{
            this.options = res.data.data;
        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        getId(data) {
            this.permissionId.push(data.id);
        },
        foundRole: function () {
            if (this.input2 == '') {
                this.$message({
                    message: '请选择角色',
                    type: 'warning'
                });
            }else{
                this.ifs = 1
            }
        },
        addToRole : function(){
            if (this.permissionId == '') {
                this.$message({
                    message: '请选择权限',
                    type: 'warning'
                });
            }else{
                this.permissionId.forEach(el => {
                    roleAddPermission({
                        roleId:this.input2,
                        permissionId:el
                    }).then(res => {
                        // console.log(res);
                        if (res.data.status == 10303) {
                            this.$message({ 
                                message: '角色名称不能为空',
                                type: 'warning'
                            });
                        } else if (res.data.status == 10302) {
                            this.$message({
                                message: '请选择权限',
                                type: 'warning'
                            });
                        } else {
                            this.$message({
                                message: '创建成功',
                                type: 'success'
                            });
                            this.$router.push({ path: '/rolemg' });
                        }
                    })
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
    overflow-y: scroll;
    height: calc(100vh - 9.8rem);
    margin: 15px 30px;
    background-color: white;
    padding: 15px;
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
</style>