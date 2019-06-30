const {query,query_safe}=require('../../lib/mssql')


module.exports.selectAdministratorAll=async ()=>{
  return query(`select ssm21_administrator_id,
  ssm21_administrator_name,
  ssm21_administrator_number 
  from shensm21_Administrator`)
}

module.exports.selectAdministratorByNumber=async number=>{
  const query_sql='select * from shensm21_Administrator where ssm21_administrator_number=@number'
  return await query_safe(query_sql,{number})
}

module.exports.checkAdministrator=async (number,password)=>{
  const query_sql=`select ssm21_administrator_id as id 
  from shensm21_Administrator 
  where ssm21_administrator_number=@number 
  and ssm21_administrator_password=@password`
  return await query_safe(query_sql,{number,password})
}

module.exports.insertAdministrator=async (number,name,password)=>{
  const query_sql=`insert into shensm21_Administrator
  (
    ssm21_administrator_number,
    ssm21_administrator_name,
    ssm21_administrator_password
  )
  values(@number,@name,@password)`
  return await query_safe(query_sql,{number,name,password})
}