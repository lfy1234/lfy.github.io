/**
 * Created by my on 2016/8/24.
 */
window.onload = function(){

    $('#secondmenu').on('mouseenter',function(){
        $('#downmenu').show();
    });


    $('#secondmenu').on('mouseleave',function(){
        $('#downmenu').hide() ;
    });

    $('#downmenu').on('mouseenter',function(){
        $('#downmenu').show();

    })
    $('#downmenu').on('mouseleave',function(){
        $('#downmenu').hide()
    })









    $('#wrappedleftTop').on('mousemove', function (evt) {

        $('#bigdiv').show();
        $('#float').show();

        var top = evt.pageY - $('#float').height()/2;
        var left = evt.pageX - $('#float').width()/2;

        if (top < $('#wrappedleftTop').offset().top){
            top = $('#wrappedleftTop').offset().top;
        }
        if (top > $('#wrappedleftTop').outerHeight()+$('#wrappedleftTop').offset().top - $('#float').outerHeight()) {
            top = $('#wrappedleftTop').outerHeight()+$('#wrappedleftTop').offset().top - $('#float').outerHeight();
        }

        if (left < $('#wrappedleftTop').offset().left) {
            left = $('#wrappedleftTop').offset().left;
        }
        if (left > $('#wrappedleftTop').outerWidth()+$('#wrappedleftTop').offset().left - $('#float').outerWidth()) {
            left = $('#wrappedleftTop').outerWidth()+$('#wrappedleftTop').offset().left - $('#float').outerWidth();
        }

        $('#float').offset({
            top:top,
            left:left
        })



        var bigTop = -(top)*2+$('#wrappedleftTop').offset().top;
        var bigLeft = -(left)*2+$('#wrappedleftTop').offset().left;

        $('#bigdiv').css('background-position', bigLeft + 'px ' +bigTop + 'px');


    })

    $('#wrappedleftTop').on('mouseout',function(){
        $('#bigdiv').hide();
        $('#float').hide();
    })



    $('#addtocart').click(function(){
        $.ajax({
            type:'post',
            url:'/api/joincart',
            data:{
                goodsimg:$('#wrappedleftBot a img').attr("src"),
                goodsdes:$('.productdes').html(),
                goodsmodel:$('.productmodel').html(),
                goodsprice:$('.productprice').html()
            },
            success: function (data) {
                if (data.ret) {
                    alert('添加成功！');
                } else {

                    alert('添加失败');
                }
            }
        })
    })







};