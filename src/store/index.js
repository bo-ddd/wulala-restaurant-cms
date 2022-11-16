import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUserPermissionListApi,
  userInfoApi} from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo : {},
    userPermissionList : []    
  },
  getters: {
    getUserPermissionList(state){
      return state.userPermissionList;
    }
  },
  mutations: {
    setUserInfo(state,payload){
      state.userInfo = payload;
    },
    setUserPermissionList(state,payload){
     state.userPermissionList = payload;
    },
  },
  actions: {
    async getUserInfo({commit}){
      let res = await userInfoApi();
        if(res.status == 200){
          commit('setUserInfo',res.data.data);
        }
    },

    
    async getUserPermissionList({state,commit,dispatch}){
          if(!Object.keys(state.userInfo).length){
            await dispatch('getUserInfo');
            const res = await getUserPermissionListApi({userId: state.userInfo.userId});
            commit('setUserPermissionList',res.data.data);
          }else{
            const res = await getUserPermissionListApi({userId: state.userInfo.userId});
            commit('setUserPermissionList',res.data.data)
          }
    }
  },
  modules: {
  }
})
