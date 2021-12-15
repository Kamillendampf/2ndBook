
function getdata(){
    const host = "http://localhost:8000/wba2api/Benutzer";
    document.getElementById("street").placeholder="";
    document.getElementById("street").placeholder="Type Name here ...";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", host);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        // get JSON response
        const user = xhr.response;
        console.log(user.name)
    }
    console.log("asdf")
}
function test1234() {
    const xhr = new XMLHttpRequest();
    var namex=" ";
    xhr.open('GET', 'https://api.jsonbin.io/b/5d5076e01ec3937ed4d05eab/1');
    
    // set response format
    xhr.responseType = 'json';
    xhr.send();
    
    xhr.onload = () => {
        // get JSON response
        const user = xhr.response;
    
        // log details
        console.log(user.name); // John Doe
        namex=user.name;
        console.log(user.email); // john.doe@example.com
        console.log(user.website); // http://example.com
    };
    console.log("harry Potter");
    alert(namex);
}
function test12345() {
    const host="http://localhost:8000/wba2api/Benutzer/gib/1";
    var id;
    var benutzername;
    var passwort;
    var vorname;
    var nachname;
    var strasse;
    var hausnummer;
    var plz;
    var ort;
    var email;
    var wallet;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', host, false);

    
    xhr.onload = function () {
        //Request finished. Do processing here.
        var user;
        // get JSON response
        user = xhr.response;
        var json = JSON.stringify(user);
        var user1 = JSON.parse(user);
        //Daten in variablen sichern
        id = user1.daten.id;
        benutzername = user1.daten.benutzername;
        passwort = user1.daten.passwort;
        vorname = user1.daten.vorname;
        nachname = user1.daten.nachname;
        strasse = user1.daten.strasse;
        hausnummer = user1.daten.hausnummer;
        plz = user1.daten.plz;
        ort = user1.daten.ort;
        email = user1.daten.email;
        wallet = user1.daten.wallet;

        

    };
    xhr.send(null);
    //einzelne Html-Felder ansprechen
    document.getElementById("vorname").value = vorname;
    document.getElementById("nachname").value = nachname;
    document.getElementById("benutzername").value = benutzername;
    document.getElementById("emailadresse").value = email;
    document.getElementById("strasse").value = strasse;
    document.getElementById("hausnummer").value = hausnummer;
    document.getElementById("plz").value = plz;
    document.getElementById("stadt").value = ort;
    //document.getElementById("handynummer").value = hand
    document.getElementById("wallet").value = wallet;
}


function test1() {
    const host="http://localhost:8000/wba2api/benutzer";
<<<<<<< HEAD
    var id = "1";
=======
    var id = 1;
>>>>>>> 60f64a060ef1818cdf0971f7687aa68fdf11027b
    var vorname = document.getElementById("vorname").value;
    var nachname = document.getElementById("nachname").value;
    var benutzername = document.getElementById("benutzername").value;
    var emailadresse = document.getElementById("emailadresse").value;
    var strasse = document.getElementById("strasse").value;
    var hausnummer = document.getElementById("hausnummer").value;
    var plz = document.getElementById("plz").value;
    var ort = document.getElementById("stadt").value;
    var passwort;// = document.getElementById("passwort").value;
    //document.getElementById("handynummer").value = hand
    var wallet = document.getElementById("wallet").value;
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
    else if  (emailadresse == ""){
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
        id: id,
        vorname: vorname,       //der erste Wert ist der KEY, zweiter die Variable die wir oben definiert haben.
        nachname: nachname,
        benutzername: benutzername,
        email: emailadresse,    
        strasse: strasse,
        hausnummer: hausnummer,
        plz: plz,
        ort: ort,
        passwort: "passwort"
        
    };
    
    var text1 = JSON.stringify(data);  //Liste wird umgewandelt in jason datei (strukturierte Datei)
    var json = JSON.parse(text1);
    var xhr =  new XMLHttpRequest(); // //brauchen wir um an den Server zu senden
    xhr.open("PUT", host, false);  //wollen was an Server senden  mit POST Methode, weil wir was AN DEN SERVER schicken wollen   
    xhr.setRequestHeader("Content-Type", "application/json");   
    xhr.send(text1);  //json datei wird gesendet //an localhost..8000
    console.log(json.id);
    console.log(json.benutzername);
    console.log("Harry Potter");
<<<<<<< HEAD
    
=======
    console.log(xhr.response);
>>>>>>> 60f64a060ef1818cdf0971f7687aa68fdf11027b
}
}