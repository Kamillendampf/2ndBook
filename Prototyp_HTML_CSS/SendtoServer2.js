function dataTransfer(){
    const host ="http://localhost:8000/wba2api/benutzer"; //host festlegen//benutzer weil in server.js
    //was wir in die Datetenbank einlesen wollen. Wird durch document.querySelector eingelesen
    var vorname =  document.querySelector("#vorname").value;
    var nachname =  document.querySelector("#name").value;
    var benutzername =  document.querySelector("#benutzername").value;
    var email =  document.querySelector("#email").value;
    var handynummer =  document.querySelector("#handynummer").value;
    var strasse =  document.querySelector("#strasse").value;
    var hausnummer =  document.querySelector("#hausnummer").value;
    var plz =  document.querySelector("#plz").value;
    var ort =  document.querySelector("#ort").value;
    var passwort =  document.querySelector("#passwort").value;

    //wird geprüft, ob ein Value vorhanden ist oder nicht. 
    if (vorname == ""){
        window.alert("Du musst deinen Vorname angeben."); //wenn das Feld Vorname nicht ausgefüllt ist, wird die Medung ausgegeben, dass ein Vorname eingegeben werden muss.
    }
    else if  (nachname == ""){
        window.alert("Du musst deinen Nachname angeben.");
    }
    else if  (benutzername == ""){
        window.alert("Du musst einen Benutzername angeben.");
    }
    else if  (email == ""){
        window.alert("Du musst deinen E-Mail angeben.");
    }
    else if  (handynummer == ""){
        window.alert("Du musst deine Handynummer angeben.");
    }
    else if  (strasse == ""){
        window.alert("Du musst deine Straße angeben.");
    }
    else if  (hausnummer == ""){
        window.alert("Du musst deine Hausummer angeben.");
    }
    else if  (plz == ""){
        window.alert("Du musst deine PLZ angeben.");
    }
    else if  (ort == ""){
        window.alert("Du musst dein Ort angeben.");
    }
    else if  (passwort == ""){
        window.alert("Du musst ein Passwort angeben.");
    }
    else{ 
        var data = {       // wenn alle Felder befüllt sind, wird Liste erstellt
        vorname: vorname,       //der erste Wert ist der KEY, zweiter die Variable die wir oben definiert haben.
        nachname: nachname,
        benutzername: benutzername,
        email: email,
        handynummer: handynummer,
        strasse: strasse,
        hausnummer: hausnummer,
        plz: plz,
        ort: ort,
        passwort: passwort
    };

    var json = JSON.stringify(data);  //Liste wird umgewandelt in jason datei (strukturierte Datei)

    var xhr =  new XMLHttpRequest(); // //brauchen wir um an den Server zu senden
    xhr.open("POST", host, false);  //wollen was an Server senden  mit POST Methode, weil wir was AN DEN SERVER schicken wollen 
  // false = synchron (gleichzeitig) true = asynchron (nicht gleichzeitig). muss erst ein abarbeiten bevor es mit dem nächsten beginnt sonmst funktionuiertt es nicht richtig.
    xhr.setRequestHeader("Content-Type", "application/json"); // wid angegeben dassd ich eine json datei sende
    xhr.send(json); //json datei wird gesendet //an localhost..8000
    setTimeout(function(){document.location.href = "Loginseite.html"},500); //will danach wieder zur Login seite weitergeleitet werden
    }
}

function login(){
    const host ="http://localhost:8000/wba2api//benutzer/zugang";
    var email = document.querySelector("#email").value;
    var passwort = document.querySelector("#passwort").value;

if  (passwort == ""){
    window.alert("Du musst dein Passwort angeben.");
}
else if (email == ""){
    window.alert("Du musst deine email angeben.")
}
else{
    var data = {
    email: email,
    passwort: passwort
    };

var json = JSON.stringify(data);  

var xhr =  new XMLHttpRequest(); 

xhr.open("POST", host, false);  
xhr.setRequestHeader("Content-Type", "application/json"); 
xhr.send(json); 
var status = xhr.status; //Status ausgeben lassen 
if (status ==200){   //prüft ob der login erfolgreich war und mit server verbunden ist
    setTimeout(function(){document.location.href = "index.html"},500);
    }else{
        window.alert("Email oder Passwort ist falsch");
    }
    }
}

