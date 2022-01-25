function getSessionItem(label) {
    return localStorage.getItem(label);
}

function dataTransfer() {
    const host = "http://localhost:8000/wba2api/produkt";       // Host der die Daten empfängt
    var element = document.getElementById('kategorie');         // Daten von der Website in variablen schreiben
    var element2 = document.getElementById('zustand');
    var titel = document.querySelector("#titel").value;
    var autor = document.querySelector("#autor").value;
    var preis = document.querySelector("#preis").value;
    var zustand = element2.options[element2.selectedIndex].value;   // selektiertes Element aus der dropdown list entnehmen
    var isbn = document.querySelector("#isbn").value;
    var kategorie = element.options[element.selectedIndex].value;   // selektiertes Element aus der dropdown list entnehmen
    var benutzer = getSessionItem("id");                            // ID von Benutzer aus dem Session Item holen

    if (titel == "") {                                              // Abfragen ob Daten vorhanden
        window.alert("Du musst einen Titel angeben.");
    }
    else if (autor == "") {
        window.alert("Du musst einen Autor  angeben.");
    } else if (preis == "") {
        window.alert("Du musst einen Preis angeben.");
    } else if (isbn == "") {
        window.alert("Du musst eine ISBN  angeben.");
    } 
    else {
        var data = {                            //Daten in eine dictionary speichern
            titel: titel,
            autor: autor,
            preis: preis,
            zustand: zustand,
            isbn: isbn,
            kategorie: kategorie,
            benutzer : benutzer                 //benutzer ID wird in der Datenbank gespeichert um zu wissen welcher benutzer artikel eingestellt hat
            
        };
        
        var json = JSON.stringify(data);        // daten in eine json datei umwandeln

        var xhr = new XMLHttpRequest();
        xhr.open("POST", host, false);          // Post Request an den HOST schicken //false, dass es synchron läuft
        xhr.setRequestHeader("Content-Type", "application/json");       // request header sagt an das json datei gesendet wird
        xhr.send(json);                 //Json mit den Daten an Host senden
      
    }

}