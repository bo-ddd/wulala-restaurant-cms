<template>
    <div class="box">
        <h4 class="mg-rl_20 title">添加角色</h4>
        <div class="box-content">
            <div class="content">
                <div class="add-role">
                    <div action="" class="role-name">
                        <div class="role-title"><span>*</span>角色名称</div>
                        <el-input v-model="input1" placeholder="请输入新增角色名称"></el-input>
                    </div>
                    <div action="" class="role-name">
                        <div class="role-title"><span>*</span>所属部门</div>
                        <el-select v-model="input2" placeholder="请选择所属部门">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button class="btn" type="primary" plain @click="foundRole">创建角色</el-button>
                    <!-- <el-button class="btn" type="primary" plain>{{permissionId}}</el-button> -->
                </div>
                <!-- 全选 -->
                <div class="power-list">
                    <!-- 默认展开   :default-checked-keys="[]" 默认选中-->
                    <!-- <el-button class="btn yes" type="primary" plain @click="addToPower">添加权限</el-button> -->
                    <el-tree :data="array" show-checkbox node-key="id" :default-expand-all="false" @check="getId"
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
import { roleCreate, permissionListApi } from '@/api/api';
import { showLoading, hideLoading } from "@/api/loading";
export default {
    data() {
        return {
            input1: '',
            input2: '',
            isIndeterminate: true,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
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
            roleCreate({
                roleName: this.input1,
                permissionIds: this.permissionId, //给角色添加默认权限
            }).then(res => {
                // console.log('-------foundRole------');
                // console.log(res);
                if (res.data.status == 10300) {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
                else if(this.permissionId == ''){
                    this.$message({
                        message: '角色创建成功,请添加权限',
                        type: 'success'
                    });
                    this.$router.push({ path: '/rolemg' })
                }
                else if(res.data.status == 1){
                    this.$message({
                        message: '角色创建成功',
                        type: 'success'
                    });
                    this.$router.push({ path: '/rolemg' })
                } 
                
            })
            .catch(err => {
                console.log(err);
            })
        },
        getId(data) {
            this.permissionId.push(data.id);
            console.log(this.permissionId);
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
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
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
    overflow-y: scroll;
    height: calc(100vh - 9.8rem);
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