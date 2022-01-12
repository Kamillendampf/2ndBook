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
        window.alert("Du musst ein Passwort  angeben.");
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

        xhr.onload = function () {

            var user = xhr.response;
            var user1 = JSON.parse(user);
            //Daten in variablen sichern
            var id = user1.daten.id;
            setSessionItem("id", id);
        };

        
        xhr.send(json);
        var status = xhr.status;
        if (status == 200) {
            setTimeout(function () { document.location.href = "startseite.html" }, 500);
        } else {
            window.alert("Email oder Passwort ist falsch");
        }
    }


}



// sets or overwrites an value in local storage
function setSessionItem(label, value) {
    localStorage.setItem(label, value);
}

// retreives an value from localStorage by label
// returns null if not existent
function getSessionItem(label) {
    return localStorage.getItem(label);
}

// checks, if an item exists in local storage
function existsSessionItem(label) {
    return !isNullOrUndefined(getSessionItem(label));
}

// sets or overwrites an json object as value to local storage
function setJSONSessionItem(label, jsonValue) {
    setSessionItem(label, JSON.stringify(jsonValue));
}

// retreives an json object from local storage
// if not existent returns null
// if json string converts to json object
function getJSONSessionItem(label) {
    var val = getSessionItem(label);

    // if undefined (not existent), return undefined
    if (isNullOrUndefined(val))
        return val;

    // if json string, convert and return as json object
    if (isJSONString(val))
        return tryParseJSONString(val);

    // otherwise return as string
    return val;
}

// clears complete session / deletes all session items
function clearSession() {
    localStorage.clear();
}

// removes a session item by label
function removeSessionItem(label) {
    console.log("ausgeloogt");
    localStorage.removeItem(label);
    setTimeout(function () { document.location.href = "index.html" }, 500);
}



// try parse JSON string
// returns false if no json string otherwise the JSON object
function tryParseJSONString(str) {
    try {
        var obj = JSON.parse(str);
        if (obj && typeof obj === "object")
            return obj;
    } catch (e) { }
    return false;
}

// check if given string is a json string
function isJSONString(str) {
    return tryParseJSONString(str) != false;
}

// function checks if given value is null or undefined
function isNullOrUndefined(val) {
    return val === null || val === undefined;
}

