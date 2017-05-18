const fs = require('fs');
const path = require('path');
const vueServerRenderer = require('vue-server-renderer');
// const filePath = './src/client/server.js'
const filePath = './build/webpack.server.conf.js'

// 读取 bundle 文件，并创建渲染器
const code = fs.readFileSync(filePath, 'utf8');
const bundleRenderer = vueServerRenderer.createBundleRenderer(code);
// const bundleRenderer = vueServerRenderer.createBundleRenderer(require('../../build/webpack.server.conf.js'));

// 渲染 Vue 应用为一个字符串
bundleRenderer.renderToString({}, (err, html) => {
    if (err) {
        console.error(err);
    }

    console.log(content.replace('<div id="app"></div>', html))
});