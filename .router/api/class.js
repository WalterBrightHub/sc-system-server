const router=require('koa-router')()
const controller=require('../../.controller/class.js')

router.get('/api/class',controller.getClass)

router.post('/api/class',controller.postClass)

module.exports=router;