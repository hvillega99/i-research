const thecheck = document.querySelector(".check")

const loadLanguage = async() => {
  if(localStorage.getItem('language')){
    if(localStorage.getItem('language')=='es'){
      thecheck.checked=false
    }
    else{
      thecheck.checked=true
    }

    idioma();
    

  }
}


thecheck.addEventListener("click", idioma)

async function idioma(){

  const table_bugs = document.querySelectorAll('.dataTables_scrollBody table thead tr th');
  const textsToChange = document.querySelectorAll('[data-value]');
  var language_x = "es"
  if(thecheck.checked){
    language_x = "en"
  }

  localStorage.setItem('language',language_x);
  const requestJson = await fetch(`/languages/${language_x}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const value = textToChange.dataset.value;
    if(textToChange.type=="search"){  //Hay que verificar si esta parte no causa muchas alteraciones
      textToChange.placeholder = texts[value];
    }

    else if(textToChange.title){ //Hay que verificar si esta parte no causa muchas alteraciones
      textToChange.title = texts[value]
    }

    else if(textToChange.value){ //Hay que verificar si esta parte no causa muchas alteraciones
      textToChange.value = texts[value]; 
    }

    else{ //Hay que verificar si esta parte no causa muchas alteraciones
      textToChange.textContent = texts[value];
    }
    

  }

  if(table_bugs){
    for (const table_bug of table_bugs) {
      table_bug.textContent = ''
    }
  }
  
  $($.fn.dataTable.tables(true)).DataTable()
    .columns.adjust();  
  
}

loadLanguage();