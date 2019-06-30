const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/init',controller.getInit)
router.post('/api/init',controller.postInit)
module.exports=router;