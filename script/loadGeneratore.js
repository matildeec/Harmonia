function gestoreLoad(){
  try{
      gestoreLoadNavbar();
      gestoreLoadGeneratore();
  } catch(e){
      alert("loadGeneratore.js > gestoreLoad " + e);
  }
}

window.onload = gestoreLoad;
