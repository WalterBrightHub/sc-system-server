const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/college_manager',controller.getCollegeManager)

router.get('/api/college_manager/login',controller.getCollegeManagerLogin)

router.post('/api/college_manager',controller.postCollegeManager)

module.exports=router;