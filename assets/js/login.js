$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

//自定义验证规则
var form =layui.form;
var layer = layui.layer;
form.verify({

    pwd:[
        /^[\S]{6,16}$/,
        "密码必须6-16位，且不能输入空格"
    ],
    repwd:function(value){
        //选择器必须带空格，选择的是后代中的input，name属性值
        var pwd = $('.reg-box input[name=password]').val()
        if(value !== pwd){
            return layer.msg("两次输入不一致")
        }
    }
})
//4.注册功能

$('#form_reg').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method:'POST',
        url:'/api/reguser',
        data:{
            username:$('.reg-box [name=username]').val(),
            password:$('.reg-box [name=password]').val()
        },
        success:function(res){
            if(res.status != 0){
                return layer.msg(res.message)
            }
            //提交成功后处理代码
            layer.msg("注册成功，请登录！");
            $('#link_login').click();
            $('#form_reg')[0].reset();
        }
    })
})
//5.登录功能
$('#form_login').submit(function(e){
    e.preventDefault();
    $.ajax({
        method:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            //校验返回状态
            if(res.status !=0){
                return layer.msg(res.message)
            }
            //提示信息，保存token，跳转页面
            layer.msg("恭喜你登录成功");
            localStorage.setItem("token",res.token)
            location.href = "/index.html"
        }
      })
    })
})