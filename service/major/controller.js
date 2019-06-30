const model=require('./model')
const {getJWTPayload}=require('../../lib/jwt')
module.exports.getMajor=async (ctx,next)=>{
  const result=await model.selectMajorAll()
  const majors=result.recordset
  ctx.body={
    code:0,
    majors
  }
}

const {isLimited}=require('../../util/role')

module.exports.postMajor=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(isLimited(payload.role,['administrator'])){
    const {name,college_id}=ctx.request.body
    if(name&& college_id){
      const exist=await model.selectMajorByCollege(name,college_id)
      if(exist.recordset.length>0){
        ctx.body={
          code:7,
          msg:`major ${name} of college ${college_id} already exists`
        }
      }
      else{
        const result=await model.insertMajor(name,college_id)
        ctx.body={
          code:0,
          msg:`insert major ${name} success`
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