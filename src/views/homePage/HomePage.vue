<template>
  <div class="box">
    <h3 class="title">个人主页</h3>
    <div class="box-content">
      <div class="">
        <div><img :src="userInfo.avatarImg" alt=""></div>
        <div>昵称：{{ userInfo.avatarName }}</div>
        <div>性别：{{ userInfo.sex }}</div>
        <div>个人签名：{{ userInfo.personalSignature }}</div>
        <div>生日:1999-04-20</div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfoApi } from '@/api/api'
export default {
  data() {
    return {
      userInfo: []
    }
  },
  created() {
    userInfoApi({
    }).then(res => {
      this.userInfo = res.data.data
      if (this.userInfo.sex == 0) {
        this.userInfo.sex = '男'
        console.log(this.userInfo);
      } else {
        this.userInfo.sex = '女'
      }
      if (this.userInfo.personalSignature == '') {
        this.userInfo.personalSignature = '这人很懒，什么都没有留下！'
      } else {
        this.userInfo.personalSignature = this.userInfopersonalSignature
      }
    })

  },
}
</script>

<style scoped>

</style>