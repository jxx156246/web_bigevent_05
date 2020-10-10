$(function() {
    var layer = layui.layer;
    var form = layui.form;
    getuserinfo();

    //退出
    $('#indexout').on('click', function(e) {
        e.preventDefault();
        layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });


    })

})

// 获取信息
function getuserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            };
            console.log(res);
            renderlogo(res.data);
        },
        complete: function(res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
}

// 渲染头像
function renderlogo(user) {
    var name = user.nikename || user.username;
    if (user.user_pic !== null) {
        $('.text-logo').hide();
        $('.layui-nav-img').prop('src', user.user_pic).show()
    } else {
        var first = name[0].toUpperCase();
        $('.text-logo').html(first).show();
        $('.layui-nav-img').hide()
    };
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
}