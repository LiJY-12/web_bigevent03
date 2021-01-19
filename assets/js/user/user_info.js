$(function(){
    var form =layui.form
  var layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length >6){
                return "昵称字符在1到6之间"
            }
        }
    })
    initUserInfo()
    //获取和渲染用户信息
    function initUserInfo(){
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            success:function (res){
                // console.log(res);
                if(res.status !==0){
                    return layer.msg(res.message);
                }
            
            //调用from.val()快速为表单赋值
            form.val('formUserInfo',res.data)
      } 
     })
    }
    //重置表单数据
    $('#btnReset').on('click',function(e){
        e.preventDefault()
            initUserInfo()  
        
    })
    //提交用户信息
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg("恭喜你，用户信息修改好了")
                //更新，渲染
                window.parent.getUserInfo()
            }
        })
    })
})