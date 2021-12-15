const helper = require('../helper.js');
const BenutzerDao = require('../dao/benutzerDao.js');
const express = require('express');
const { json } = require('express');
var serviceRouter = express.Router();

helper.log('- Service Benutzer');

serviceRouter.get('/benutzer/gib/:id', function(request, response) {
    helper.log('Service Benutzer: Client requested one record, id=' + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.loadById(request.params.id);
        helper.log('Service Benutzer: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Benutzer: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/benutzer/alle/', function(request, response) {
    helper.log('Service Benutzer: Client requested all records');

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.loadAll();
        helper.log('Service Benutzer: Records loaded, count=' + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Benutzer: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/benutzer/existiert/:id', function(request, response) {
    helper.log('Service Benutzer: Client requested check, if record exists, id=' + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.exists(request.params.id);
        helper.log('Service Benutzer: Check if record exists by id=' + request.params.id + ', result=' + result);
        response.status(200).json(helper.jsonMsgOK({ 'id': request.params.id, 'existiert': result }));
    } catch (ex) {
        helper.logError('Service Benutzer: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/benutzer/eindeutig', function(request, response) {
    helper.log('Service Benutzer: Client requested check, if username is unique');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.benutzername)) 
        errorMsgs.push('benutzername fehlt');

    if (errorMsgs.length > 0) {
        helper.log('Service Benutzer: check not possible, data missing');
        response.status(400).json(helper.jsonMsgError('Check not possible. Missing data: ' + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.isunique(request.body.benutzername);
        helper.log('Service Benutzer: Check if unique, result=' + result);
        response.status(200).json(helper.jsonMsgOK({ 'benutzername': request.body.benutzername, 'eindeutig': result }));
    } catch (ex) {
        helper.logError('Service Benutzer: Error checking if unique. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post('/benutzer/zugang', function(request, response) {
    helper.log('Service Benutzer: Client requested check, if user has access');
    helper.log(request.body);

    var errorMsgs=[];
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');

    if (errorMsgs.length > 0) {
        helper.log('Service Benutzer: check not possible, data missing');
        response.status(400).json(helper.jsonMsgError('Check not possible. Missing data: ' + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.hasaccess(request.body.email, request.body.passwort);
        helper.log('Service Benutzer: Check if user has access, result=' + result);
       
        response.status(200).json(helper.jsonMsgOK(result));
        
    } catch (ex) {
        helper.logError('Service Benutzer: Error checking if user has access. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/benutzer/checklogin', function(request, response) {
    sess = request.session;
    if(sess.email) {
        return response.status(200);
    }
    else{
    
    return response.status(400);}

});

serviceRouter.post('/benutzer', function(request, response) {
    helper.log('Service Benutzer: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.benutzername)) 
        errorMsgs.push('benutzername fehlt');
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');
    if (helper.isUndefined(request.body.vorname)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.nachname)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.strasse)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.hausnummer)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.plz)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.ort)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.email)) {
        request.body.person = null;
    } 
    
    if (errorMsgs.length > 0) {
        helper.log('Service Benutzer: Creation not possible, data missing');
        response.status(400).json(helper.jsonMsgError('Hinzufügen nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.create(request.body.benutzername, request.body.passwort, request.body.vorname, request.body.nachname, request.body.strasse, request.body.hausnummer, request.body.plz, request.body.ort, request.body.email);
        helper.log('Service Benutzer: Record inserted');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Benutzer: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});
serviceRouter.get('/benutzer', function(request, response) {
    helper.log('Service Benutzer: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.benutzername)) 
        errorMsgs.push(request.body.benutzername);
        //errorMsgs.push('benutzername fehlt');
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');
    if (helper.isUndefined(request.body.vorname)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.nachname)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.strasse)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.hausnummer)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.plz)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.ort)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.email)) {
        request.body.person = null;
    } 
    
    if (errorMsgs.length > 0) {
        helper.log('Service Benutzer: Creation not possible, data missing');
        response.status(400).json(helper.jsonMsgError('Hinzufügen nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.create(request.body.benutzername, request.body.passwort, request.body.vorname, request.body.nachname, request.body.strasse, request.body.hausnummer, request.body.plz, request.body.ort, request.body.email);
        helper.log('Service Benutzer: Record inserted');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Benutzer: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.put('/benutzer', function(request, response) {
    helper.log('Service Benutzer: Client requested update of existing record');
    var errorMsgs=[];
<<<<<<< HEAD
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');
     if (helper.isUndefined(request.body.strasse)) {
        errorMsgs.push('strasse fehlt');
    }  if (helper.isUndefined(request.body.hausnummer)) {
        errorMsgs.push('hausnummer fehlt');
    }  if (helper.isUndefined(request.body.plz)) {
        errorMsgs.push('plz fehlt');
    }  if (helper.isUndefined(request.body.ort)) {
        errorMsgs.push('passwort fehlt');
=======
    console.log(request.body.id);
    if (helper.isUndefined(request.body.benutzername)) 
        errorMsgs.push('benutzername fehlt');
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');
    if (helper.isUndefined(request.body.vorname)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.nachname)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.strasse)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.hausnummer)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.plz)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.ort)) {
        request.body.person = null;
    }  if (helper.isUndefined(request.body.email)) {
        request.body.person = null;
    } else if (helper.isUndefined(request.body.person.id)) {
        errorMsgs.push('person gesetzt, aber id fehlt');
    } else {
        request.body.person = request.body.person.id;
>>>>>>> 60f64a060ef1818cdf0971f7687aa68fdf11027b
    }

    if (errorMsgs.length > 0) {
        helper.log('Service Benutzer: Update not possible, data missing');
        response.status(400).json(helper.jsonMsgError('Update nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.update(request.body.id, request.body.vorname, request.body.nachname, request.body.benutzername, request.body.email, request.body.strasse, request.body.hausnummer,  request.body.plz, request.body.ort, request.body.passwort );
        helper.log('Service Benutzer: Record updated, id=' + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Benutzer: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

/*serviceRouter.put('/benutzer', function(request, response) {
    helper.log('Service Benutzer: Client requested update of existing record');
    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.benutzername)) 
        errorMsgs.push('benutzername fehlt');
    if (helper.isUndefined(request.body.neuespasswort)) 
        request.body.neuespasswort = null; 
    if (helper.isUndefined(request.body.person)) {
        request.body.person = null;
    } else if (helper.isUndefined(request.body.person.id)) {
        errorMsgs.push('person gesetzt, aber id fehlt');
    } else {
        request.body.person = request.body.person.id;
    }

    if (errorMsgs.length > 0) {
        helper.log('Service Benutzer: Update not possible, data missing');
        response.status(400).json(helper.jsonMsgError('Update nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs)));
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var result = benutzerDao.update(request.body.id, request.body.benutzername, request.body.neuespasswort, request.body.benutzerrolle.id, request.body.person);
        helper.log('Service Benutzer: Record updated, id=' + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Benutzer: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});*/

serviceRouter.delete('/benutzer/:id', function(request, response) {
    helper.log('Service Benutzer: Client requested deletion of record, id=' + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var obj = benutzerDao.loadById(request.params.id);
        benutzerDao.delete(request.params.id);
        helper.log('Service Benutzer: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ 'gelöscht': true, 'eintrag': obj }));
    } catch (ex) {
        helper.logError('Service Benutzer: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;