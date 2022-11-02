const handleClick = (id, idContent) => {
    
    if(document.getElementById(`waiting-${idContent}`)){
        let content = document.getElementById(`content-${idContent}`);
        
        fetch(`/api/publicaciones/${id}`)
        .then(response => response.json())
        .then(data => {
            if(!data.error){

                const authors = data['authors'];
                const fromEspol = [];
                const notFromEspol = [];

                authors.fromEspol.forEach(author => {
                    fromEspol.push(`<a target="_blank" href=/investigador/${author.scopusId}>${author.name}</a>`);
                })
                authors.notFromEspol.forEach(author => {
                    notFromEspol.push(`<a target="_blank" href=https://www.scopus.com/authid/detail.uri?authorId=${author.scopusId}>${author.name}</a>`);
                })

                content.innerHTML = `<div class="text-start">
                                        <p><strong data-value="Título:">Título:</strong> ${data["title"]}</p>
                                        <p><strong data-value="Autores de Espol:">Autores de Espol:</strong> ${fromEspol.join(' ; ')}</p>
                                        <p><strong data-value="Otros autores:">Otros autores:</strong> ${notFromEspol.length>0 ? notFromEspol.join(' ; ') : 'No registra'}</p>
                                        <p><strong data-value="Citas:">Citas:</strong> ${data["cites"]}</p>
                                        <p><strong data-value="Fecha:">Fecha:</strong> ${data["date"]}</p>
                                        <p><strong>Doi:</strong> <a target="_blank" href=https://doi.org/${data["doi"]}>${data["doi"]}</a> </p>
                                        <p><strong>Journal:</strong> ${data["journal"]}</p>
                                        <p><strong>Articlenum:</strong> ${data["articlenum"]}</p>
                                    </div>`;
                
                const thecheck_pub = document.querySelector(".check")
                var pub_language_x = "es"
                if(thecheck_pub.checked){
                    pub_language_x = "en"
                }
                
                fetch(`/languages/${pub_language_x}.json`)
                .then(responseP => responseP.json())
                .then(Pubtexts => {
                    const PubtextsToChange = document.querySelectorAll('.text-start p strong[data-value]');
                    const PubtextsToChange2 = document.querySelectorAll('.modal-title');
                    //console.log(PubtextsToChange)
                    for (const PubtextToChange2 of PubtextsToChange2) {
                        //console.log(PubtextToChange2);
                        const Pubvalue2 = PubtextToChange2.dataset.value;
                        PubtextToChange2.textContent = Pubtexts[Pubvalue2];
                    }


                    for (const PubtextToChange of PubtextsToChange) {
                        const Pubvalue = PubtextToChange.dataset.value;
                        PubtextToChange.textContent = Pubtexts[Pubvalue];
                    }
                })
                /*
                const Pubtexts = await PubrequestJson.json();
                
                */

            
            }else{
                //IDIOMA
                var no_aviliable_pub = 'No disponible'
                if(thecheck.checked){
                    no_aviliable_pub = 'Not available'
                }
                //FIN DE IDIOMA

                content.innerHTML = `<p data-value="No disponible">${no_aviliable_pub}</p>`;
                console.error(`no se pudo obtener la información de la publicación ${id}`)
            }
            //document.getElementById(`citation-count-${id}`).textContent
        })
    }
}