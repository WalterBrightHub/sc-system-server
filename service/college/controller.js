const model=require('./model')
const {getJWTPayload}=require('../../lib/jwt')

module.exports.getCollege=async (ctx,next)=>{
  const result=await model.selectCollegeAll()
  ctx.body={
    code:0,
    colleges:result.recordset
  }
}

const {isLimited}=require('../../util/role')

module.exports.postCollege=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(isLimited(payload.role,['administrator'])){
    const {name}=ctx.request.body
    if(name){
      const exist=await model.selectCollege(name)
      //console.log(exist)
      if(exist.recordset.length>0){
        ctx.body={
          code:7,
          msg:`college ${name} exists already`
        }
      }
      else{
        const result=await model.insertCollege(name)
        // console.log(result)
        ctx.body={
          code:0,
          msg:'insert'
        }
      }
      
    }
    else{
      ctx.body={
        code:0407,
        msg:'need params'
      }
    }
  }
  else{
    ctx.body={
      code:0401,
      msg:'access denied'
    }
  }
}