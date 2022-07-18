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
                                        <th scope="col"><p style="display:inline" data-value="No. de colaboradores">No. de colaboradores</p><p style="display:inline">: ${data.length}  </p></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                ${tbody}
                            </table>`;
    }else{
        divColab.innerHTML = '<p data-value="No disponible">No disponible</p>';

    }
    
})
.catch(e => {
    console.error('No se pudieron obtener los coautores');
    divColab.innerHTML = '<p data-value="No disponible">No disponible</p>';
})