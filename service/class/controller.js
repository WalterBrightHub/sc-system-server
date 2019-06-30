const model=require('./model')
const {getJWTPayload}=require('../../lib/jwt')
module.exports.getClass=async (ctx,next)=>{
  const result=await model.selectClassAll()
  const classes=result.recordset
  ctx.body={
    code:0,
    classes
  }
}

const {isLimited}=require('../../util/role')

module.exports.postClass=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(isLimited(payload.role,['administrator'])){
    const {name,entry_year,major_id}=ctx.request.body
    if(name&&entry_year&&major_id){
      console.log('exist')
      const exist=await model.selectClassByMajor(name,major_id)
      if(exist.recordset.length>0){
        ctx.body={
          code:7,
          msg:`class ${name} of major ${major_id} already exists`
        }
      }
      else{
        const result=await model.insertClass(name,entry_year,major_id)
        console.log(result)
        ctx.body={
          code:0,
          msg:'insert success'
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