const autores = document.getElementsByClassName("autor");

for(let i=0; i<autores.length; i++){
    const scopusId = autores[i].getAttribute('id');
    const url = `/api/metrics/${scopusId}`;
    fetch(url)
    .then(result => result.json())
    .then(data => {
        const publicaciones = document.getElementById(`publicaciones-${scopusId}`);
        const citaciones = document.getElementById(`citaciones-${scopusId}`);
        publicaciones.innerHTML = `<p>${data.publications}</p>`
        citaciones.innerHTML = `<p>${data.citations}</p>`
    })
}