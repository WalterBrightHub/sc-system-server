const router=require('koa-router')()
const controller=require('../../controller/login')

router.get('/api/login',controller.getLogin)

module.exports=router;