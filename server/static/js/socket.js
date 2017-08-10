import config from '../../../config/project';
import {
    Message,
    MessageBox
} from 'element-ui';
let io = require('socket.io-client');

function createInterface(method) {
    return function (path, data ) {
        if (typeof this.token === 'string' && this.token !== '') {
            data.token = this.token;
        }
        return new Promise((resolve, reject) => {
            this.emit('message', {
                method: method,
                path: path,
                data: data
            }, res => {
                console.log(res)
                if (res.status === 200) {
                    resolve(res)
                } else {
                    Message.error(res.msg);
                    reject(res)
                }
            });
        })
    };
}

function socketWrap(socket) {
    socket.get = createInterface('GET');
    socket.post = createInterface('POST');
    socket.put = createInterface('PUT');
    socket.delete = createInterface('DELETE');

    socket.on('connect', function () {
        socket
            .on('authenticated', function () {
                //do other things
            })
            .on('unauthorized', function (msg) {
                MessageBox({
                    type: 'warning',
                    title: '提示',
                    message: '登录验证失败',
                    callback: () => {
                        location.href="/";
                    }
                })
            })
    });
    socket.on('repeatLogin', () => {
        MessageBox({
            type: 'warning',
            title: '提示',
            message: '此账号在其他地方登录！！！',
            callback: () => {
                location.href="/";
            }
        })
    })
    return socket;
}

const serverUrl = process.env.NODE_ENV === 'production' ?
    `http://${config.server}:${config.port}/` :
    `http://${config.devServer}:${config.devPort}/`;

export default socketWrap(io(serverUrl));