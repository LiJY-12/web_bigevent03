$(function(){
    //美化定时器
    template.defaults.imports.dateFormat = function(dtStr){
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d +' ' + hh +':'+ mm +':'+ss
    }  
    function padZero(n){
        return n > 9? n : '0'+ n
    }
      //定义提交参数
    var q = {
        pagenum : 1,//页码值
        pagesize :3, //每页显示多少条数据
        cate_id : "", //文章分类的Id
        state : "", //文章的的状态，可选值： 已发布、草稿
    }
    var layer = layui.layer
    initTable()
    //获取文章列表数据的方法
    function initTable(){
        $.ajax({
            method: 'GET',
            url : '/my/article/list',
            data : q,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("获取文章列表失败！")
                }
           
            //调用模板引擎
            var htmlStr = template("tpl-table",res)
            $('tbody').html(htmlStr)
            //调用分页
            renderPage(res.total)
        } 
    })
    }
    //初始化分类
    var form = layui.form;
    initCate();
    function initCate(){
        $.ajax({
            method:"GET",
            url:"/my/article/cates",
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                //赋值 渲染form
                var htmlStr = template("tpl-cate",res);
                $("[name=cate_id").html(htmlStr);
                //根据select标签生成/渲染dl放dd
                form.render()
            }
        })
    }
    //筛选功能
    $("#form-search").on("submit",function(e){
        e.preventDefault();
        var state = $("[name=state").val();
        var cate_id = $("[name=cate_id]").val();
        q.state = state;
        q.cate_id =cate_id;
        initTable()
    })
    //分页
    var laypage = layui.laypage
    function renderPage(total){
        // alert(total)
        laypage.render({
            elem:"pageBox", //容器
            count:total,    //数据总数
            limit:q.pagesize,   //每页几条
            curr:q.pagenum, //第几页    
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            //分页初始化，页码改变时触发jump
            jump:function(obj, first){
                //可以通过first的值，来判断是哪个方法触发的
                //如果值为true则是首次执行
                //改变当前页
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                //判断，不是第一次初始化分页，才能重新调试初始化文章列表
                if(!first){
                    initTable()
                    // console.log(q.pagenum);
                }
            }
        })
    }

    //删除
    var layer = layui.layer;
    $('tbody').on("click",".btn-delete",function(){
        var id = $(this).attr("data-id");
    //显示兑换框
    layer.confirm('是否确认删除',{icon:3,title:"提示"},
    function (index){
        $.ajax({
            method:"GET",
            url:"/my/article/delete/"+id,
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                //重新渲染页面的数据
                initTable();
                layer.msg("恭喜删除成功");
                //页面汇总删除按钮个数等于1，页码大于1
                //当前页减一，满足两个条件，页面只有一个元素，当前页大于1
                if($(".btn-delete").length === 1 && q.pagenum>=2){
                    q.pagenum--
                }
                initTable()
                 layer.close(index)
            }
        })
       
    })
    })
})