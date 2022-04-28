const handleClick = (id, idContent) => {
    
    if(document.getElementById(`waiting-${idContent}`)){
        let content = document.getElementById(`content-${idContent}`);
        
        fetch(`/api/publicationsInfo/${id}`)
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
                                        <p><strong>Título:</strong> ${data["title"]}</p>
                                        <p><strong>Autores de Espol:</strong> ${fromEspol.join(' ; ')}</p>
                                        <p><strong>Otros autores:</strong> ${notFromEspol.length>0 ? notFromEspol.join(' ; ') : 'No registra'}</p>
                                        <p><strong>Citas:</strong> ${data["cites"]}</p>
                                        <p><strong>Fecha:</strong> ${data["date"]}</p>
                                        <p><strong>Doi:</strong> <a target="_blank" href=https://doi.org/${data["doi"]}>${data["doi"]}</a> </p>
                                        <p><strong>Journal:</strong> ${data["journal"]}</p>
                                        <p><strong>Articlenum:</strong> ${data["articlenum"]}</p>
                                    </div>`;
            
            }else{
                content.innerHTML = '<p>No disponible</p>';
                console.error(`no se pudo obtener la información de la publicación ${id}`)
            }
            //document.getElementById(`citation-count-${id}`).textContent
        })
    }
}