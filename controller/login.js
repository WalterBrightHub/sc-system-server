const {getToken} =require('../lib/jwt')
const md5=require('md5')
const Model=require('../lib/mssql')

/* GET /api/login 登录 */
module.exports.getLogin= async (ctx, next) => {
  const {name,password,role}=ctx.request.body
  if(name&&password&&role){
    if(role==='administrator'){
      const result=await Model.selectAdministrator(name,md5(password))
      const login=result.recordset.length===1
      if(login){
        const administrator_id=result.recordset[0]
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
          msg:'wrong name or password'
        }
      }
    }
    else if(role==='college_manager'){

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