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

                        <el-table :data="foodList" style="width: 100%">
                            <el-table-column label="菜肴图片" width="268">
                                <template slot-scope="scope">
                                    <img class="banner-food_png" :src="scope.row.bannerUrl" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column prop="foodName" label="菜肴名称" width="268">
                            </el-table-column>
                            <el-table-column prop="description" label="菜肴描述" width="268">
                            </el-table-column>
                            <el-table-column prop="description" label="菜肴属性" width="268">
                            </el-table-column>
                            <el-table-column align="center" label="菜肴价格"  width="268">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.price + '元' }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="菜肴操作" width="268" >
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改 </el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                        删除</el-button>
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
import { getCategoryAddApi, getCategoryList, foodList, attributeListApi } from '@/api/api'
export default {

    data() {
        return {
            activeName: '川菜',
            input: '',
            categoryList: [], //类目列表
            foodList: [], //菜肴列表
            defaultDisplay: [],//默认展示
            attributeList: [],//获取商品属性列表
        };
    },


    methods: {
        handle(tab) {
            console.log(tab);
            this.categoryList.forEach(el => {
                if (tab.label == el.name) {
                    foodList({
                        categoryId: el.id //商品列表 categoryId
                    }).then(res => {
                        this.foodList = res.data.data.list
                        console.log(this.foodList);
                    })
                    attributeListApi({}).then(res => {
                        res.data.data.list.forEach(item => {
                            if (item.type == 0) {
                                console.log('-----------点击事件得log---------');
                                console.log(item);
                            }
                        })
                    })
                }
            })
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
    created() {
        getCategoryList({

        }).then(res => {
            this.categoryList = res.data.data
            this.defaultDisplay = res.data.data[0]

        });
        foodList({
            categoryId: this.defaultDisplay.id
        }).then(res => {
            this.foodList = res.data.data.list
            console.log(this.foodList[0]);
        });
        attributeListApi({}).then(res => {
            this.attributeList = res.data.data.list
            console.log(this.attributeList);

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