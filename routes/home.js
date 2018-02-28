const router=require('koa-router')()
const homeController=require('../controller/home')
module.exports=(app)=>{
    router.get('/',homeController.index)
    router.get('/home',homeController.home)
    router.get('/home/:id/:name',homeController.homeParams) 
    router.get('/login',homeController.login)
    router.post('/register',homeController.register)
    router.all('/*',homeController.all);
    app.use(router.routes())
        .use(router.allowedMethods())
}