# Vue+Koa2使用jwt实现单点登录

为什么又一次写登录

因为我对上一个版本的代码很不满意,那是刚开始学习koa2写的,现在看起来太多地方需要优化,索性重写一个
依旧采用 vue + koa + axios + mongdb  登录验证使用jwt
"# login_push" 


> 关于路由控制的思路

```JavaScript
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') // 获取token

  if (to.name == 'login') { // 假如登录 判断token是不是存在 存在让他跳转到主页面
    verification(token, next)
    .then((data) => {
      if (data.data.type) { // type 为1 直接跳过登录
        Message({
          showClose: true,
          message: '您已经登录,重新登录请退出账户'
        });
        next('/todolist')
      } else {
        next()
      }
    })
  }

  if (to.name == 'todoList') {
    verification(token, next)
    .then((data) => {
      if (data.data.type) {
        // type 为1说明token没有失效
        // 跳转到主页面
        next()
      } else {
        // token失效 强制定位到登录页面
        if (token === null) { // 说明从来没有登陆过
          Message({
            showClose: true,
            message: '您还没有登录',
            type: 'warning'
          })
          next('/login')
        } else {
          Message.error('登录信息失效')
          next('/login')
          localStorage.removeItem('token')
        }
      }
    })
    .catch((data) => {
      console.log(data);
    })
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }
})



// 验证
let verification = (token, next) => {
  return axios.post('/api/verification', { token })
}
```

后端统一验证接口`/api/verification`,每次路由跳转都判断token是不是过期或者被改动

## 没有登录的情况下

当第一次登录 token不存在 则肯定后端相应0 直接通过

没有登录的情况下,去访问登录后的页面,没登录, token分别提示

````JavaScript
if (token === null) { // 说明从来没有登陆过
          Message({
            showClose: true,
            message: '您还没有登录',
            type: 'warning'
          })
          next('/login')
        } else {
          Message.error('登录信息失效')
          next('/login')
          localStorage.removeItem('token')
        }
````

这就又到`login` type肯定为0, 通过 next()



## 登录的情况下

token已经存在,type为1,在访问`/todoList`的情况下,`next()`

访问`/login`,type为1,跳转到`/todolist`,同时给用户一个提示

```JavaScript
if (data.data.type) { // type 为1 直接跳过登录
  Message({
    showClose: true,
    message: '您已经登录,重新登录请退出账户'
  });
  next('/todolist')
} else {
  next()
}
```





