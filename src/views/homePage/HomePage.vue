<template>
  <div class="box">
    <h3 class="title">个人主页</h3>
    <div class="box-userInfo c01170">
      <div class="userInfo">
        <div><img class="avatarImg-png" :src="userInfo.avatarImg" alt=""></div>
        <div class="box-avatar-name">
          <div class="avatar-name">
            <p class="name">{{ userInfo.avatarName }}</p>
          </div>
          <div class="mt-12">
            <p class="phone ">{{ userInfo.phoneNumber }}</p>
          </div>
        </div>
        <div class="box-btn">
          <button class="btn-dot c01563" title="更多操作">
            <span class="dot" @click="onDot">
              <svg width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="7186">
                <path d="M6 10a1.25 1.25 0 11-2.5 0A1.25 1.25 0 016 10z"></path>
                <path d="M11.25 10a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"></path>
                <path d="M15.25 11.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"></path>
              </svg>
            </span>
          </button>
          <button class="sign-out c01241 c01253" @click="loginout">
            <span>
              退出登录
            </span>
          </button>
        </div>
        <div class="box-btn_node bj box-userInfo" v-show="flag">
          <el-button type="text" @click="centerDialogVisible = true">
            <img class="icon-edit" src="@/assets/images/icon-edit.png" alt="">
            编辑
          </el-button>
          <el-button type="text" @click="centerDialogVisible = true">
            <img class="icon-edit" src="@/assets/images/icon-delete.png" alt="">
            删除
          </el-button>

          <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
            <h3 class="h-text">编辑个人资料</h3>
            <div>
              <span class="text-t">昵称：</span>
              <el-input class="ipt mt-12" size="mini" v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span class="text-t">生日：</span>
              <el-date-picker v-model="birthday" class="ipt mt-12" size="mini" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="mt-12">
              <span class="text-t">性别：</span>
              <el-radio v-model="radio" label="0">男</el-radio>
              <el-radio v-model="radio" label="1">女</el-radio>
            </div>
            <div class="mt-12">
              <span class="text-t">爱好：</span>
              <label v-for="(item, i) in list" :key="i">
                <input type="checkbox" :value="item" v-model="param" />
                {{ item }}
              </label>
            </div>
            <div>
              <span class="text-t">签名：</span>
              <el-input class="ipt mt-12" size="mini" v-model="signature" placeholder="请输入内容"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="determine">确 定</el-button>
            </span>
          </el-dialog>
        </div>

      </div>
      <div class="ok">
        <div class="mt-12">性别：{{ userInfo.sex }}</div>
        <div class="mt-12">生日：{{ userInfo.birthday }}</div>
        <div class="mt-12">爱好：{{ userInfo.hobby }}</div>
        <div class="mt-12">个性签名：{{ userInfo.personalSignature }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import { userInfoApi, updateUser } from '@/api/api'
import { showLoading, hideLoading } from "@/api/loading";
const list = ['洗澡', '游泳', '健身', '打篮球', '跑步']
export default {
  data() {
    return {
      userInfo: [],
      flag: false,
      centerDialogVisible: false,
      input: '',//昵称
      signature: '',//签名
      birthday: '',//生日
      radio: '0',
      list: list,
      selectAll: false,
      param: ['洗澡'],
      id: 0
    }
  },
  created() {
    userInfoApi({
    }).then(res => {
      this.userInfo = res.data.data
      console.log(this.userInfo);
      this.input = this.userInfo.avatarName
      this.signature = this.userInfo.personalSignature
      this.birthday = this.userInfo.birthday
      this.userInfo.birthday = this.getBirthday(res.data.data.birthday)
      this.id = this.userInfo.userId
      if (this.userInfo.sex == 0) {
        this.userInfo.sex = '男'
      } else {
        this.userInfo.sex = '女'
      }

    });
    showLoading();
    setTimeout(function () {
      hideLoading();
    }, 1000);
  },
  methods: {
    getBirthday(a) {
      var getDate = new Date(a);
      let date = getDate.getFullYear() + '年' + this.appendZero((getDate.getMonth() + 1)) + '月' + this.appendZero(getDate.getDate()) + '日';
      return date
    },
    appendZero(obj) {
      if (obj < 10) {
        return '0' + obj
      } else {
        return obj
      }
    },
    allChange() {
      if (this.selectAll) {
        this.param = [];
        this.param.push(this.list);
        for (let i = 0; i < this.list.length; i++) {
          this.param.push(this.list[i]);
        }
      } else {
        this.param = [];
      }
    },

    onDot() {
      if (this.flag == false) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    determine() {
      updateUser({
        address: "山西省", //详细地址
        avatarImg: null,
        avatarName: this.input,
        birthday: this.birthday, //生日
        hobby: String(this.param), //爱好
        personalSignature: this.signature, //个性签名
        phoneNumber: this.userInfo.phoneNumber,
        roles: [],
        sex: this.radio, //1:男 0：女
        userId: this.id
      }).then(res => {
        console.log(String(this.param).split(','));
        if (res.data.status == 1) {
          userInfoApi({}).then(res => {
            this.userInfo = res.data.data
            this.userInfo.birthday = this.getBirthday(this.birthday)
            console.log(this.userInfo);
            if (this.userInfo.sex == 0) {
              this.userInfo.sex = '男'
              console.log(this.userInfo);
            } else {
              this.userInfo.sex = '女'
            }
            if (this.userInfo.personalSignature == '') {
              this.signature = '这人很懒，什么都没有留下！'
            } else {
              this.userInfo.personalSignature = this.signature
            }
          })
        }
      })
      this.centerDialogVisible = false
      this.flag = false
    },
    cancel() {
      this.centerDialogVisible = false
      this.flag = false
    },
    loginout() {
      sessionStorage.setItem('token', '');
      this.$router.push({
        name: 'loginview'
      })
    }
  },
  mounted() {

  },
}
</script>

<style scoped>
.ok {
  padding: 0 20px 20px 20px;
}



.box-userInfo {
  margin-bottom: 12px;
  background-color: white;
  margin: 15px 30px;
  transition: all 0.2s ease-in-out;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0px 1.6px 3.6px rgb(0 0 0 / 13%), 0px 0px 2.9px rgb(0 0 0 / 11%);
}

.userInfo {
  display: flex;
  padding: 20px;
  align-items: center;
  flex-direction: row;
  color: #2B2B2B;
  position: relative;
}

.avatarImg-png {
  display: flex;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-inline-end: 20px;
}

.box-avatar-name {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
}

.avatar-name {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
}

.name {
  margin: 0;
  overflow: hidden;
  max-width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}

.phone {
  margin: 0;
  display: flex;
  font-size: 12px;
  line-height: 16px;
}

.box-btn {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  margin-inline-start: 20px;
}

.btn-dot {
  width: 36px;
  height: 36px;
  margin: 0;
  cursor: pointer;
  padding: 0;
  min-width: 36px;
  max-width: unset;
  transition: none;
  background: transparent;
  margin-inline-end: 8px;
}

.dot {
  display: flex !important;
}

/* .dot::before {
  width: 100%;
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: -3px;
} */

.btn-dot:hover {
  background-color: #f2f2f2;
}

.c01563 {
  cursor: pointer;
  display: inline-flex;
  overflow: hidden;
  max-width: 374px;
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  line-height: 1;
  font-family: inherit;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  border: 2px solid transparent;
  border-radius: 2px;
  min-width: 32px;
  padding: 0 8px;
  height: 32px;
  color: #2B2B2B;
  fill: #2B2B2B;
  background: #FFFFFF;
}

.sign-out {
  cursor: pointer;
  display: inline-flex;
  overflow: hidden;
  max-width: 374px;
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  line-height: 1;
  font-family: inherit;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  min-width: 32px;
  padding: 0 8px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 2px;
  color: #2B2B2B;
  fill: #2B2B2B;
  background: #EDEDED;
}

.sign-out:hover {
  border: 1px solid #868686;

}

.c01241 {
  background: transparent;
  border: 1px solid #BEBEBE;
  padding: 0 9px;
}

.c01253 {
  min-width: 100px;
  margin-top: 2px;
}

.box-btn_node {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 138px;
}

.icon-edit {
  width: 19px;
  vertical-align: middle;
}

.bj {
  width: 120px;
  background-color: #f3f2f2;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
}

.el-button+.el-button,
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
  margin-left: 0px !important;
}

::v-deep .el-button--text {
  border-color: transparent;
  color: #2c3e50;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  width: 100%;
  border: none;
}

.el-button:hover {
  background-color: #ebe9e9;
}

.h-text {
  color: #000;
}

.ipt {
  width: 300px;
}

.text-t {
  color: #000;
}
</style>