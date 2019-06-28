const sql = require('mssql')
const config = require('../config/default')

//https://stackoverflow.com/questions/30356148

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports.query=async query_sql=>{
  const pool=await poolPromise
  const result=await pool.query(query_sql)
  return result
}

// module.exports.insertAdministrator=async (name,password)=>{
//   const pool = await poolPromise
//   const query_sql='insert into chendr21_Administrator(administrator_name,administrator_password) values(@name,@password)'
//   const result = await pool.request()
//     .input('name', name)
//     .input('password',password)
//     .query(query_sql)
//   console.log(result)
//   return result
// }

module.exports.query_safe=async (query_sql,values)=>{
  const pool=await poolPromise
  const request=await pool.request()
  Object.keys(values).map(key=>{
    request.input(key,values[key])
  })
  const result=request.query(query_sql)
  console.log(result)
  return result
}

module.exports.insertAdministrator=async (name,password)=>{
  const query_sql='insert into chendr21_Administrator(administrator_name,administrator_password) values(@name,@password)'
  return await this.query_safe(query_sql,{name,password})
}