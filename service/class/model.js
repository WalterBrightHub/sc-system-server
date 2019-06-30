const {query,query_safe}=require('../../lib/mssql')

module.exports.selectClassAll=async ()=>{
  return query('select * from shensm21_Class')
}

module.exports.selectClassByMajor=async (name,major_id)=>{
  const query_sql='select * from shensm21_Class where class_name=@name and major_id=@major_id'
  return query_safe(query_sql,{name,major_id})
}

module.exports.insertClass=async (name,entry_year,major_id)=>{
  const query_sql='insert into shensm21_Class(class_name,class_entry_year,major_id) values(@name,@entry_year,@major_id);'
  return query_safe(query_sql,{name,entry_year,major_id})
}