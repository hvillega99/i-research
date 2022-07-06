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

    const response = await fetch(`/api/sdg/publications/${sdg}`);
    const publications = await response.json();

    if(!publications.error) {

        const headerTable = `<thead class="clickable-header">
                                    <tr>
                                        <th scope="col" style="text-align:center">#</th>
                                        <th scope="col" style="text-align:center">Título</th>
                                        <th scope="col" style="text-align:center">Citaciones</th>
                                        <th scope="col" style="text-align:center">Año de publicación</th>
                                        <th scope="col" style="text-align:center">Publicado en</th>
                                    </tr>
                            </thead>`;

        let bodyTable = '<tbody>'

        publications.forEach((publication, index) => {
            bodyTable += `<tr class="item" id="${publication[3]}" onclick="handleClick(${publication[3]}, ${publication[3]})" data-bs-toggle="modal" data-bs-target="#modal-${publication[3]}">
                            <th scope="row">${index+1}</th>
                            <td>${publication[0]}</td>
                            <td id="citation-count-${publication[3]}">${publication[1]}</td>
                            <td>${publication[2]}</td>
                            <td>${publication[4]}</td>
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

        const table = `<table id="tableODS${sdg}" class="display" style="width:100%">
                            ${headerTable}
                            ${bodyTable}
                        </table>`;
        listContainer.innerHTML = table;

        $(document).ready( function () {
            $(`#tableODS${sdg}`).DataTable({
                paging: false,
                searching: false,
                info: false,
                scrollY: 400,
                scrollX: true
            });
        } );
        
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

const sdgColors = {
    1: '#e5243b',
    2: '#DDA63A',
    3: '#4C9F38',
    4: '#C5192D',
    5: '#FF3A21',
    6: '#26BDE2',
    7: '#FCC30B',
    8: '#A21942',
    9: '#FD6925',
    10: '#DD1367',
    11: '#FD9D24',
    12: '#BF8B2E',
    13: '#3F7E44',
    14: '#0A97D9',
    15: '#56C02B',
    16: '#00689D',
}

const graficaSDG = document.getElementById("grafica-sdg");
fetch('/api/sdg/bibliometrics')
.then(response => response.json())
.then(arr => {

    const data = arr.filter(item => !item.error);

    if(data.length > 0) {

        const sdgNumbers = data.map(item => item.sdg);
        const sdgLabels = sdgNumbers.map(sdg => `ODS ${sdg}`);

        const sdgPublications = data.map(item => item.publications);
        const sdgCitations = data.map(item => item.citations);
    
        const sdgPublicationsGraph = document.getElementById('grafica-sdg')
    
        const maxValue = Math.max.apply( Math, sdgPublications );
        new Chart(sdgPublicationsGraph, {
            type: 'bar',
            data: {
                labels: sdgLabels,
                datasets: [{
                    label: 'Publicaciones',
                    data: sdgPublications,
                    backgroundColor: sdgNumbers.map(sdg => sdgColors[sdg]),
                    borderColor: sdgNumbers.map(sdg => sdgColors[sdg]),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: maxValue < 20? 1:0
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    
        const infoSDGPublications = document.getElementById('info-sdg')
        infoSDGPublications.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top" 
        title="Cantidad de publicaciones de la institución\npor objetivo de desarrollo sostenible."></img>`;
    
        const titleSDGpublications = document.getElementById('title-sdg');
        titleSDGpublications.textContent = 'Publicaciones por ODS';


        const sdgCitationsGraph = document.getElementById('grafica-sdg2');

        const maxValue2 = Math.max.apply( Math, sdgCitations );

        new Chart(sdgCitationsGraph, {
            type: 'bar',
            data: {
                labels: sdgLabels,
                datasets: [{
                    label: 'Citaciones',
                    data: sdgCitations,
                    backgroundColor: sdgNumbers.map(sdg => sdgColors[sdg]),
                    borderColor: sdgNumbers.map(sdg => sdgColors[sdg]),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: maxValue2 < 20? 1:0
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });

        const infoSDGCitations = document.getElementById('info-sdg2');
        infoSDGCitations.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
        title="Cantidad de citaciones de la institución\npor objetivo de desarrollo sostenible."></img>`;

        const titleSDGCitations = document.getElementById('title-sdg2');
        titleSDGCitations.textContent = 'Citaciones por ODS';




    }else{
        console.error('No se pudo obtener la información bibliométrica de los ODS');
    }
    
})