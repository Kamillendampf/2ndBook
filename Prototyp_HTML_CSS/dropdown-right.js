function myFunctionright() {
  document.getElementById("myDropdownright").classList.toggle("showright");
  
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(myFunctionright) {
if (!event.target.matches('.icon-user')) {
var dropdowns = document.getElementsByClassName("sidenavright");
var i;
for (i = 0; i < dropdowns.length; i++) {
var openDropdown = dropdowns[i];
if (openDropdown.classList.contains('showright')) {
openDropdown.classList.remove('showright');
}
}
}
} 