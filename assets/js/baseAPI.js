$.ajaxPrefilter(function(options) {
    // alert(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem("token") || "" }
    }
    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //删除本地token
            localStorage.removeItem('token');
            //跳转登录注册页面
            location.href = '/login.html';
        }
    }
})