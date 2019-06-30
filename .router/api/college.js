const router=require('koa-router')()
const controller=require('../../controller/college')

router.get('/api/college',controller.getCollege)

router.post('/api/college',controller.postCollege)

module.exports=router;