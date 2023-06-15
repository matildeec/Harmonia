/*LE FUNZIONI scriviMessaggio E creaSelect SONO STATE RIPRESE (CON ALCUNE MODIFICHE) DA "PROGRAMMAZIONE IN JAVASCRIPT" DEL PROF.AMBRIOLA*/

//la funzione visualizza un messaggio e cambia classe a messageBox per renderla visibile
function scriviMessaggio(nodo,messaggio){
  try {
    var nodoTesto = document.createTextNode(messaggio);
    nodo.replaceChild(nodoTesto,nodo.firstChild);
    if(messaggio == ""){
      nodo.classList.remove("attiva");
    } else {
      nodo.classList.add("attiva");
    }
  } catch(e){
      alert("generatore.js > scriviMessaggio " + e);
  }
}

//la funzione cambia classe a messageBox per nasconderla
function gestoreChiudiMessageBox() {
  try {
    if(nodoMessageBox.classList.contains("attiva")){
      nodoMessageBox.classList.remove("attiva");
    }
  } catch(e){
      alert("generatore.js > gestoreChiudiMessageBox " + e);
  }
}

//la funzione genera dinamicamente il menu di selezione
function creaSelect (nodoSelect, opzioni){
  try {
    for(var opzione in opzioni){
      var nodoOpzione = document.createElement("option");
      nodoOpzione.value = opzione;
      var nodoTesto = document.createTextNode(opzione);
      nodoOpzione.appendChild(nodoTesto);
      nodoSelect.appendChild(nodoOpzione);
    }
  } catch(e){
      alert("generatore.js > creaSelect " + e);
  }
}

//funzione ausiliaria che rimuove i figli di un nodo
function rimuoviTuttiFigli (nodo){
  try {
    while(nodo.childNodes.length > 0){
      nodo.removeChild(nodo.firstChild);
    }
  } catch(e){
      alert("generatore.js > rimuoviTuttiFigli " + e);
  }
}

//la funzione cambia le opzioni del select progressione a seconda della scala selezionata
function gestoreScala(){
  try {
    rimuoviTuttiFigli(nodoProgressione);
    if(nodoScala.value == "maggiore"){
      creaSelect(nodoProgressione, PROGRESSIONI_MAGGIORI);
    } else {
      creaSelect(nodoProgressione, PROGRESSIONI_MINORI);
    }
  } catch(e){
      alert("generatore.js > gestoreScala " + e);
  }
}

//la funzione restituisce un elemento casuale di un array
function chiaveRandom(array){
  try{
    return array[Math.floor(Math.random() * array.length)];
  } catch(e){
      alert("generatore.js > chiaveRandom " + e);
  }
}

//la funzione restituisce il nodo-figlio con tag "option" di un nodoSelect attraverso il "value".
function trovaNodoOption(nodoSelect,valore){
  try{
    for(var i=0; i<nodoSelect.childNodes.length; i++){
      var nodoOption = nodoSelect.childNodes[i];
      if(nodoOption.value == valore){
        return nodoOption;
      }
    }
  } catch(e){
      alert("generatore.js > trovaNodoOption " + e);
  }
}

//la funzione randomizza la selezione delle opzioni nei Select
function gestoreRandom(){
  try {
    const TONALITA_chiavi = Object.keys(TONALITA);
    const SCALE_chiavi = Object.keys(SCALE);
    const PROGRESSIONI_MAGGIORI_chiavi = Object.keys(PROGRESSIONI_MAGGIORI);
    const PROGRESSIONI_MINORI_chiavi = Object.keys(PROGRESSIONI_MINORI);

    var tonalita_casuale = chiaveRandom(TONALITA_chiavi);
    var scala_casuale = chiaveRandom(SCALE_chiavi);
    var progressione_casuale;

    var nodoOptionTonalita = trovaNodoOption(nodoTonalita,tonalita_casuale);
    var nodoOptionScala = trovaNodoOption(nodoScala,scala_casuale);
    nodoOptionTonalita.selected = true;
    nodoOptionScala.selected = true;

    if(scala_casuale == "maggiore"){
      nodoScala.value = "maggiore";
      gestoreScala();
      progressione_casuale = chiaveRandom(PROGRESSIONI_MAGGIORI_chiavi);
    } else {
      nodoScala.value = "minore";
      gestoreScala();
      progressione_casuale = chiaveRandom(PROGRESSIONI_MINORI_chiavi);
    }

    var nodoOptionProgressione = trovaNodoOption(nodoProgressione,progressione_casuale);
    nodoOptionProgressione.selected = true;
  } catch(e){
      alert("generatore.js > gestoreRandom " + e);
  }
}

