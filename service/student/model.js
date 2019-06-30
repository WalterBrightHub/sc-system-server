const {query,query_safe}=require('../../lib/mssql')

module.exports.selectStudentAll=async ()=>{
  return query('select ssm21_student_id,ssm21_student_name,ssm21_student_number from shensm21_Student')
}

module.exports.selectStudentByNumber=async number=>{
  const query_sql='select * from shensm21_Student where ssm21_student_number=@number'
  return query_safe(query_sql,{number})
}

module.exports.insertStudent=async (name,number,password,class_id,sex,birth,birth_place,tel)=>{
  const query_sql=`insert into shensm21_Student
  (ssm21_student_name,
    ssm21_student_number,
    ssm21_student_password,
    ssm21_class_id,
    ssm21_student_sex,
    ssm21_student_birth,
    ssm21_student_birth_place,
    ssm21_student_tel
  )
  values(@name,@number,@password,@class_id,@sex,@birth,@birth_place,@tel)`
  return query_safe(query_sql,{name,number,password,class_id,sex,birth,birth_place,tel})
}

module.exports.checkStudent=async (number,password)=>{
  const query_sql='select ssm21_student_id as id from shensm21_Student where ssm21_student_number=@number and ssm21_student_password=@password'
  return query_safe(query_sql,{number,password})
}

