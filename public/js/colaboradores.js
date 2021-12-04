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
    
    let tbody = '<tbody>';
    data.forEach(element => {
        tbody += `<tr>
                    <td><img src="/img/author.png" class="h-25 w-25"></td> 
                    <td id="${element["id"]}">
                        <p>${element["author"]}</p>
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

    divColab.innerHTML = `<table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No. de colaboradores: ${data.length} </th>
                                    <th></th>
                                </tr>
                            </thead>
                            ${tbody}
                        </table>`;
})
.catch(e => {
    console.log('No se pudo obtener los coautores', e);
})