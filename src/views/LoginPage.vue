<template>

  <div class="main">
    <div class="box-logo">
      <img class="icon-logo" src="@/assets/images/icon-wll_logo.png" alt="">
      <span>乌拉拉餐饮后台管理系统</span>
    </div>
    <div class="box-login">
      <div class="box-inp">
        <h2>login</h2>
        <div class="aa"><span>账号：</span>
          <el-input v-model="input" placeholder="请输入手机号/邮箱"></el-input>
        </div>
        <div class="aa"><span>密码：</span>
          <el-input placeholder="请输入密码" v-model="inputs" show-password></el-input>
        </div>
        <el-button type="primary" round @click="login()">主要按钮</el-button>
      </div>

    </div>
  </div>
</template>
<script>
import { loginApi } from '@/api/api.js';
export default {
  data() {
    return {
      input: '',
      inputs: '',

    }
  },
  created() {

  },
  methods: {

    login: function () {
      loginApi({
        username: 'xiaoming',
        password: '999999'
      }).then(res => {
        // console.log('------res------');
        // console.log(res.data.data.token);
        if (res.status == 200) {
          console.log(res.data.data.token);
          localStorage.setItem('token',res.data.data.token)
          this.$router.push({ path: '/home' })
        }
      })

    },
  }
}
</script>
<style scoped lang="scss">
.main {
  background-color: rgb(111, 123, 253);
  border-radius: 20px;
  width: 850px;
  height: 500px;
  margin: auto;
  position: absolute;
  top: -150px;
  left: 0;
  right: 0;
  bottom: 0;
}

.icon-logo {
  width: 50px;
  margin-right: 20px;
  vertical-align: middle;
}

.box-logo {
  text-align: center;
  margin-top: 42px;
  font-size: 24px;
  font-weight: 600;
}

.box-login {

  width: 630px;
  height: 360px;
  background-color: white;
  margin: auto;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
}

::v-deep .el-button {
  width: 85%;
  margin-left: 24px;
  margin-top: 30px;
}

.box-inp {
  margin-top: 30px;
  margin-left: 160px;
  width: 300px;
  display: flex;
  flex-direction: column
}

.aa {
  display: flex;
  align-items: center;
  margin: 20px;
}

.aa span {
  width: 60px;
}
</style>