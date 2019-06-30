const model=require('./model')
const md5=require('md5')
const {getJWTPayload,getToken}=require('../../lib/jwt')


module.exports.getAdministrator=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(payload && payload.role==='administrator'){
    const result=await model.selectAdministratorAll()
    const administrators=result.recordset
    ctx.body={
      code:0,
      administrators
    }
  }
  else{
    ctx.body={
      code:0401,
      msg:'access denied'
    }
  }
}

module.exports.getAdministratorLogin=async (ctx,next)=>{
  const {number,password}=ctx.request.body
  if(number&&password){
    const result=await model.checkAdministrator(number,md5(password))
    const login=result.recordset.length===1
    if(login){
      const {administrator_id}=result.recordset[0]
      ctx.body={
        code:0,
        msg:'login success',
        token:getToken({
          role:'administrator',
          administrator_id
        })
      }
    }
    else{
      ctx.body={
        code:3,
        msg:'wrong number or password'
      }
    }
  }
  else{
    ctx.body={
      code:1,
      msg:'lack of parameters'
    }
  }
}


module.exports.postAdministrator=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(payload &&payload.role==='administrator'){
    const {number,name,password}=ctx.request.body
    if(number && name && password){
      const exist=await model.selectAdministratorByNumber(number)
      if(exist.recordset.length===0){
        const result=await model.insertAdministrator(number,name,password)
        ctx.body={
          code:0,
          msg:'insert'
        }
      }
      else{
        ctx.body={
          code:7,
          msg:`administrator ${number} already exists`
        }
      }
    }
    else{
      ctx.body={
        code:407,
        msg:'need params'
      }
    }
  }
  else{
    ctx.body={
      code:401,
      msg:'access denied'
    }
  }

}