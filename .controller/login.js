const {getToken} =require('../lib/jwt')
const md5=require('md5')
const Model=require('../lib/mssql')

/* GET /api/login 登录 */
module.exports.getLogin= async (ctx, next) => {
  const {number,password,role}=ctx.request.body
  if(number&&password&&role){
    if(role==='administrator'){
      const result=await Model.selectAdministrator(number,md5(password))
      const login=result.recordset.length===1
      if(login){
        const {administrator_id}=result.recordset[0]
        ctx.body={
          code:0,
          msg:'login success',
          token:getToken({
            role:'administrator',
            administrator_id
          })
        }
      }
      else{
        ctx.body={
          code:3,
          msg:'wrong number or password'
        }
      }
    }
    else if(role==='college_manager'){
      const result=await Model.selectCollegeManager(number,md5(password))
      const login=result.recordset.length===1
      if(login){
        const {college_manager_id}=result.recordset[0]
        ctx.body={
          code:0,
          msg:'login success',
          token:getToken({
            role:'college_manager',
            college_manager_id
          })
        }
      }
      else{
        ctx.body={
          code:3,
          msg:'wrong number or password'
        }
      }
    }
    else if(role==='teacher'){

    }
    else if(role==='student'){

    }
    else{
      ctx.body={
        code:2,
        msg:'invalid role'
      }
    }
  }
  else{
    ctx.body={
      code:1,
      msg:'lack of parameters'
    }
  }

  // return ctx.body = {
  //     ok: true,
  //     msg: '登录成功',
  //     token: getToken({ user: query.user, password: query.password })
  // }
}