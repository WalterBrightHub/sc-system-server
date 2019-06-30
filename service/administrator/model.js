const {query,query_safe}=require('../../lib/mssql')


module.exports.selectAdministratorAll=async ()=>{
  return query('select administrator_id,administrator_name,administrator_number from shensm21_Administrator')
}

module.exports.selectAdministratorByNumber=async number=>{
  const query_sql='select * from shensm21_Administrator where administrator_number=@number'
  return await query_safe(query_sql,{number})
}

module.exports.checkAdministrator=async (number,password)=>{
  const query_sql='select * from shensm21_Administrator where administrator_number=@number and administrator_password=@password'
  return await query_safe(query_sql,{number,password})
}

module.exports.insertAdministrator=async (number,name,password)=>{
  const query_sql='insert into shensm21_Administrator(administrator_number,administrator_name,administrator_password) values(@number,@name,@password)'
  return await query_safe(query_sql,{number,name,password})
}