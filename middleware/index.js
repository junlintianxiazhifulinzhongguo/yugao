const bodyParser=require('koa-bodyparser');
const static=require('koa-static');
const nunjucks=require('koa-nunjucks-2');
const path = require('path');
const miSend=require('./mi-send')

module.exports=(app)=>{   
    app.use(static(path.resolve(__dirname,"../public")))
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../view'),
        nunjucksConfig: {
          trimBlocks: true
        }
      }));
    app.use(bodyParser())
    app.use(miSend())
}
