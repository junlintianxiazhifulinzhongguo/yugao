const homeService=require('../service/home')
module.exports={
    index:async (ctx, next) => 
    {
        await ctx.render('home/index', {title: '首页'});
    },
    home:async (ctx, next) =>
    {
        await ctx.render('home/index', {title: '首页'});
    },
    homeParams:async (ctx, next) => 
    {
        let{id,name}=ctx.params
        await next();
        ctx.body=id+' '+name
        console.log(id,name)
    },
    login:async(ctx,next)=>
    {
        ctx.body='<form action="/register" method="post">'+
        '<input type="text" name="id" placeholder="id">'+
        '<input type="text" name="name" placeholder="姓名">'+
        '<input type="submit" value="提交"></form>'
    },
    register:async(ctx,next)=>
    {
        console.log(ctx.request.body)
        let{id,name}=ctx.request.body;
        let data=await homeService.register(id,name)
        ctx.body=data
    },
    all:async (ctx, next) => 
    {
        console.log(555)
        ctx.status=404
        ctx.send({body:'错了',status:200})
        console.log(666)
    }














}