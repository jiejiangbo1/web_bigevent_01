$(function() {
    // 1 . 显示与隐藏切换
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    });
    // 自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致！';
            }
        }
    });
    // 注册功能
    $("#form_reg").on("submit", function(e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录!");
                $("#link_login").click();
            }
        })
    });
    // 监听登录功能
    $("#form_login").submit(function(e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜你，登录成功！");
                //保存token，跳转到页面
                localStorage.setItem('token', res.token);
                location.href = "/index.html";
            }
        })
    })
})