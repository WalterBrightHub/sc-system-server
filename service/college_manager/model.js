const {query,query_safe}=require('../../lib/mssql')

module.exports.seleceCollegeManagerAll=async ()=>{
  return query(`select ssm21_college_manager_id,
  ssm21_college_manager_name,
  ssm21_college_manager_number 
  from shensm21_College_Manager`)
}

module.exports.selectCollegeManagerByNumber=async number=>{
  const query_sql='select * from shensm21_College_Manager where ssm21_college_manager_number=@number'
  return await query_safe(query_sql,{number})
}

module.exports.checkCollegeManager=async (number,password)=>{
  const query_sql=`select * from shensm21_College_Manager 
  where ssm21_college_manager_number=@number 
  and ssm21_college_manager_password=@password`
  return await query_safe(query_sql,{number,password})
}

module.exports.insertCollegeManager=async (number,name,password,college_id)=>{
  const query_sql=`insert into shensm21_College_Manager
  (
    ssm21_college_manager_number,
    ssm21_college_manager_name,
    ssm21_college_manager_password,
    ssm21_college_id
  )
  values(@number,@name,@password,@college_id)`
  return await query_safe(query_sql,{number,name,password,college_id})
}