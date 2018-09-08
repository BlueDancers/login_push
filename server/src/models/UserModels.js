const user = require('../schema/UserSchema')

user.then( (user)=> {
  user.create({
    id: 1,
    username: 'admin',
    password: '$2a$10$x3f0Y2SNAmyAfqhKVAV.7uE7RHs3FDGuSYw.LlZhOFoyK7cjfZ.Q6'
  }, (err) => {
    if (err) {
      console.log('插入失败',err);
    } else {
      console.log('插入成功');
    }
  })
})