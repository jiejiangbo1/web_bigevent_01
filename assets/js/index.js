// 入口函数
$(function() {
    getUserInfo();
    //退出功能
    var layer = layui.layer;
    $("#btnLogout").on("click", function() {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.删除本地中的token
            localStorage.removeItem('token');
            //2.跳转到登录注册页面
            location.href = '/login.html';
            layer.close(index);
        });
    })
});

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功，渲染用户信息
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //删除本地token
        //         localStorage.removeItem('token');
        //         //跳转登录注册页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}
//封装用户头像渲染函数
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        //渲染头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".user-avatar").hide()
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase()
        $(".user-avatar").show().html(first);
    }
}