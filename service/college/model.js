const {query,query_safe}=require('../../lib/mssql')

module.exports.selectCollegeAll=async()=>{
  return query('select * from shensm21_College')
}

module.exports.selectCollege=async name=>{
  const query_sql='select * from shensm21_College where ssm21_college_name=@name'
  return query_safe(query_sql,{name})
}

module.exports.insertCollege=async name=>{
  const query_sql='insert into shensm21_College(ssm21_college_name) values(@name)'
  return await query_safe(query_sql,{name})
}