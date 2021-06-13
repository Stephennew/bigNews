/*
 * @Author: jswang
 * @Date: 2021-06-13 11:10:38
 * @LastEditTime: 2021-06-13 11:15:08
 * @FilePath: \black_h5\13-大事件项目\big\assets\js\baseAPI.js
 */
/* 
注意：每次调用 $.get() $.post() $.ajax()的时候
会先调用 ajaxPrefilter()这个函数
在这个函数中,可以拿到我们给ajax提供的配置对象

*/
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
});