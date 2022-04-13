const sgdNames = {
    1: 'Fin de la pobreza',
    2: 'Hambre cero',
    3: 'Salud y bienestar',
    4: 'Educación de calidad',
    5: 'Igualdad de género',	
    6: 'Agua limpia y saneamiento',
    7: 'Energía asequible y no contaminante',
    8: 'Trabajo decente y crecimiento económico',
    9: 'Industria, innovación e infraestructura',
    10: 'Reducción de las desigualdades',
    11: 'Ciudades y comunidades sostenibles',
    12: 'Producción y consumo responsable',
    13: 'Acción por el clima',
    14: 'Vida submarina',
    15: 'Vida de ecosistemas terrestres',
    16: 'Paz, justicia e instituciones sólidas',
}

const sdgPanel = document.getElementById('sdg-panel');

const showList = async (sdg) =>{

    const sdgPublications = document.getElementById(`sdg${sdg}-publications`);

    sdgPanel.style.display = 'none';
    sdgPublications.style.display = 'block';

    document.getElementById(`title-list-${sdg}`).innerHTML = `Publicaciones sobre ODS ${sdg}: ${sgdNames[sdg]}`;

    const listContainer = document.getElementById(`list-container-${sdg}`);

    /* if(document.getElementById(`waiting-sdg${sdg}`)){
        
    } */

    const response = await fetch(`/api/publicationsBySDG/${sdg}`);
    const publications = await response.json();

    if(!publications.error) {

        const headerTable = `<thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Título</th>
                                        <th scope="col">Citaciones</th>
                                        <th scope="col">Año de publicación</th>
                                    </tr>
                            </thead>`;

        let bodyTable = '<tbody>'

        publications.forEach((publication, index) => {
            bodyTable += `<tr class="item" id="${publication[3]}" onclick="handleClick(${publication[3]})" data-bs-toggle="modal" data-bs-target="#modal-${publication[3]}">
                            <th scope="row">${index+1}</th>
                            <td>${publication[0]}</td>
                            <td id="citation-count-${publication[3]}">${publication[1]}</td>
                            <td>${publication[2]}</td>
                        </tr>
                        <div class="modal fade" id="modal-${publication[3]}" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Publicación</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" id="content-${publication[3]}">
                                        <div class="spinner-border" role="status" id="waiting-${publication[3]}">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        })

        bodyTable += '</tbody>'

        const table = `<table class="table fixed_header">
                            ${headerTable}
                            ${bodyTable}
                        </table>`;
        listContainer.innerHTML = table;
        
    }else{
        listContainer.innerHTML = 'No disponible';
        console.error('No se pudo obtener la información correspondiente al ods', sdg);
    }
}

const hideList = (sdg) => {
    const sdgPublications = document.getElementById(`sdg${sdg}-publications`);

    const listContainer = document.getElementById(`list-container-${sdg}`);
    listContainer.innerHTML = '<div class="spinner-border m-5" role="status"><span class="visually-hidden">Loading...</span></div>';

    sdgPanel.style.display = 'block';
    sdgPublications.style.display = 'none';
}