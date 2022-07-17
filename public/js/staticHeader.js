window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var divisionLine = document.getElementById("division");
//var whiteSpace = document.getElementById("white_space");
var sticky = header.offsetTop;

//const flagsElement =  document.getElementById("flags");
//const textsToChange = document.querySelectorAll('[data-value]');
const thecheck = document.querySelector(".check")

/*
flagsElement.addEventListener("click", (e) => {
  changeLanguage(e.target.parentElement.dataset.language)
})
*/
thecheck.addEventListener("click", idioma)

async function idioma(){
  const sdg_pictures = document.getElementById("sdg-panel");
  const textsToChange = document.querySelectorAll('[data-value]');
  console.log(sdg_pictures)
  //console.log(thecheck.checked)
  
  
  var language_x = "es"
  var img_source = 'ods'
  var n_img = 'ods'
  var type_img = 'jpg'
  if(thecheck.checked){
    language_x = "en"
    img_source = 'ods_english'
    n_img = 'sdg'
    type_img = 'svg'
  }

  var sdg_content_picture = ''
  for(let i = 1; i < 17; i++){
    sdg_content_picture+= `<img src="/img/${img_source}/${n_img}${i}.${type_img}" class="m-1 sdg-item" 
                              width="120px" height="120px" alt="sdg${i}"
                              onclick=showList("${i}")
                             > ` 
  }
    
  sdg_pictures.innerHTML = ` <div class="d-flex flex-wrap m-4">
            ${sdg_content_picture}
        </div>`


  const requestJson = await fetch(`/languages/${language_x}.json`);
  const texts = await requestJson.json();


  

  
 

  for (const textToChange of textsToChange) {
    //console.log(textToChange)
    //console.log(textToChange.dataset.value)
    //console.log('*******************************')
    console.log(textToChange)
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