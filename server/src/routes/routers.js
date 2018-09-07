const Router = require('koa-router')
const router = new Router()



router.get('/', (ctx)=> {
  ctx.body = '路由测试'
})

router.get('/login', (ctx) => {
  ctx.body = '登录接口'
})

router.get('/getList', (ctx)=> {
  ctx.body = "todolist接口"
})

module.exports = router