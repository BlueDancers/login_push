# Vue+Koa2使用jwt**实现单点登录**🎁

---

**2018-12-17**

本次更新`README`主要是把挂掉的图连接补上

从我个人角度来说,我还是蛮喜欢这样的全栈项目的,实践性很足,不一定要看我的代码,完全可以直接去写一个类似的todo,虽然页面上看起来很简单,但是存在很多知识点

- jsonwebtoken如何实际运用?
- 单点登录路由的控制
- 如何使用`koa2`搭建出一个让自己满意的后台开发环境
- 了解`mongodb`,完成入门,了解大致api的使用
- 前端`Vue` `React` 等等 自己喜欢就好,写的多了,自然会越来越熟练

## 怎么运行?

需要环境: npm `安装并启动的mongodb` (环境有问题是肯定启动不起来的)

````bash
git clone https://github.com/vkcyan/login_push.git

// 服务端
cd server
npm install
npm install start

//客户端
cd client
npm install
npm install start
````



## (客户端)client:

- vue
- vue-router
- axios
- element
- jsonwebtoken

## (服务端)server

- koa2
- koa-bodyparser
- koa-router
- md5
- mongoose
- pm2

### 实现了什么功能?

- [x] 登录
- [x] 注册
- [x] 注销
- [x] todolist增加 删除 修改 查看
- [x] todolist多选操作



### jwt验证模式

![](http://www.vkcyan.top/Fls3xOB7lVW-lYRqFgbMPkbImnyx.png)



这里token存储在`localStorage`里面,还有一种做法是存出来cookice里面,代码可能有点变化,但是效果是一模一样的

**login**

![](http://www.vkcyan.top/FnP2Jj9RGJLcIoX88D8kNaHAy0vp.png)



**registry**

![](http://www.vkcyan.top/FpDrYpjJ2w7hCYHBldlT895k76cM.png)

**todolist**

![](http://www.vkcyan.top/Fu6GiTnGMcU_CIxuk_WJrdRIUoxC.png)

![](http://www.vkcyan.top/FsOj7-ozk6i-NOjJ1wWB7NlB6lsZ.png)








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





