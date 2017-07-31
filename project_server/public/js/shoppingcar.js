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


    /**************************** shopping cart get data*******************/
    $.get("/api/showCart",function (data) {
        // console.log(data.ret);
        if(data.ret.length > 0){
            $(".goshoppingHint").hide();
        }else{
            $(".goshoppingHint").show();
        }
        for(var i = 0; i < data.ret.length; i++){
            var $goodscart = $('#goodslist').html();
            var goodsStr = $goodscart.replace("{{src}}", data.ret[i].goodsimg)
                .replace("{{goodsdes}}", data.ret[i].goodsdes)
                .replace("{{goodsprice}}","￥"+ data.ret[i].goodsprice)
                .replace("{{goodsmodel}}", data.ret[i].goodsmodel)

            var $goods = $(goodsStr);
            $(".cartbody").append($goods);
        }
    });

    /********************** del goods**********************************/

    $(".cartbody").on("click","td",function () {
       alert($(this).prevAll().find("img").attr("src"));
        $.ajax({
            type : "get" ,
            url : "/api/removegoods",
            data : {
                goodsimg : $(this).prevAll().find("img").attr("src")
            },
            success: function (data) {
                if (data.ret) {
                    location.href = 'shoppingcar.html';
                }
            },
        });

    });







};