function gestoreLoad(){
  try{
      gestoreLoadNavbar();
  } catch(e){
      alert("loadNavbar.js > gestoreLoad " + e);
  }
}

window.onload = gestoreLoad;
