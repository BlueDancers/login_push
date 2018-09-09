const Router = require('koa-router')
const router = new Router()
const UserController = require('../controllers/UserController')



router.get('/', (ctx)=> {
  ctx.body = '路由测试'
})

router.post('/regist', UserController.addUser)

router.post('/login', UserController.verifyUser)

router.get('/getList', (ctx)=> {
  ctx.body = "todolist接口" 
})


router.use('/api', router.routes())
module.exports = router