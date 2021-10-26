const autores = document.getElementsByClassName("autor");
var tlj = [];
for(let i=0; i<autores.length; i++){
    const scopusId = autores[i].getAttribute('id');
    tlj.push(scopusId);
    
}
//console.log(tlj);
//const losXd = ["22988279600","36240865700","57194655663","57218378468"]
const url = `/api/metrics2/${tlj}`;
    fetch(url)
    .then(result => result.json())
    .then(data => {
        //console.log(data['author-retrieval-response-list']['author-retrieval-response']);
        data['author-retrieval-response-list']['author-retrieval-response'].forEach(element => 
            {   
            const scopusId = element['coredata']['dc:identifier'].split(':')[1]
            const publicaciones = document.getElementById(`publicaciones-${scopusId}`);
            const citaciones = document.getElementById(`citaciones-${scopusId}`);
            publicaciones.innerHTML = `<p>${element['coredata']['document-count']}</p>`
            citaciones.innerHTML = `<p>${element['coredata']['citation-count']}</p>`

            }

            );
    })