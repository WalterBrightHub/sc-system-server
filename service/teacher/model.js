const {query,query_safe}=require('../../lib/mssql')

module.exports.selectTeacherAll=async ()=>{
  return query('select teacher_id,teacher_name,teacher_number from shensm21_Teacher')
}

module.exports.selectTeacherByNumber=async number=>{
  const query_sql='select * from shensm21_Teacher where teacher_number=@number'
  return query_safe(query_sql,{number})
}

module.exports.insertTeacher=async (name,number,password,college_id,is_student_manager,is_head_teacher,class_id,is_major_manager,_major_id,sex,birth,title,tel)=>{
  const query_sql='insert into shensm21_Teacher(teacher_name,teacher_number,teacher_password,college_id,teacher_is_student_manager,teacher_is_head_teacher,teacher_class_id,teacher_is_major_manager,teacher_major_id,teacher_sex,teacher_birth,teacher_title,teacher_tel) values(@name,@number,@password,@college_id,@is_student_manager,@is_head_teacher,@class_id,@is_major_manager,@_major_id,@sex,@birth,@title,@tel)'
  return query_safe(query_sql,{name,number,password,college_id,is_student_manager,is_head_teacher,class_id,is_major_manager,_major_id,sex,birth,title,tel})
}

module.exports.checkTeacher=async (number,password)=>{
  const query_sql='select student_id from shensm21_Student where student_number=@number and student_password=@password'
  return query_safe(query_sql,{number,password})
}

