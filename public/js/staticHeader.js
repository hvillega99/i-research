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
  const textsToChange = document.querySelectorAll('[data-value]');
  //console.log(thecheck.checked)
  var language_x = "es"
  if(thecheck.checked){
    language_x = "en"
  }
  const requestJson = await fetch(`/languages/${language_x}.json`);
  const texts = await requestJson.json();


  const textsToChangeTable = document.querySelectorAll('.dataTables_scrollHeadInner table thead tr th');
  const graphicsTags = document.getElementsByTagName("canvas")

  console.log(graphicsTags)

  
  for(const the_graph of graphicsTags){
    console.log(the_graph.chart)
  }
  
  //console.log(obtenerDato)
  
  
  for (const th_text of textsToChangeTable){ 
     if(th_text.dataset.value){
      //console.log(th_text)
      const the_value = th_text.dataset.value
      th_text.textContent = texts[the_value];
    }
  }

  for (const textToChange of textsToChange) {
    //console.log(textToChange)
    //console.log(textToChange.dataset.value)
    //console.log('*******************************')
    const value = textToChange.dataset.value;
    if(textToChange.type=="search"){ //Hay que verificar si esta parte no causa muchas alteraciones
      textToChange.placeholder = texts[value];
    }
    else if(textToChange.title){
      textToChange.title = texts[value]
    }
    else{ //Hay que verificar si esta parte no causa muchas alteraciones
      //console.log(textToChange.textContent)
      textToChange.textContent = texts[value];
      textToChange.value = texts[value]; //Hay que verificar si esta parte no causa muchas alteraciones
    }
    
    
    

  }
  
}


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