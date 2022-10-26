<script>
import { userList } from '@/api/api';
export default {
    data() {
        return {
            tableData:[],
            currentchange :1,
            sizechange :10,
            pagesize: 0,
            total: 0,
        }
    },
    methods: {
        toSetUser: function (data) {
            this.$router.push({ path: '/setusermg',query:{
                userId : data.userId
            } })
            console.log(data);
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.sizechange = val
            userList({
            pageNum: this.currentchange,
            pageSize: this.sizechange,
        }).then(res => {
            //  this.tableData.push(res.data.data.list)
            this.tableData = res.data.data.list
            console.log(res.data.data);
            this.total = res.data.data.total
            this.pagesize = res.data.data.pageSize
            console.log(this.total);
        })

        },
        handleCurrentChange(val) {
            this.currentchange = val
            userList({
            pageNum: this.currentchange,
            pageSize: this.sizechange,
        }).then(res => {
            //  this.tableData.push(res.data.data.list)
            this.tableData = res.data.data.list
            console.log(res.data.data);
            this.total = res.data.data.total
            this.pagesize = res.data.data.pageSize
            console.log(this.total);
        })
            // console.log(`当前页: ${val}`);
        },
    },
    mounted() {
        userList({
            pageNum: this.currentchange,
            pageSize: this.sizechange,
        }).then(res => {
            //  this.tableData.push(res.data.data.list)
            this.tableData = res.data.data.list
            console.log(res.data.data);
            this.total = res.data.data.total
            this.pagesize = res.data.data.pageSize
            console.log(this.total);
        })
    }
}
</script>
<template>
    <div>
        <h4 class="mg-rl_20 title">用户管理</h4>
        <div class="box-contont">

            <el-table  :data="tableData" style="width: 100%">
                <el-table-column align="center" label="用户头像" width="180">
                    <template slot-scope="scope">
                        <img v-if="scope.row.avatarImg" class="banner-food_png" :src="scope.row.avatarImg" alt="">
                    <div class="avatarImg" v-else></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户id" width="180">
                    <template slot-scope="scope">
                          
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.userId }}</el-tag>
                            </div>
                    
                    </template>
                </el-table-column>

                <el-table-column align="center" label="昵称">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.avatarName }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="手机号">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.phoneNumber }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="角色">
                    <template >
                        <el-tag size="medium">特一级厨师</el-tag>
                        <!-- <el-button size="mini" >添加角色</el-button>
                        <el-button size="mini" type="danger" >删除角色</el-button>
                        <el-button size="mini" >查看角色</el-button> -->
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="toSetUser(scope.row)">查看用户角色</el-button>
                        <!-- <el-button size="mini" type="danger" >删除角色</el-button>
                        <el-button size="mini" >查看角色</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]" :page-size=pagesize layout="total, sizes, prev, pager, next, jumper"
                :total=total>
            </el-pagination>

        </div>
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

.title {
    color: white;
}


::v-deep .el-select {
    width: 100px;
}

.box-inquire {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

}

.box-inquire_inp {
    width: 650px;
    display: flex;
    justify-content: space-between;
}

.box-inquire_inp span {
    font-size: 12px;
    font-weight: 600;
    margin-right: 5px;
}
.banner-food_png{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
.avatarImg{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #ccc;
    display: inline-block;
}
</style>