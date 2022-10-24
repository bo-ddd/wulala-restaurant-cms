<template>
    <div>
        <h4 class="mg-rl_20 title">菜品管理</h4>
        <div class="box-contont">
            <div class="box-inquire">
                <div class="box-inquire_inp">
                    <div>
                        <span>菜品状态:</span>
                        <el-select v-model="value" size="mini" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>菜品类型:</span>
                        <el-select v-model="valueType" size="mini" placeholder="请选择">
                            <el-option v-for="item in footType" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="inp">
                        <el-input size="mini" placeholder="请输入内容" v-model="input3" class="input-with-select">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                                <el-option label="餐厅名" value="1"></el-option>
                                <el-option label="订单号" value="2"></el-option>
                                <el-option label="用户电话" value="3"></el-option>
                            </el-select>
                        </el-input>
                    </div>
                </div>
                <div class="box-inquire_btn">
                    <el-row>
                        <el-button size="mini">查询</el-button>
                        <el-button size="mini" type="primary">重置</el-button>
                    </el-row>
                </div>
            </div>
            <div class="box-btn">
                <el-row>

                    <el-button size="mini" type="primary" @click="toFoodAdd()">新增菜品</el-button>
                    <el-button size="mini">批量上架</el-button>
                    <el-button size="mini">批量下架</el-button>
                    <el-button size="mini">批量删除</el-button>
                </el-row>
            </div>


            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="菜名图片" width="180">
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-time"></i> -->
                        <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                        <img class="banner-food_png" :src="scope.row.bannerUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="菜名" width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.foodName }}</p>
                            <p>价格: {{ scope.row.price }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.foodName }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column label="描述">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.description}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="价格">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{scope.row.price + '元'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>


        </div>
        <div>
            <el-pagination :page-size="2" background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
    </div>
</template>
<script>
import { foodList, deleteFood } from '@/api/api'
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            select: '',
            value: '',
            valueType: '',
            options: [{
                value: '1',
                label: '已上架'
            }, {
                value: '2',
                label: '未上架'
            }, {
                value: '3',
                label: '已下架'
            }],
            footType: [{
                value: '1',
                label: '菜品'
            }, {
                value: '2',
                label: '粥/汤'
            }],
            tableData: [

                // {
                //     date: '2016-05-02',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1518 弄'
                // }, {
                //     date: '2016-05-04',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1517 弄'
                // }, {
                //     date: '2016-05-01',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1519 弄'
                // }, {
                //     date: '2016-05-03',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1516 弄'
                // }

            ]
        }
    },
    methods: {
        toFoodAdd: function () {
            this.$router.push({ path: '/foodadd' })
        },
        handleEdit(index, row) {
            if (localStorage.getItem('token')) {
                console.log('1');
            } else {
                alert('请登录')
            }
            console.log(index, row);
        },
        handleDelete(index, row) {
            deleteFood({
                foodId: row.foodId
            }).then(res => {
                console.log('删除菜品', res.data);
                foodList({

                }).then(res => {
                    //  this.tableData.push(res.data.data.list)
                    this.tableData = res.data.data.list
                    console.log(this.tableData);
                })
            })
            console.log(row.price);
        }
    },
    mounted() {
        foodList({

        }).then(res => {
            //  this.tableData.push(res.data.data.list)
            this.tableData = res.data.data.list
            console.log(res);
        })
    },
}

</script>
<style lang="scss" scoped>
.box-contont {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    height: 690px;
    padding: 15px;
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
.title{
    color: white;
}
.banner-food_png {
    width: 50px;
    height: 50px;
}
</style>