
<script>
import { getCategoryList, attributeListApi, updateFood, foodList } from '@/api/api'
export default {
    data() {
        return {
            from: {
                
            },
            categorylist: [],
            imageUrl: '',
            foodName: '', //菜肴名称
            description: '', //菜肴描述
            bannerUrl: '',
            price: '',
            categoryId: '',
            attributeList: [],//类目列表
            attributeKey: [],
            attrId: '',
            foodListId: "",
            foodListAll: []
        }
    },
    watch: {
        categoryId(oldValue, newValue) {
            attributeListApi({
                // categoryId: 1
            }).then(res => {
                this.attributeList = res.data.data
                this.attributeKey = []
                // console.log(res.data.data);
                this.attributeList.forEach(el => {
                    if (el.categoryId == oldValue) {
                        this.attributeKey.push(el)
                    }
                })
                // console.log(this.attributeKey);
                console.log(oldValue);
                console.log(newValue);
            })
        }
    },
    created() {
        // console.log(this.attributeKey);
        getCategoryList({

        }).then(res => {
            this.categorylist = res.data.data
        });
        foodList({}).then(res => {
            res.data.data.list.forEach(el => {
                if (this.foodListId == el.foodId) {
                    this.foodName = el.foodName
                    this.price = el.price
                    this.bannerUrl = el.bannerUrl
                    this.description = el.description
                    this.categoryId = el.categoryId
                    attributeListApi({
                    }).then(res => {
                        this.attributeList = res.data.data
                        this.attributeKey = []
                        // console.log(res.data.data);
                        this.attributeList.forEach(els => {
                            if (els.categoryId == el.categoryId) {
                                this.attributeKey.push(els)
                            }
                        })
                        console.log(this.attributeKey);
                        el.attrs.forEach((item) => {
                            // console.log(i);
                            // console.log(this.from);
                            this.attributeKey.forEach(el =>{
                                // console.log("------------");
                                if (item.attrName == el.attrName) {
                                    console.log(el.attrName);
                                    console.log("========");
                                    console.log(item.attrName);
                                    this.from[item.id] = item.attrValue
                                }
                            })
                        })
                    })
                }
            })
        })

        this.foodListId = this.$route.query.id
        console.log(this.foodListId);
    },
    mounted() {
    },

    methods: {
        upload: function () {
            let token = sessionStorage.getItem('token')
            if (!token) {
                alert('请先登录')
            } else {
                console.log(this.from);
                foodList({}).then(res => {
                    this.foodListAll = res.data.data.list
                    res.data.data.list.forEach(el => {
                        if (this.foodListId == el.foodId) {
                            updateFood({
                                foodId: el.foodId,
                                foodName: this.foodName,
                                description: this.description,
                                price: this.price,
                                bannerUrl: this.bannerUrl,
                                categoryId: el.categoryId
                            }).then(res => {
                                console.log(res);
                            })
                        }
                    })
                })
            }

        },

        goBack() {
            this.$router.back(-1)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.bannerUrl = res.data.url
            console.log(this.bannerUrl);
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
        },

    },

}
</script>
<template>
    <div class="box">
        <el-page-header @back="goBack" content="修改菜肴">
        </el-page-header>
        <div class="box-content">
            <el-form label-width="80px">
                <el-form-item label="菜肴名称">
                    <el-input class="aa" v-model="foodName"></el-input>
                </el-form-item>
                <el-form-item label="菜肴价格">
                    <el-input class="aa" v-model="price"></el-input>
                </el-form-item>
                <el-form-item label="菜肴类型">
                    <el-select class="aa" v-model="categoryId" placeholder="请选择菜品类型">
                        <el-option v-for="(el, i) in categorylist" :key="i" :label="el.name" :value="el.id">
                        </el-option>
                    </el-select>
                    <el-form-item v-for="(el, i) in attributeKey" :label="el.attrName" :key="i">
                        <el-input class="aa" v-model="from[i]"></el-input>
                    </el-form-item>
                </el-form-item>

                <el-form-item label="菜肴描述">
                    <el-input type="textarea" class="aa" v-model="description"></el-input>
                </el-form-item>
                <el-form-item label="菜肴主图">
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

</template>
<style scoped>
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

.aa {
    width: 223px;
}
</style>
