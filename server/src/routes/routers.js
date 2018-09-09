const Router = require('koa-router')
const router = new Router()
const UserController = require('../controllers/UserController')



router.get('/', (ctx)=> {
  ctx.body = '路由测试'
})

router.post('/regist', UserController.addUser) // 注册接口

router.post('/login', UserController.verifyUser)  // 登录接口

router.post('/verification', UserController.verification) // 验证接口

router.get('/getList', (ctx)=> {
  ctx.body = "todolist接口" 
})


router.use('/api', router.routes())
module.exports = router