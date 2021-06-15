/*
 * @Author: jswang
 * @Date: 2021-06-15 20:05:30
 * @LastEditTime: 2021-06-15 21:22:28
 * @FilePath: \H5\13-大事件项目\big\assets\js\article\art_pub.js
 */
$(function() {
    let layer = layui.layer;
    let form = layui.form;
    initCate()

    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章分类失败");
                }
                //调用模板引擎,渲染分类的下拉菜单
                let htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                //别忘记 重新渲染 下表单
                form.render();
            }
        });
    };
    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    //为选择封面的按钮,绑定单击事件
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    });

    //监听coverFile de change事件,获取用户选择文件列表
    $('#coverFile').on('change', function(e) {
        //获取文件的列表数组
        let file = e.target.files;
        if (file.length === 0) {
            return layer.msg("请先选择图片");
        }
        // 根据文件创建对应的url地址
        var newImgURL = URL.createObjectURL(file);
        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    //定义文章的发布状态
    let art_state = "已发布";
    $('#btnSave2').on('click', function() {
        art_state = "存为草稿";
    });
    //发布
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        //2.基于form表单,快速创建一个formData对象
        let fd = new FormData($(this)[0]);
        //3.将文章发布状态,存到fd中
        fd.append('state', art_state);
        //4.将封面裁剪过后的图片,输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                //5.将文件对象存储到 fd中
                fd.append('cover_img', blob);
                //6.发起ajax数据请求
                publishArticle(fd);
            });

    });

    function publishArticle(fd) {
        $.ajax({
            type: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("发布文章失败");
                }
                layer.msg("发布文章成功");
                location.href = "/13-大事件项目/big/article/art_list.html"
            }
        });
    };
});