<template>
    <div>
        <h4 class="mg-rl_20">菜品管理</h4>
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
                        <span>菜品状态:</span>
                        <el-select v-model="value" size="mini" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
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
                        <el-button size="mini">默认按钮</el-button>
                        <el-button size="mini" type="primary">主要按钮</el-button>
                    </el-row>
                </div>
            </div>
            <div class="box-btn">
                <el-row>

                    <el-button size="mini" type="primary">新增菜品</el-button>
                    <el-button size="mini">批量上架</el-button>
                    <el-button size="mini">批量下架</el-button>
                    <el-button size="mini">批量删除</el-button>
                </el-row>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-pagination :page-size="2" background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            select: '',
            value: '',
            options: [{
                value: '选项1',
                label: '已上架'
            }, {
                value: '选项2',
                label: '未上架'
            }, {
                value: '选项3',
                label: '已下架'
            }],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }
            ]
        }
    }

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

.box-inquire_btn {
    //    margin-left: 298px;
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
</style>