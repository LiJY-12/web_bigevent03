$(function(){
 var form = layui.form;
    form.verify({
      pwd:[
            /^[\S]{6,16}$/,
            "密码必须6-16位，且不能输入空格"
        ],
     newPwd: function(value){
          if(value == $('[name=oldPwd]').val()){
            return "新密码和旧密码不同"
          }
      },
      rePwd: function(value){
        if(value !== $('[name=newPwd]').val()){
            return "确认密码和新密码不同"
          }
      }
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("修改密码成功！");
                $(".layui-form")[0].reset();
            }
        })
    })
})