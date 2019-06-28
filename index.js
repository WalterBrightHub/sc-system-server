const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwtKoa =require('koa-jwt')

const errorHandle=require('./middleware/errorHandle')
const config = require('./config/default.js');

const app = new Koa()

app.use(errorHandle)

app.use(bodyParser({
  formLimit: '1mb'
}))

/* 路由权限控制 */
app.use(jwtKoa({ secret: config.secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/init/,
      /^\/api\/login/,
      /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}));

//  路由
 app.use(require('./router/api/init').routes())  //初始化管理员账户
 app.use(require('./router/api/login').routes()) //用户登录


app.listen(config.port)

console.log(`listening on port ${config.port}`)