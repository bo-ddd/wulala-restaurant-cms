
<script>

import { getCategoryList, attributeListApi, updateFood, foodDetail,updateAttributeValue} from '@/api/api'
export default {
    data() {
        return {
            from: {},
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
            step: {
                oldValue: '',
                newFoodName: '',
                newPrice: '',
                newDescription: ''
            },
            active: 0,
            dialogVisible: false
        }
    },
    watch: {

        categoryId(oldValue, newValue) {
            this.step.oldValue = oldValue
            console.log(this.step);
            attributeListApi({

            }).then(res => {
                this.attributeKey = []
                this.attributeList = res.data.data
                // console.log(res.data.data);
                this.attributeList.forEach(el => {
                    if (el.categoryId == oldValue) {
                        this.attributeKey.push(el)
                    }
                })
                console.log(this.attributeKey);
                console.log(oldValue);
                console.log(newValue);
            })
        },
        foodName(newFoodName, b) {
            this.step.newFoodName = newFoodName
            console.log(this.step);
            console.log(b);
        },
        price(newPrice, b) {
            this.step.newPrice = newPrice
            console.log(this.step);
            console.log(b);
        },
        description(newDescription, b) {
            this.step.newDescription = newDescription
            console.log(this.step);
            console.log(b);
        },

    },

    created() {

        //类目列表
        getCategoryList({

        }).then(res => {
            this.categorylist = res.data.data
        });
        this.foodId = this.$route.query.foodId
        this.getFoodList()
        this.active =  this.getFoodList()
        console.log(this.active);


    },
    methods: {
        upFood() {
            let token = sessionStorage.getItem('token')
            if (!token) {
                alert('请先登录')
            } else {
                console.log(this.from);
                updateFood({
                    foodId: this.foodId,
                    foodName: this.foodName, //菜肴名称
                    description: this.description, //菜肴描述
                    bannerUrl: this.bannerUrl,
                    price: this.price,
                    categoryId: this.categoryId
                }).then(res => {
                    // this.attrId = res.data.data.id
                    console.log('===========');
                    console.log(res);
                    this.attributeKey.forEach((el) => {
                        console.log(this.attrId);
                        console.log(el);
                        updateAttributeValue({
                            productId: Number(this.foodId),
                            attributeId:el.attrId,
                            value: this.from[el.attrId]
                        }).then(res => {
                            console.log(res);
                        })
                    })
                    if (this.active == 2) {
                        this.active = 3
                        this.dialogVisible = true
                    }
                })
            }
        },
        goBacks(){
            this.dialogVisible = false
            this.$router.back(-1)
        },
        goBack() {
            this.$router.back(-1)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.bannerUrl = res.data.url
            if (this.active == 1 && this.bannerUrl != '') {
                this.active = 2
            }
            console.log(this.bannerUrl);
            console.log(this.active);
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
        getFoodList() {
            console.log("aa");
            let   nb = 2
            console.log(this.foodId);
            foodDetail({
                foodId: this.foodId
            }).then(res => {
                this.foodData = res.data.data
                console.log('----------');
                console.log(res);
                this.imageUrl = this.foodData.bannerUrl
                this.foodName = this.foodData.foodName
                this.price = this.foodData.price
                this.categoryId = this.foodData.categoryId
                this.description = this.foodData.description
                console.log(this.imageUrl,this.active);
                if (this.active == 1 && this.imageUrl != '') {
                    console.log(1);
                    nb = 2
            }
                this.foodData.attrs.forEach(el => {
                    console.log('======');
                    console.log(this.from, el);
                    // this.from[el.attrName] = el.attrValue
                    this.$set(this.from, el.attrId, el.attrValue);
                })

            })
            return  nb
        }

    },



}
</script>
<template>
    <div class="box">
        <el-page-header @back="goBack" >
        </el-page-header>
        <div class="box-content">
            <h3 class="text">菜肴详情</h3>
            <el-steps :active=this.active finish-status="success" simple style="margin-top: 20px">
                <el-step title="填写基本内容"></el-step>
                <el-step title="上传菜肴图片"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <div class="div">

         
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
                        <el-input class="aa" v-model="from[el.attrId]"></el-input>
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
                    <div><img src="" alt=""></div>
                </el-form-item>
                <el-form-item>
                    <el-button  @click="upFood()">修改</el-button>
                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
                            <span>菜品已添加完成</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="goBacks">确 定</el-button>
                            </span>
                        </el-dialog>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        </div>
    </div>

</template>
<style scoped>
.div {
    width: 100%;
    height: 600px;
    overflow-y: scroll;
}
::-webkit-scrollbar { width: 0 !important }
.el-form {
    margin-left: 400px;
    margin-top: 30px;
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

.aa {
    width: 223px;
}
.el-page-header{
    margin: 15px 0 -20px 35px;
}
</style>
