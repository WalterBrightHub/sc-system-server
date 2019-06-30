const {query,query_safe}=require('../../lib/mssql')

module.exports.selectStudentAll=async ()=>{
  return query('select student_id,student_name,student_number from shensm21_Student')
}

module.exports.selectStudentByNumber=async number=>{
  const query_sql='select * from shensm21_Student where student_number=@number'
  return query_safe(query_sql,{number})
}

module.exports.insertStudent=async (name,number,password,class_id)=>{
  const query_sql='insert into shensm21_Student(student_name,student_number,student_password,class_id) values(@name,@number,@password,@class_id)'
  return query_safe(query_sql,{name,number,password,class_id})
}