//la funzione elabora le opzioni selezionate, genera e visualizza la progressione
function gestoreGenera(){
  try {
    scriviMessaggio(nodoMessageBox,"");
    var TONALITA_array;
    var PROGRESSIONE_array;
    var SCALA_array = SCALE[nodoScala.value];

    if(nodoScala.value == "maggiore"){
      TONALITA_array = TONALITA[nodoTonalita.value];
      PROGRESSIONE_array = PROGRESSIONI_MAGGIORI[nodoProgressione.value];
    } else {
      PROGRESSIONE_array = PROGRESSIONI_MINORI[nodoProgressione.value];
      switch(nodoTonalita.value){
        case "A":
          TONALITA_array = TONALITA["C"];
          break;
        case "A\u266F \/ B\u266D":
          TONALITA_array = TONALITA["C\u266F \/ D\u266D"];
          break;
        case "B":
          TONALITA_array = TONALITA["D"];
          break;
        case "C":
          TONALITA_array = TONALITA["D\u266F \/ E\u266D"];
          break;
        case "C\u266F \/ D\u266D":
          TONALITA_array = TONALITA["E"];
          break;
        case "D":
          TONALITA_array = TONALITA["F"];
          break;
        case "D\u266F \/ E\u266D":
          TONALITA_array = TONALITA["F\u266F \/ G\u266D"];
          break;
        case "E":
          TONALITA_array = TONALITA["G"];
          break;
        case "F":
          TONALITA_array = TONALITA["G\u266F \/ A\u266D"];
          break;
        case "F\u266F \/ G\u266D":
          TONALITA_array = TONALITA["A"];
          break;
        case "G":
          TONALITA_array = TONALITA["A\u266F \/ B\u266D"];
          break;
        case "G\u266F \/ A\u266D":
          TONALITA_array = TONALITA["B"];
          break;
      }
    }

    var SCALA_ARMONIZZATA = new Array();

    for(var i=0; i<7; i++){
      SCALA_ARMONIZZATA.push(TONALITA_array[i] + SCALA_array[i]);
    }

    for(var j=0; j<misure.length; j++){
      misure[j].value = SCALA_ARMONIZZATA[PROGRESSIONE_array[j]];
    }
  } catch(e){
      alert("generatore.js > gestoreGenera " + e);
  }
}

//la funzione restituisce il nome della variabile con il file audio dell'accordo
function gestoreFileAccordo(accordo){
  try {
    switch(accordo) {
      case "C":
        return C_MAJOR;
      case "Cm":
        return C_MINOR;
      case "D\u266D": case "C\u266F":
        return Dflat_MAJOR;
      case "D\u266Dm": case "C\u266Fm":
        return Dflat_MINOR;
      case "D":
        return D_MAJOR;
      case "Dm":
        return D_MINOR;
      case "E\u266D": case "D\u266F":
        return Eflat_MAJOR;
      case "E\u266Dm": case "D\u266Fm":
        return Eflat_MINOR;
      case "E":
        return E_MAJOR;
      case "Em":
        return E_MINOR;
      case "F":
        return F_MAJOR;
      case "Fm":
        return F_MINOR;
      case "G\u266D": case "F\u266F":
        return Gflat_MAJOR;
      case "G\u266Dm": case "F\u266Fm":
        return Gflat_MINOR;
      case "G":
        return G_MAJOR;
      case "Gm":
        return G_MINOR;
      case "A\u266D": case "G\u266F":
        return Aflat_MAJOR;
      case "A\u266Dm": case "G\u266Fm":
        return Aflat_MINOR;
      case "A":
        return A_MAJOR;
      case "Am":
        return A_MINOR;
      case "B\u266D": case "A\u266F":
        return Bflat_MAJOR;
      case "B\u266Dm": case "A\u266Fm":
        return Bflat_MINOR;
      case "B":
        return B_MAJOR;
      case "Bm":
        return B_MINOR;
    }
  } catch(e) {
      alert("generatore.js > gestoreFileAccordo " + e);
  }
}

