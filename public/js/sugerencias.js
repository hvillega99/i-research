function holaf(termino){
    //console.log(termino);
    const form = document.createElement('form')
    form.method='POST'
    form.action='/busqueda'
    const hiddenField = document.createElement('input')
    hiddenField.type =  'hidden'
    hiddenField.name = 'terms'
    hiddenField.value = termino

    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();
}