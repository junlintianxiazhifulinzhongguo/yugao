const Koa = require('koa');
const router=require('./routes/home')
const connect=require('./service/init')
;(async ()=>{
    await connect()
})()
const app = new Koa();
const middleware=require('./middleware')

middleware(app)
router(app)
app.listen(80);