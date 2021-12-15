function dataTransfer() {
    const host = "http://localhost:8000/wba2api/benutzer";
    var strasse = document.querySelector("#strasse").value;
    var hausnummer = document.querySelector("#hausnummer").value;
    var plz = document.querySelector("#plz").value;
    var ort = document.querySelector("#ort").value;
    var vorname = document.querySelector("#vorname").value;
    var nachname = document.querySelector("#name").value;
    var benutzername = document.querySelector("#benutzername").value;
    var email = document.querySelector("#email").value;
    var passwort = document.querySelector("#passwort").value;


    if (strasse == "") {
        window.alert("Du musst eine Straße angeben.");
    }
    else if (hausnummer == "") {
        window.alert("Du musst eine Hausnummer  angeben.");
    } else if (plz == "") {
        window.alert("Du musst eine Postleitzahl angeben.");
    } else if (ort == "") {
        window.alert("Du musst einen Ort  angeben.");
    } else if (vorname == "") {
        window.alert("Du musst einen Vornamen  angeben.");
    }
    else if (nachname == "") {
        window.alert("Du musst einen Nachnamen  angeben.");
    }
    else if (benutzername == "") {
        window.alert("Du musst einen Benutzernamen  angeben.");
    }
    else if (passwort == "") {
        window.alert("Du musst einen Passwort  angeben.");
    }
    else if (email == "") {
        window.alert("Du musst einen Email  angeben.");
    }
    else {
        var data = {
            strasse: strasse,
            hausnummer: hausnummer,
            plz: plz,
            ort: ort,
            vorname: vorname,
            nachname: nachname,
            benutzername: benutzername,
            passwort: passwort,
            email: email
        };

        var json = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", host, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(json);
        setTimeout(function () { document.location.href = "Loginseite.html" }, 500);
    }

}

function login() {

    const host = "http://localhost:8000/wba2api//benutzer/zugang";
    var email = document.querySelector("#email").value;
    var passwort = document.querySelector("#passwort").value;

    if (passwort == "") {
        window.alert("Du musst einen Ort  angeben.");
    }
    else if (email == "") {
        window.alert("Du musst einen Ort  angeben.");
    }
    else {
        var data = {
            passwort: passwort,
            email: email
        };

        var json = JSON.stringify(data);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", host, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(json);
        var status = xhr.status;
        console.log(xhr.response.daten.id);
      
    }


}

function startSession(){
    var selectedName = $('#namen').val();

    console.log("Setting selected name to session: " + selectedName);
    setSessionItem("vorname", selectedName);

    console.log("Jumping to page 2");
    location.href = 'datei2.html';


}

function checkLogin() {
    var xhr = new XMLHttpRequest();
    const host = "http://localhost:8000/wba2api/benutzer/checklogin";
    xhr.open("GET", host);
    xhr.send();
    var status = xhr.status;
    console.log(status);


    document.location.href = "startseite.html";

}
