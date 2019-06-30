const model=require('./model')
const {getJWTPayload,getToken}=require('../../lib/jwt')
const md5=require('md5')

module.exports.getTeacher=async (ctx,next)=>{
  const result=await model.selectTeacherAll()
  const teachers=result.recordset
  ctx.body={
    code:0,
    teachers
  }
}

const {isLimited}=require('../../util/role')

module.exports.postTeacher=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(!isLimited(payload.role,['administrator'])){
    ctx.body={
      code:0401,
      msg:'access denied'
    }
  }
  else{
    const {name,number,password,college_id,is_student_manager=0,is_head_teacher=0,class_id=null,is_major_manager=0,_major_id=null,sex='',birth='',title='',tel=''}=ctx.request.body
    if(!name || !number || !password || !college_id){
      ctx.body={
        code:0407,
        msg:'need params'
      }
    }
    else{
      const exist =await model.selectTeacherByNumber(number)
      if(exist.recordset.length>0){
        ctx.body={
          code:7,
          msg:`teacher ${number} already exists`
        }
      }
      else{
        const result=await model.insertTeacher(name,number,md5(password),college_id,is_student_manager,is_head_teacher,class_id,is_major_manager,_major_id,sex,birth,title,tel)
        ctx.body={
          code:0,
          msg:'insert'
        }
      }
    }
  }
}

module.exports.getTeacherLogin=async (ctx,next)=>{
  const {number,password}=ctx.request.body
  if(number && password){
    const result=await model.checkTeacher(number,md5(password))
    const login=result.recordset.length===1
    if(login){
      const {teacher_id}=result.recordset[0]
      ctx.body={
        code:0,
        msg:'login success',
        token:getToken({
          role:['teacher'],
          teacher_id
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