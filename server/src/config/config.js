/* 存储所有的配置信息 */

let host = 'localhost'
let port = 27017

let config =  {
  DB: `mongodb://${host}:${port}/todoList`
}

module.exports = config