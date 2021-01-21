$(function(){
    //获取用户信息，并渲染用户名和头像
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清除本地存储的token数据
            localStorage.removeItem('token')
            // 2.跳转到登录界面
            location.href = '/login.html'
            layer.close(index);
        });
    })
});

//封装一个 获取用户信息，并渲染用户名和头像
//必须是全局函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     //重新登陆 因为token过期事件12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res){
            // console.log(res);
            if(res.status != 0){
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user){
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;"+name);
    if(user.user_pic != null){
        $('.layui-nav-img').show().attr("src",user.user_pic)
        $(".text-avatar").hide();

    }else{
        //没有头像
        var text = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        
        $('.text-avatar').show().html(text)
    }
}

