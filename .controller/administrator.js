const Model=require('../lib/mssql')
const {getJWTPayload}=require('../lib/jwt')

module.exports.getAdminstrator=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(payload&&payload.role==='administrator'){
    const result=await Model.selectCollegeAll()
    ctx.body={
      code:0,
      colleges:result.recordset
    }
  }
  else{
    ctx.body={
      code:0401,
      msg:'access denied'
    }
  }
}