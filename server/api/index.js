const apiEntry = {
    /**
     * 调度所有API方法
     * @param  {Object}   io          socket.io
     * @param  {Object}   socket      socket链接对象
     * @param  {Object}   receiveData {method: [get, post, put, delete], path: '/getComponent', data: { 自定义数据 }}
     * @param  {Function} cb          回调方法
     * @return {[type]}               [description]
     */
    handle: function (io, socket, receiveData, cb) {
        if (!(cb instanceof Function)) {
            cb = console.log;
        }
        const now = new Date();
        // 合并路径 -> GET /getComponent
        const path = `${receiveData.method} ${receiveData.path}`;
        // 回调方法
        const end = (status, data, msg) => {
            cb({ status, data, msg});
            // 方法处理时间
            console.log(`-----> 【${path}】 ${status} ${Date.now() - now.getTime()}ms`);
        };
        const success = (data) => {
            end(200, data);
        };
        const error = (msg, data) => {
            end(400, data, msg);
        };
        console.log(`<----- 【${path}】`);

        if (this[path]) {
            this[path]
                .call( {io, socket, end, success, error}, receiveData.data)
                // .catch(e => {
                //     if (/^assert failed./.test(e.message)) {
                //         console.info(e.message);
                //         return;
                //     }
                //     console.error(e);
                //     return end(500, e.message);
                // });
        }
        else {
            end(404, '没找到指定的方法: ' + path);
        }
    }
    // api下所有文件
};

module.exports = apiEntry;