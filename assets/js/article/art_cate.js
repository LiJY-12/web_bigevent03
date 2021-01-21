$(function(){
    initArtCateList();
    //1.初始化文章分类的列表
    function initArtCateList(){
        $.ajax({
            url:"/my/article/cates",
            success:function(res){
                console.log(res);
                var str = template("tpl-art-cate",res);
                $("tbody").html(str);
            }
        })
    }
    //显示添加文章分类列表
    var layer = layui.layer
    $('#btnAddCase').on("click",function(){
        indexAdd =layer.open({
            type: 1, 
            title:'添加文章分类',
            area:['500px','260px'],
            content: $("#dialog-add").html()//这里content是一个普通的String
          });
          
    })

    //提交文章分类添加(事件委托)
    var indexAdd = null;
    //弹出层父盒子是body
    $("body").on("submit","#form-add",function(e){
        e.preventDefault(),
        $.ajax({
            method:"POST",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                //重新渲染页面的数据
                initArtCateList();
                layer.msg("恭喜添加成功");
                layer.close(indexAdd)
            }
        })
    })

    //4.显示修改form表单
    var indexEdit = null;
    var form = layui.form;
    $("tbody").on("click",".btn-edit",function(){
        indexEdit = layer.open({
            type:1,
            area:['500px','260px'],
            title:'修改文章分类',
            content:$("#dialog-edit").html()

        })
        //获取Id,发送ajax获取数据，渲染到页面
        var id = $(this).attr("data-id");
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val("form-edit",res.data)
            }
        })
    })

    //5.修改 - 提交
    $("body").on("submit","#form-edit",function(e){
        e.preventDefault(),
        $.ajax({
            method:"POST",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                //重新渲染页面的数据
                initArtCateList();
                layer.msg("恭喜更新成功");
                layer.close(indexEdit)
            }
        })
    })

    //删除事件
$("tbody").on("click",".btn-delete",function(){
    var id = $(this).attr("data-id");
    //显示兑换框
    layer.confirm('是否确认删除',{icon:3,title:"提示"},
    function (index){
        $.ajax({
            method:"GET",
            url:"/my/article/deletecate/"+id,
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                //重新渲染页面的数据
                initArtCateList();
                layer.msg("恭喜删除成功");
                layer.close(index)
            }
        })
    })
    })
})