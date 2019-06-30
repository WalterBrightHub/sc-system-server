const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/major',controller.getMajor)

router.post('/api/major',controller.postMajor)

module.exports=router;