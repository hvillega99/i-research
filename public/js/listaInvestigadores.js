const autores = document.getElementsByClassName("autor");

const ddd= async function(){
    for await (let aut of autores){
        console.log(aut);
       const scopusId = aut.getAttribute('id');
       const url = `/api/metrics/${scopusId}`;
        await fetch(url)
       .then(result => result.json())
       .then(data => {
           const publicaciones = document.getElementById(`publicaciones-${scopusId}`);
           const citaciones = document.getElementById(`citaciones-${scopusId}`);
           publicaciones.innerHTML = `<p>${data.publications}</p>`
           citaciones.innerHTML = `<p>${data.citations}</p>`
       })
   }
}
ddd();