window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var divisionLine = document.getElementById("division");
//var whiteSpace = document.getElementById("white_space");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.style.position="sticky"
    divisionLine.style.position="sticky"
    //whiteSpace.style.position="sticky"
    //whiteSpace.style.height=`${header.offsetHeight}px`
    divisionLine.style.top=`${header.offsetHeight - 1}px`
    //whiteSpace.style.top=`${header.offsetHeight + 1}px`
  } else {
    header.style.position="relative"
    divisionLine.style.position="relative"
    divisionLine.style.top="-1px"
    //whiteSpace.style.height="0px"
  }
}

function tecla(){
  if (window.pageYOffset > sticky) {
    window.scroll(0, sticky);
  }
  
}