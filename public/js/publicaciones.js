const handleClick = (id) => {

    if(document.getElementById(`waiting-${id}`)){
        fetch(`/api/publicationsInfo/${id}`)
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById(`content-${id}`);
            content.innerHTML = `<div class="text-start">
                                    <p><strong>Título:</strong> ${data["title"]}</p>
                                    <p><strong>Autores:</strong> ${data["authors"].join(' ; ')}</p>
                                    <p><strong>Citas:</strong> ${data["cites"]}</p>
                                    <p><strong>Fecha:</strong> ${data["date"]}</p>
                                    <p><strong>Doi:</strong> ${data["doi"]}</p>
                                    <p><strong>Journal:</strong> ${data["journal"]}</p>
                                    <p><strong>Articlenum:</strong> ${data["articlenum"]}</p>
                                </div>`;
        
        })
    }
}