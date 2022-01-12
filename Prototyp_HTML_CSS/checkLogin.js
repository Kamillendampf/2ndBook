function isNullOrUndefined(val) {
    return val === null || val === undefined;
}

function getSessionItem(label) {
    return localStorage.getItem(label);
}

function existsSessionItem(label) {
    return !isNullOrUndefined(getSessionItem(label));
}


function checkLogin() {
    console.log(existsSessionItem("id"));
    var result = existsSessionItem("id");

    if (result) {
        console.log("replace startseite");
        window.location.href = "startseite.html";
    } else {
        console.log("replace index");
        window.location.href = "index.html";
    }
}

checkLogin();