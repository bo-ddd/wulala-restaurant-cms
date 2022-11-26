import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/views/RegisterPage.vue'
import loginview from '@/views/LoginView.vue'
import Layout from "@/views/Layout.vue"
import vuex from '../store/index';
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'loginview',
    component: loginview, 
  },  
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/layout',
    name: 'layout',
    component : Layout,
    children:[
      {
        path: '/home',
        name: 'home',
        alias:'/',
        meta:{
          label:'首页'
        },
        component:() =>import("@/views/HomeViews.vue")
      },
      {
        path: '/setPass',
        name: 'setPass',
        meta:{
          label:'账户设置'
        },
        component: ()=>import("@/views/homePage/SetPass.vue"),
      },
      {
        path:'/homePage',
        name:'homePage',
        meta:{
          label:'个人信息'
        },
        component:()=>import("../views/homePage/HomePage.vue")
      }
    ]
  }
]

let dynamicRoutes = [
  {
    path: '/addrole',
    name: 'addrole',
    meta:{
      label:'新增角色'
    },
    component:() =>import("@/views/MerchandiseManagement/AddRole.vue")
  },
  {
    path:'/setrolepower',
    name:'setrolepower',
    meta:{
      label:'设置角色权限'
    },
    component:()=>import("../views/attribute/SetRolePower.vue")
  },{
    path:'/deleterolepower',
    name:'deleterolepower',
    meta:{
      label:'删除角色权限'
    },
    component:()=>import("../views/role/DeleteRolePower.vue")
  },
  {
    path: '/setusermg',
    name: 'setusermg',
    meta:{
      label:'添加角色'
    },
    component:() =>import("@/views/Permissions/SetUserManagement.vue")
  },
  {
    path:'/newpermission',
    name:'newpermission',
    meta:{
      label:'添加权限'
    },
    component:()=>import("@/views/role/NewPermission.vue")
  },
  {
    path:'/cuisineAttribute',
    name:'cuisineAttribute',
    meta:{
      label:'修改菜品'
    },
    component:() =>import("@/views/MerchandiseManagement/CuisineAttribute.vue")
  },
  {
    path:'/attributelist',
    name:'attributelist',
    meta:{
      label:'属性规格列表'
    },
    component:() =>import("@/views/attribute/AttributeList.vue")
  },
  {
    path: '/foodadd',
    name: 'foodadd',
    meta:{
      label:'新增菜品'
    },
    component:() =>import("@/views/MerchandiseManagement/FoodAdd.vue")
  },
  {
    path: '/goodsdata',
    name: 'goodsdata',
    meta:{
      label:'菜品数据'
    },
    component:() => import("@/views/MerchandiseManagement/GoodsData.vue")
  },
  
  {
    path: '/classify',
    name: 'classify',
    meta:{
      label:'菜品分类'
    },
    component:() =>import("@/views/MerchandiseManagement/ClassIfy.vue")
  },
  {
    path: '/rolemg',
    name: 'rolemg',
    meta:{
      label:'角色管理'
    },
    component:() =>import("@/views/Permissions/RoleManagement.vue")
  },
  {
    path: '/usermg',
    name: 'usermg',
    meta:{
      label:'用户管理'
    },
    component:() =>import("@/views/Permissions/UserManagement.vue")
  },
  {
    path:'/addattribute',
    name:'addattribute',
    meta:{
      label:'新增属性规格'
    },
    component:() =>import("@/views/attribute/AddAttribute.vue")
  },{
    path:'/departmentmanguage',
    name:'departmentmanguage',
    meta:{
      label:'部门管理'
    },
    component:()=>import("../views/role/DepartmentManguage.vue")
  },
  {
    path:'/seeuser',
    name:'seeuser',
    meta:{
      label:'查看用户'
    },
    component:()=>import("../views/role/SeeUser.vue")
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//导航守卫
router.beforeEach(async (to,from,next)=>{
  // console.log(from);
  let userPermissionList =vuex.state.userPermissionList;
  let token = sessionStorage.getItem('token');
  if (to.name == 'loginview') {
    next();
  }else if (to.name != '/' && !token) {
    next('/');
  }else{
    if (userPermissionList.length==0 && !vuex.state.userInfo.userId) {
      await vuex.dispatch('getUserInfo');
      //获取权限列表
      await vuex.dispatch('getUserPermissionList');
      userPermissionList = vuex.state.userPermissionList;
      userPermissionList.forEach(permission=>{
        let route = dynamicRoutes.find(route => route.meta.label == permission.permissionName);
        if (route) {
          router.addRoute('layout',route)
        }
      })
      next({...to,replace:true});
    }else{
      next()
    }
  }
})

export default router
