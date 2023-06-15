function gestoreLoad(){
  try{
      gestoreLoadNavbar();
      gestoreLoadProgressioni();
  } catch(e){
      alert("loadProgressioni.js > gestoreLoad " + e);
  }
}

window.onload = gestoreLoad;
