/*
 * @Author: jswang
 * @Date: 2021-06-15 13:51:12
 * @LastEditTime: 2021-06-15 15:06:29
 * @FilePath: \H5\13-大事件项目\big\assets\js\user\user_avater.js
 */
$(function() {
    let layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //为上传按钮绑定点击事件

    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    });

    $('#file').on('change', function(e) {
        let fileList = e.target.files;
        if (fileList.length === 0) {
            return layer.msg("请选择图片");
        }
        //拿到用户选择的文件
        let file = fileList[0];
        //根据选择的文件,创建一个对应的url
        let newImageURL = URL.createObjectURL(file);
        //先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImageURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    //为确定按钮绑定事件
    $('#btnUpdate').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            //base64 减少不必要的图片请求
            //大图片不要转base64图片格式
            //小图片是转为 base64 格式图片  比原来图片大 30%
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改头像失败");
                }
                layer.msg("修改头像成功");
                //调用父窗口中的 再次获取用户信息,更新
                window.parent.getUserInfo();
            }
        });
    })





})