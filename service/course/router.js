const router=require('koa-router')()
const controller=require('./controller')

router.get('/api/course',controller.getCourse)

router.post('/api/course',controller.postCourse)

module.exports=router;