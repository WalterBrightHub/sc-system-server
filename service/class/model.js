const {query,query_safe}=require('../../lib/mssql')

module.exports.selectClassAll=async ()=>{
  return query('select * from shensm21_Class')
}

module.exports.selectClassByMajor=async (name,major_id)=>{
  const query_sql='select * from shensm21_Class where ssm21_class_name=@name and ssm21_major_id=@major_id'
  return query_safe(query_sql,{name,major_id})
}

module.exports.insertClass=async (name,entry_year,major_id)=>{
  const query_sql=`insert into shensm21_Class
  (
    ssm21_class_name,
    ssm21_class_entry_year,
    ssm21_major_id
  )
  values(@name,@entry_year,@major_id);`
  return query_safe(query_sql,{name,entry_year,major_id})
}