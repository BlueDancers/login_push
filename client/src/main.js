import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Select } from 'element-ui';
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
