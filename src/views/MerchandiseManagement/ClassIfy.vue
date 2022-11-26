<template>
    <div class="box">

        <div class="box-content">
            <div>
                <el-button class="btn" type="success" size="mini" @click="dialogFormVisible = true">添加类目</el-button>
                <el-dialog title="添加类目" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="类目名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="类型" :label-width="formLabelWidth">
                            <el-select v-model="form.type" placeholder="请选择类目类型">
                                <el-option label="h5" value="1"></el-option>
                                <el-option label="pc" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜品主图" :label-width="formLabelWidth">
                        <el-upload class="avatar-uploader" action="api/upload/food" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="add">确 定</el-button>
                    </div>
                </el-dialog>
                <el-select size="mini" v-model="deleteFrom" placeholder="请选择">
    <el-option 
      v-for="(item,i) in categoryList"
      :key="i"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  <el-button class="btn" type="success" size="mini" @click="aa">删除类目</el-button>
            </div>

            <div>
                <el-tabs @tab-click="handle" v-model="activeName">
                    <el-tab-pane v-for="(el, i) in categoryList" :key="i" :label="el.name" :name="el.name">

                        <el-table height="600" :data="foodList" style="width: 100%">
                            <el-table-column label="菜肴图片">
                                <template slot-scope="scope">
                                    <img class="banner-food_png" :src="scope.row.bannerUrl" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column prop="foodName" label="菜肴名称">
                            </el-table-column>
                            <el-table-column prop="description" label="菜肴描述">
                            </el-table-column>
                            <el-table-column align="center" label="菜肴价格">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.price + '元' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="菜肴操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改 </el-button>
                                    <el-popconfirm @confirm="confirm(scope.row)" trigger="click"
                                        title="您删除的当前菜肴包含菜肴属性，您确定要删除吗？">
                                        <el-button class="btn" size="mini" type="danger" slot="reference">删除</el-button>
                                    </el-popconfirm>
                                    <!-- 
                                    <el-button @click="handleDelete(scope.$index, scope.row)">
                                        删除</el-button> -->
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
import { getCategoryAddApi, getCategoryList, foodList,deleteFood, categoryDelete} from '@/api/api'
import { showLoading, hideLoading } from "@/api/loading";
export default {

    data() {
        return {
            bannerUrl:'',
            imageUrl: '',
            activeName: '',
            deleteFrom:'',
            categoryList: [], //类目列表
            foodList: [], //菜肴列表
            defaultDisplay: '',//默认展示
            attributeList: [],//获取商品属性列表
            tabName: '',
            dialogFormVisible: false,
            form: {
          name: '',
          type: '',
          delivery: false,
        },
        formLabelWidth: '120px'
        };
    },


    methods: {
        handleAvatarSuccess(res, file) {
        this.bannerUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.data.url

      },
      beforeAvatarUpload(file) {
            const isPNG = file.type === 'image/png';
            const isLt1M = file.size / 1024 / 1024 < 2;

            if (!isPNG) {
                this.$message.error('上传头像图片只能是 PNG 格式!');
            }
            if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isPNG && isLt1M;
        },
        dep(a){
            this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            if(a == "成功"){
                this.$message({
            type: 'success',
            message: a
          });
            }else{
                this.$message.error(a);
            }
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        handle(tab) {
            this.tabName = tab.name
            console.log(tab.name);
            this.getFoodList()
        },
        getFoodList() {
            this.categoryList.forEach(el => {
                if (this.tabName == el.name) {
                    foodList({
                        categoryId: el.id //商品列表 categoryId
                    }).then(res => {
                        this.foodList = res.data.data.list
                    })
                }
            })
        },
        add() {
            this.dialogFormVisible = false
            console.log(this.bannerUrl);
            
            getCategoryAddApi({
                name: this.form.name, //类目名称
                productUnit: "盘", //单位
                parentId: null, //父级id，如果不填则为0，  如果为0，表示一级类目
                sort: 1, //排序
                imgUrl:this.imageUrl,
                type:this.form.type
            }).then(res => {
                this.dialogFormVisible = false
                console.log(res);
                this.getCategoryListFun()
            })
        },
        aa(){
            categoryDelete({
                id:this.deleteFrom
            }).then(res =>{
                console.log(res);
                this.dep(res.data.msg)
                this.getCategoryListFun()
            })
        },
        handleEdit(a, b) {
            console.log(a, b);
            this.$router.push({
                path: '/cuisineattribute', query: {
                    foodId: b.foodId
                }
            })
            // console.log(data);
        },
        confirm(foodId) {
            console.log(foodId);
            deleteFood({
                foodId: foodId.foodId
            }).then(res =>{
                if (res.data.msg == "成功") {
                    this.$message({
                message: '删除成功',
                type: 'success'
            });
            foodList({
                        categoryId: foodId.categoryId //商品列表 categoryId
                    }).then(res => {
                        this.foodList = res.data.data.list
                    })
                }
            })
          
        },
      getCategoryListFun(){
        console.log(1);
        getCategoryList({

}).then(res => {
    this.activeName = res.data.data[0].name
    this.categoryList = res.data.data;
    this.tabName = this.categoryList[0].name
    console.log(this.categoryList);
    this.getFoodList()
});
      }
    },
    created() {
        showLoading();
        setTimeout(function () {
            hideLoading();
        }, 1000);
        getCategoryList({

        }).then(res => {
            this.activeName = res.data.data[0].name
            this.categoryList = res.data.data;
            this.tabName = this.categoryList[0].name
            console.log(this.categoryList);
            this.getFoodList()
        });
    }

};

</script>
<style scoped>
.box-classify {
    background: #fff;
    padding: 15px;
    border-radius: 10px;
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
    margin-right: 50px;
}

.banner-food_png {
    width: 50px;
    height: 50px;
}
/* 上传 */
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