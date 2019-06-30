const router=require('koa-router')()
const controller=require('../../controller/administrator')

router.get('/api/administrator',controller.getStudent)

router.post('/api/administrator',controller.postStudent)

module.exports=router;