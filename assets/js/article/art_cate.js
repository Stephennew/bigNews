/*
 * @Author: jswang
 * @Date: 2021-06-15 15:41:57
 * @LastEditTime: 2021-06-15 17:09:35
 * @FilePath: \H5\13-大事件项目\big\assets\js\article\art_cate.js
 */
$(function() {
    //获取文章分类数据
    let layer = layui.layer;
    let form = layui.form;
    getArtCateList()

    function getArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                let htmlStr = template('tpl-table', res);
                $('.layui-table tbody').html(htmlStr);
            }
        });
    };

    //添加分类
    let indexAdd = null;
    $('#addArtCate').on('click', function() {
        //打开有一个弹出层
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        });
    });

    //通过代理的形式,为form-add 表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("添加分类失败");
                }
                layer.msg("添加分类成功");
                //重新获取数据
                getArtCateList();
                //关闭指定索引的弹出层
                layer.close(indexAdd);
            }
        });
    });

    //获取修改分类的数据
    let indexEdit = null;
    $('tbody').on('click', '#btn-edit', function() {
        //打开有一个弹出层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
        });
        let id = $(this).attr('data-id');
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val('form-edit', res.data);
            }
        });
    });

    //通过代理的形式,为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("修改内容失败");
                }
                layer.msg("修改内容成功");
                layer.close(indexEdit);
                getArtCateList();
            }
        });
    });

    //删除
    $('body').on('click', '#btn-del', function() {
        let id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败");
                    }
                    layer.msg("删除分类成功");
                    layer.close(index);
                    getArtCateList();
                }

            });
        });
    })
});