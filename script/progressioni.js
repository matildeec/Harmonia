//la funzione mostra e nasconde il messaggio Info
function gestoreMessaggioProgressioni(){
  try {
    nodoMessaggio.classList.toggle("attivo");
  } catch(e){
      alert("progressioni.js > gestoreMessaggioProgressioni " + e);
  }
}

//la funzione mostra e nasconde gli esempi delle progressioni
function gestoreProgressioni(){
  try {
    this.classList.toggle("aperta");
  } catch(e){
      alert("progressioni.js > gestoreLista " + e);
  }
}

//la funzione mostra e nasconde il brano cliccato
function gestoreCanzoni(){
  try {
    this.classList.toggle("mostra");
  } catch(e){
      alert("progressioni.js > gestoreLista " + e);
  }
}

var iconaInfo;
var nodoMessaggio;
var topBox;
var lista;

function gestoreLoadProgressioni(){
  try {
    iconaInfo = document.getElementById("info");
    nodoMessaggio = document.getElementById("messaggioInfo");
    iconaInfo.onclick = gestoreMessaggioProgressioni;

    topBox = document.getElementsByClassName("topBox");
    for(var i=0; i<topBox.length; i++){
      topBox[i].onclick = gestoreProgressioni;
    }

    lista = document.getElementsByClassName("list_item");
    for(var j=0; j<lista.length; j++){
      lista[j].onclick = gestoreCanzoni;
    }
  } catch(e){
      alert("progressioni.js > gestoreLoadProgressioni "+ e);
  }
}
