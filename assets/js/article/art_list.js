/*
 * @Author: jswang
 * @Date: 2021-06-15 17:11:48
 * @LastEditTime: 2021-06-15 22:24:24
 * @FilePath: \H5\13-大事件项目\big\assets\js\article\art_list.js
 */
$(function() {
    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
    //定义美化事件的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);
        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());
        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss;
    };

    function padZero(n) {
        return n < 10 ? '0' + n : n;
    }
    // 定义一个查询的参数对象 ,将来请求数据的时候,需要将参数对象提交到服务器
    let q = {
        pagenum: 1, //页码值,默认请求第一页的数据
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章发布的状态
    }
    initTable();

    //文章列表
    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败!");
                }
                let htmlStr = template('tpl-artList', res);
                $('tbody').html(htmlStr);
                //渲染分页
                renderPage(res.total);
            }
        });
    }

    //获取文章分类
    getArtCateList()

    function getArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取分类数据失败");
                }
                //成功就调用模板引擎渲染分类的可选项
                let htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                //通知layui 重新渲染表单区域结构
                form.render();
            }
        });
    };

    //为筛选表单绑定事件
    $('#search').on('submit', function(e) {
        e.preventDefault();
        //获取表单中的值
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        //为查询参数对象q中对应的属性赋值
        q.cate_id = cate_id;
        q.state = state;
        //根据最新的筛选条件,重新渲染表格数据
        initTable();
    });

    //定义渲染分页的方法
    function renderPage(total) {
        // pageBox
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示几条
            curr: q.pagenum, //设置默认选择的页数
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 触发jump回调方式的有两种:
            //1.点击页码的时候,会触发jump回调
            //2.只要调用了 laypage.render() 方法 ,就会触法
            jump: function(obj, first) { //分页发生切换的时候发生回调
                q.pagenum = obj.curr; //把最新的页码值,赋值给查询参数对象中
                q.pagesize = obj.limit; //最新的条目数
                // initTable();
                //可以通过first的值,来判断你是通过哪种方式触发的jump回调
                //如果first的值为 true 证明则是方式2触发
                //否则就是方式1触发的
                // 第一次不执行
                if (!first) {
                    initTable();
                }
            }
        })
    };


    // 删除
    $('tbody').on('click', '.btn-delete', function() {
        //获取删除按钮的个数
        let btnDelNum = $('.btn-delete').length;
        // 获取id
        let id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                // :id是动态参数
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除文章失败");
                    }
                    layer.msg("删除文章成功");
                    //重新获取文章列表
                    //当数据删除完成后,需要判断当前页中是否有剩余的数据,
                    //如果没有数据, 让页码值 - 1,
                    //再次调用initTable()

                    if (btnDelNum === 1) {
                        //如果 删除按钮等于1,证明删除完毕之后,页面上就没有任何数据了
                        //页码值最小是 1, 等于1就不能再减了
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    }
                    initTable();
                }
            });
            layer.close(index);
        });
    });
});