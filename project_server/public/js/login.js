/**
 * Created by Administrator on 2016/8/22.
 */
$(document).ready(function () {
    $('#viplogin').click(function () {
        var name = $('#phonenumber').val();
        var paw = $('#password').val();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: {
                name: name,
                password: paw
            },
            success: function (data) {
                if (data.ret) {
                    location.href = 'index.html';
                } else {
                    $('#mistake').css('visibility', 'visible');
                    alert('用户名或密码错误！');
                }
            },

            error: function (data) {

            }

        })


    });


    $('#phonenumber,#password').focus(function () {
        $('#mistake').css('visibility', 'hidden');
    })
});