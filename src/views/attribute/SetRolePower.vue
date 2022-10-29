<template>
    <div class="bodys">
        <h4 class="mg-rl_20 title">设置角色权限</h4>
        <div class="box-contont">
            <div class="content">
                <div class="add-role">
                    <div action="" class="role-name">
                        <div class="role-title"><span>*</span>角色名称</div>
                        <el-select v-model="input2" placeholder="请选择角色">
                            <el-option v-for="item in options" :key="item.roleName" :label="item.roleName"
                                :value="item.roleName">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button class="btn" type="primary" plain @click="foundRole">确定</el-button>
                </div>
                <!-- 全选 -->
                <div class="power-list">
                    <!-- 默认展开   :default-checked-keys="[]" 默认选中-->
                    <el-tree :data="array" show-checkbox node-key="id" :default-expand-all="false" :expand-on-click-node="false">
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
import { permissionListApi, roleListApi } from '@/api/api';
import { showLoading,hideLoading } from "@/api/loading";
export default {
    data() {
        return {
            input1: '',
            input2: '',
            isIndeterminate: true,
            options: [],
            array: [],
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
        foundRole: function () {
            console.log(1);
        },
        formatePermissionList : function(data) {
         let res = JSON.parse(JSON.stringify(data));
         res.forEach(item => {
             item.children = [];
             if (item.pid != 0) {
              let pItem = res.find((pItem) => pItem.id == item.pid)
              if (pItem && !pItem.children) pItem.children = [];
              pItem?.children.push(item)
             }
         })
         return res.filter((item) => item.pid == 0)
        },
        // remove(node, data) {
        //     const parent = node.parent;
        //     const children = parent.data.children || parent.data;
        //     const index = children.findIndex(d => d.id === data.id);
        //     children.splice(index, 1);
        // },
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
.box-contont{
    background-color: rebeccapurple;
}
.bodys{
    background-color: rebeccapurple;
    overflow: hidden;
}
</style>