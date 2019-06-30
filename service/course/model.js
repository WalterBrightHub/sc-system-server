const {query,query_safe}=require('../../lib/mssql')

module.exports.selectCourseAll=async ()=>{
  return query('select * from shensm21_Course')
}

module.exports.checkCourseUnique=async (name,class_id,teacher_id,year,term)=>{
  const query_sql=`select * from shensm21_Course
  where ssm21_course_name=@name 
  and ssm21_class_id=@class_id 
  and ssm21_teacher_id=@teacher_id 
  and ssm21_course_year=@year 
  and ssm21_course_term=@term`
  return query_safe(query_sql,{name,class_id,teacher_id,year,term})
}

module.exports.insertCourse=async (name,class_id,teacher_id,year,term,hour,exam_type,credit)=>{
  const query_sql=`insert into shensm21_Course
  (ssm21_course_name,
    ssm21_class_id,
    ssm21_teacher_id,
    ssm21_course_year,
    ssm21_course_term,
    ssm21_course_hour,
    ssm21_course_exam_type,
    ssm21_course_credit
  )
  values(@name,@class_id,@teacher_id,@year,@term,@hour,@exam_type,@credit)`
  return query_safe(query_sql,{name,class_id,teacher_id,year,term,hour,exam_type,credit})
}