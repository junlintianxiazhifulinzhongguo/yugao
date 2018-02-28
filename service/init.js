const mongoose = require('mongoose');
const config=require('../config/index')
mongoose.Promise=global.Promise
module.exports=connect=>{
    if(process.env.NODE_ENV !=='production')
    {
        mongoose.set('debug',true)
    }
    mongoose.connect(config.mongodb.db);
    var db = mongoose.connection;
    db.on('error',function(err) {
        console.log(err)
    } );
    db.once('open', function () {
        console.log('连接成功')
    });
    db.on('disconnected',function() {
        mongoose.connect(config.mongodb.db)
    } );
}
