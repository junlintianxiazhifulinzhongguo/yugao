module.exports={
    register:async(id,name)=>
    {
        let data
        if(id==='1'&&name==='lijun')
        {
            data=id+' '+name+' 登录成功'
        }
        else
        {
            data='账号或密码错误'
        }
        return data
    }
}