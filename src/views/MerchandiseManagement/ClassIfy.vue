<template>
    <div>
        <h4 class="title">菜品分类</h4>
        <div class="box-contont">
            <div class="mt-14">
                <span class="category">添加类目 &nbsp;</span>
                <el-input class="input" v-model="input" size="mini" placeholder="请输入内容"></el-input>
                <el-button class="btn" type="success" size="mini" @click="add">添加</el-button>
            </div>
            <div >
                <el-tabs  @tab-click="handleClick" >
                    <el-tab-pane v-for="(el,i) in categoryList" :key="i" :label="el.name">
                    
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

    </div>
</template>
<script>
import { getCategoryAddApi, getCategoryList } from '@/api/api'
export default {

    data() {
        return {
            // activeName: 'first',
            input: '',
            categoryList: []
        };
    },


    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        add() {
            getCategoryAddApi({
                name: this.input, //类目名称
                productUnit: "盘", //单位
                parentId: 0, //父级id，如果不填则为0，  如果为0，表示一级类目
                sort: 1 //排序
            }).then(res => {
                console.log('---------类目----------');
                console.log(res);
            })
        }
    },
    mounted() {
        getCategoryList({

        }).then(res => {
            this.categoryList = res.data.data
            console.log('---------类目列表----------');
            console.log(this.categoryList);
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
</style>