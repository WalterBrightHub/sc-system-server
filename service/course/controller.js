const model=require('./model')
const {getJWTPayload}=require('../../lib/jwt')
module.exports.getCourse=async (ctx,next)=>{
  const result=await model.selectCourseAll()
  const courses=result.recordset
  ctx.body={
    code:0,
    courses
  }
}

const {isLimited}=require('../../util/role')

module.exports.postCourse=async (ctx,next)=>{
  const payload=getJWTPayload(ctx.headers.authorization)
  console.log(payload)
  if(isLimited(payload.role,['administrator'])){
    const {name,class_id,teacher_id,year,term,hour,exam_type,credit}=ctx.request.body
    if(name && class_id && teacher_id && year && term && hour && exam_type && credit){
      const exist=await model.checkCourseUnique(name,class_id,teacher_id,year,term)
      if(exist.recordset.length>0){
        ctx.body={
          code:7,
          msg:`course ${name} already exists`
        }
      }
      else{
        const result=await model.insertCourse(name,class_id,teacher_id,year,term,hour,exam_type,credit)
        ctx.body={
          code:0,
          msg:`insert course ${name} success`
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