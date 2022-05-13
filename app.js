var express = require('express');

var bodyparser = require('body-parser');

var app=express();
app.use(bodyparser.json());

app.get('/',function(req,res){
    res.send('Ca marche!');
})
app.listen(3000,function(){

    console.log("Server running..");
});
