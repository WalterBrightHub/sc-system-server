const router=require('koa-router')()
const controller=require('../../controller/student')

router.get('/api/student',controller.getStudent)

//router.get('/api/studentInfo',controller.getStudentInfo)

router.post('/api/student',controller.postStudent)

module.exports=router;