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
                        <td><img src="/img/author.png" class="h-25 w-25"></td> 
                        <td id="${element["id"]}">
                            ${tagName}
                            <p>Scopus id:
                            <a  
                              href="https://www.scopus.com/authid/detail.uri?authorId=${element["id"]}"
                              target="_blank"> 
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
                                        <th scope="col">No. de colaboradores: ${data.length} </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                ${tbody}
                            </table>`;
    }else{
        divColab.innerHTML = '<p>No disponible</p>';

    }
    
})
.catch(e => {
    console.error('No se pudieron obtener los coautores');
    divColab.innerHTML = '<p>No disponible</p>';
})