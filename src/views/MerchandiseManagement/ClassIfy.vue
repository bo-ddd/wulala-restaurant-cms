<template>
    <div class="box">
        <h3 class="title">菜品分类</h3>
        <div class="box-content">
            <div class="mt-14">
                <span class="category">添加类目 &nbsp;</span>
                <el-input class="input" v-model="input" size="mini" placeholder="请输入内容"></el-input>
                <el-button class="btn" type="success" size="mini" @click="add">添加</el-button>
            </div>

            <div>
                <el-tabs @tab-click="handle" v-model="activeName">
                    <el-tab-pane v-for="(el, i) in categoryList" :key="i" :label="el.name" :name="el.name">

                        <el-table height="600" :data="foodList" style="width: 100%">
                            <el-table-column label="菜肴图片">
                                <template slot-scope="scope">
                                    <img class="banner-food_png" :src="scope.row.bannerUrl" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column prop="foodName" label="菜肴名称">
                            </el-table-column>
                            <el-table-column prop="description" label="菜肴描述">
                            </el-table-column>
                            <el-table-column align="center" label="菜肴价格">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.price + '元' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="菜肴操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改 </el-button>
                                    <el-popconfirm @confirm="confirm(scope.row)" trigger="click"
                                        title="您删除的当前菜肴包含菜肴属性，您确定要删除吗？">
                                        <el-button class="btn" size="mini" type="danger" slot="reference">删除</el-button>
                                    </el-popconfirm>
                                    <!-- 
                                    <el-button @click="handleDelete(scope.$index, scope.row)">
                                        删除</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

    </div>
</template>
<script>
import { getCategoryAddApi, getCategoryList, foodList, deleteFood } from '@/api/api'
export default {

    data() {
        return {
            activeName: '',
            input: '',
            categoryList: [], //类目列表
            foodList: [], //菜肴列表
            defaultDisplay: '',//默认展示
            attributeList: [],//获取商品属性列表
            tabName: '',
        };
    },


    methods: {
        handle(tab) {
            this.tabName = tab.name
            console.log(tab.name);
            this.getFoodList()
        },
        getFoodList() {
            this.categoryList.forEach(el => {
                if (this.tabName == el.name) {
                    foodList({
                        categoryId: el.id //商品列表 categoryId
                    }).then(res => {
                        this.foodList = res.data.data.list
                    })
                }
            })
        },
        add() {
            getCategoryAddApi({
                name: this.input, //类目名称
                productUnit: "盘", //单位
                parentId: null, //父级id，如果不填则为0，  如果为0，表示一级类目
                sort: 1 //排序
            }).then(res => {
                console.log(res);
            })
        },
        handleEdit(a, b) {
            console.log(a, b);
            this.$router.push({
                name: 'cuisineAttribute',
                query:{
                    id:b.foodId
                }
            })
        },
        confirm(foodId) {
            deleteFood({
                foodId: foodId.foodId
            })
            this.$message({
                message: '删除成功',
                type: 'success'
            });
        }
    },
    created() {
        getCategoryList({

        }).then(res => {
            this.activeName = res.data.data[0].name
            this.categoryList = res.data.data;
            this.tabName = this.categoryList[0].name
            this.getFoodList()
        });
    }

};

</script>
<style scoped>
.box-classify {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
}


.input {
    width: 250px;
}

.category {
    font-size: 12px;
    font-weight: bold;
}

.btn {
    margin-left: 10px;
}

.banner-food_png {
    width: 50px;
    height: 50px;
}
</style>