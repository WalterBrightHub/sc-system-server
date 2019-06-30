const {query,query_safe}=require('../../lib/mssql')

module.exports.selectCourseAll=async ()=>{
  return query('select * from shensm21_Course')
}

module.exports.checkCourseUnique=async (name,class_id,teacher_id,year,term)=>{
  const query_sql='select * from shensm21_Course where course_name=@name and class_id=@class_id and teacher_id=@teacher_id and course_year=@year and course_term=@term'
  return query_safe(query_sql,{name,class_id,teacher_id,year,term})
}

module.exports.insertCourse=async (name,class_id,teacher_id,year,term,hour,exam_type,credit)=>{
  const query_sql='insert into shensm21_Course(course_name,class_id,teacher_id,course_year,course_term,course_hour,course_exam_type,course_credit) values(@name,@class_id,@teacher_id,@year,@term,@hour,@exam_type,@credit)'
  return query_safe(query_sql,{name,class_id,teacher_id,year,term,hour,exam_type,credit})
}