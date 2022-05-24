var express = require('express');

var bodyparser = require('body-parser');
var metier = require('./metierEvenement');
var app=express();
app.use(bodyparser.json());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"); res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"); next();
});
//inscrireUsers

app.post('/api/users',function(req,res){
    //récuper parametres

    var users=req.body;

    //metier
    var objres=metier.inscrireUsers(users);

    //forger résultat
    if ((typeof objres =='undefined') || (typeof objres==={}))
        res.status(400);
    else
        res.status(201).json(objres);

});


//ajouter un évenement

app.post('/api/evenements',function(req,res){
    //récuper parametres

    var evenement=req.body;

    //metier
    var objres=metier.ajouterEvenement(evenement);

    //forger résultat
    if ((typeof objres =='undefined') || (typeof objres==={}))
        res.status(400);
    else
        res.status(201).json(objres);

});

//ajouter une réponse

app.post('/api/reponses',function(req,res){
    //récuper parametres

    var  reponse=req.body;

    //metier
    var objres=metier.ajouterReponse(reponse);

    //forger résultat
    if ((typeof objres =='undefined') || (typeof objres==={}))
        res.status(400);
    else
        res.status(201).json(objres);

});

//lister les users

app.get('/api/users',function(req,res){
   res.status(200).json(metier.listerUsers());
});

//lister les reponses

app.get('/api/reponses',function(req,res){
    res.status(200).json(metier.listerReponses());
});

//lister les evenements

app.get('/api/evenements',function(req,res){
    res.status(200).json(metier.listerEvenements());
});

app.get('/api/reponsesEvent/:id',function(req,res){
    var id = req.params.id;

    res.status(200).json(metier.recuperer(id));
    console.log(id);

});


//Rechercher un users

app.get('/api/users/:id',function(req,res){
    //1
    var id = req.params.id;
    //
    var obj=metier.getUsersId();
    //
    if ((typeof  obj=='undefined') || (typeof obj==={}))
        res.status(404);
    else res.status(200).json(obj);
});

//rechercher un pseudo

app.get('/api/usersPseudo/:pseudo',function(req,res){
    //1
    var pseudo = req.params.pseudo;
    //
    var obj=metier.getUsers(pseudo);
    //
    if ((typeof  obj=='undefined') || (typeof obj==={}))
        res.status(404);
    else res.status(200).json(obj);
});


//Rechercher un evenement

app.get('/api/evenements/:id',function(req,res){
    //1
    var id = req.params.id;
    //
    var obj=metier.getEvenement(id);
    //
    if ((typeof  obj=='undefined') || (typeof obj==={}))
        res.status(404);
    else res.status(200).json(obj);
});


//Rechercher une reponse

app.get('/api/reponses/:id',function(req,res){
    //1
    var id = req.params.id;
    //
    var obj=metier.getReponse(id)
    //
    if ((typeof  obj=='undefined') || (typeof obj==={}))
        res.status(404);
    else res.status(200).json(obj);
});




app.listen(3000,function(){

    console.log("Server running..");
});
