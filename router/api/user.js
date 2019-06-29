const router=require('koa-router')()
const controller=require('../../controller/user')

router.post('/api/user',controller.postUser)

module.exports=router;