
var PicTotal = 3;
var CurrentIndex;
var ToDisplayPicNumber = 0;

var bullets=$(".bullets");
for(var i=0;i<bullets.length;i++){
    bullets[i].index=i;
}

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






    $("#bullet li").on('mouseenter',function(){
        CurrentIndex = this.index;
        //alert(CurrentIndex);
       $('.focus')[0].className = 'bullets';
        $('.bullets')[CurrentIndex].className = 'bullets focus';
        var Pic = $('#container').children("ul");
        $(Pic).children().hide();
        if(CurrentIndex>=1){
            $(Pic).children("li").eq(CurrentIndex).fadeToggle(1000).show();
        }else {
            $(Pic).children("li").eq(CurrentIndex).fadeToggle(1000).show();
        }
    });

    setTimeout(PicNumMouseenter,2000);

};


function PicNumMouseenter() {

    $("#bullet li").eq(ToDisplayPicNumber).trigger("mouseenter");
    ToDisplayPicNumber = (ToDisplayPicNumber + 1) % PicTotal;

    setTimeout(PicNumMouseenter,2000);

};


