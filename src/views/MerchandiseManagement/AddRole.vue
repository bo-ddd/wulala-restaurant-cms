<template>
    <div>
        <h4 class="mg-rl_20 title">添加角色</h4>
        <div class="box-contont">
            <div class="add-role">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <el-button class="btn" type="primary" plain @click="foundRole">创建角色</el-button>
            </div>
        </div>
    </div>
    
</template>

<script>
import {roleCreate} from '@/api/api';
export default{
    data(){
        return{
            input: '',
        }
    },
    components:{
       
    },
    created(){
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
    }
}
</script>

<style scoped>
.box-contont {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    min-height: 700px;
    padding: 15px;
}
.title{
    color: white;
}
.add-role{
    display: flex;
}
</style>