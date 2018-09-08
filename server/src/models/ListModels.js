const list = require('../schema/ListSchema')

list.then( (list) => {
  list.create({
    user_id: 1,
    content: '第一件事情',
    status: 'true'
  }, (err) => {
    if (err) {
      console.log('插入失败', err);
    } else {
      console.log('插入成功');
    }
  })
})