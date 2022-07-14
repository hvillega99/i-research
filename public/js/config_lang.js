const textsToChange = document.querySelectorAll('[data-value]');
const thecheck = document.querySelector(".check")

thecheck.addEventListener("click", idioma)

/*
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
*/

async function idioma(){
  //console.log(thecheck.checked)
  var language_x = "es"
  if(thecheck.checked){
    language_x = "en"
  }
  const requestJson = await fetch(`/languages/${language_x}.json`);
  const texts = await requestJson.json();

  const textsToChangeTable = document.querySelectorAll('.dataTables_scrollHeadInner table thead tr th');
  //console.log(obtenerDato)
  for (const th_text of textsToChangeTable){ 
     if(th_text.dataset.value){
      //console.log(th_text)
      const the_value = th_text.dataset.value
      th_text.textContent = texts[the_value];
    }
  }

  for (const textToChange of textsToChange) {
    const value = textToChange.dataset.value;
    if(textToChange.type=="search"){ //Hay que verificar si esta parte no causa muchas alteraciones
      //console.log(textToChange)
      //console.log('++++++')
      textToChange.placeholder = texts[value];
    }
    else if(textToChange.title){
      //console.log(textToChange)
      //console.log('-----')
      textToChange.title = texts[value]
    }
    else if(textToChange.value){
      //console.log(textToChange)
      //console.log('****')
      textToChange.value = texts[value]; 
    }
    else{ //Hay que verificar si esta parte no causa muchas alteraciones
      /*
      console.log(textToChange.textContent);
      console.log(textToChange.dataset.value);
      console.log(texts[value]);
      console.log("******")
      */
      textToChange.textContent = texts[value];
      //textToChange.value = texts[value]; //Hay que verificar si esta parte no causa muchas alteraciones
    }
  
    console.log(textToChange)
    console.log(textToChange.textContent)
    console.log('********')  
    

  }
  
}
