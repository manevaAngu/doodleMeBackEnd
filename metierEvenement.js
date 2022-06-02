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

function Evenement(titre,id,description,date,creneaux,userOrganisateur,termine,creneauFinal,nbParticipant){
    this.titre=titre;s
    this.id=id;
    this.description=description;
    this.date=date;
    this.usersOrganisateur=usersOrganisateur;
    this.creneaux=creneaux;
    this.termine=termine;
    this.creneauFinal=creneauFinal;
    this.nbParticipant=nbParticipant;

}



function Evenement(evenement){
    this.titre=evenement.titre;
    this.id=evenement.id;
    this.description=evenement.description;
    this.idU=evenement.idU;
    this.date=evenement.date;
    this.usersOrganisateur=evenement.usersOrganisateur;
    this.creneaux=evenement.creneaux;
    this.termine=evenement.termine;
    this.creneauFinal=evenement.creneauFinal;
  this.nbParticipant=evenement.nbParticipant;

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






/*
Ajoute un evenement à la liste
@return Evenement
 */
var ajouterEvenement =function(evenement){

    evenement.id=idEv;
    listeEvenements[idEv]=new Evenement(evenement);
    idEv++;
    return listeEvenements[evenement.id];

}
/*
Ajoute une réponse à la liste
@return Reponse
 */
var ajouterReponse =function(reponse){

    reponse.id=idRep;
    listeReponses[idRep]=new Reponse(reponse);
    idRep++;
    return listeReponses[reponse.id];

}

/*
Ajoute un compte utilisateur
@return Users
 */
var inscrireUsers =function(users){

    users.id=idUsers;
    listeUsers[idUsers]=new Users(users);
    idUsers++;
    return listeUsers[users.id];

}

/*
@return Evenement si existe
 */
var getEvenement=function(id){
    if (typeof listeEvenements[id]=="undefined") return {};
    else return listeEvenements[id];
}


/*
Supprime un évènement de la liste
 */
var supprimerEvenement=function(evenement){
    var myIndex = listeEvenements.indexOf(evenement);

        listeEvenements.splice(myIndex,1);

}

/*
@return Reponse si existe
 */
var getReponse=function(id){
    if (typeof listeReponses[id]=="undefined") return {};
    else return listeReponses[id];
}

/*
@return User si existe, en fonction de l'ID
 */
var getUsersId=function(id){
    if (typeof listeUsers[id]=="undefined") return {};
    else return listeUsers[id];
}

/*
@return User si existe, en fonction du pseudo
 */
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

/*
@return la liste de tous les Evenements
 */
var listerEvenements= function (){
    return Object.values(listeEvenements);
}

/*
@return la liste de toutes les Reponses
 */
var listerReponses= function (){
    return Object.values(listeReponses);
}

/*
@return la liste de tous les utilisateurs
 */
var listerUsers= function (){
    return Object.values(listeUsers);
}

/*
Récupère la liste de toutes les réponses d'un évènement
@return Reponses[]
 */
var recuperer= function (idEv){
    var liste=[];
    var iTableau=0;
    var i;

    for(i=0;i<listeReponses.length;i++)
    {

        if(listeReponses[i].evenement.id==idEv) {
            liste[iTableau] = getReponse(i);
            iTableau++

        }
    }
    return Object.values(liste);

}

/*
Récupère la liste des réponses pour un utilisateur donné
@return Reponse[]
 */
var recupererReponsesUsers= function (id ){
    var liste=[];
    var iTableau=0;
    var i;

    for(i=0;i<listeReponses.length;i++)
    {

        if(listeReponses[i].usersRep.id==id) {
            liste[iTableau] = getReponse(i);
            iTableau++

        }
    }
    return Object.values(liste);

}

/*
Récupère la liste des évènements créés par un utilisateur donné
@return Evenement []
 */
var recupererEvenementUsers= function (id ){
    var liste=[];
    var iTableau=0;
    var i;

    for(i=0;i<listeEvenements.length;i++)
    {
        //console.log("id de l'evendement"+listeEvenements[i].titre+" a un id =" + listeEvenements[i].usersOrganisateur.id + " ?=" + id);

        if(listeEvenements[i].usersOrganisateur.id==id) {
            liste[iTableau] = listeEvenements[i];
            iTableau++
            console.log(listeEvenements[i].titre +"est la");

        }
    }
    return Object.values(liste);
}

/*
Le nombre de réponses à un créneau
@return number
 */
var getmaxCreneau= function (liste , creneaux) {
    let somme=0;
    for (let i=0 ; i<liste.length ;i++){
        if( liste[i].creneauChoix==creneaux){
            somme++;
        }

    }

    return somme;

}


/*
Permet de choisir le créneau avec le plus de participants qui ont accepté
@return Evenement cloturé
 */
var cloturerEvenement= function (event){


    var liste=[];
    var iTableau=0;
    listeEvenements[event.id].termine=true;

    for(let i=0;i<listeReponses.length;i++)
    {

        if(listeReponses[i].evenement.id==event.id) {
            liste[iTableau] = listeReponses[i];
            iTableau++;

        }
    }

    if(liste.length>0) {

        var creneau = liste[0].creneauChoix;

        let max = getmaxCreneau(liste, creneau);
        let test;
        for (let i = 1; i < liste.length; i++) {
            // @ts-ignore
            if(liste[i].disponibilite='Accepté')
                listeEvenements[event.id].nbParticipant++;

            test = getmaxCreneau(liste, liste.creneauChoix);
            // @ts-ignore
            if (test > max) {
                max = test;
                creneau = liste[i].creneauChoix;
            }

        }
        listeEvenements[event.id].creneauFinal = creneau;

    }
    return listeEvenements[event.id];
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
exports.supprimerEvenement=supprimerEvenement;

exports.recuperer=recuperer;
exports.recupererReponsesUsers=recupererReponsesUsers;
exports.recupererEvenementUsers=recupererEvenementUsers;

exports.cloturerEvenement=cloturerEvenement;





