const model=require('./model')
const {getJWTPayload,getToken}=require('../../lib/jwt')
const md5=require('md5')
module.exports.getStudent=async (ctx,next)=>{
  const result=await model.selectStudentAll()
  const students=result.recordset
  ctx.body={
    code:0,
    students
  }
}



module.exports.postStudent=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(payload.role!=='administrator'){
    ctx.body={
      code:0401,
      msg:'access denied'
    }
  }
  else{
    const {name,number,password,class_id}=ctx.request.body
    if(!name || !number || !password || !class_id){
      ctx.body={
        code:0407,
        msg:'need params'
      }
    }
    else{
      const exist =await model.selectStudentByNumber(number)
      if(exist.recordset.length>0){
        ctx.body={
          code:7,
          msg:`student ${number} already exists`
        }
      }
      else{
        const result=await model.insertStudent(name,number,md5(password),class_id)
        ctx.body={
          code:0,
          msg:'insert'
        }
      }
    }
  }
}

module.exports.getStudentLogin=async (ctx,next)=>{
  const {number,password}=ctx.request.body
  if(number&&password){
    const result=await model.checkStudent(number,md5(password))
    const login=result.recordset.length===1
    if(login){
      const {student_id}=result.recordset[0]
      ctx.body={
        code:0,
        msg:'login success',
        token:getToken({
          role:'student',
          student_id
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