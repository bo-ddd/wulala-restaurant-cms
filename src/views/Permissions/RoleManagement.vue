<template>
    <div class="bodys">
        <h4 class="mg-rl_20 title">角色管理</h4>
        <div class="box-contont">
            <div class="content">
                <el-tabs :tab-position="tabPosition" value="1" style="height: 100%;" >
                    <el-tab-pane disabled="" class="tab">
                        <template #label>
                            <el-button class="btn" type="primary" plain @click="toAddRole()">+添加新角色</el-button>
                        </template>
                    </el-tab-pane>
    
                        <el-tab-pane :label="item.roleName" v-for="(item,i) in obtainRoleList" :key="i">
                            <div class="subject">
                                <div class="flex-sp">
                                    <p class="subjext-title">{{item.roleName}}<span class="pl-5">该角色没有管理权限</span></p>
                                    <el-button type="primary" @click="toSetRolePower">设置角色权限</el-button>
                                </div>
                                <el-tabs :tab-position="tabPositions" style="" class="mt-20">
                                    <el-tab-pane label="角色成员">
                                        <div class="nav">
                                            <span>全部成员，共{{2}}人</span>
                                            <el-button type="primary">+添加成员</el-button>
                                        </div>
                                        <el-table :data="tableData" style="width: 100%">
                                            <el-table-column prop="name" label="角色ID" width="150">
                                            </el-table-column>
                                            <el-table-column prop="avatarphone" label="角色名称" width="150">
                                            </el-table-column>
                                            <el-table-column fixed="right" label="操作">
                                                <div class="delete">
                                                    <p><img src="@/assets/images/icon-mines.png" alt="">-移除</p>
                                                </div>
                                            </el-table-column>
                                        </el-table>
                                    </el-tab-pane>
                                    <el-tab-pane label="功能权限">
                                        功能权限
                                    </el-tab-pane>
                                    <el-tab-pane label="数据范围">
                                        数据范围
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { roleListApi } from '@/api/api';
export default {
    data() {
        return {
            tabPosition: 'left',
            tabPositions: 'top',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                avatarphone: '1231562369'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                avatarphone: '1231562369'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                avatarphone: '1231562369'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                avatarphone: '1231562369'
            }],
            obtainRoleList:''//角色
        }
    },
    created() {
        roleListApi({}).then(res=>{
            this.obtainRoleList = res.data.data;
            // console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        toAddRole: function () {
            this.$router.push({ path: '/addrole' })
        },
        toSetRolePower : function(){
            this.$router.push({path:'setrolepower'})
        }
    },
}
</script>

<style scoped>
.box-contont {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    min-height: 100%;
    padding: 15px;
}

.title {
    color: white;
}
.content {
    background-color: #fff;
    border-radius: 20px;
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
    color: #ccc;
}

.delete :hover {
    cursor: pointer;
}

.delete img {
    width: 18px;
    font-size: 12px;
}
.bodys{
    height: calc(100vh - 4rem);
    overflow-y: scroll;
    background: rebeccapurple;
}
</style>