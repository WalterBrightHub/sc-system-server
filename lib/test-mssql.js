const Model=require('./mssql')

Model.query('select * from shensm21_College;').catch(e=>{
  console.log(e.message)
})

const hi=async function(){
  let result=await Model.query('select * from shensm21_College;select * from chendr21_Administrator;')
  console.log(result)
}

hi()