/* 存储所有的配置信息 */

let host = 'localhost'
let port = 27017

let config =  {
  DBuser: `mongodb://${host}:${port}/user`,
  DBList: `mongodb://${host}:${port}/List`
}