const model=require('./model')
const md5=require('md5')
const {getJWTPayload,getToken}=require('../../lib/jwt')


module.exports.getCollegeManager=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(payload && payload.role==='administrator'){
    const result=await model.seleceCollegeManagerAll()
    const collegeManagers=result.recordset
    ctx.body={
      code:0,
      collegeManagers
    }
  }
  else{
    ctx.body={
      code:401,
      msg:'access denied'
    }
  }
}

module.exports.getCollegeManagerLogin=async (ctx,next)=>{
  const {number,password}=ctx.request.body
  if(number && password){
    const result=await model.checkCollegeManager(number,md5(password))
    const login=result.recordset.length===1
    if(login){
      const {callege_manager_id}=result.recordset[0]
      ctx.body={
        code:0,
        msg:'login success',
        token:getToken({
          role:'college_manager',
          callege_manager_id
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


module.exports.postCollegeManager=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(payload &&payload.role==='administrator'){
    const {number,name,password,college_id}=ctx.request.body
    if(number && name && password && college_id){
      const exist=await model.selectCollegeManagerByNumber(number)
      if(exist.recordset.length===0){
        const result=await model.insertCollegeManager(number,name,md5(password),college_id)
        ctx.body={
          code:0,
          msg:'insert'
        }
      }
      else{
        ctx.body={
          code:7,
          msg:`college manager ${number} already exists`
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