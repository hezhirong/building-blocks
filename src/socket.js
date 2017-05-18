import config from '../../config/project';

let socketClient = require('socket.io-client');
let platformSocketParam = { };

function createInterface(method) {
    return function (path, data) {
        if (typeof this.token === 'string' && this.token !== '') {
            data.token = this.token;
        }
        return new Promise( (resolve, reject) => {
            this.emit('message', { method: method, path: path, data: data }, res => {
                console.log(res)
                if (res.status === 'success') {
                    resolve(res)
                } else {
                    reject(res)
                }
            });
        })
    };
}

function setToken(newToken) {
    this.token = newToken;
}

function socketWrap(socket) {
    socket.token = '';
    socket.get = createInterface('GET');
    socket.post = createInterface('POST');
    socket.put = createInterface('PUT');
    socket.delete = createInterface('DELETE');
    socket.setToken = setToken;
    return socket;
}

const serverUrl = process.env.NODE_ENV === 'production' ?
    `http://${config.server}:${config.port}/` :
    `http://${config.devServer}:${config.devPort}/`;
export default socketWrap(socketClient(serverUrl, platformSocketParam));