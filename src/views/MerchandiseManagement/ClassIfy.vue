<template>
    <div>
        <h4 class="title">菜品分类</h4>
        <div class="box-contont">
            <div class="mt-14">
                <span class="category">添加类目 &nbsp;</span>
                <el-input class="input" v-model="input" size="mini" placeholder="请输入内容"></el-input>
                <el-button class="btn" type="success" size="mini" @click="add">添加</el-button>
            </div>

            <div>
                <el-tabs @tab-click="handle" v-model="activeName">
                    <el-tab-pane v-for="(el, i) in categoryList" :key="i" :label="el.name" :name="el.name">
                        <el-table align="center" :data="foodList" style="width: 100%">
                            <el-table-column label="菜肴图片" width="180">
                                <template slot-scope="scope">
                                    <img class="banner-food_png" :src="scope.row.bannerUrl" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column label="菜肴名称" width="180">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        <p>姓名: {{ scope.row.foodName }}</p>
                                        <p>住址: {{ scope.row.address }}</p>
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium">{{ scope.row.foodName }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column label="菜肴描述">
                                <template slot-scope="scope">
                                    <el-tag size="medium">{{ scope.row.description }}</el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="菜肴价格">
                                <template slot-scope="scope">
                                    <el-tag size="medium">{{ scope.row.price + '元' }}</el-tag>
                                </template>
                            </el-table-column>



                            <el-table-column align="center" label="菜肴操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改    </el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                        删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
>>>>>>> b05c81a04499f0a55a53b5b39a164b09f65201f9
                    </el-tab-pane>
                </el-tabs>

            </div>
        </div>

    </div>
</template>
<script>
import { getCategoryAddApi, getCategoryList, foodList } from '@/api/api'
export default {

    data() {
        return {
            activeName: '川菜',
            input: '',
            categoryList: [], //类目列表
            foodList: [], //菜肴列表
            defaultDisplay: [],//默认展示
        };
    },


    methods: {
        handle(tab) {
            console.log(tab);
            this.categoryList.forEach(el => {
                if (tab.label == el.name) {
                    foodList({
                        categoryId: el.id //非必填项，根据类目id查询商品列表
                    }).then(res => {
                        console.log(res.data.data.list);
                        this.foodList = res.data.data.list
                        this.foodLists = res.data.data.list
                        this.foodLists.forEach(el => {
                            console.log(el.categoryId);
                        })
                    })

                }
            })
            console.log(tab.label);

        },
      
        add() {
            getCategoryAddApi({
                name: this.input, //类目名称
                productUnit: "盘", //单位
                parentId: 0, //父级id，如果不填则为0，  如果为0，表示一级类目
                sort: 1 //排序
            }).then(res => {
                console.log(res);
            })
        },
    },
    mounted() {
        getCategoryList({

        }).then(res => {
            this.categoryList = res.data.data
            console.log(res.data.data[0]);
            this.defaultDisplay = res.data.data[0]
        });
        foodList({
            categoryId: this.defaultDisplay.id
        }).then(res => {
            this.foodList = res.data.data.list
            console.log(res.data.data.list);
        })
    }

};
</script>
<style scoped>
.box-classify {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
}

.box-contont {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    height: 100%;
    padding: 15px;
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