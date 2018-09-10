const mongo = require('../schema/ListSchema')


let addList = (id, date, event) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      list.find({}, (err, callback) => {
        if (!callback.length) { // 第一次添加
          list.create({
              user_id: id,
              event_id: 0,
              event,
              date
          }, ((err) => {
            if (err) {
              reject('添加失败' + err)
            } else {
              resolve('添加成功')
            }
          }))
        } else {
          list.create({
            user_id: id,
            event_id: callback.length,
            event,
            date
          }, ((err) => {
            if (err) {
              reject('添加失败' + err)
            } else {
              resolve('添加成功')
            }
          }))
        }
      })
    })
  })
}

let getList = (id)=> {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      list.find({
        user_id: id
      }, (err, callback) => {
        if (err) {
          console.log("错误" + err);
          reject(err)
        } else {
          resolve(callback)
        }
      })
    })
  })
}



module.exports = {
  addList,
  getList
}