import { Loading, Message } from 'element-ui';
const getFileName = xhr => {
    var filename = "";
    var disposition = xhr.getResponseHeader('Content-Disposition');
    if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) { 
          filename = matches[1].replace(/['"]/g, '');
        }
    }
    return filename || "download-" + $.now()
}
export default {
	bind(el, binding, vnode) {
        const $el = $(el);
        $el.on('click', () => {
            if (!binding.value) {
                return false;
            }
            let xhr = new XMLHttpRequest(),
                loadingInstance = {};
            xhr.open("GET", binding.value);
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (xhr.status !== 200) {
                    xhr.onerror();
                    return false;
                }
                var url = window.URL.createObjectURL(this.response);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = getFileName(xhr)
                a.click();
                loadingInstance.close();
                Message.success('导出成功');
            }
            xhr.onerror = function() {
                loadingInstance.close();
                Message.error('导出失败，请重新导出或联系开发人员');
            }
            loadingInstance = Loading.service({ fullscreen: true, text: '正在生成导出文件' });
            xhr.send();
        })
	}
}