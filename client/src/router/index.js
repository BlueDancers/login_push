import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/components/todoList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: todoList
    }
  ]
})
