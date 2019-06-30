const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/administrator',controller.getAdministrator)

router.get('/api/administrator/login',controller.getAdministratorLogin)

router.post('/api/administrator',controller.postAdministrator)

module.exports=router;