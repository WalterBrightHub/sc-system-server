const Model=require('../lib/mssql')
const {getJWTPayload}=require('../lib/jwt')

module.exports.postUser=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  if(payload.role==='administrator'){
    
  }
  ctx.body={
    code:0,
    msg:'add'
  }
}