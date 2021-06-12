/*
 * @Author: jswang
 * @Date: 2021-06-12 21:35:07
 * @LastEditTime: 2021-06-12 21:43:56
 * @FilePath: \black_h5\13-大事件项目\big\assets\js\login.js
 */

$(function() {
    $('.login-box').on('click', function() {
        $(this).hide();
        $('.reg-box').show();
    });
    $('.reg-box').on('click', function() {
        $(this).hide();
        $('.login-box').show();
    })
});