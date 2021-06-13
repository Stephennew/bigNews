/*
 * @Author: jswang
 * @Date: 2021-06-12 21:35:07
 * @LastEditTime: 2021-06-13 11:16:35
 * @FilePath: \black_h5\13-大事件项目\big\assets\js\login.js
 */

$(function() {
    $('.login-box').on('click', 'a', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('.reg-box').on('click', 'a', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    //从layui 中获取form对象
    let form = layui.form;
    let layer = layui.layer;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //校验两次密码是否一致
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致';
            };
        },
    });

    //监听注册表单提交事件
    $('#form-reg').on('submit', function(e) {
        //阻止提交的默认行为
        e.preventDefault();
        let data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
        };
        //默认行为
        $.post("/api/reguser", data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功,请登录");
                //模拟人的点击行为
                $('.reg-box a').click();
            },

        );
    });

    //监听登录表单事件
    $('#form-login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功!");
                //登录成功后,将得到的的token字符串,保存到localStorage中
                localStorage.setItem('token', res.token);
                // console.log(res.token);
                location.href = '/13-大事件项目/big/index.html';
            }
        });
    })


});