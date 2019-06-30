const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/college',controller.getCollege)

router.post('/api/college',controller.postCollege)

module.exports=router;