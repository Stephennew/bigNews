/*
 * @Author: jswang
 * @Date: 2021-06-12 21:35:07
 * @LastEditTime: 2021-06-12 22:41:57
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
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
    });

});