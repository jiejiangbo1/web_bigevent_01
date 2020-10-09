$(function() {
    var form = layui.form;
    //定制规则
    form.verify({
        //所有密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更新密码失败！")
                }
                layui.layer.msg("更新密码成功！")
                $(".layui-form")[0].reset()
            }
        })
    })
})