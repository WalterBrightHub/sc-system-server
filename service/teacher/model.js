const {query,query_safe}=require('../../lib/mssql')

module.exports.selectTeacherAll=async ()=>{
  return query('select ssm21_teacher_id,ssm21_teacher_name,ssm21_teacher_number from shensm21_Teacher')
}

module.exports.selectTeacherByNumber=async number=>{
  const query_sql='select ssm21_teacher_id from shensm21_Teacher where ssm21_teacher_number=@number'
  return query_safe(query_sql,{number})
}

module.exports.insertTeacher=async (name,number,password,college_id,is_student_manager,is_head_teacher,class_id,is_major_manager,_major_id,sex,birth,title,tel)=>{
  const query_sql=`insert into shensm21_Teacher
  (ssm21_teacher_name,
    ssm21_teacher_number,
    ssm21_teacher_password,
    ssm21_college_id,
    ssm21_teacher_is_student_manager,
    ssm21_teacher_is_head_teacher,
    ssm21_teacher_class_id,
    ssm21_teacher_is_major_manager,
    ssm21_teacher_major_id,
    ssm21_teacher_sex,
    ssm21_teacher_birth,
    ssm21_teacher_title,
    ssm21_teacher_tel
  )
  values(
    @name,@number,@password,@college_id,@is_student_manager,@is_head_teacher,@class_id,@is_major_manager,@_major_id,@sex,@birth,@title,@tel
  )`
  return query_safe(query_sql,{name,number,password,college_id,is_student_manager,is_head_teacher,class_id,is_major_manager,_major_id,sex,birth,title,tel})
}

module.exports.checkTeacher=async (number,password)=>{
  const query_sql=`select ssm21_teacher_id as id 
  from shensm21_Teacher 
  where ssm21_teacher_number=@number 
  and ssm21_teacher_password=@password`
  return query_safe(query_sql,{number,password})
}

