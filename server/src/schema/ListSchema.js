const getConnect = require('./Connect')
const config = require('../config/config')

module.exports = getConnect(config.DB)
  .then((mongo) => {

    let Schema = mongo.Schema

    let List = new Schema({
      user_id: {
        type: String
      },
      event_id: {
        type: Number
      },
      event: { // 文本信息
        type: String
      },
      date: { // 状态
        type: String
      }
    })

    let list = mongo.model('lists', List)
    return list

  })
  .catch(() => {
    console.log('连接获取失败');
  })