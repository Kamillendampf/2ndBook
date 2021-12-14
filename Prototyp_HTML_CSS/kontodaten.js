
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
    const xhr = new XMLHttpRequest();
    var namex=" ";
    xhr.open('GET', host);
    
    // set response format
    xhr.responseType = 'json';
    xhr.send();
    const user = xhr.response;
    
    // log details
    console.log(user.benutzername); 

   /* xhr.onload = () => {
        // get JSON response
        const user = xhr.responseText;
    
        // log details
        console.log(user); 
    };*/
}