<template>
    <div class="bodys">
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
                </div>
                <!-- 全选 -->
                <div class="power-list">
                    <!-- 默认展开   :default-checked-keys="[]" 默认选中-->
                    <el-tree :data="array" show-checkbox node-key="id" :default-expand-all="false" :expand-on-click-node="false">
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
import { roleCreate, permissionListApi } from '@/api/api';

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
        }
    },
    created() {
        permissionListApi({}).then(res => {
            let dataList = this.formatData(res.data.data);
            console.log(res.data.data);
            this.array = dataList;
            console.log(this.array)
        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        foundRole: function () {
            roleCreate({
                roleName: this.input
            }).then(res => {
                if (res.data.status == 10300) {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                } else {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.$router.push({ path: '/rolemg' })
                }
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },
        formatData(data) {
            // 深拷贝
            let res = JSON.parse(JSON.stringify(data));
            res.forEach(item => {
                if (!item.children) item.children = [];
                if (item.pid != 0) {
                    let pItem = res.find(pItem => pItem.id == item.pid);
                    pItem.children.push(item)
                }

                
                // item.children = [];
                // if (pItem && pItem.children) pItem.children = [];
                // res.forEach(el => {
                //     if (item.id == el.pid) {
                //         item.children.push({
                //             permissionName: el.permissionName,
                //         })
                //     }
                // })
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

.title {
    color: white;
}

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
::v-deep .el-tree-node__content{
    height: 40px;
}
.box-content{
    background-color: rebeccapurple;
}
.bodys{
    background-color: rebeccapurple;
    overflow: hidden;
}
</style>