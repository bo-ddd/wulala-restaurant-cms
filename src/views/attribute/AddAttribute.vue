<template>
  <div>
    <h4 class="mg-rl_20 title">新增商品属性规格</h4>
    <div class="box-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类目名称">
          <el-select v-model="form.section" placeholder="请选择类目名称">
            <el-option v-for="(item,index) in categoryId" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型
        ">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">属性</el-radio>
            <el-radio :label="1">规格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即增加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import { categoryListApi,attributeCreateApi } from '@/api/api'
export default {
  data() {
    return {
      form: {
        section:'',
        name: "",
        type: "",
      },
      categoryId:''

    };
  },
  created(){
    this.ApplyCategory();
  },
  methods:{
    async onSubmit(){
        let res = await attributeCreateApi({
            categoryId: this.form.section,
            name: this.form.name,
            type:this.form.type
        })
        console.log(res);
        if (res.data.status == 1) {
          this.$message({
          type: "success",
          message: "增加成功",
        });
        }else{
          this.$message({
          type: "warning",
          message: res.data.msg,
        });
        }
    },
    async ApplyCategory(){
        let res = await categoryListApi()
        this.categoryId = res.data.data;
    }
  }
};
</script>

<style scoped>
.title {
  color: #fff;
}
.box-content {
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  min-height: 700px;
  padding: 15px 0;
}
.el-form{
    width: 24%;
}
</style>