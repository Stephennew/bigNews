/*
 * @Author: jswang
 * @Date: 2021-06-13 14:06:23
 * @LastEditTime: 2021-06-15 12:51:25
 * @FilePath: \H5\13-大事件项目\big\assets\js\index.js
 */
$(function() {
    getUserInfo();
    let layer = layui.layer;
    //退出
    $('#logout').on('click', function() {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            //清空本地存储的token
            localStorage.removeItem('token');
            //跳转到登陆页面
            location.href = "/13-大事件项目/big/login.html";
            //关闭confirm询问框
            layer.close(index);
        });
    })


    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            // //这里的headers 必须小些,大写就会失败,巨坑
            // headers: {
            //     Authorization: localStorage.getItem('token') || '',
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //渲染用户头像
                renderAvater(res.data);
            },
            /* //complete对调中,可以使用res.responseJSON拿到服务器响应的数据
            complete: function(res) {
                if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                    //强制清空token
                    localStorage.removeItem('token');
                    //强制跳转到登陆页面
                    location.href = '/13-大事件项目/big/login.html'
                }
            }, */
        });
    };


    function renderAvater(user) {
        // 1获取用户头像
        let name = user.nickname || user.username;
        //设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        //按需渲染头像
        if (user.user_pic !== null) {
            //有头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avater').hide();
        } else {
            //没有头像
            $('.layui-nav-img').hide();
            let first = name[0].toUpperCase();
            $('.text-avater').html(first).show();
        }
    }
});