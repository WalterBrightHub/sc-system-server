const jwt=require('jsonwebtoken')
const {secret}=require('../config/default')
/* 获取一个期限为4小时的token */
const getToken=(payload = {})=>{
  return jwt.sign(payload, secret, { expiresIn: '30s' });
}
/* 通过token获取JWT的payload部分 */
const getJWTPayload=token=>{
  // 验证并解析JWT
  return jwt.verify(token.split(' ')[1], secret);
}
module.exports={getToken,getJWTPayload}