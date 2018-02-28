const cp=require('child_process')
const {resolve}=require('path')
const qiniu=require('../qiniu')
let result
;(async()=>{
    const script=resolve(__dirname,'./moviedata')
    const child=cp.fork(script,[])
    let invoked=false
    child.on('error',error=>{
        if(invoked)return
        invoked=true
        console.log(error)
    })
    child.on('exit',code=>{
        if(invoked)return
        invoked=true
        let err=code===0?null:new Error('exit code'+code)
        console.log(err)
    })
    child.on('message',data=>{
        result=data.result
        qiniu(result)
    })
})()
