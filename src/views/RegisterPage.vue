<template>
  <main class="flex-center">
    <div class="logo">
      <div class="titles flex-center">
        <!-- <img src="@/assets/images/icon-bj_2.png" alt="" /> -->
        <span>注册</span>
      </div>
      <div class="content">
        <div class="content-left shadow">
          <img src="@/assets/images/icon-bj_2.png" alt="" />
        </div>
        <div class="content-right">
          <el-input
            placeholder="用户名"
            prefix-icon="el-icon-user-solid"
            v-model="username"
          ></el-input>
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-key"
            v-model="password"
            show-password
          ></el-input>
          <el-input
            placeholder="昵称"
            prefix-icon="el-icon-s-custom"
            v-model="avatarName"
          ></el-input>
          <el-input
            placeholder="手机号"
            prefix-icon="el-icon-phone"
            v-model="phoneNumber"
          ></el-input>
          <el-button type="primary" @click="submit">注 &nbsp; 册</el-button>
        </div>
      </div>
    </div>
  </main>
</template>
  
  <script>
import { registerApi } from "@/api/api";
export default {
  data() {
    return {
      username: "",
      password: "",
      avatarName: "",
      phoneNumber: "",
    };
  },
  created() {},
  methods: {
    getValidateResult() {
      var res = { result: true };
      if (this.username == "") {
        res.result = false;
        res.message = { type: "warning", message: "用户名不能为空" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { type: "warning", message: "密码不能为空" };
      } else if(this.phoneNumber == ""){
        res.result = false;
        res.message = { type: "warning", message: "手机号不能为空" };
      }
      if (!res.result) this.$message(res.message);
      return res.result;
    },
    async submit() {
      var isValidate = this.getValidateResult();
      if (!isValidate) return;

      let res = await registerApi({
        username: this.username,
        password: this.password,
        avatarName: this.avatarName,
        phoneNumber: this.phoneNumber,
      });
      console.log(res);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "注册成功",
        });
        this.$router.push({
          name: "loginview",
        });
      } else {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
  },
};
</script>
  
  <style scoped>
main {
  width: 100%;
  height: 100vh;
  background: url('http://121.5.53.216/jpg/bg.f1d2fdc8.jpg') no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
.logo {
  width: 828px;
    height: 422px;
  background: #fff;
  border-radius: 10px;
  opacity: .85;
}
.titles {
  display: flex;
  margin: 30px 0;
  font-size: 26px;
  justify-content: center;
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
}
.titles img {
  width: 100px;
}
.titles span {
  color: black;
  font-size: 2.8rem;
}
.content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.content-left{
  height: 100%;
}
.content-left img {
  width: 250px;
  height: 168px;
  padding: 2rem;
}
.el-input {
  margin: 10px 0;
}
.content-right {
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-button {
  margin: 10px 0;
  background-color: #6b3fbe;
  border-color: #6b3fbe;
}
</style>