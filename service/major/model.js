const {query,query_safe}=require('../../lib/mssql')

module.exports.selectMajorAll=async ()=>{
  return query('select * from shensm21_Major')
}

module.exports.selectMajorByCollege=async (name,college_id)=>{
  const query_sql='select * from shensm21_Major where ssm21_major_name=@name and ssm21_college_id=@college_id'
  return query_safe(query_sql,{name,college_id})
}

module.exports.insertMajor=async (name,college_id)=>{
  const query_sql='insert into shensm21_Major(ssm21_major_name,ssm21_college_id) values(@name,@college_id)'
  return query_safe(query_sql,{name,college_id})
}