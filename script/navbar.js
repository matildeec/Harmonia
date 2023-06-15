//la funzione mostra il menu generale e lo chiude cambiando la classe
function gestoreGeneralMenu(){
  try {
    if(nodoListaTeoria.classList.contains("attiva")){
      nodoListaTeoria.classList.remove("attiva");
    }
    nodoNavigazione.classList.toggle("attiva");
    iconDropdown.classList.toggle("chiudi");
    nodoBody.classList.toggle("noscroll");
  } catch(e){
      alert("navbar.js > gestoreGeneralMenu "+ e);
  }
}

//la funzione mostra il menu teoria e lo chiude cambiando la classe
function gestoreTeoriaMenu(){
  try {
    nodoListaTeoria.classList.toggle("attiva");
  } catch(e){
      alert("navbar.js > gestoreTeoriaMenu " + e);
  }
}

//NAVIGAZIONE
var nodoNavigazione;
var iconDropdown;
var nodoTeoriaMenu;
var nodoListaTeoria;
var nodoBody;

function gestoreLoadNavbar(){
  try {
    nodoNavigazione = document.getElementById("navigazione");
    iconDropdown = document.getElementById("dropdown");
    nodoTeoriaMenu = document.getElementById("teoriaMenu");
    nodoListaTeoria = document.getElementById("listaTeoria");
    nodoBody = document.getElementById("body");

    iconDropdown.onclick = gestoreGeneralMenu;
    nodoTeoriaMenu.onclick = gestoreTeoriaMenu;

  } catch(e){
      alert("navbar.js > gestoreLoadNavbar "+ e);
  }
}
