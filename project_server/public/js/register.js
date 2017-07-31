$(document).ready(function () {
    //var flag1,flag2,flag3,flag4;
    $('#telph').blur(function () {
        checkUserPhone();
        checkUserExsited();

    });
    $('#regpwText').blur(function () {
        checkPasswordReg();
    });

    $('#surepwText').blur(function () {
        checkPasswordConfirm();

    });
    //if(flag1==1||flag2==1||flag3==1||flag4==1){
    //    alert('error');
    //}else {
        $('#vipregister').click(function () {

            var name = $('#telph').val();
            var pw = $('#regpwText').val();
            var cpw= $('#surepwText').val();
            if(name==''||pw==''||cpw==''){

                 alert('请输入完整信息！');
                return;
            }
            $.ajax({
                type: 'post',
                url: '/api/register',
                data: {
                    name: name,
                    password: pw
                },
                success: function (data) {
                    if (data.ret) {
                        location.href = 'login.html';
                    }
                },
                error: function () {
                    console.log('error occurred');
                }
            })

        });
    //}









    function checkUserPhone(){
        var regExp = /\w{6,10}/;
        if(!regExp.test($('#telph').val())){
            flag1 = 1;
            alert('请输入6-10位数字字母')


        }

    }



    function checkUserExsited(){
        $.ajax({
            type: 'get',
            url: '/api/checkUser',
            data: {
                name: $('#telph').val()
            },
            success: function (data) {
                if (!data.ret) {
                    flag2 = 1;
                   alert('用户名已存在');

                }
            },
            error: function () {

            }
        })
    }





    function checkPasswordReg() {
        var level = 0;
        var value = $('#regpwText').val();
        var regExp2 = /[a-zA-Z0-9]{6,20}/;
       if(!(regExp2.test(value))){
           flag3 = 1;
           alert('请输入6-20位数字字母！');

       }

    }

    function checkPasswordConfirm() {
        var confirmV = $('#surepwText').val();
        var pwV = $('#regpwText').val();
        if (pwV !== confirmV) {
            flag4 = 1;
           alert('两次密码不一致')

        }
    }




});
























//function checkUserReg() {
//    var regExp = /^[A-Za-z_]\w{5,19}$/;
//    if (regExp.test($('#user').val())) {
//        $('#register')[0].removeAttribute('disabled');
//        return true;
//    }
//
//    $('#user-error-info').html('请输入合法用户名').show();
////                $('#register').attr('disabled','');
//    result = false;
//    return false;
//
//}












//var result = true;
//$('#user').focus(function(){
//    $('#erro').hide();
//});
//$('#user').blur(function(){
//    if(checkUserReg()){
//        checkUserExsited();
//    }
//});
//
//$('#password').blur(function(){
//    checkPassword();
//});
//
//$('#passwordc').blur(function(){
//    checkPasswordc();
//});
//
//$('#user,#password,#passwordc').blur(function () {
//    if (result) {
//        $('#register').removeAttr('disabled');
//    }
//})
//function checkUserReg(){
//    var reg=/^[A-Za-z_]\w{5,19}$/;
//    if(reg.test($('#user').val())){
//        $('#register')[0].removeAttribute('disabled');
//        return true;
//    }
//    $('#erro').html("格式不正确").show();
//    result = false;
//    return false;
//    result = false;
//}
//function checkUserExsited(){
//    $.ajax({
//        type:'get',
//        url:'/api/checkUser',
//        data:{
//            user:$('#user').val()
//        },
//        success: function (data) {
//            if (data.ret) {
//                $('#erro').html("√").show();
//            } else {
//                $('#erro').html("用户已存在").show();
//                result = false;
//            }
//        },
//
//        error: function (data) {
//            alert(data.ret);
//        }
//    })
//}
//
//function checkPassword(){
//    var level = 0;
//    var value = $('#password').val();
//    if (value.length >= 6) {
//        if (null !== value.match(/\d/)) {
//            level++;
//        }
//
//        if (null !== value.match(/[a-zA-Z]/)) {
//            level++;
//        }
//
//        if (null !== value.match(/[^a-zA-Z0-9]/)) {
//            level++;
//        }
//    }
//    if (level === 0) {
//        result = false;
//    }
//    var levelArr = ['请输入6位以上密码', '弱', '中', '强'];
//
//    $('#perro').html(levelArr[level]);
//}
//
//function checkPasswordc(){
//    var confirmV = $('#passwordc').val();
//    var pwV = $('#password').val();
//
//    if (pwV !== confirmV) {
//        $('#pcerro').html('两次密码不一致');
//        result = false;
//    }
//}