//la funzione riproduce un singolo accordo
function gestoreRiproduciAccordo(){
  try {
    if(this.value == ""){
      scriviMessaggio(nodoMessageBox,"Non dimenticare di generare la progressione!");
      return;
    } else {
      gestoreFileAccordo(this.value).currentTime = 0;
      gestoreFileAccordo(this.value).play();
    }
  } catch(e) {
      alert("generatore.js > gestoreRiproduciAccordo " + e);
  }
}

//funzioni interdipendenti che riproducono la progressione (accordi in sequenza) in loop
function playMisura3(){
  try{
    gestoreFileAccordo(misure[3].value).currentTime = 0;
    gestoreFileAccordo(misure[3].value).play();
    misure[2].classList.remove("selezionato");
    misure[3].classList.add("selezionato");
    timeout = setTimeout(gestoreRiproduciProgressione,1200);
  } catch(e){
      alert("generatore.js > playMisura3 " + e);
  }
}
function playMisura2(){
  try{
    gestoreFileAccordo(misure[2].value).currentTime = 0;
    gestoreFileAccordo(misure[2].value).play();
    misure[1].classList.remove("selezionato");
    misure[2].classList.add("selezionato");
    timeout = setTimeout(playMisura3,1200);
  } catch(e){
      alert("generatore.js > playMisura2 " + e);
  }
}
function playMisura1(){
  try{
    gestoreFileAccordo(misure[1].value).currentTime = 0;
    gestoreFileAccordo(misure[1].value).play();
    misure[0].classList.remove("selezionato");
    misure[1].classList.add("selezionato");
    timeout = setTimeout(playMisura2,1200);
  } catch(e){
      alert("generatore.js > playMisura1 " + e);
  }
}
function gestoreRiproduciProgressione(){
  try{
    if(misure[0].value == ""){
      scriviMessaggio(nodoMessageBox,"Non dimenticare di generare la progressione!");
      return;
    } else {
      nodoStop.classList.add("visibile");
      nodoPlay.classList.remove("visible");

      gestoreFileAccordo(misure[0].value).currentTime = 0;
      gestoreFileAccordo(misure[0].value).play();
      if(misure[3].classList.contains("selezionato")){
        misure[3].classList.remove("selezionato");
      }
      misure[0].classList.add("selezionato");
      timeout = setTimeout(playMisura1,1200);
    }
  } catch(e){
      alert("generatore.js > gestoreRiproduciProgressione "+e);
  }
}

//mette in stop il loop della progressione
function gestoreStopProgressione(){
  try {
    clearTimeout(timeout);
    nodoStop.classList.remove("visibile");
    nodoPlay.classList.add("visible");

    for(var i=0; i<misure.length; i++){
      gestoreFileAccordo(misure[i].value).pause();
      misure[i].classList.remove("selezionato");
    }
  } catch(e){
      alert("generatore.js > gestoreStopProgressione " + e);
  }
}

//VAR GLOBALI
var nodoTonalita;
var nodoScala;
var nodoProgressione;
var nodoRandomizza;
var nodoGenera;
var misure;
var nodoPlay;
var nodoStop;
var nodoMessageBox;
var iconClose;
var timeout;

const TONALITA = {
  "C" : ["C","D","E","F","G","A","B"],
  "C\u266F \/ D\u266D" : ["D\u266D","E\u266D","F","G\u266D","A\u266D","B\u266D","C"],
  "D" : ["D","E","F\u266F","G","A","B","C\u266F"],
  "D\u266F \/ E\u266D" : ["E\u266D","F","G","A\u266D","B\u266D","C","D"],
  "E" : ["E","F\u266F","G\u266F","A","B","C\u266F","D\u266F"],
  "F" : ["F","G","A","B\u266D","C","D","E"],
  "F\u266F \/ G\u266D" : ["G\u266D","A\u266D","B\u266D","B","D\u266D","E\u266D","F"],
  "G" : ["G","A","B","C","D","E","F\u266F"],
  "G\u266F \/ A\u266D" : ["A\u266D","B\u266D","C","D\u266D","E\u266D","F","G"],
  "A" : ["A","B","C\u266F","D","E","F\u266F","G\u266F"],
  "A\u266F \/ B\u266D" : ["B\u266D","C","D","E\u266D","F","G","A"],
  "B" : ["B","C\u266F","D\u266F","E","F\u266F","G\u266F","A\u266F"]
};

