const user = require('../models/UserModels')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
// 密码使用md5加密存储

//注册
let addUser =  async (ctx, next) => {
  let {username, password} = ctx.request.body
  password = md5(password) // md5加密处理
  await user.addUser(username,password) // 异步处理,因为ctx.body不支持异步回调
  .then((data)=> {
    ctx.body = {
      data,
      code: 1
    }
  })
  .catch((data)=> {
    ctx.body = {
      data,
      code: 0
    }
  })
}

//登录
let verifyUser = async (ctx, next) => {
  let {username, password} = ctx.request.body
  password = md5(password)
  
  await user.verifyUser(username, password)
  .then((data)=> {
    // 处理token  
    let secretOrPrivateKey = 'private' // 对于私钥这个参数,是用来加密解密的凭据
    let token = jwt.sign({
      username
    }, secretOrPrivateKey, {
      expiresIn: 60 * 60 * 24 // 24小时过期
    })
    console.log(token);
    ctx.body = {
      data,
      token,
      code: 1
    }
  })
  .catch((data) => {
    console.log("失败哦了");
    
    ctx.body = {
      data,
      code: 0
    }
  })
}

module.exports = {
  addUser,
  verifyUser
}