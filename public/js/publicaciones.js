const handleClick = (id) => {

    if(document.getElementById(`waiting-${id}`)){
        let content = document.getElementById(`content-${id}`);

        fetch(`/api/publicationsInfo/${id}`)
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                content.innerHTML = `<div class="text-start">
                                        <p><strong>Título:</strong> ${data["title"]}</p>
                                        <p><strong>Autores:</strong> ${data["authors"].join(' ; ')}</p>
                                        <p><strong>Citas:</strong> ${document.getElementById(`citation-count-${id}`).textContent}</p>
                                        <p><strong>Fecha:</strong> ${data["date"]}</p>
                                        <p><strong>Doi:</strong> <a target="_blank" href=https://doi.org/${data["doi"]}>${data["doi"]}</a> </p>
                                        <p><strong>Journal:</strong> ${data["journal"]}</p>
                                        <p><strong>Articlenum:</strong> ${data["articlenum"]}</p>
                                    </div>`;
            
            }else{
                content.innerHTML = '<p>No disponible</p>';
                console.error(`no se pudo obtener la información de la publicación ${id}`)
            }
        })
    }
}