const SCALE = {
  "maggiore" : ["","m","m","","","m","dim"],
  "minore" : ["","m","m","","","m","dim"]
};

const PROGRESSIONI_MAGGIORI = {
  "I vi IV V" : [0,5,3,4],
  "I V vi IV" : [0,4,5,3],
  "I iii IV V" : [0,2,3,4],
  "I IV vi V" : [0,3,5,4],
  "I IV V V" : [0,3,4,4],
  "I iii vi V" : [0,2,5,4],
  "ii vi I V" : [1,5,0,4],
  "I ii vi V" : [0,1,5,4]
};

const PROGRESSIONI_MINORI = {
  "i VI III VII" : [5,3,0,4],
  "i III VII iv" : [5,0,4,1],
  "i III VII VI" : [5,0,4,3],
  "i VII VI VII" : [5,4,3,4],
  "i iv v v" : [5,1,2,2],
  "i v iv VI" : [5,2,1,3],
  "i VII VI v" : [5,4,3,2],
  "iv i III VII" : [1,5,0,4]
};

const C_MAJOR = new Audio("sources/audio/C_major.mp3");
const C_MINOR = new Audio("sources/audio/C_minor.mp3");
const Dflat_MAJOR = new Audio("sources/audio/Dflat_major.mp3");
const Dflat_MINOR = new Audio("sources/audio/Dflat_minor.mp3");
const D_MAJOR = new Audio("sources/audio/D_major.mp3");
const D_MINOR = new Audio("sources/audio/D_minor.mp3");
const Eflat_MAJOR = new Audio("sources/audio/Eflat_major.mp3");
const Eflat_MINOR = new Audio("sources/audio/Eflat_minor.mp3");
const E_MAJOR = new Audio("sources/audio/E_major.mp3");
const E_MINOR = new Audio("sources/audio/E_minor.mp3");
const F_MAJOR = new Audio("sources/audio/F_major.mp3");
const F_MINOR = new Audio("sources/audio/F_minor.mp3");
const Gflat_MAJOR = new Audio("sources/audio/Gflat_major.mp3");
const Gflat_MINOR = new Audio("sources/audio/Gflat_minor.mp3");
const G_MAJOR = new Audio("sources/audio/G_major.mp3");
const G_MINOR = new Audio("sources/audio/G_minor.mp3");
const Aflat_MAJOR = new Audio("sources/audio/Aflat_major_low.mp3");
const Aflat_MINOR = new Audio("sources/audio/Aflat_minor_low.mp3");
const A_MAJOR = new Audio("sources/audio/A_major_low.mp3");
const A_MINOR = new Audio("sources/audio/A_minor_low.mp3");
const Bflat_MAJOR = new Audio("sources/audio/Bflat_major_low.mp3");
const Bflat_MINOR = new Audio("sources/audio/Bflat_minor_low.mp3");
const B_MAJOR = new Audio("sources/audio/B_major_low.mp3");
const B_MINOR = new Audio("sources/audio/B_minor_low.mp3");

function gestoreLoadGeneratore(){
  try {
    nodoTonalita = document.getElementById("tonalita");
    nodoScala = document.getElementById("scala");
    nodoProgressione = document.getElementById("progressione");
    nodoRandomizza = document.getElementById("randomizza");
    nodoGenera = document.getElementById("genera");
    misure = document.getElementsByClassName("misura");
    nodoPlay = document.getElementById("play");
    nodoStop = document.getElementById("stop");
    nodoMessageBox = document.getElementById("messageBox");
    iconClose = document.getElementById("close");

    creaSelect(nodoTonalita, TONALITA);
    creaSelect(nodoScala, SCALE);
    creaSelect(nodoProgressione, PROGRESSIONI_MAGGIORI);

    nodoScala.onchange = gestoreScala;

    nodoRandomizza.onclick = gestoreRandom;
    nodoGenera.onclick = gestoreGenera;

    for(var i=0; i<misure.length; i++){
      misure[i].onclick = gestoreRiproduciAccordo;
    }

    nodoPlay.onclick = gestoreRiproduciProgressione;
    nodoStop.onclick = gestoreStopProgressione;

    iconClose.onclick = gestoreChiudiMessageBox;

    var nodoTesto1 = document.createTextNode("");
    nodoMessageBox.appendChild(nodoTesto1);
  } catch(e){
      alert("generatore.js > gestoreLoadGeneratore "+ e);
  }
}
