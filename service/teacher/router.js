const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/teacher',controller.getTeacher)

router.get('/api/teacher/login',controller.getTeacherLogin)

router.post('/api/teacher',controller.postTeacher)

module.exports=router;