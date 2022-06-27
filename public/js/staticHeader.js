window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var divisionLine = document.getElementById("division");
//var whiteSpace = document.getElementById("white_space");
var sticky = header.offsetTop;

//const flagsElement =  document.getElementById("flags");
const textsToChange = document.querySelectorAll('[data-value]');
const thecheck = document.querySelector(".check")

/*
flagsElement.addEventListener("click", (e) => {
  changeLanguage(e.target.parentElement.dataset.language)
})
*/
thecheck.addEventListener("click", idioma)

async function idioma(){
  //console.log(thecheck.checked)
  var language_x = "es"
  if(thecheck.checked){
    language_x = "en"
  }
  const requestJson = await fetch(`/languages/${language_x}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const value = textToChange.dataset.value;
    textToChange.textContent = texts[value];
  }
  
}

const changeLanguage = async (language) => {
  const requestJson = await fetch(`/languages/${language}.json`);
  const texts = await requestJson.json();

  //console.log(texts);
  for (const textToChange of textsToChange) {
    const value = textToChange.dataset.value;
    textToChange.textContent = texts[value];
  }
};

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