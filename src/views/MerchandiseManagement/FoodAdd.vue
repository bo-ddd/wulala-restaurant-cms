<script>
import { foodAdd } from '@/api/api'
export default {
    data() {
        return {
            imageUrl: '',
            form: {
                foodType: '', //菜肴类型 1：菜 2：粥
                foodName: '', //菜肴名称
                description: '', //菜肴描述
                bannerUrl: '',
                price: '',
            }
        }
    },

    methods: {
       
        upload: function () {
            let token = sessionStorage.getItem('token')
            if(!token){
               alert('请先登录')
            }else{
                let addfood = this.form
                console.log(addfood);
                foodAdd(
                    addfood
                ).then(res => {
                    console.log(res);
                })
            }

        },


        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.form.bannerUrl = res.data.url
            console.log(this.form.bannerUrl);
        },
        beforeAvatarUpload(file) {
            const isPNG = file.type === 'image/png';
            const isLt1M = file.size / 1024 / 1024 < 1;

            if (!isPNG) {
                this.$message.error('上传头像图片只能是 PNG 格式!');
            }
            if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isPNG && isLt1M;
        }
    }
}
</script>
<template>
    <div>
        <h4>返回</h4>
        <div class="box">
            <h3>菜品详情</h3>
            <div class="box-content">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="菜品名称">
                        <el-input v-model="form.foodName"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品类型">
                        <el-select v-model="form.foodType" placeholder="请选择菜品类型">
                            <el-option label="菜" value="1"></el-option>
                            <el-option label="粥" value="2"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="菜品描述">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品主图">
                        <el-upload class="avatar-uploader" action="api/upload/food" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="upload()">添加</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style scoped>
.box-content {
    margin-top: 50px;
    width: 400px;
    margin-left: 160px;
}

.box {
    margin-top: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
}

::v-deep .el-upload {
    border: 1px solid #ccc;
    border-radius: 5px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
