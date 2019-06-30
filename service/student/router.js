const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/student',controller.getStudent)

router.get('/api/student/login',controller.getStudentLogin)

router.post('/api/student',controller.postStudent)

module.exports=router;