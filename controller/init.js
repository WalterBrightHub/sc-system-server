const md5=require('md5')
const Model=require('../lib/mssql')

module.exports.getInit=async(ctx,next)=>{
  const result=await Model.query('select * from chendr21_Administrator;')
  const admins=result.recordset
  console.log(admins.length)
  const initialized=admins.length>0
  ctx.body={
    success:true,
    initialized
  }
}

module.exports.postInit=async (ctx,next)=>{
  const result=await Model.query('select * from chendr21_Administrator;')
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
    const {name,password}=ctx.request.body
    if(!name || !password){
      ctx.body={
        code:2,
        msg:'缺少用户名或密码'
      }
    }
    else{
      Model.insertAdmin(name,md5(password))
      ctx.body={
        code:0,
        msg:'初始化成功！'
      }
    }
  }
}