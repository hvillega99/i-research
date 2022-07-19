const elements = document.getElementsByClassName('publication-item');
const idArray = [];

for(let i=0; i<elements.length;i++){
    idArray.push(elements[i].id);
}

const publications = idArray.join(',');
const scopusId = document.getElementById('scopusId').textContent;
const divColab = document.getElementById('colaborators');

fetch(`/api/collaborators/${scopusId}/${publications}`)
.then(result => result.json())
.then(data=> {
        if(!data.error){
        var labelCo = 'No. de colaboradores'
        if(thecheck.checked){
            labelCo = 'No. of collaborators'
        }

        let tbody = '<tbody>';
        data.forEach(element => {
            let tagName = 'tbody';
            if(element.fromEspol){
                tagName = `<p><a href="/investigador/${element.id}">${element["author"]}</a></p>`;
            }else{
                tagName = `<p>${element["author"]}</p>`;
            }
            tbody += `<tr>
                        <td id="${element["id"]}">
                            ${tagName}
                        </td>   
                        <td>
                            <p>
                                Scopus id:
                                <a  
                                    href="https://www.scopus.com/authid/detail.uri?authorId=${element["id"]}"
                                    target="_blank"
                                > 
                                    ${element["id"]}
                                </a>
                            </p>
                        </td>
                    </tr>`;
        });
        tbody += '</tbody>';
        divColab.innerHTML = `<table class="table fixed_header">
                                <thead>
                                    <tr>
                                        <th scope="col"><p style="display:inline" data-value="No. de colaboradores">${labelCo}</p><p style="display:inline">: ${data.length}  </p></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                ${tbody}
                            </table>`;
    }else{

        //IDIOMA
        var no_aviliable_co = 'No disponible'
        if(thecheck.checked){
            no_aviliable_co = 'Not available'
        }
        //FIN DE IDIOMA
        divColab.innerHTML = `<p data-value="No disponible">${no_aviliable_co}</p>`;

    }
    
})
.catch(e => {
    console.error('No se pudieron obtener los coautores');
    //IDIOMA
    var no_aviliable_co2 = 'No disponible'
    if(thecheck.checked){
        no_aviliable_co2 = 'Not available'
    }
    //FIN DE IDIOMA
    divColab.innerHTML = `<p data-value="No disponible">${no_aviliable_co2}</p>`;
})