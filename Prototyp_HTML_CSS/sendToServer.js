function dataTransfer(){
    const host = "http://localhost:8000/wba2api/adresse";
    var strasse  =  document.querySelector("#strasse").value;
    var hausnummer = document.querySelector("#hausnummer").value;
    var plz = document.querySelector("#plz").value;
    var ort = document.querySelector("#ort").value;
    var handynummer = document.querySelector("#handynummer").value;

    
    if (strasse == ""){
        window.alert("Du musst eine Straße angeben.");
    }
    else if (hausnummer == ""){
        window.alert("Du musst eine Hausnummer  angeben.");
    }else if (plz == ""){
        window.alert("Du musst eine Postleitzahl angeben.");
    }else if (ort == ""){
        window.alert("Du musst einen Ort  angeben.");
    }
    else{
        var data = {
            strasse: strasse,
            hausnummer: hausnummer,
            plz: plz,
            ort: ort,
            handynummer: handynummer
        };
    
        var json = JSON.stringify(data);
    
        var xhr = new XMLHttpRequest();
        xhr.open("POST", host, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(json);
        
    }

}