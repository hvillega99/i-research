window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var divisionLine = document.getElementById("division");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.style.position="sticky"
    divisionLine.style.position="sticky"
    divisionLine.style.top=`${header.offsetHeight - 1}px`
  } else {
    header.style.position="relative"
    divisionLine.style.position="relative"
    divisionLine.style.top="-1px"
  }
}

function tecla(){
  if (window.pageYOffset > sticky) {
    window.scroll(0, sticky);
  }
  
}