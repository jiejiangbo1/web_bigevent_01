$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    });
    //初始化用户信息
    initUserInfo();
    //初始化用户信息封装，后面还会用
    var layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.massage)
                }
                // console.log(res);
                form.val("formUserInfo", res.data)
            }
        })
    }
    //重置表单
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo()
    });
    //表单重置
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认行为
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.getUserInfo()
            }
        })
    })
})