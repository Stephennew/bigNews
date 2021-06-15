/*
 * @Author: jswang
 * @Date: 2021-06-15 13:06:11
 * @LastEditTime: 2021-06-15 13:46:25
 * @FilePath: \H5\13-大事件项目\big\assets\js\user\user_pwd.js
 */
$(function() {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //同样 samePwd
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新旧密码不能相同";
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码不一致"
            }
        },
    });

    //监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg("修改密码失败");
                }
                layer.msg("修改密码成功");
                //重置表单
                $('.layui-form')[0].reset();
            }
        });
    });
});