//wird beim Start aufgerufen (füllt alle Felder mit den Daten des Users)
function getSessionItem(label) {
    return localStorage.getItem(label);
}

function startdata() {
    var u = getSessionItem("id");
    const host = "http://localhost:8000/wba2api/Benutzer/gib/" + u;
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
    //einzelne Html-Felder ansprechen und Werte setzen
    document.getElementById("vorname").value = vorname;
    document.getElementById("nachname").value = nachname;
    document.getElementById("benutzername").value = benutzername;
    document.getElementById("emailadresse").value = email;
    document.getElementById("strasse").value = strasse;
    document.getElementById("hausnummer").value = hausnummer;
    document.getElementById("plz").value = plz;
    document.getElementById("stadt").value = ort;
    document.getElementById("wallet").innerHTML = wallet + " €";
    //Standard Wert zum füllen der Wallet
    document.getElementById("walletplus").value = 5;
}


//Diese Funktion verändert beim Druck auf einen Button den Wert in der Datenbank
function changevalue(a) {
    const host = "http://localhost:8000/wba2api/benutzer";
    //id wird gesetzt
    var id = getSessionItem("id");
    //user wird erstellt sodass auf die Daten zugegriffen werden kann
    var user;
    var user = new getuserdata();

    //die Daten werden mit den Informationen aus der Datenbank befüllt
    var vorname = user.daten.vorname;
    var nachname = user.daten.nachname;
    var benutzername = user.daten.benutzername;
    var email = user.daten.email;
    var strasse = user.daten.strasse;
    var hausnummer = user.daten.hausnummer;
    var plz = user.daten.plz;
    var ort = user.daten.ort;
    var passwort;
    var wallet = user.daten.wallet;

    //hier wird geprüft welcher Button geklickt wurde (welches Feld verändert werden muss)
    //es werden hier die Standardwerte aus der Datenbank mit den den Werten aus dem Inputfeld ersetzt
    switch (a) {
        case 1:
            strasse = document.getElementById("strasse").value;
            break;
        case 2:
            hausnummer = document.getElementById("hausnummer").value;
            break;
        case 3:
            plz = document.getElementById("plz").value;
            break;
        case 4:
            ort = document.getElementById("stadt").value;
            break;
        case 5:
            passwort = document.getElementById("passwort").value;
            break;
        case 6:
            wallet = parseFloat(document.getElementById("wallet").innerHTML);
            wallet = wallet + parseFloat(document.getElementById("walletplus").value);
            break;
    }
    //überprüfung ob die Felder leer sind
    if (vorname == "") {
        window.alert("Du musst deinen Vorname angeben."); //wenn das Feld Vorname nicht ausgefüllt ist, wird die Medung ausgegeben, dass ein Vorname eingegeben werden muss.
    }
    else if (nachname == "") {
        window.alert("Du musst deinen Nachname angeben.");
    }
    else if (benutzername == "") {
        window.alert("Du musst einen Benutzername angeben.");
    }
    else if (emailadresse == "") {
        window.alert("Du musst deinen E-Mail angeben.");
    }
    else if (strasse == "") {
        window.alert("Du musst deine Straße angeben.");
    }
    else if (hausnummer == "") {
        window.alert("Du musst deine Hausummer angeben.");
    }
    else if (plz == "") {
        window.alert("Du musst deine PLZ angeben.");
    }
    else if (ort == "") {
        window.alert("Du musst dein Ort angeben.");
    }
    else if (passwort == "") {
        window.alert("Du musst ein Passwort angeben.");
    }
    else {
        var data = {       // wenn alle Felder befüllt sind, wird Liste erstellt
            id: id,
            vorname: vorname,       //der erste Wert ist der KEY, zweiter die Variable die wir oben definiert haben.
            nachname: nachname,
            benutzername: benutzername,
            email: email,
            strasse: strasse,
            hausnummer: hausnummer,
            plz: plz,
            ort: ort,
            passwort: "passwort",
            wallet: wallet

        };

        var text1 = JSON.stringify(data);  //Liste wird umgewandelt in jason datei (strukturierte Datei)
        var json = JSON.parse(text1);
        var xhr = new XMLHttpRequest(); // //brauchen wir um an den Server zu senden
        xhr.open("PUT", host, false);  //wollen was an Server senden  mit POST Methode, weil wir was AN DEN SERVER schicken wollen   
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(text1);  //json datei wird gesendet //an localhost..8000

    }
}

//Wird benötigt um die Daten für changeValue(a) zu bekommen ohne diese aus den Inputfeldern zu lesen
function getuserdata() {
    var u = getSessionItem("id");
    const host = "http://localhost:8000/wba2api/Benutzer/gib/"+u;
    var id;
    var user1;
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
    //Gibt ein Object mit den Benutzerdaten aus der Datenbank zurück
    var user = JSON.parse(xhr.response);
    return user;
}