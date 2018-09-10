const list = require('../models/ListModels')


let getTodoList = async (ctx,next) => {
  let { id } = ctx.request.query
  await list.getList(id)
  .then((data) => { 
    ctx.body = {
      data,
      type: 1
    }
  })
  .catch((data) => {
    ctx.body = {
      data,
      type: 1
    }
  })
}

let addTodoList = async (ctx, next) => {
  let {id, date, event} = ctx.request.body

  await list.addList(id, date, event)
  .then((data) => {
    console.log(data);
    
    ctx.body = {
      data,
      type: 1
    }
  })
  .catch((data) => {
    console.log(data);
    
  })
}


module.exports = {
  addTodoList,
  getTodoList
}