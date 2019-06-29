const Model=require('../lib/mssql')
const {getJWTPayload}=require('../lib/jwt')

module.exports.getCollege=async (ctx,next)=>{
  const result=await Model.selectCollegeAll()
  ctx.body={
    code:0,
    colleges:result.recordset
  }
}

module.exports.postCollege=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(payload&&payload.role==='administrator'){
    const {name}=ctx.request.body
    if(name){
      const exist=await Model.selectCollege(name)
      console.log(exist)
      if(exist.recordset.length>0){
        ctx.body={
          code:7,
          msg:`college ${name} exists already`
        }
      }
      else{
        const result=await Model.insertCollege(name)
        console.log(result)
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