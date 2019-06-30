const sql = require('mssql')
const config = {
  user: 'sa',
  password: 'mssql',
  server: 'localhost',
  port: 6213,
  database: 'shenshuimingMIS21',
  pool: {
      max: 50,
      min: 0,
      idleTimeoutMillis: 30000
  }
}

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
  console.log('query:')
  console.log(result)
  return result
}

// module.exports.insertAdministrator=async (name,password)=>{
//   const pool = await poolPromise
//   const query_sql='insert into shensm21_Administrator(administrator_name,administrator_password) values(@name,@password)'
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
  const result=await request.query(query_sql)
  console.log(`query_safe:`)
  console.log(result)
  return result
}

module.exports.insertAdministrator=async (number,name,password)=>{
  const query_sql='insert into shensm21_Administrator(administrator_number,administrator_name,administrator_password) values(@number,@name,@password)'
  return await this.query_safe(query_sql,{number,name,password})
}



module.exports.selectAdministrator=async (number,password)=>{
  const query_sql='select * from shensm21_Administrator where administrator_number=@number and administrator_password=@password'
  return await this.query_safe(query_sql,{number,password})
}

module.exports.selectCollegeManager=async(number,password)=>{
  const query_sql='select * from shensm21_College_Manager where college_manager_number=@number and college_manager_password=@password'
  return await this.query_safe(query_sql,{number,password})
}

module.exports.selectCollegeAll=async()=>{
  return this.query('select * from shensm21_College')
}

module.exports.selectCollege=async name=>{
  const query_sql='select * from shensm21_College where college_name=@name'
  return this.query_safe(query_sql,{name})
}

module.exports.insertCollege=async name=>{
  const query_sql='insert into shensm21_College(college_name) values(@name)'
  return await this.query_safe(query_sql,{name})
}

module.exports.selectMajorAll=async ()=>{
  return this.query('select * from shensm21_Major')
}

module.exports.selectMajorByCollege=async (name,college_id)=>{
  const query_sql='select * from shensm21_Major where major_name=@name and college_id=@college_id'
  return this.query_safe(query_sql,{name,college_id})
}

module.exports.insertMajor=async (name,college_id)=>{
  const query_sql='insert into shensm21_Major(major_name,college_id) values(@name,@college_id)'
  return this.query_safe(query_sql,{name,college_id})
}

module.exports.selectClassAll=async ()=>{
  return this.query('select * from shensm21_Class')
}

module.exports.selectClassByMajor=async (name,major_id)=>{
  const query_sql='select * from shensm21_Class where class_name=@name and major_id=@major_id'
  return this.query_safe(query_sql,{name,major_id})
}

module.exports.insertClass=async (name,entry_year,major_id)=>{
  const query_sql='insert into shensm21_Class(class_name,class_entry_year,major_id) values(@name,@entry_year,@major_id);'
  return this.query_safe(query_sql,{name,entry_year,major_id})
}

module.exports.selectStudentAll=async ()=>{
  return this.query('select student_id,student_name,student_number from shensm21_Student')
}

module.exports.selectStudentByNumber=async number=>{
  const query_sql='select * from shensm21_Student where student_number=@number'
  return this.query_safe(query_sql,{number})
}

module.exports.insertStudent=async (name,number,password,class_id)=>{
  const query_sql='insert into shensm21_Student(student_name,student_number,student_password,class_id) values(@name,@number,@password,@class_id)'
  return this.query_safe(query_sql,{name,number,password,class_id})
}

