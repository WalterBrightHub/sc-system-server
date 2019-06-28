const router=require('koa-router')()
const controller=require('../../controller/init')

router.get('/api/init',controller.getInit)
router.post('/api/init',controller.postInit)
module.exports=router;