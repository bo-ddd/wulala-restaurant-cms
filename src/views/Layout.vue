<template>
  <el-container>
    <el-aside width="230px">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu :default-active="routers" background-color="#342c2a" text-color="#fff" active-text-color="#ed4b0b"
            router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <div class="box-logo"> <img class="logo" src="../assets/images/icon-bj_2.png" alt="" /></div>
            <el-menu-item index="home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>


            <el-submenu v-for="(item, i) in defMenu" :key="i" :index="item.name">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(el, i) in item.children" :index="el.name" :key="i">{{ el.label }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>属性规格</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="addattribute">新增属性规格</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="attributelist">属性规格列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu> -->
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <div class=" box-top">
          <div class="box-user ">
            <div class="box-name" @click="toUpOneLevel">{{ route }}</div>
            <div class="box-userinfo">
              <div class="nav">菜品</div>
              <img class="icon-xiaoxi" src="@/assets/images/消息中心.png" alt="">
              <img class="icon-avater" :src=this.avatar alt="">
              <span class="username">{{ this.avatarName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item> <span @click="toHomePage">个人主页</span> </el-dropdown-item>
                  <el-dropdown-item><span @click="toSetPass"> 账户设置</span></el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="loginout">退出</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
  
<script>
import { userInfoApi } from '@/api/api'
import vuex from '../store/index';
export default {
  data() {
    return {
      avatarName: "昵称",
      avatar: '',
      router: '',
      flag: true,
      route: '',
      obj:
      {
        home: '首页',
        classify: '菜品分类',
        goodsdata: '菜品数据',
        rolemg: '角色管理',
        usermg: '用户管理',
        addattribute: '新增属性规格',
        addattributelist: '属性规格列表',
        addrole: '添加角色',
        setrolepower: '设置角色权限',
        deleterolepower: '删除角色权限',
        setusermg: '添加角色',
        foodadd: '菜肴详情',
        cuisineAttribute: '修改菜品'
      },
      defMenu: [],
      menu: [],
    }
  },
  name: 'HomeView',
  computed: {
    routers() {
      return this.$route.name
    },
  },
  methods: {
    toUpOneLevel: function () {
      window.history.back();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout() {
      sessionStorage.setItem('token', '');
      this.$router.push({
        name: 'loginview'
      })
    },
    async render() {
      let res = await userInfoApi({
      })
      // console.log(res);
      this.avatarName = res.data.data.avatarName
      this.avatar = res.data.data.avatarImg
    },
    toHomePage() {
      if (this.flag) {
        this.$router.push({
          name: 'homePage'
        })
      }
    },
    toSetPass() {
      if (this.flag) {
        this.$router.push({
          name: 'setPass'
        })
      }
    }

  },

  created() {
    let userPermissionList = vuex.state.userPermissionList;
    let childrenList = [
      {
        path: '/goodsdata',
        name: 'goodsdata',
        label: '菜品数据',
        childrenId: 101
      },
      {
        path: '/classify',
        name: 'classify',
        label: '菜品分类',
        childrenId: 102
      },
      {
        path: '/rolemg',
        name: 'rolemg',
        childrenId: 201,
        label: '角色管理'
      },
      {
        path: '/usermg',
        name: 'usermg',
        childrenId: 202,
        label: '用户管理'
      },
      {
        path: '/departmentmanguage',
        name: 'departmentmanguage',
        childrenId: 203,
        label: '部门管理',
      },
      {
        path: '/addattribute',
        name: 'addattribute',
        label: '新增属性规格',
        childrenId: 301,
      }, {
        path: '/attributelist',
        name: 'attributelist',
        label: '属性规格列表',
        childrenId: 302,
      },
    ]
    this.defMenu = [
      {
        id: 1,
        name: '菜品管理',
        children: []
      },
      {
        id: 2,
        name: '权限管理',
        children: []
      },
      {
        id: 3,
        name: '属性规格',
        children: []
      }
    ]
    let bb = []
    userPermissionList.forEach(permission => {
      let aa = childrenList.find(item => permission.permissionName == item.label)
      if (aa) {
        bb.push(aa)
      }
    });
    bb = [...new Set(bb)]
    console.log('bb');
    console.log(bb);
    bb.forEach(el => {
      let cc = this.defMenu.find(item => item.id == Number(String(el.childrenId)[0]))
      cc.children.push(el)
      // console.log(cc);
    })

    // console.log(this.defMenu)
    this.defMenu = this.defMenu.filter(item => item.children.length)
    this.render();
    if (this.$route.name == 'home') {
      this.route = '首页'
    }
    for (const key in this.obj) {
      if (this.$route.name == key) {
        this.route = this.obj[key]
      }
    }
  },
  watch: {
    $route: {
      handler(val, oldval) {
        console.log('----------新路由-----');
        console.log(val);//新路由信息
        console.log('----------老路由-----');
        console.log(oldval);//老路由信息
        for (const key in this.obj) {
          if (val.name == key) {
            this.route = this.obj[key]
          }
        }
      },
      // 深度观察监听
      deep: true
    }
  },
}
</script>
  
<style scoped>
.el-header {
  background-color: #342c2a;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
}

/* .el-aside {
    background-color: #7b40f2;
    color: #ffffff;
  } */
::v-deep .el-dropdown {
  color: #ffffff;
}

.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
}

::v-deep .el-col-12 {
  width: 100%;
}

.box-logo {
  background-color: #ec4a0c;
}

.logo {
  /* width: 80px; */
  /* height: 80px; */
  width: 50%;
  filter: invert(100%);
  /* margin: 25px 65px; */
  margin: 25px 55px;
}

::v-deep .el-aside {
  overflow: hidden;
}

::v-deep .el-menu-vertical-demo {
  height: 100vh;
}

::v-deep .el-submenu {
  padding-left: 20px;
}

::v-deep .el-submenu__icon-arrow {
  position: absolute;
  top: 50%;
  right: 50px;
  margin-top: -7px;
  transition: transform .3s;
  font-size: 12px;
}

.el-icon-s-home {
  padding-left: 22px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
}

.title {
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  min-width: 170px;
}

.icon-avater {
  width: 38px;
  height: 38px;
  border-radius: 19px;
  margin: 0 5px 0 15px;
}

.icon-xiaoxi {
  width: 24px;

}

.box-userinfo {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;
}

.box-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.username {
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
}

.box-name {
  color: #ec4a0c;
  cursor: pointer;
}
</style>
  
  