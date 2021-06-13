/*
 * @Author: jswang
 * @Date: 2021-06-13 11:10:38
 * @LastEditTime: 2021-06-13 15:30:56
 * @FilePath: \black_h5\13-大事件项目\big\assets\js\baseAPI.js
 */
/* 
注意：每次调用 $.get() $.post() $.ajax()的时候
会先调用 ajaxPrefilter()这个函数
在这个函数中,可以拿到我们给ajax提供的配置对象

*/
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // console.log(options);
    //统一为有权限的借口,设置headers请求头
    //找到 /my/ 等于该位置索引
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            //这里的headers 必须小些,大写就会失败,巨坑
            Authorization: localStorage.getItem('token') || '',
        }
    }

    //全局统一挂载complete函数
    options.complete = function(res) {
        //complete对调中,可以使用res.responseJSON拿到服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //强制清空token
            localStorage.removeItem('token');
            //强制跳转到登陆页面
            location.href = '/13-大事件项目/big/login.html'
        }
    }
});