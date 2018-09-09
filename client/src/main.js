import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import {
  Row,
  Col,
  Button,
  Select,
  Input,
  Message,
  Alert
} from 'element-ui';
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$axios = axios
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Alert)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
