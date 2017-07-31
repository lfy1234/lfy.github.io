

/********************************************/
/************************load modules********/
/********************************************/


//get file system to read/write json files

var fs = require('fs');
var path = require('path');



//to create http server
var express = require('express');

//to parse body data
var bodyParser = require('body-parser');

var USER_FILE =path.join(__dirname,'data/user.json');
var JOIN_CART =path.join(__dirname,'data/shoppingcart.json');

/********************************************/
/************************server init********/
/********************************************/

//create app(http server)
var app = express();
//ser port of the server
app.set('port',8888);
//set root of the server
app.use('/',express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

///*app.get('/api/checkuser1',function(req,res){
//    //liru: /api/checkuser?user=cui.jn
//    var user = req.query.user;
//    //read the json file
//    fs.readFile(USER_FILE,function(err,data){
//        if(err){
//            console.log(err);
//            process.exit(1);
//        }
//
//        var registeredUser = JSON.parse(data);
//        console.log(user);
//        for(var i=0; i<registeredUser.length; i++){
//            if(registeredUser[i].name===user){
//                res.json({
//                    msg:'exsited,you idint'
//                });
//                return;
//            }
//        }
//
//        res.json({
//            msg:'success,my little cow boy'
//        });
//
//    });
//});
//
//app.post('/api/register1',function(req,res){
//    var user = req.body.user;
//    var pw = req.body.password;
//
//    fs.readFile(USER_FILE,function(err,data){
//        if(err){
//            console.log(err);
//            process.exit(1);
//        }
//
//        var registeredUser = JSON.parse(data);
//
//        for(var i=0; i<registeredUser.length; i++){
//            if(registeredUser[i].name===user){
//                res.json({
//                    msg:'exsited,you idint'
//                });
//                return;
//            }
//        }
//
//        registeredUser.push({
//            name:user,
//            password:pw
//        });
//
//        fs.writeFile(USER_FILE,JSON.stringify(registeredUser,null,4),function(err){
//            if(err){
//                console.log(err);
//                process.exit(1);
//            }
//
//            res.json({
//                msg:'success, you little lucky dog'
//            });
//        });
//    });
//
//});*/

app.get('/api/checkUser', function (req, res) {

    fs.readFile(USER_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }


        var counters = JSON.parse(data);
        console.log(counters);
        console.log('req.query.user=' + req.query.name);

        if (checkUser(counters, req.query.name) === true) {
            res.json({ret: true});
        } else {
            res.json({ret: false});
        }
    });
});

app.post('/api/register', function (req, res) {
    //console.log(req.body);
    fs.readFile(USER_FILE, function (err, data) {

        if (err) {
            console.error(err);
            process.exit(1);
        }

        var counters = JSON.parse(data);

        if (checkUser(counters, req.body.name) === false) {
            res.json({ret: false, msg: 'user exsited'});
            return;
        }

        var newCounter = {
            name: req.body.name,
            password: req.body.password,
        };
        counters.push(newCounter);
        fs.writeFile(USER_FILE, JSON.stringify(counters, null, 4), function (err) {
            // console.log(JSON.stringify(comments));
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json({ret: true});

        });
    });
});

app.post('/api/login', function (req, res) {
    console.log(req.body);
    fs.readFile(USER_FILE, function (err, data) {

        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(req.body);
        var counters = JSON.parse(data);

        for (var i = 0; i < counters.length; i++) {
            if (counters[i].name === req.body.name && counters[i].password === req.body.password) {
                res.json({ret: true});
                return;
            }
        }

        res.json({ret: false});
    });
});


app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

function checkUser(counters, newUser) {
    for (var i = 0; i < counters.length; i++) {
        if (counters[i].name === newUser) {
            return false;
        }
    }

    return true;
}















app.post('/api/joincart',function(req,res){

    fs.readFile(JOIN_CART, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var goods = JSON.parse(data);
        var newGoods = {
            goodsimg: req.body.goodsimg,
            goodsdes: req.body.goodsdes,
            goodsmodel: req.body.goodsmodel,
            goodsprice: req.body.goodsprice

        };
        goods.push(newGoods);
        fs.writeFile(JOIN_CART, JSON.stringify(goods, null, 4), function (err) {
            // console.log(JSON.stringify(comments));
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json({ret: true});

        });
    });
});

app.get("/api/showCart",function (req,res) {
    fs.readFile(JOIN_CART,function (err,data) {
        if(err){
            console.log(err);
            process.exit(1);
        }
        var goodsInfos = JSON.parse(data);
        res.json({
            ret:goodsInfos
        })
    })
});

app.get("/api/removegoods",function (req,res) {
    var goodsimg = req.query.goodsimg;
    var index = 0;
    fs.readFile(JOIN_CART,function (err,data) {
        if(err){
            console.log(err);
            process.exit(1);
        }
        var cartInfos = JSON.parse(data);
        var len = cartInfos.length;
        console.log(goodsimg);
        for(var i = 0 ; i < len ; i++){
            // if(cartInfos[i].goodsimg === goodsimg){
            //    var index = i ;
            //     cartInfos.splice(index,1);
            // }
            // console.log(cartInfos[i].goodsimg);
            if(cartInfos[i].goodsimg === goodsimg){
                index = i;
                break;
            }

        }
        cartInfos.splice(index,1);
        fs.writeFile(JOIN_CART,JSON.stringify(cartInfos,null,4),function (err) {
            if(err){
                console.log(err);
                process.exit(1);
            }
            res.json({
                msg : "success",
                ret : true
            });
        });
    });
});