//parti Métier du Carnet (back)


//liste des personnes
const {response} = require("express");
var listeEvenements= [];
var listeReponses= [];
var listeUsers= [];

var idEv=0;
var idRep=0;
var idUsers=0;



function Users(id,nom,prenom,pseudo){
    this.id=id;
    this.nom=nom;
    this.prenom=prenom;
    this.pseudo=pseudo;
}

function Users(user){
    this.id=user.id;
    this.nom=user.nom;
    this.prenom=user.prenom;
    this.pseudo=user.pseudo;
}

function Evenement(titre,id,description,date,creneaux,userOrganisateur){
    this.titre=titre;s
    this.id=id;
    this.description=description;
    this.date=date;
    this.usersOrganisateur=usersOrganisateur;
    this.creneaux=creneaux;




}



function Evenement(evenement){
    this.titre=evenement.titre;
    this.id=evenement.id;
    this.description=evenement.description;
    this.idU=evenement.idU;
    this.date=evenement.date;
    this.usersOrganisateur=evenement.usersOrganisateur;
    this.creneaux=evenement.creneaux;


}




function Reponse(id,disponibilite,evenement,creneauChoix,usersRep){
    this.id=id
    this.disponibilite=disponibilite;
    this.evenement=evenement;
    this.creneauChoix=creneauChoix;
    this.usersRep=usersRep;

}



function Reponse(reponse){
    this.id=reponse.id;
    this.disponibilite=reponse.disponibilite;
    this.evenement=reponse.evenement

    this.creneauChoix=reponse.creneauChoix;

    this.usersRep=reponse.usersRep;


}







var ajouterEvenement =function(evenement){
    /*
    if(typeof liste[personne.id] !='undefined') return {}
    else{
        liste[personne.id]= new Personne(personne);
        return liste[personne.id];
    }
    */
    evenement.id=idEv;
    listeEvenements[idEv]=new Evenement(evenement);
    idEv++;
    return listeEvenements[evenement.id];

}

var ajouterReponse =function(reponse){
    /*
    if(typeof liste[personne.id] !='undefined') return {}
    else{
        liste[personne.id]= new Personne(personne);
        return liste[personne.id];
    }
    */
    reponse.id=idRep;
    listeReponses[idRep]=new Reponse(reponse);
    idRep++;
    return listeReponses[reponse.id];

}

var inscrireUsers =function(users){
    /*
    if(typeof liste[personne.id] !='undefined') return {}
    else{
        liste[personne.id]= new Personne(personne);
        return liste[personne.id];
    }
    */
    users.id=idUsers;
    listeUsers[idUsers]=new Users(users);
    idUsers++;
    return listeUsers[users.id];

}


var getEvenement=function(id){
    if (typeof listeEvenements[id]=="undefined") return {};
    else return listeEvenements[id];
}

var getReponse=function(id){
    if (typeof listeReponses[id]=="undefined") return {};
    else return listeReponses[id];
}

var getUsersId=function(id){
    if (typeof listeUsers[id]=="undefined") return {};
    else return listeUsers[id];
}

var getUsers=function(pseudo){
    let user=null;
        for(i=0;i<listeUsers.length;i++)
        {

            if(listeUsers[i].pseudo==pseudo) {
                user=listeUsers[i];
                break;
            }
        }
    if (typeof user==null) return {};
    else
        return user;

}

var listerEvenements= function (){
    return Object.values(listeEvenements);
}
var listerReponses= function (){
    return Object.values(listeReponses);
}

var listerUsers= function (){
    return Object.values(listeUsers);
}


var recuperer= function (idEv){
    var liste=[];
    var iTableau=0;
    var i;
    console.log("ma liste reponse : "+listeReponses);
    console.log("taille de ma liste reponse : "+listeReponses.length);

    for(i=0;i<listeReponses.length;i++)
    {

        if(listeReponses[i].evenement.id==idEv) {
            liste[iTableau] = getReponse(i);
            iTableau++

        }
    }
    return Object.values(liste);

}





exports.listerReponses=listerReponses;
exports.listerEvenements=listerEvenements;
exports.listerUsers=listerUsers;
exports.getUsers=getUsers;
exports.getUsersId=getUsersId;

exports.getReponse=getReponse;
exports.getEvenement=getEvenement;
exports.ajouterReponse=ajouterReponse;
exports.ajouterEvenement=ajouterEvenement;
exports.inscrireUsers=inscrireUsers;
exports.recuperer=recuperer;






