const env = process.env.NODE_ENV;

const fs = require('fs');
const config = require('../config/project');
const path = require('path');
const Koa = require('koa');
const mongoose = require("mongoose")
const app = new Koa();

// support socket.io
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/building-blocks');

io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);

// 加载api入口文件
const apiModel = require('./api/index');
// 导入api
fs.readdir(`${__dirname}/api`, (err, files) => {
    if (err) {
        return false;
    }
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
// 读取组件信息
var componentsData = require('./read-component.js')()
// socket handle
io.on('connection', socket => {
    // 发送组件信息到客户端
    socket.emit('message', componentsData);

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