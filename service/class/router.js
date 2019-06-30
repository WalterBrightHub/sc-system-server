const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/class',controller.getClass)

router.post('/api/class',controller.postClass)

module.exports=router;