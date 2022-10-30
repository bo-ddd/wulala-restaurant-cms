import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'
import ElementUI from 'element-ui';
import 'default-passive-events'
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCropper)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
