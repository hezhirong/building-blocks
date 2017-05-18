const env = process.env.NODE_ENV;

const fs = require('fs');
const config = require('../../config/project');
const path = require('path');
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

// support socket.io
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

const isProd = process.env.NODE_ENV === 'production'

io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);

// 加载api入口文件
const apiModel = require('./api/index');
// 导入api
fs.readdir(`${__dirname}/api`, (err, files) => {
    if (err) {
        return false;
    }
    console.log(files)
    for (const file of files) {
        if (file !== 'index.js') {
            // 动态导入接口
            const apis = require(`./api/${file}`);
            Object.keys(apis).forEach( key => {
                if (Object.hasOwnProperty.call(apis, key)) {
                    // 统一处理成promise
                    apiModel[key] = apis[key];
                }
            })
        }
    }
});

// support request log
if (env !== 'test') {
    app.use(require('koa-logger')());
}



router.get('/index', async (ctx, next) => {
    // /js/app.js
    // var layout = fs.readFileSync('../client/index.html', 'utf8')

    // await require('vue-server-renderer').renderToString(
    //     // 创建一个应用实例
    //     require('/js/app')(),

    //     // 处理渲染结果
    //     function(error, html){
    //         if(error){
    //             console.error(error);
    //             return res
    //                 .status(500)
    //                 .send('Server Error')
    //         }
    //         // 发送布局和HTML文件
    //         res.send(layout.replace('<div id="app"></div>', html))

    //     }
    // )
    require('vue-server-renderer').renderToString(

        )

    ctx.body = '<h1>hello</h1>'
})

app
  .use(router.routes())
  .use(router.allowedMethods());


// error handle
app.use(async (ctx, next) => {
    // const start = new Date();
    try {
        await next();
    }
    catch (err) {
        const message = err.message;
        console.log('error --> ', message);
    }
    // const ms = new Date() - start;
    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// socket handle
io.on('connection', socket => {
    console.log('new connection');

    socket.on('message', (data, cb) => {
        apiModel.handle(io, socket, data, cb);
    });

    socket.on('disconnect', () => {
        // console.log('some one disconnect');
        apiModel.handle(io, socket, { method: 'DELETE', path: '/auth', data: { } }, () => { });
    });
});

// start listener
server.listen(env === 'production' ? config.port : config.devPort, () => {
    console.log(`start server at http://localhost:${env === 'production' ? config.port : config.devPort}`);
});

// other error handle
server.on('error', err => {
    console.log('error --> ', err.message);
    process.exit(1);
});


module.exports = server;