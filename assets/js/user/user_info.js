/*
 * @Author: jswang
 * @Date: 2021-06-15 12:09:29
 * @LastEditTime: 2021-06-15 12:53:09
 * @FilePath: \H5\13-大事件项目\big\assets\js\user\user_info.js
 */
$(function() {
    //导入layui的form
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度只能1~6";
            }
        }
    });

    initUserInfo();
    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败");
                }
                //渲染数据
                form.val('formUserInfo', res.data);
            }
        });
    };

    //重置表单数据
    $('#btnReset').on('click', function(e) {
        //阻止表单的默认重置行为
        e.preventDefault();
        //回到原有的数据  获取用户信息,重新填充下表单
        initUserInfo();
    });

    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户数据失败");
                }
                layer.msg("更新用户信息成功");
                //更新父页面中的 提示信息
                //调用父页面中的方法,重新渲染用户的头像和用户信息
                window.parent.getUserInfo();
            }
        });
    })
})