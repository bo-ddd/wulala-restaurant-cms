import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'
import ElementUI from 'element-ui';
import 'default-passive-events'
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper'
import * as echarts from "echarts"
/***
 * 周
 */
 import BaiduMap from 'vue-baidu-map'


Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCropper)
/**
 * 周
 */
 Vue.use(BaiduMap, { ak: 'qbu0OKR1DajtIZQgs7l7ogpBIaSmX7Gv' })



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
