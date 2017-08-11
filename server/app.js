const env = process.env.NODE_ENV;

const fs = require('fs');
const config = require('../config/project');
const path = require('path');
const Koa = require('koa');
const mongoose = require("mongoose")
const koaStatic = require("koa-static");
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const app = new Koa();
const views = require('koa-views');
const router = new Router();
const swig = require("swig");
// support socket.io
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const socketioJwt = require("socketio-jwt");

const secret = 'building-blocks secret 22222222'
const loginedUserCache = {}
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/building-blocks');

io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);

app.use(koaStatic(path.join(__dirname, 'static')));

app.use(views(__dirname + '/static/pages', {
    map: {
        html: 'swig'
    }
}));

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
            Object.keys(apis).forEach(key => {
                if (Object.hasOwnProperty.call(apis, key)) {
                    // 统一处理成promise
                    apiModel[key] = apis[key];
                }
            })
        }
    }
});

// log
if (env !== 'test') {
    app.use(require('koa-logger')());
}

// router
// index
router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        // token: token
    })
});

// preview
router.get('/preview/:docId', async(ctx, next) => {
    const Project = require('./modules/project.js');
    let data = await Project.findById(ctx.params.docId);
    await ctx.render('../dist/preview', {
        data: {
            id: ctx.params.docId,
            projectName: data.projectName,
            description: data.description,
            renderData: data.renderData
        }
    })
});
// export
router.get('/export/:docId', async(ctx, next) => {
    let token = ctx.query.token;
    if (token) {
        try {
            let decoded = jwt.verify(token, secret);
            let {path, projectName} = await require('./export.js')(decoded, ctx.params.docId)
            ctx.set('Content-disposition', `attachment; filename=${projectName}.zip`);
            ctx.response.name = ''
            ctx.body = fs.createReadStream(path);
        } catch(e) {
            ctx.status = 500;
            ctx.body = 'download faild';
        } 

    } else {
        ctx.status = 500;
        ctx.body = '没有权限'
    }
})
app
    .use(router.routes())
    .use(router.allowedMethods());

// error handle
app.use(async(ctx, next) => {
    // const start = new Date();
    try {
        await next();
    } catch (err) {
        const message = err.message;
        console.log('error --> ', message);
    }
    // const ms = new Date() - start;
    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 读取组件信息
var componentsData = require('./read-component.js')()
// socket handle
io
    .on('connection', socketioJwt.authorize({
        secret: secret,
        timeout: 15000 // 15 seconds to send the authentication message
    })).on('connection', socket => {
        socket.on('login', (data, cb) => {
            // { username: '123', password: '123' }
            // TODO: 调用接口验证登录
            let userData = {
                id: 1,
                name: 'hezhirong'
            }
            const token = jwt.sign(userData, secret);
            cb({
                status: 200,
                data: Object.assign(userData, {
                    token: token
                })
            })
        })
    }).on('authenticated', function (socket) {
        let userData = socket.decoded_token;
        console.log('hello! ' + userData.name);
        socket.emit('componentList', componentsData);
        // 验证用户是否重复登录，踢下前一个用户
        const loginUser = loginedUserCache[userData.id];
        if (typeof loginUser === 'object' && loginUser.socket) {
            loginUser.socket.emit('repeatLogin')
        }
        loginedUserCache[userData.id] = Object.assign({}, userData, {socket: socket});
        
        socket.on('message', (data = {}, cb) => {
            // 每次请求需要验证登录
            if (!data.data) {
                data.data = {}
            }
            // 验证登录状态
            jwt.verify(data.data.token, secret, function(err, decoded) {
                if (err) {
                    socket.emit('unauthorized');
                    return false;
                }
                // 最近用户数据
                data.data.userData = userData;
                apiModel.handle(io, socket, data, cb);
            });
        });
        socket.on('disconnect', () => {
            // console.log('some one disconnect');
            // apiModel.handle(io, socket, {
            //     method: 'DELETE',
            //     path: '/auth',
            //     data: {}
            // }, () => {});
        });
    })

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