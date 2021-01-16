// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// $.ajaxPrefilter(function(options) {
//     // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
//     options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  
    // 统一为有权限的接口，设置 headers 请求头
    // if (options.url.indexOf('/my/') !== -1) {
    //   options.headers = {
    //     Authorization: localStorage.getItem('token') || ''
    //   }
    // }
// })
//开发环境
var baseURL='http://api-breakingnews-web.itheima.net'
//测试环境
// var baseURL='http://api-breakingnews-web.itheima.net'
//生产环境
// var baseURL='http://api-breakingnews-web.itheima.net'
//在发送Ajax()post()get()之前会触发
$.ajaxPrefilter(function(options){
    //获取到ajax所以参数信息
    options.url=baseURL + options.url
    // alert(options.url)
      // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
      options.headers = {
        Authorization: localStorage.getItem('token') || ''
      }
    }
    //拦截所有响应
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if(obj.status == 1 && obj.message == "身份认证失败！"){
            //清空本地token
            localStorage.removeItem('token');
            //页面跳转
            location.href = "/login.html"
        }
    }
})