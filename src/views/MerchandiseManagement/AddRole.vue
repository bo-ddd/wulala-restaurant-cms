<template>
    <div>
        <h4 class="mg-rl_20 title">添加角色</h4>
        <div class="box-contont">
            <div class="content">
                <div class="add-role">
                    <div action="" class="role-name">
                        <div class="role-title"><span>*</span>角色名称</div>
                        <el-input v-model="input1" placeholder="请输入新增角色名称"></el-input>
                    </div>
                    <div action="" class="role-name">
                        <div class="role-title"><span>*</span>所属部门</div>
                        <el-select v-model="input2" placeholder="请选择所属部门">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button class="btn" type="primary" plain @click="foundRole">创建角色</el-button>
                </div>
                <!-- 全选 -->
                <div class="select-all pt-15">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">选择所有权限</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                </div>
                <div class="power-list" v-for="(item , index) in array" :key="index">
                    <div class="power-list_nav">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{item.permissionName}}</el-checkbox>
                    </div>
                    <div class="power-list_content" v-if="item.children != 0">
                        <el-checkbox-group v-model="item.children" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in item.children" :label="city" :key="city">{{city.permissionName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import {roleCreate ,permissionListApi} from '@/api/api';
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default{
    data(){
        return{
            input1: '',
            input2: '',

            checkAll: false,
            checkedCities: ['北京'],
            cities: cityOptions,
            isIndeterminate: true,

            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],

            array : [],
        }
    },
    components:{
       
    },
    created(){
        permissionListApi({}).then(res=>{
            res.data.data.forEach(element => {
                element.children = [];
                res.data.data.forEach(el => {
                    if (element.id == el.pid) {
                        element.children.push({
                            permissionName : el.permissionName,
                        })
                    }
                })
                this.array.push(element);
            });
            console.log(this.array);
        }).catch(err => {
            console.log(err);
        })
    },
    methods:{
        foundRole : function (){
            roleCreate({
                roleName:this.input
            }).then(res => {
                if (res.data.status == 10300) {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                } else {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.$router.push({ path: '/rolemg' })
                }
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },

        handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
    }
}
</script>

<style scoped>
.box-contont {
    margin: 10px;
    background-color:#f6fafd;
    border-radius: 10px;
    min-height: 700px;
    padding: 15px;
}
.title{
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
.role-name{
    display: flex;
    align-items: center;
}
.role-title{
    width: 124px;
}
.role-name span{
    color: red;
}
.content{
    background-color: #fff;
    border-radius: 10px;
}
.power-list{
    border: 1px solid #eee;
}
.power-list_nav{
    background-color:#f6fafd;
    border-bottom: 1px solid #eee;
    padding: 20px;
}
.power-list_content{
    padding: 20px 20px 20px 50px;
}
</style>