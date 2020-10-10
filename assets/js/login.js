$(function() {
    $('#link-reg').on('click', function() {
        $('.login').hide();
        $('.reg').show()
    });
    $('#link-login').on('click', function() {
        $('.login').show();
        $('.reg').hide()
    });

    // 校验
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if (value !== $('.reg [name=password]').val()) {
                return "两次输入密码不一致"
            }
        }
    });

    // 注册
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                $('#link-login').click()
            }
        })
    })

    // 登录
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})