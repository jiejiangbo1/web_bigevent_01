$.ajaxPrefilter(function(options) {
    // alert(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})