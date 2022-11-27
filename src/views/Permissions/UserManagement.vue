<script>
import { userList } from '@/api/api';
import { showLoading, hideLoading } from "@/api/loading";
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
    },
    created(){
        showLoading();
        setTimeout(function () {
            hideLoading();
        }, 1000);
    }
}
</script>
<template>
      <div class="box">
        <div class="box-content">
            <el-table height="600"  :data="tableData" style="width: 100%">
                <el-table-column align="center" label="用户id" width="100">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span size="medium">{{ scope.row.userId }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="用户头像" width="180">
                    <template slot-scope="scope">
                        <img v-if="scope.row.avatarImg" class="banner-food_png" :src="scope.row.avatarImg" alt="">
                        <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="昵称">
                    <template slot-scope="scope">
                        <span size="medium">{{ scope.row.avatarName }}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="手机号">
                    <template slot-scope="scope">
                        <span size="medium">{{ scope.row.phoneNumber }}</span>
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
                :page-sizes="[5, 20, 30, 40]" :page-size=pagesize layout="total, sizes, prev, pager, next, jumper"
                :total=total>
            </el-pagination>

        </div>
    </div>
</template>
<style scoped>
.box{
    background-color: #eeeeee;
    height: calc(100vh - 60px);
   
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
.block {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}
.el-pagination{
    padding: 30px 5px;
}
</style>