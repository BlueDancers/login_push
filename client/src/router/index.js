import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/components/todoList'
import login from '@/components/login';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: todoList
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
