const md5=require('md5')
const Model=require('./model')

module.exports.getInit=async(ctx,next)=>{
  const result=await Model.selectAdministratorAll()
  const admins=result.recordset
  console.log(admins.length)
  const initialized=admins.length>0
  ctx.body={
    success:true,
    initialized
  }
}

module.exports.postInit=async (ctx,next)=>{
  const result=await Model.selectAdministratorAll()
  const admins=result.recordset
  console.log(admins.length)
  const initialized=admins.length>0
  if(initialized){
    ctx.body={
      code:1,
      msg:'the system has been initialized.'
    }
  }
  else{
    const {number,password,name}=ctx.request.body
    if(!number || !password || !name){
      ctx.body={
        code:2,
        msg:'缺少工号或密码'
      }
    }
    else{
      Model.insertAdministrator(number,name,md5(password))
      ctx.body={
        code:0,
        msg:'初始化成功！'
      }
    }
  }
}